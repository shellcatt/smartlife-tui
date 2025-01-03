import React, { createContext, useState, useEffect, useContext, useRef } from 'react';

export const DeviceContext = createContext(null);

import { mockDevices_UI } from '../utils/_mockups'

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);


  useEffect(async () => {
	
	setDevices(mockDevices_UI);

  }, []);

  return (
    <DeviceContext.Provider value={{ devices, setDevices }}>
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
