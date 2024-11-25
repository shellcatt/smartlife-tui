
export const randomColor = () => [Math.random() * 255,Math.random() * 255, Math.random() * 255];
export const rgbarr2hex = (a) => "#" + (1 << 24 | a[0] << 16 | a[1] << 8 | a[2]).toString(16).slice(1)

export const darkenRgb = (rgb, prc = 0.5) => rgb.map(val => Math.max(0, val - val * prc));

export const prc2rgbarr = (val) => {
	let h = (val / 100) * 360; // Hue range: 0-360
	let s = 1; // Saturation: 100%
	let v = 1; // Value: 100%

	h = h % 360;

	let c = v * s;
	let x = c * (1 - Math.abs((h / 60) % 2 - 1));
	let m = v - c;

	let [r, g, b] = [0, 0, 0];

	if (h >= 0 && h < 60) {
		r = c; g = x; b = 0;
	} else if (h >= 60 && h < 120) {
		r = x; g = c; b = 0;
	} else if (h >= 120 && h < 180) {
		r = 0; g = c; b = x;
	} else if (h >= 180 && h < 240) {
		r = 0; g = x; b = c;
	} else if (h >= 240 && h < 300) {
		r = x; g = 0; b = c;
	} else {
		r = c; g = 0; b = x;
	}

	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return [r, g, b];
}