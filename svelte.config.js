const autoPreprocess = require('svelte-preprocess');

module.exports = {
    srcDir: "src",
    outDir: "preProcess",
    copyFileGlob: ["./**/*.js"],
    preprocess: autoPreprocess({
        defaults: {
            script: 'typescript'
        }
    })
}