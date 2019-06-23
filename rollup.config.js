import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

const globals = {};

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'packageTemplate',
      exports: 'named',
      globals
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      globals
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [],
  plugins: [
    peerDepsExternal(),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
    filesize()
  ]
};

export default config;
