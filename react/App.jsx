import React, { Component } from 'react'
import blessed from 'blessed'
import { Grid, Table, Donut, Bar, Gauge } from 'react-blessed-contrib';
import { render } from 'react-blessed';

import{ throttle } from 'lodash';
import { darkenRgb, prc2rgbarr, rgbarr2hex } from './utils/colors';

const program = blessed.program()
program.enableMouse();

function properExit(ch, key) {
	program.clear();
	program.disableMouse();
	program.showCursor();
	program.normalBuffer();
	console.log('screne ocls', screen.cols)
	process.exit(0);
}
program.key('q', properExit);

const actionTitle = (s) => '⏻ ' + (s ? 'On' : 'Off');

class App extends Component {
  constructor() {
    super();
    this.state = {
	  devices: [
        { id: 1, text: "Row 1", action: actionTitle(0), onoff: 1 },
        { id: 2, text: "Row 2", action: actionTitle(0), onoff: 0 },
        { id: 3, text: "Row 3", action: actionTitle(0), onoff: 1 },

		// { id: 1, text: "Row 1", action: actionTitle(0), onoff: 1, brtns: 50, tempr: 50, colorPct: 0, color: prc2rgbarr(0), colorHex: rgbarr2hex(prc2rgbarr(0)) },
        // { id: 2, text: "Row 2", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 0, color: prc2rgbarr(0), colorHex: rgbarr2hex(prc2rgbarr(0)) },
        // { id: 3, text: "Row 3", action: actionTitle(0), onoff: 1, brtns: 50, tempr: 50, colorPct: 25, color: prc2rgbarr(25), colorHex: rgbarr2hex(prc2rgbarr(25)) },
        { id: 4, text: "Row 4", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 25, color: prc2rgbarr(25), colorHex: rgbarr2hex(prc2rgbarr(25)) },
        { id: 5, text: "Row 5", action: actionTitle(0), onoff: 1, brtns: 50, tempr: 50, colorPct: 50, color: prc2rgbarr(50), colorHex: rgbarr2hex(prc2rgbarr(50)) },
        { id: 6, text: "Row 6", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 50, color: prc2rgbarr(50), colorHex: rgbarr2hex(prc2rgbarr(50)) },
        { id: 7, text: "Row 7", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 75, color: prc2rgbarr(75), colorHex: rgbarr2hex(prc2rgbarr(75)) },
        // { id: 8, text: "Row 8", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 75, color: prc2rgbarr(75), colorHex: rgbarr2hex(prc2rgbarr(75)) },
        // { id: 9, text: "Row 9", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 99, color: prc2rgbarr(99), colorHex: rgbarr2hex(prc2rgbarr(99)) },
        // { id: 10, text: "Row 10", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 99, color: prc2rgbarr(99), colorHex: rgbarr2hex(prc2rgbarr(99)) },
      ],
	  itemsPerRow: 3
    }
    this.rowHeight = 1;
	this.handleResize = throttle(this.handleResize,150).bind(this);
  }

  handleResize() {
    const { screen } = this.props;
	if (screen.cols > 200 && screen.cols <= 320) {
		this.state.itemsPerRow = 4
	} else if (screen.cols > 120 && screen.cols <= 200) {
		this.state.itemsPerRow = 3
	} else if (screen.cols > 80 && screen.cols <= 120) {
		this.state.itemsPerRow = 2
	} else {
		this.state.itemsPerRow = 1
	}
	this.setState(this.state);
  }

  handleActionClick(idx, anykey = true) {
	if (typeof anykey == 'string' && !['enter', 'space'].includes(anykey)) 
		return;
    const devices = [...this.state.devices];
    devices[idx].onoff = !devices[idx].onoff;
    devices[idx].action = actionTitle(devices[idx].onoff)
    this.setState({ devices });
	screen.render();
  }

  handleActionScroll(idx, prop, dirOrKey) {
	if (typeof dirOrKey == 'string') {
		if (!['up', 'down'].includes(dirOrKey)) 
			return;
		else
			dirOrKey = (dirOrKey == 'up' ? true : false)
	}

	let inc = dirOrKey ? +1 : -1;
	const devices = [...this.state.devices];
	let val = (this.state.devices[idx][prop] + inc) % 100; 
	val = val > 99 ? 0 : val < 0 ? 99 : val;
	this.state.devices[idx][prop] = val;

	if (prop == 'colorPct') {
		this.state.devices[idx][prop] = val;
		// log(this.state.devices[idx][prop])
		this.state.devices[idx]['color'] = prc2rgbarr(val);
		this.state.devices[idx]['colorHex'] = rgbarr2hex(prc2rgbarr(val));
	}
	this.setState({ devices });
  }

