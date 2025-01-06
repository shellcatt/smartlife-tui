import { DeviceTypes as DTypes, DeviceSource as DSource } from './types'
import { TuyaSmartLifeClient } from "tuya-smartlife-api";

import Configstore from 'configstore';
import 'dotenv/config';
import 'node:process';

const env = process.env;

export class DeviceAPI {
	
	constructor() {
		this.tslClient = null;

		this.authConfigStore = new Configstore(`tuya-smartlife-api`);
		this.sessionStore = new Configstore(`tuya-smartlife-api_session`);
	}

	async init() { 
		try {
			this.tslClient = new TuyaSmartLifeClient();
			
			if (!this.authConfigStore.has('auth')) {
				await this.tslClient.init(env.HA_EMAIL, env.HA_PASS, env.HA_REGION, env.HA_CC);
			} else {
				await this.tslClient.load(this.sessionStore.get('session'));
			}
			await this.tslClient.pollDevicesUpdate();

			this.sessionStore.set('session', this.tslClient.session);
		} catch (err) {
			throw err
		}
	}

	async getDevices() {
		let deviceMap = {};

		if (this.tslClient) {
			const tslDevices = this.tslClient.getAllDevices();
			// console.log({tslDevices});
			if (tslDevices?.length) {
				tslDevices.map(dev => {
					if (deviceMap[dev.objId] && !keys(deviceMap[dev.objId]).length || !deviceMap[dev.objId]) {
						deviceMap[dev.objId] = {
							id: dev.objId,
							src: DSource.SMARTIFE,
							name: dev.name(),
							type: this.getDevType(DSource.SMARTIFE, dev),
							isOnline: dev.available(),
							isActive: dev.state(),
						};
					}
				});
			}
		}
		
		this.deviceMap = deviceMap;
	}

	getDevType(source, dev) {
		if (source == DSource.SMARTIFE) {
			const devTypes = {
				'switch': DTypes.SWITCH,
				'light': DTypes.LIGHT,
			};
			return devTypes[dev.objectType()];
		} else {
			//TODO: tuya openapi client
		}
	}

	async turnOn(devId) {
		if (this.tslClient) {
			const device = await this.tslClient.getDeviceById(devId);
			device.turnOn();
			this.deviceMap[devId].isActive = true;
		} else  {
			//TODO: tuya openapi client
		}
	}

	async turnOff(devId) {
		if (this.tslClient) {
			const device = await this.tslClient.getDeviceById(devId);
			device.turnOff();
			this.deviceMap[devId].isActive = false;
		} else {
			//TODO: tuya openapi client
		}
	}

}