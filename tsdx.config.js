const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-commonjs');

module.exports = {
  rollup(config) {
    //

    console.log('---------------');
    if (config.output.format === 'umd') {
      // config.external = id => false;
      // delete config.external;
    }

    // config.plugins = config.plugins.filter(el => !el.name === 'commonjs');

    config.plugins.push(
      nodeResolve({ browser: true, preferBuiltins: true }),
      commonjs({
        include: 'node_modules/**',
        react: ['Component', 'createElement', 'createContext', 'useState'],
        'react-dom': ['render'],
        'three/examples/jsm/controls/OrbitControls': ['OrbitControls'],
      })
    );

    console.log('---------------');
    console.log('>>>>', config.external.toString());
    if (false)
      config.plugins.forEach(el => {
        if (el.name === 'commonjs') {
          console.log('*********');
          console.log(el);
          console.log(el.buildStart.toString());
          console.log(el.resolveId.toString());
          console.log(el.load.toString());
          console.log(el.transform.toString());
        }
      });
    //

    return config;
  },
};
