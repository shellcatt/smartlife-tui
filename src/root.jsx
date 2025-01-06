import React, { useEffect, useContext, useState, useRef } from 'react'
import blessed from 'blessed'
import { render } from 'react-blessed';

import { DeviceProvider } from './contexts/DeviceContext';
// import { DeviceProvider } from './contexts/MockDeviceContext';
import { DeviceManager } from './components/deviceManager';

const program = blessed.program()
program.enableMouse();
program.key('q', properExit);


const App = (props) => {
	const { screen } = props;
  	const refContainer = useRef('first');
  
	useEffect(async () => {
	
	}, []);

	return (
        <box
            ref={refContainer}
            label="Devices"
            border={{ type: 'line' }}
            style={{ border: { fg: 'cyan' } }}
            keys={true}
            vi={true}
            mouse={true}
            scrollable={true}
            alwaysScroll={true}
            scrollbar={{ ch: ' ', track: { bg: 'yellow' }, style: { inverse: true } }}
            width="90%"
            height="100%"
            top="center"
            left="center"
        >
			
			<DeviceProvider screen={screen}>
				<DeviceManager screen={screen} />
			</DeviceProvider>
        </box>
    )
};


const screen = blessed.screen({
    // autoPadding: true,
    resizeTimeout: 150,
    smartCSR: true,
    title: 'Smart Life TUI',
    fullUnicode: true,
    transparent: true,

    // mouse: true,
})
  
let focused = screen.el;


screen.on('keypress', function(ch, key) {
  if (key.name === 'tab') {
    // console.log('eto go')
    return  key.shift
      ? screen.focusPrevious()
      : screen.focusNext();
  }
  if (['escape', 'q', 'C-c'].includes(key.name)) {
    properExit();
  }
});

screen.on('element focus', function(cur, old) {
  if (old.border) old.style.border.fg = 'black';
  if (cur.border) cur.style.border.fg = 'blue';
  // Skip disabled elements
  if (!['line'].includes(cur.border.type)) {
	if (cur.index > old.index)
		screen.focusNext();
	else
		screen.focusPrevious();
  }
  focused = cur;
  screen.render();
});

screen.on('event', function(event, el) {
  var type = (el && el.type) || Object.prototype.toString.call(el).slice(8, -1);
  screen.program.log('emit("%s", {%s})', event, type);
});

function debug(data) {
	screen.destroy()
	console.dir(data, {depth: null})
	properExit()
}

function properExit() {
	program.clear();
	program.disableMouse();
	program.showCursor();
	program.normalBuffer();
	// console.log('screne cols', screen.cols)
	process.exit(0);
}

render(<App screen={screen}/>, screen)


