import React, { useContext, useState, useEffect } from 'react';

import { DeviceContext, useDeviceContext, DeviceProvider } from '../contexts/DeviceContext';

import { Grid, GridItem } from '../react-blessed-contrib';
import { Switch } from '../components/devices/switch';
import { Light } from '../components/devices/light';
import { actionTitle } from '../utils/actions';
import { darkenRgb, prc2rgbarr, rgbarr2hex } from '../utils/colors';
import { throttle } from 'lodash';

export const DeviceManager = ({ screen }) => {

	const { devices, setDevices, toggleDeviceState } = useDeviceContext();
	const [itemsPerRow, setItemsPerRow] = useState(3);

	useEffect(() => {

		const throttledResizer = throttle( handleResize, 150 );
		screen.on('resize', throttledResizer);
		
		return () => {
			screen.off('resize', throttledResizer)
		}
	}, []);


	const handleResize = () => {
		if (screen.cols > 200 && screen.cols <= 320) {
			setItemsPerRow(4);
		} else if (screen.cols > 120 && screen.cols <= 200) {
			setItemsPerRow(3);
		} else if (screen.cols > 80 && screen.cols <= 120) {
			setItemsPerRow(2);
		} else {
			setItemsPerRow(1);
		}
	}

	const getRow = index => {
		return Math.floor(index / itemsPerRow)
	}
	const getCol = index => {
		return index % itemsPerRow
	}
	
	const getRows = () => {
		let len = devices.length, 
			cols = itemsPerRow;
		return Math.max(1, Math.floor(len / cols) + (len > 3 ? (len % cols ? 1 : 0) : 0))
	}
	const getCols = () => {
		return itemsPerRow
	}


	const handleActionClick = async (idx, anykey = true) => {
		if (typeof anykey == 'string' && !['enter', 'space'].includes(anykey)) 
			return;

		if (devices[idx].onoff === null)
			return;
		
		devices[idx].onoff = !devices[idx].onoff;
		devices[idx].action = actionTitle(devices[idx].onoff)
		setDevices([...devices])
	}

	const handleActionScroll = async (idx, prop, dirOrKey) => {
		if (typeof dirOrKey == 'string') {
			if (!['up', 'down'].includes(dirOrKey)) 
				return;
			else
				dirOrKey = (dirOrKey == 'up' ? true : false)
		}
	
		let inc = dirOrKey ? +1 : -1;
		let val = (devices[idx][prop] + inc) % 100; 
		val = val > 99 ? 0 : val < 0 ? 99 : val;
		devices[idx][prop] = val;

		if (prop == 'colorPct') {
			devices[idx][prop] = val;
			// log(devices[idx][prop])
			devices[idx]['color'] = prc2rgbarr(val);
			devices[idx]['colorHex'] = rgbarr2hex(prc2rgbarr(val));
		}
		setDevices([...devices]);
	}

	const handleActionDrag = (idx, prop) => {
		// state.devices[idx][prop] = refs[`${prop}${idx}`].value;
	}
	

	return (
		<Grid rows={getRows()} cols={getCols()}>
			{devices.map((item, index) => (
				<GridItem key={index}
					row={getRow(index)} 
					col={getCol(index)}
					component={'brtns' in item ? Light : Switch}
					options={{item, index, handleActionClick, handleActionScroll, handleActionDrag}}
				/>
			))}
		</Grid>
	);
}