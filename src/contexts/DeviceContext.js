import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

import { DeviceAPI } from '../lib/DeviceAPI';
import { DeviceTypes, DeviceSource } from '../lib/types';

import { prc2rgbarr, rgbarr2hex, rgbarr2prc } from '../utils/colors';
import { actionTitle } from '../utils/actions';

const values = Object.values;

export const DeviceContext = createContext();

export const DeviceProvider = ({ screen, children }) => {
  const [devices, setDevices] = useState([]);

  const apiRef = useRef(null);

  useEffect(async () => {

    const deviceManager = new DeviceAPI()
    try {
      await deviceManager.init();
      await deviceManager.getDevices();
    } catch (err) {
      screen.destroy();
      console.log({err});
      return;
			//TODO: an then?
    }

    setDevices([...Object.entries(deviceManager.deviceMap).map(([key, dev]) => {
      // Common props
      let ret = {
        id: dev.id,
        text: dev.name,
        onoff: dev.isActive,
        action: actionTitle(dev.isActive),
      };
      // Default Light props
      if (dev.type == DeviceTypes.LIGHT) {
        ret = {
          ...ret,
          brtns: 50, 
          tempr: 50,
          colorPct: 25, 
          color: prc2rgbarr(25),
          colorHex: rgbarr2hex(prc2rgbarr(25)),
        }
      }

      return ret;
    })]);
    
    apiRef.current = deviceManager;
    
  }, []);


  const toggleDeviceState = async (devId) => {
    const deviceManager = apiRef.current;
    if (!deviceManager) {
      return;
    }
    const dev = values(deviceManager.deviceMap).find(d => d.id == devId);
    
    try {
      const method = dev.isActive ? 'turnOff' : 'turnOn';
      await deviceManager[ method ](devId);
    } catch (err) {
			screen.destroy();
      console.log({err});
      // return;
      process.exit()
      //TODO: an then?
    }

    setDevices((prevDevices) =>
      prevDevices.map((obj) => {
        if (obj.id === devId) {
          obj.onoff = !obj.onoff;
          obj.action = actionTitle(obj.onoff);
        }
        return obj;
      })
    );
  };

  return (
    <DeviceContext.Provider value={{ devices, setDevices, toggleDeviceState }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
	const context = useContext(DeviceContext);
	if (context === undefined) {
		throw new Error('useDeviceContext can only be used with DeviceProvider')
	}
	return context
};
