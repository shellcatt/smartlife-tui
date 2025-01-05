import React, { forwardRef } from 'react';

export const Switch = forwardRef(({ item, index, handleActionClick, ...parentProps }, ref) => {
	const shouldDrawBorders = () => true;
	
	return (
		<box {...parentProps} ref={ref}
			label={item.text}
			style={{ border: { fg: item.onoff ? 'green' : 'black' }, focus: { bg: "red" } }}
		>
			<button
				key={`onoff${item.id}`}
				style={{
					bg: item.onoff ? 'blue':'grey',
					focus: { 
						fg: item.onoff ? 'red' : 'white',
					}
				}}
				border={ shouldDrawBorders() ? { type: 'line', ch: '.' , fg: 'black' } : {}}
				padding={{ top: shouldDrawBorders() ? 3 : 0, left: 5, right: 0, bottom: 0 }}
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
		</box>
	)
});