  handleActionDrag(idx, prop) {
	this.state.devices[idx][prop] = this.refs[`${prop}${idx}`].value;
  }

  componentDidMount() {
	const { screen } = this.props;
	screen.on('resize', this.handleResize);

    // Focus on the first box
    this.refs.first.focus();
    // this.refs[`onoff${0}`].focus();
  }

  getRows() {
	let len = this.state.devices.length, 
		cols = this.state.itemsPerRow;
	return Math.max(1, Math.floor(len / cols) + (len > 3 ? (len % cols ? 1 : 0) : 0))
  }
  getCols() {
	return this.state.itemsPerRow
  }
  getRow(index) {
	return Math.floor(index / this.state.itemsPerRow)
  }
  getCol(index) {
	return index % this.state.itemsPerRow
  }
  shouldDrawBorders() {
	return ( this.props.screen.cols > 150 );
  }

  renderBox(item,index) {
	if ('brtns' in item) {
		return this.renderLight(item,index);
	} else {
		return this.renderSwitch(item,index);
	}
  }

  renderLight(item, index) {
	return (
		<box
			label={item.text}
			row={this.getRow(index)}
			col={this.getCol(index)}
			key={item.id}
			// top={index * this.rowHeight} // Adjust spacing between boxes
			top="center"
			left="2"
			width="100%"
			// height={this.rowHeight} // Fixed height for each box
			height="100%"
			align="center"
			valign="middle"
			// border={{ type: 'line' }}
			style={{ border: { fg: item.onoff ? 'green' : 'black' }, focus: { bg: "red" } }}
		>
			<progressbar 
				label="𖤓 Brightness"
				ref={`brtns${index}`}
				top={0}
				left={0}
				width="70%"
				height="30%"
				filled={item.brtns} 
				value={item.brtns} 
				ch="█"
				style={{
					fg: 0 && item.onoff ? 'green' : 'black',
					bg: 'default',
					bar: {
						fg: 0 && item.onoff ? "lightgreen" : 'grey',
						bg: 'default',
					},
					// focus: { fg: 'black', bar: { fg: 'lightgrey' } },
					// hover: { fg: 'black', bar: { fg: 'lightgrey' } },
				}}
				padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
				border={ this.shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
				keys={true}
				mouse={true}
				inputOnFocus={true}
				clickable={true}
				input={true}
				keyable={true}
				// focused={true}
				onWheelup={() => this.handleActionScroll(index, 'brtns', true)}
				onWheeldown={() => this.handleActionScroll(index, 'brtns', false)}
				onMouseup={() => this.handleActionDrag(index,'brtns')}
			></progressbar>
			<button
				label="State"
				ref={`onoff${index}`}
				top="center"
				valign="middle"
				align="center"
				height="30%"
				style={{
					bg: item.onoff ? item.color : darkenRgb(item.color, 0.7),
					focus: { 
						fg: item.onoff ? 'red' : 'red',
					// 	bg: item.onoff ? 'default' : 'default', // [10,10,10] : [40,40,40], 
					},
					// hover: { 
					// 	bg:  [40,40,40] 
					// },
				}}
				border={ this.shouldDrawBorders() ? { type: 'line', ch: '.' , fg: 'black' } : {}}
				padding={{ top: this.shouldDrawBorders() ? 1 : 0, left: 5, right: 0, bottom: 0 }}
				mouse={true}
				keys={true}
				inputOnFocus={true}
				clickable={true}
				input={true}
				keyable={true}
				onMouseup={() => this.handleActionClick(index, true)}
				onKeypress={(ch, key) => this.handleActionClick(index, key.name)}
				// label="label"
			>
				{item.action}
			</button>
			<progressbar 
				label="🌡 Tempetature"
				ref={`tempr${index}`}
				bottom={0}
				left={0}
				width="70%"
				height="30%"
				filled={item.tempr}
				value={item.tempr}
				ch="█"
				style={{
					fg: 0 && item.onoff ? 'blue' : 'black',
					bg: 'black',
					bar: {
						fg: 0 && item.onoff ? "cyan" : [40,40,40],
						bg: 'lightgreen',
					},
				}}
				border={ this.shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
				padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
				keys={true}
				mouse={true}
				inputOnFocus={true}
				clickable={true}
				input={true}
				keyable={true}
				// focused={true}
				onWheelup={() => this.handleActionScroll(index, 'tempr', true)}
				onWheeldown={() => this.handleActionScroll(index, 'tempr', false)}
				onMousedown={() => this.handleActionDrag(index,'tempr')}
			></progressbar>
			
			<Donut 
				label="Color"
				ref={`color${index}`}
				right={0}
				width="30%"
				height="95%"
				{...{
					radius: 9, 
					arcWidth: 0,
					yPadding: 0,
					data: [{
					percent: parseFloat(item.colorPct / 100).toFixed(2), 
					label: item.colorHex, 
					color: item.onoff ? item.color : [30,30,30] 
					}]
				}}
				border={ this.shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
				style={{
					bg: [10,10,10], 
					// focus: { bg: [40,40,40] },
					// hover: { bg: [40,40,40] },
				}}
				padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
				mouse={true}
				keys={true}
				vi={true}
				inputOnFocus={true}
				clickable={true}
				input={true}
				keyable={true}
				onWheelup={() => this.handleActionScroll(index, 'colorPct', true)}
				onWheeldown={() => this.handleActionScroll(index, 'colorPct', false)}
				onKeypress={(ch, key) => this.handleActionScroll(index, 'colorPct', key.name)}
				onMouseup={() => this.handleActionClick(index, true)}
			/>
			<element
				width={15}
				height={3}
				right={0}
				bottom={0}
				shrink={true}
				transparent={true}
				draggable={true}
			>
				<button
					mouse
					width="30%"
					// height={2}
					// right={0}
					left={0}
					// bottom={0}
					// shrink={true}
					border={ this.shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
					// content="🗱"
				>
					🗱
				</button>
				<button
					mouse
					width="30%"
					// height={2}
					// right={8}
					right={0}
					// bottom={0}
					shrink={true}
					border={ this.shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
					// content="🕶"
				>
					🕶
				</button>
			</element>

		</box>
	)
  }
  
  renderSwitch(item, index) {
	return (
		<box
			label={item.text}
			row={this.getRow(index)}
			col={this.getCol(index)}
			key={item.id}
			// top={index * this.rowHeight} // Adjust spacing between boxes
			top="center"
			left="2"
			width="100%"
			// height={this.rowHeight} // Fixed height for each box
			height="100%"
			align="center"
			valign="middle"
			// border={{ type: 'line' }}
			style={{ border: { fg: item.onoff ? 'green' : 'black' }, focus: { bg: "red" } }}
		>
			<button
				ref={`onoff${index}`}
				top="center"
				valign="middle"
				align="center"
				height="80%"
				style={{
					bg: item.onoff ? 'blue':'grey',
					focus: { 
						fg: item.onoff ? 'red' : 'red',
					// 	bg: item.onoff ? 'default' : 'default', // [10,10,10] : [40,40,40], 
					},
					// hover: { 
					// 	bg:  [40,40,40] 
					// },
				}}
				border={ this.shouldDrawBorders() ? { type: 'line', ch: '.' , fg: 'black' } : {}}
				padding={{ top: this.shouldDrawBorders() ? 3 : 0, left: 5, right: 0, bottom: 0 }}
				mouse={true}
				keys={true}
				inputOnFocus={true}
				clickable={true}
				input={true}
				keyable={true}
				onMouseup={() => this.handleActionClick(index, true)}
				onKeypress={(ch, key) => this.handleActionClick(index, key.name)}
				// label="label"
			>
				{item.action}
			</button>
		</box>
	)
  }

  render() {
    return (
        <box
            ref="first"
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
          <Grid rows={this.getRows()} cols={this.getCols()}>
            { this.state.devices.map((item, index) => (
				this.renderBox(item, index) 
            )) }
          </Grid>
        </box>
    )
  }
}

const screen = blessed.screen({
    // autoPadding: true,
    resizeTimeout: 150,
    smartCSR: true,
    title: 'SmartLife',
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
	screen.destroy()
	// console.log('screne ocls', screen.cols)
    return process.exit(0);
  }
});

screen.on('element focus', function(cur, old) {
  if (old.border) old.style.border.fg = 'black';
  if (cur.border) cur.style.border.fg = 'green';
  focused = cur;
  screen.render();
});

screen.on('event', function(event, el) {
  var type = (el && el.type) || Object.prototype.toString.call(el).slice(8, -1);
  screen.program.log('emit("%s", {%s})', event, type);
});


render(<App screen={screen}/>, screen)


