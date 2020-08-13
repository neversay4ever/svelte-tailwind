module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    mode: 'all',
    content: ['./public/*.html', './src/**/*.svelte'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
