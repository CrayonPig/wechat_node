const path = require('path');

import json from 'rollup-plugin-json';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
const { eslint } = require('rollup-plugin-eslint');

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};

process.env.NODE_ENV = 'production'; // 设置环境变量为生产

export default {
  input: 'src/main.js',
  output: {
    file: 'build/weChatNode.min.js',
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
  ]
};