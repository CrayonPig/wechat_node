const path = require('path');

import json from 'rollup-plugin-json';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
const { eslint } = require('rollup-plugin-eslint');
import babel from 'rollup-plugin-babel';

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};

process.env.NODE_ENV = 'production'; // 设置环境变量为生产

export default {
  input: 'src/main.js',
  output: {
    file: 'build/index.js',
    format: 'cjs',
    exports: 'auto'
  },
  plugins: [
    json(),
    commonjs(),
    terser(),
    eslint({
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};