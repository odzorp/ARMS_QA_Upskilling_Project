# Allure with Cypress Setup Guide

## Step 1: Install Required Packages
Run the following command to install the necessary packages:

```bash
npm install -D @shelex/cypress-allure-plugin allure-commandline


```bash
npm install -D @shelex/cypress-allure-plugin allure-commandline
```bash


 Step 2: Configure Allure Plugin
Add the following configuration to your cypress.config.js file:

```bash
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    };
```bash

Step 3: Import the Allure Plugin
In your e2e.js file, add the following line to import the Allure plugin:

```bash
import '@shelex/cypress-allure-plugin';
```bash	

Step 4: Add Scripts to package.json
Add these scripts to your package.json:

```bash	
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "browser:chrome": "npx cypress run --browser=chrome --headed --spec cypress/e2e/SauceDemo.cy.js --reporter mocha-allure-reporter",
  "report:allure": "allure generate \"allure-results\" --clean -o \"allure-report\" && allure open \"allure-report\""}

```bash

Step 5: Generate Allure Report
Run the following command to generate the Allure report:
```bash
npm run report:allure
```bash

