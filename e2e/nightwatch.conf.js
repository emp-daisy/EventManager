/* global module, require */
const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');

module.exports = {
  src_folders: [
    'e2e/tests'// Where you are storing your Nightwatch e2e tests
  ],
  output_folder: 'e2e/reports', // reports (test outcome) output by nightwatch
  selenium: {
    start_process: true, // tells nightwatch to start/stop the selenium process
    server_path: seleniumServer.path,
    host: '127.0.0.1',
    port: 4444, // standard selenium port
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path
    }
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost:3088',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: true, // if you want to keep screenshots
        path: 'e2e/screenshots' // save screenshots here
      },
      globals: {
        waitForConditionTimeout: 5000 // sometimes internet is slow so wait.
      },
      desiredCapabilities: { // use Chrome as the default browser for tests
        browserName: 'chrome',
        chromeOptions: {
          args: ['start-fullscreen']
        },
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        javascriptEnabled: true, // turn off to test progressive enhancement
      }
    }
  }
};
