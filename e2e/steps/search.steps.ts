const { When, Then } = require('cucumber');
const { browser, by } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const searchFormPage = require('../pages/searchForm.page.js');
const characterPage = require('../pages/character.page.js');

When('The user performs a valid search by clicking the search button', async () => {
    await searchFormPage.fillSearch('Luke Skywalker');
    await searchFormPage.clickSearch();
});

When('The user performs a valid search by pressing “enter” on the search field', async () => {
    await searchFormPage.fillSearch('Luke Skywalker');
    await searchFormPage.pressEnterInSearchField();
});

Then('A result list is shown', async () => {
    var amountOfNames = await characterPage.countNames()
    var Name = await characterPage.getNameAtIndex(0);
    var Gender = await characterPage.getGenderAtIndex(0);
    var BirthYear = await characterPage.getBirthYearAtIndex(0);
    var EyeColor = await characterPage.getEyeColorAtIndex(0);
    var SkinColor = await characterPage.getSkinColorAtIndex(0);
    await chai.expect(amountOfNames).to.equal(1);
    await chai.expect(Name).to.equal('Luke Skywalker');
    await chai.expect(Gender).to.equal('male');
    await chai.expect(BirthYear).to.equal('19BBY');
    await chai.expect(EyeColor).to.equal('blue');
    await chai.expect(SkinColor).to.equal('fair');
});

