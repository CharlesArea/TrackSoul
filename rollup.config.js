import { terser } from "rollup-plugin-terser";
const version_number = '0.0.9';


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
