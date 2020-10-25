module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    [
      '@snowpack/plugin-run-script',
      {cmd: 'svelte-check --output human', watch: '$1 --watch', output: 'stream'},
    ],

    [
      "snowpack-plugin-rollup-bundle",
      {
        emitHtmlFiles: false,
        preserveSourceFiles: true,

        // equivalent to inputOptions.input from Rollup
        entrypoints: ["./build/_dist_/index_publish.js"],

        extendConfig: (config) => {
          // https://rollupjs.org/guide/en/#outputoptions-object
          config.outputOptions = { },

          // https://rollupjs.org/guide/en/#inputoptions-object
          config.inputOptions = { }

          return config
        }
      }
    ]
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};
