// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    browserNoActivityTimeout: 30000,
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-firefox-launcher'),
      require('karma-json-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/ponyracer'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'json-summary' }, { type: 'text-summary' }]
    },
    jsonReporter: {
      stdout: false,
      outputFile: './results/karma-results.json'
    },
    reporters: process.env.CI === 'true' ? ['dots', 'json'] : ['progress', 'json', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: process.env.CI === 'true' ? ['ChromeHeadless'] : ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
