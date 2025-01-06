import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { actionTitle } from '../utils/actions';

export const DeviceContext = createContext();

import { mockDevices_UI } from '../utils/_mockups'

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);

  useEffect(async () => {
    setDevices(mockDevices_UI);
  }, []); 

  const toggleDeviceState = async (devId) => {
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
