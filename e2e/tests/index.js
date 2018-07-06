const moment = require('moment');
const path = require('path');


module.exports = {
  after(browser) {
    browser
      .end();
  },
  'Opens Event Manager App': (browser) => {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body')
      .verify.title('Event Manager App')
      .verify.elementPresent('nav')
      .saveScreenshot('e2e/screenshots/homepage.png');
  },
  'Register New User': (browser) => {
    browser
      .url(`${browser.launch_url}/register`)
      .waitForElementVisible('body')
      .assert.containsText('body', 'Register')
      .verify.attributeEquals('form button', 'disabled', 'true')
      .setValue('input[name=firstname]', 'E2e@daisy.io')
      .setValue('input[name=lastname]', 'User@daisy.io')
      .setValue('input[name=email]', 'e2e_user@daisy.io')
      .setValue('input[name=password]', 'daisy')
      .setValue('input[name=passwordconfirm]', 'daisy1')
      .getAttribute(
        'form button', 'disabled',
        (result) => {
          browser.assert.equal(result.value, null);
        }
      )
      .click('form button')
      .waitForElementVisible('form button:enabled')
      .waitForElementVisible('.error', 8000)
      .pause(3000)
      .clearValue('input[name=password]')
      .setValue('input[name=password]', 'daisy1')
      .click('form button')
      .pause(2000)
      .assert.containsText('.notification-message', 'Registration successful. CHECk EMAIL TO VERIFY')
      .pause(2000)
      .saveScreenshot('e2e/screenshots/register-user.png');
  },
  'Login Unverified User': (browser) => {
    browser
      .url(`${browser.launch_url}/login`)
      .waitForElementVisible('body')
      .assert.containsText('body', 'Login')
      .verify.attributeEquals('form button', 'disabled', 'true')
      .setValue('input[name=email]', 'e2e_user@daisy.io')
      .setValue('input[name=password]', 'daisy1')
      .getAttribute(
        'form button', 'disabled',
        (result) => {
          browser.assert.equal(result.value, null);
        }
      )
      .click('form button')
      .pause(2000)
      .assert.containsText('.alert.alert-danger', 'Account unverified')
      .assert.containsText('.notification-message', 'Verify account now')
      .pause(2000)
      .saveScreenshot('e2e/screenshots/login-user.png');
  },
  'Login Admin User': (browser) => {
    browser
      .url(`${browser.launch_url}/login`)
      .waitForElementVisible('body')
      .assert.containsText('body', 'Login')
      .verify.attributeEquals('form button', 'disabled', 'true')
      .setValue('input[name=email]', 'admin@daisy.io')
      .setValue('input[name=password]', 'daisy')
      .getAttribute(
        'form button', 'disabled',
        (result) => {
          browser.assert.equal(result.value, null);
        }
      )
      .click('form button')
      .waitForElementVisible('form button:enabled')
      .waitForElementVisible('.alert.alert-danger', 8000)
      .assert.containsText('.alert.alert-danger', 'Invalid Username or Password')
      .pause(2000)
      .clearValue('input[name=password]')
      .setValue('input[name=password]', 'daisy1')
      .click('form button')
      .pause(2000)
      .assert.urlEquals(`${browser.launch_url}/dashboard`)
      .saveScreenshot('e2e/screenshots/login-admin.png');
  },
  'Create center': (browser) => {
    browser
      .url(`${browser.launch_url}/dashboard`)
      .waitForElementVisible('body')
      .waitForElementVisible('#newCenter:enabled')
      .click('#newCenter:enabled')
      .waitForElementVisible('#centerModalForm')
      .setValue('input[name=location]', 'Ikorodu road')
      .click('#react-select-2--value')
      .waitForElementVisible('#react-select-2--list')
      .click('#react-select-2--option-24')
      .pause(3000)
      .setValue('input[type=file]', path.resolve(`${__dirname}/../assets/bg.jpg`))
      .pause(2000)
      .click('#btnAcceptCenter')
      .pause(5000)
      .setValue('input[name=name]', 'EPIC Tower')
      .pause(2000)
      .click('#btnAcceptCenter')
      .pause(5000)
      .saveScreenshot('e2e/screenshots/create-center.png');
  },
  'Create event': (browser) => {
    browser
      .url(`${browser.launch_url}/centers`)
      .waitForElementVisible('body')
      .waitForElementVisible('.card-deck')
      .waitForElementVisible('.card-deck .card')
      .pause(2000)
      .click('.card-deck .card .card-body button')
      .pause(3000)
      .waitForElementVisible('#btnAddEvent:enabled')
      .click('#btnAddEvent:enabled')
      .waitForElementVisible('#eventModalForm')
      .setValue('input[name=startDate]', moment().add('months', 1).format('DD-MM-YYYYYY, hh:mmA'))
      .setValue('input[name=endDate]', moment().add('months', 2).format('DD-MM-YYYYYY, hh:mmA'))
      .pause(2000)
      .click('#btnAcceptEvent')
      .pause(5000)
      .setValue('input[name=name]', 'EPIC bash')
      .pause(2000)
      .click('#btnAcceptEvent')
      .pause(5000)
      .saveScreenshot('e2e/screenshots/create-event.png');
  },
  'Update event': (browser) => {
    browser
      .url(`${browser.launch_url}/dashboard`)
      .waitForElementVisible('body')
      .waitForElementVisible('.list-group-item')
      .pause(2000)
      .waitForElementVisible('.list-group-item #btnEditEvent')
      .click('.list-group-item #btnEditEvent')
      .pause(3000)
      .waitForElementVisible('#eventModalForm')
      .pause(5000)
      .clearValue('input[name=name]')
      .setValue('input[name=name]', 'EPIC party')
      .clearValue('input[name=startDate]')
      .setValue('input[name=startDate]', moment().add('months', 1).format('DD-MM-YYYYYY, hh:mmA'))
      .pause(3000)
      .clearValue('input[name=endDate]')
      .setValue('input[name=endDate]', moment().add('months', 2).format('DD-MM-YYYYYY, hh:mmA'))
      .pause(2000)
      .click('#btnAcceptEvent')
      .pause(5000)
      .saveScreenshot('e2e/screenshots/update-event.png');
  },
  'Delete event': (browser) => {
    browser
      .url(`${browser.launch_url}/dashboard`)
      .waitForElementVisible('body')
      .waitForElementVisible('.list-group-item')
      .pause(2000)
      .click('.list-group-item #btnDelEvent')
      .waitForElementVisible('#confirmModal')
      .pause(2000)
      .click('#confirmModal #btnReject')
      .pause(1000)
      .waitForElementVisible('.list-group-item')
      .click('.list-group-item #btnDelEvent')
      .waitForElementVisible('#confirmModal')
      .pause(5000)
      .click('#confirmModal #btnAccept')
      .pause(5000)
      .saveScreenshot('e2e/screenshots/delete-event.png');
  },
  'Update center': (browser) => {
    browser
      .url(`${browser.launch_url}/centers`)
      .waitForElementVisible('body')
      .waitForElementVisible('.card-deck')
      .waitForElementVisible('.card-deck .card')
      .pause(2000)
      .click('.card-deck .card .card-body button')
      .assert.containsText('body', 'Full Description')
      .pause(3000)
      .click('#btnEditCenter')
      .waitForElementVisible('#centerModalForm')
      .clearValue('input[name=name]')
      .setValue('input[name=name]', 'EPIC Tower 2.0')
      .clearValue('input[name=location]')
      .setValue('input[name=location]', 'Ikorodu By-pass')
      .click('#react-select-2--value')
      .waitForElementVisible('#react-select-2--list')
      .click('#react-select-2--option-20')
      .pause(1000)
      .waitForElementVisible('#btnAcceptCenter', 10000)
      .click('#btnAcceptCenter')
      .pause(5000)
      .saveScreenshot('e2e/screenshots/update-center.png');
  },
  'Delete center': (browser) => {
    browser
      .url(`${browser.launch_url}/centers`)
      .waitForElementVisible('body')
      .waitForElementVisible('.card-deck')
      .waitForElementVisible('.card-deck .card')
      .click('.card-deck .card .card-body button')
      .assert.containsText('body', 'Full Description')
      .click('#btnDelCenter')
      .waitForElementVisible('#confirmModal')
      .pause(5000)
      .click('#confirmModal #btnReject')
      .pause(3000)
      .click('#btnDelCenter')
      .waitForElementVisible('#confirmModal')
      .pause(5000)
      .click('#confirmModal #btnAccept')
      .pause(5000)
      .assert.urlContains('centers')
      .saveScreenshot('e2e/screenshots/delete-center.png');
  },
  'Log out Admin User': (browser) => {
    browser
      .waitForElementVisible('nav')
      .waitForElementVisible('nav .navbar-nav li:last-child a')
      .click('nav .navbar-nav li:last-child a')
      .pause(5000)
      .assert.urlEquals(`${browser.launch_url}/login`)
      .saveScreenshot('e2e/screenshots/logout.png');
  }
};
