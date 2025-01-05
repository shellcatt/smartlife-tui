import { actionTitle } from './actions'
import { darkenRgb, prc2rgbarr, rgbarr2hex } from './colors';

export const mockDevices_UI = [
	{ id: 1, text: "Row 1", action: actionTitle(0), onoff: false },
	{ id: 3, text: "Row 2", action: actionTitle(null), onoff: null },
	{ id: 2, text: "Row 3", action: actionTitle(1), onoff: true },

	// { id: 1, text: "Row 1", action: actionTitle(0), onoff: 1, brtns: 50, tempr: 50, colorPct: 0, color: prc2rgbarr(0), colorHex: rgbarr2hex(prc2rgbarr(0)) },
	// { id: 2, text: "Row 2", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 0, color: prc2rgbarr(0), colorHex: rgbarr2hex(prc2rgbarr(0)) },
	// { id: 3, text: "Row 3", action: actionTitle(0), onoff: 1, brtns: 50, tempr: 50, colorPct: 25, color: prc2rgbarr(25), colorHex: rgbarr2hex(prc2rgbarr(25)) },
	{ id: 4, text: "Row 4", action: actionTitle(null), onoff: null, brtns: 50, tempr: 50, colorPct: 25, color: prc2rgbarr(25), colorHex: rgbarr2hex(prc2rgbarr(25)) },
	{ id: 5, text: "Row 5", action: actionTitle(0), onoff: 1, brtns: 50, tempr: 50, colorPct: 50, color: prc2rgbarr(50), colorHex: rgbarr2hex(prc2rgbarr(50)) },
	// { id: 6, text: "Row 6", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 50, color: prc2rgbarr(50), colorHex: rgbarr2hex(prc2rgbarr(50)) },
	// { id: 7, text: "Row 7", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 75, color: prc2rgbarr(75), colorHex: rgbarr2hex(prc2rgbarr(75)) },
	// { id: 8, text: "Row 8", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 75, color: prc2rgbarr(75), colorHex: rgbarr2hex(prc2rgbarr(75)) },
	// { id: 9, text: "Row 9", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 99, color: prc2rgbarr(99), colorHex: rgbarr2hex(prc2rgbarr(99)) },
	// { id: 10, text: "Row 10", action: actionTitle(0), onoff: 0, brtns: 50, tempr: 50, colorPct: 99, color: prc2rgbarr(99), colorHex: rgbarr2hex(prc2rgbarr(99)) },
];
 