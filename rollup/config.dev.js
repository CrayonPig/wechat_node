const path = require('path');
import json from 'rollup-plugin-json';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
const { eslint } = require('rollup-plugin-eslint');

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};
process.env.NODE_ENV = 'development'; // 设置环境变量为开发模式

export default {
  input: 'src/main.js',
  output: {
    file: 'build/bundle.js',
    format: 'cjs',
    exports: 'auto'
  },
  watch: {
    exclude: 'node_modules/**'
  },
  plugins: [
    json(),
    commonjs(),
    eslint({
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    babel({
      exclude: 'node_modules/**'
    })
    // 本地服务器
    // serve({
    //   open: true, // 自动打开页面
    //   port: 3000,
    //   openPage: '/public/index.html', // 打开的页面
    //   contentBase: ''
    // }),
    // livereload(resolveFile('dist'))
  ]
};