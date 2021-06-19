import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/esm/index.js',
  output: {
    name: 'DigitalMatrix',
    file: 'dist/umd/digitalmatrix.js',
    format: 'umd',
    globals: {
      'p5': 'p5'
    }
  },
  external: ['p5'],
  plugins: [nodeResolve()]
};