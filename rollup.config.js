import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;
const tailwindcss = require('tailwindcss');

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      dev: !production,
      css: (css) => {
        css.write('public/build/bundle.css');
      },
    }),

    postcss({
      extract: true,
      plugins: [
        tailwindcss('./tailwind.config.js'),
        require('autoprefixer'),
        production ? require('cssnano') : '',
      ],
    }),

    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),

    commonjs(),

    !production && serve(),

    !production && livereload('public'),

    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}
