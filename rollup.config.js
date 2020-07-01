/**
 * @Author: Charles Lo <charlesu>
 * @Date:   2020-06-29 11:17
 * @Email:  Developer.CharlesLo@gmail.com
 * @Project: NotesCLI
 * @Last modified by:   charlesu
 * @Last modified time: 2020-06-29 11:17
 */

import { terser } from "rollup-plugin-terser";
const version_number = '0.0.8';

export default [{
  input: 'src/main.js',
  output: [{
    file: 'dist/'+version_number+'/cjs/tracksoul-'+version_number+'.min'+'.js',
    format: 'cjs'
  },
  {
    file: 'dist/'+version_number+'/js/tracksoul-'+version_number+'.min'+'.js',
    format: 'iife'
  }],
  plugins: [terser()]
},{
  input: 'src/main.js',
  output: [{
    file: 'dist/'+version_number+'/cjs/tracksoul-'+version_number+'.js',
    format: 'cjs'
  },
  {
    file: 'dist/'+version_number+'/js/tracksoul-'+version_number+'.js',
    format: 'iife'
  }]
}]
