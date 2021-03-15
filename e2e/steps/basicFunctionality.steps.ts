const { Given, Then } = require('cucumber');
const { browser, by } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const appComponentPage = require('../pages/appComponent.page.js');
const searchFormPage = require('../pages/searchForm.page.js');

Given('The app is opened', async () => {
    await browser.get('http://localhost:4200/');
});

Then('The search page is shown', async () => {
    // check if all elements are present on page
    await chai.expect(appComponentPage.getTitle()).to.eventually.equal('The Star Wars Search');
    await chai.expect(searchFormPage.locator.radioButtonPeople.isDisplayed()).to.eventually.be.true;
    await chai.expect(searchFormPage.locator.radioButtonPlanets.isDisplayed()).to.eventually.be.true;
    await chai.expect(searchFormPage.locator.fieldSearch.isDisplayed()).to.eventually.be.true;
    await chai.expect(searchFormPage.locator.buttonSubmit.isDisplayed()).to.eventually.be.true;
});

