module.exports = function(config) {
  config.set({
    plugins: [ 'karma-chrome-launcher', 'karma-mocha', 'karma-mocha-reporter', 'karma-chai', 'karma-browserify', 'source-map-support' ],
    frameworks: [ 'mocha', 'chai', 'browserify' ],
    files: [
      'source/**/*.css', 'test/**/*.js'
    ],
    customContextFile: 'test/context.html',
    customDebugFile: 'test/debug.html',
    preprocessors: { 'test/**/*.js': [ 'browserify' ] },
    client: {
      mocha: { ui: 'tdd' }
    },
    browserify: { debug: true },
    browserNoActivityTimeout: 1800000, // 30 minutes
    reporters: [ 'dots' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [ 'ChromeHeadless' ],
    singleRun: false,
    concurrency: Infinity
  });
};
