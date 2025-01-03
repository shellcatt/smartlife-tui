import { Donut } from '../../react-blessed-contrib';
import React, { forwardRef } from 'react';
import { darkenRgb } from '../../utils/colors';

export const Light = forwardRef(({ item, index, handleActionClick, handleActionScroll, handleActionDrag, ...parentProps }, ref) => {
	const shouldDrawBorders = () => true;

	return (
		<box {...parentProps} ref={ref}
			label={item.text}
			style={{ border: { fg: item.onoff ? 'green' : 'black' }, focus: { bg: "red" } }}
		>
			<progressbar 
				label="𖤓 Brightness"
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
					}
				}}
				padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
				border={ shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
				keys={true}
				mouse={true}
				inputOnFocus={true}
				clickable={true}
				input={true}
				keyable={true}
				onWheelup={async () => handleActionScroll(index, 'brtns', true)}
				onWheeldown={async () => handleActionScroll(index, 'brtns', false)}
				onMouseup={() => handleActionDrag(index,'brtns')}
			></progressbar>
			<button
				label="State"
				top="center"
				valign="middle"
				align="center"
				height="30%"
				style={{
					bg: item.onoff ? item.color : darkenRgb(item.color, 0.7),
					focus: { 
						fg: item.onoff ? 'red' : 'white',
					},
				}}
				border={ shouldDrawBorders() ? { type: 'line', ch: '.' , fg: 'black' } : {}}
				padding={{ top: shouldDrawBorders() ? 1 : 0, left: 5, right: 0, bottom: 0 }}
				mouse={true}
				keys={true}
				inputOnFocus={true}
				clickable={true}
				input={true}
				keyable={true}
				onMouseup={async () => handleActionClick(index, true)}
				onKeypress={async (ch, key) => handleActionClick(index, key.name)}
			>
				{item.action}
			</button>
			<progressbar 
				label="🌡 Tempetature"
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
				border={ shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
				padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
				keys={true}
				mouse={true}
				inputOnFocus={true}
				clickable={true}
				input={true}
				keyable={true}
				onWheelup={async () => handleActionScroll(index, 'tempr', true)}
				onWheeldown={async () => handleActionScroll(index, 'tempr', false)}
				onMousedown={async () => handleActionDrag(index,'tempr')}
			></progressbar>
			
			<Donut 
				label="Color"
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
				border={ shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
				style={{
					bg: [10,10,10], 
				}}
				padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
				mouse={true}
				keys={true}
				vi={true}
				inputOnFocus={true}
				clickable={true}
				input={true}
				keyable={true}
				onWheelup={async () => handleActionScroll(index, 'colorPct', true)}
				onWheeldown={async () => handleActionScroll(index, 'colorPct', false)}
				onKeypress={async (ch, key) => handleActionScroll(index, 'colorPct', key.name)}
				onMouseup={async () => handleActionClick(index, true)}
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
					left={0}
					border={ shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
				>
					🗱
				</button>
				<button
					mouse
					width="30%"
					right={0}
					shrink={true}
					border={ shouldDrawBorders() ? { type: 'line', fg: 'black' } : {}}
				>
					🕶
				</button>
			</element>

		</box>
	)
});