require('@babel/register')({
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
    presets: [
      ['@babel/preset-env', {"modules": "auto"}], 
      ['@babel/preset-react']
    ],
    plugins: [
      // '@babel/plugin-transform-runtime',
      // '@babel/plugin-transform-modules-commonjs',
      "@babel/plugin-proposal-class-properties",
	    "@babel/plugin-proposal-private-methods"
    ],
    "sourceMaps": "inline",
    "retainLines": true
})

const { hijackEffects } = require('stop-runaway-react-effects')
hijackEffects()

require('./src/root')

  