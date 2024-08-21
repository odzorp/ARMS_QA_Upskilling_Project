const { defineConfig } = require("cypress");  
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
//const allureCypress = require('allure-cypress'); 

module.exports = defineConfig({  
  e2e: {  
    setupNodeEvents(on, config) {  
      allureWriter(on, config);
      return config;
    },  
    baseUrl: "https://www.saucedemo.com",  
    testIsolation: false,  
    video: false,  
    screenshotOnRunFailure: true 
  },  
});