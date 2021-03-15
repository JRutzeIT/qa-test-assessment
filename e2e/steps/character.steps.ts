const { Given, When, Then } = require('cucumber');
const { browser, by } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const appComponentPage = require('../pages/appComponent.page.js');
const searchFormPage = require('../pages/searchForm.page.js');
const characterPage = require('../pages/character.page.js');


Given('The app is opened and the search people option is selected', {timeout: 2 * 10000}, async () => {
    await browser.get('http://localhost:4200/');
    await searchFormPage.clickPeople();
});

When('The user searches for a valid character', async () => {
    await searchFormPage.fillSearch('Luke Skywalker');
    await searchFormPage.clickSearch();
});

Then('The results should show the characters “Name”, “Gender”, “Birth year”, “Eye color” and “Skin color”', async () => {
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

When('The user searches for a non-valid character', async () => {
    await searchFormPage.fillSearch('Luke Skywalkert');
    await searchFormPage.clickSearch();
});

Then('The results for characters should show “Not found”', async () => {
    var result = await appComponentPage.getNoSearchResults()
    await chai.expect(result).to.equal('Not found.');
});

Given('Previous search results for a character are present', {timeout: 2 * 10000}, async () => {
    await browser.get('http://localhost:4200/');
    await searchFormPage.clickPeople();
    await searchFormPage.fillSearch('Luke Skywalker');
    await searchFormPage.clickSearch();
});

When('The user performs an empty search for people', async () => {
    await searchFormPage.clearSearch();
    await searchFormPage.clickSearch();
});

Then('An empty people result list is shown', async () => {
    await chai.expect(characterPage.character.NameAtIndex(0).isPresent()).to.become(false);
    await chai.expect(characterPage.character.GenderAtIndex(0).isPresent()).to.become(false);
    await chai.expect(characterPage.character.BirthYearAtIndex(0).isPresent()).to.become(false);
    await chai.expect(characterPage.character.EyeColorAtIndex(0).isPresent()).to.become(false);
    await chai.expect(characterPage.character.SkinColorAtIndex(0).isPresent()).to.become(false);
});

Given('A search for a valid planet was executed', {timeout: 2 * 10000}, async () => {
    await browser.get('http://localhost:4200/');
    await searchFormPage.clickPlanets();
    await searchFormPage.fillSearch('Corellia');
    await searchFormPage.clickSearch();
});

When('Switching to people and searching for the same planet name which does not exist as person', async () => {
    await searchFormPage.clickPeople();
    await searchFormPage.clickSearch();
});

When('The user searches using a term that partial matches multiple people', async () => {
    await searchFormPage.fillSearch('Darth');
    await searchFormPage.clickSearch();
});

Then('A result list is shown of partial matching people', async () => {
    var amountOfNames = await characterPage.countNames()
    await chai.expect(amountOfNames).to.equal(2);


    var NameAtIndex0 = await characterPage.getNameAtIndex(0);
    var GenderAtIndex0 = await characterPage.getGenderAtIndex(0);
    var BirthYearAtIndex0 = await characterPage.getBirthYearAtIndex(0);
    var EyeColorAtIndex0 = await characterPage.getEyeColorAtIndex(0);
    var SkinColorAtIndex0 = await characterPage.getSkinColorAtIndex(0);
    await chai.expect(NameAtIndex0).to.equal('Darth Vader');
    await chai.expect(GenderAtIndex0).to.equal('male');
    await chai.expect(BirthYearAtIndex0).to.equal('41.9BBY');
    await chai.expect(EyeColorAtIndex0).to.equal('yellow');
    await chai.expect(SkinColorAtIndex0).to.equal('white');

    var NameAtIndex1 = await characterPage.getNameAtIndex(1);
    var GenderAtIndex1 = await characterPage.getGenderAtIndex(1);
    var BirthYearAtIndex1 = await characterPage.getBirthYearAtIndex(1);
    var EyeColorAtIndex1 = await characterPage.getEyeColorAtIndex(1);
    var SkinColorAtIndex1 = await characterPage.getSkinColorAtIndex(1);
    await chai.expect(NameAtIndex1).to.equal('Darth Maul');
    await chai.expect(GenderAtIndex1).to.equal('male');
    await chai.expect(BirthYearAtIndex1).to.equal('54BBY');
    await chai.expect(EyeColorAtIndex1).to.equal('yellow');
    await chai.expect(SkinColorAtIndex1).to.equal('red');
});