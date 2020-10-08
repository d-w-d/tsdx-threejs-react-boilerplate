const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const react = require('react');
const reactDom = require('react-dom');
const typescript = require('rollup-plugin-typescript');
const external = require('rollup-plugin-peer-deps-external');
// const OrbitControls = require('three/examples/jsm/controls/OrbitControls');

console.log(react);

module.exports = {
  rollup(config) {
    console.log('---------------');

    if (config.output.format === 'umd') {
      // Assume everything is to be included
      delete config.external;

      config.plugins = [
        resolve(),
        external({
          includeDependencies: true,
        }),
        typescript({ module: 'CommonJS' }),
        commonjs({
          include: 'node_modules/**',
          transformMixedEsModules: true,
          esmExternals: true,
          namedExports: {
            react: [react, react.useState],
            'react-dom': [reactDom],
            'node_modules/three/examples/jsm/controls/OrbitControls': ['OrbitControls'],
            'node_modules/three/examples/jsm/controls/TrackballControls': [
              'TrackballControls',
            ],
          },
        }),
      ];
    }

    return config;
  },
};
