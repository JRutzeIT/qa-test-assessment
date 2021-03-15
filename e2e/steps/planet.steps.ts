const { Given, When, Then } = require('cucumber');
const { browser, by } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));
const appComponentPage = require('../pages/appComponent.page.js');
const searchFormPage = require('../pages/searchForm.page.js');
const planetPage = require('../pages/planet.page.js');


Given('The app is opened and the search planet option is selected', {timeout: 2 * 10000}, async () => {
    await browser.get('http://localhost:4200/');
    await searchFormPage.clickPlanets();
});

When('The user searches for a valid planet', async () => {
    await searchFormPage.fillSearch('Alderaan');
    await searchFormPage.clickSearch();
});

Then('The results should show the planets “Population”, “Climate” and “Gravity”', async () => {
    var amountOfNames = await planetPage.countNames()
    var Name = await planetPage.getNameAtIndex(0);
    var Population = await planetPage.getPopulationAtIndex(0);
    var Climate = await planetPage.getClimateAtIndex(0);
    var Gravity = await planetPage.getGravityAtIndex(0);
    await chai.expect(amountOfNames).to.equal(1);
    await chai.expect(Name).to.equal('Alderaan');
    await chai.expect(Population).to.equal('2000000000');
    await chai.expect(Climate).to.equal('temperate');
    await chai.expect(Gravity).to.equal('1 standard');

});

When('The user searches for a non-valid planet', async () => {
    await searchFormPage.fillSearch('Alderaant');
    await searchFormPage.clickSearch();
});

Then('The results for planets should show “Not found”', async () => {
    var result = await appComponentPage.getNoSearchResults()
    await chai.expect(result).to.equal('Not found.');
});

Given('Previous search results for a planet are present', async () => {
    await browser.get('http://localhost:4200/');
    await searchFormPage.clickPlanets();
    await searchFormPage.fillSearch('Alderaan');
    await searchFormPage.clickSearch();
});

When('The user performs an empty search for a planet', async () => {
    await searchFormPage.clearSearch();
    await searchFormPage.clickSearch();
});

Then('An empty planet result list is shown', async () => {
    await chai.expect(planetPage.planet.NameAtIndex(0).isPresent()).to.become(false);
    await chai.expect(planetPage.planet.PopulationAtIndex(0).isPresent()).to.become(false);
    await chai.expect(planetPage.planet.ClimateAtIndex(0).isPresent()).to.become(false);
    await chai.expect(planetPage.planet.GravityAtIndex(0).isPresent()).to.become(false);
});

Given('A search for a valid people was executed', {timeout: 2 * 10000}, async () => {
    await browser.get('http://localhost:4200/');
    await searchFormPage.clickPeople();
    await searchFormPage.fillSearch('Luke Skywalker');
    await searchFormPage.clickSearch();
});

When('Switching to planet and searching for the same people name which does not exist as person', async () => {
    await searchFormPage.clickPlanets();
    await searchFormPage.clickSearch();
});

When('The user searches using a term that partial matches multiple planets', async () => {
    await searchFormPage.fillSearch('loth');
    await searchFormPage.clickSearch();
});

Then('A result list is shown of partial matching planets', async () => {
    var amountOfNames = await planetPage.countNames()
    await chai.expect(amountOfNames).to.equal(2);


    var NameAtIndex0 = await planetPage.getNameAtIndex(0);
    var PopulationAtIndex0 = await planetPage.getPopulationAtIndex(0);
    var ClimateAtIndex0 = await planetPage.getClimateAtIndex(0);
    var GravityAtIndex0 = await planetPage.getGravityAtIndex(0);
    await chai.expect(NameAtIndex0).to.equal('Ryloth');
    await chai.expect(PopulationAtIndex0).to.equal('1500000000');
    await chai.expect(ClimateAtIndex0).to.equal('temperate, arid, subartic');
    await chai.expect(GravityAtIndex0).to.equal('1');

    var NameAtIndex1 = await planetPage.getNameAtIndex(1);
    var PopulationAtIndex1 = await planetPage.getPopulationAtIndex(1);
    var ClimateAtIndex1 = await planetPage.getClimateAtIndex(1);
    var GravityAtIndex1 = await planetPage.getGravityAtIndex(1);
    await chai.expect(NameAtIndex1).to.equal('Tholoth');
    await chai.expect(PopulationAtIndex1).to.equal('unknown');
    await chai.expect(ClimateAtIndex1).to.equal('unknown');
    await chai.expect(GravityAtIndex1).to.equal('unknown');

});