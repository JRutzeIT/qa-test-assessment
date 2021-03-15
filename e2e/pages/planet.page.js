var EC = protractor.ExpectedConditions;

module.exports = {

    planet: {
        allPlanetNames: element.all(by.css('.card-subtitle.mb-2.text-muted')),
        NameAtIndex: (index) => (element.all(by.css('.card-subtitle.mb-2.text-muted')).get(index)),
        PopulationAtIndex: (index) => (element.all(by.css('.card-subtitle.mb-2.text-muted')).get(index).element(by.xpath('..')).all(by.css('.col-sm-10')).get(0)),
        ClimateAtIndex: (index) => (element.all(by.css('.card-subtitle.mb-2.text-muted')).get(index).element(by.xpath('..')).all(by.css('.col-sm-10')).get(1)),
        GravityAtIndex: (index) => (element.all(by.css('.card-subtitle.mb-2.text-muted')).get(index).element(by.xpath('..')).all(by.css('.col-sm-10')).get(2)),
    },

    async countNames() {
        await browser.wait(EC.presenceOf(this.planet.allPlanetNames, 5000, 'Element taking too long to appear in the DOM'));
        return this.planet.allPlanetNames.count();
    },

    async getNameAtIndex(index) {
        await browser.wait(EC.presenceOf(this.planet.NameAtIndex(index), 5000, 'Element taking too long to appear in the DOM'));
        return this.planet.NameAtIndex(index).getText();
    },

    async getPopulationAtIndex(index) {
        await browser.wait(EC.presenceOf(this.planet.PopulationAtIndex(index), 5000, 'Element taking too long to appear in the DOM'));
        return this.planet.PopulationAtIndex(index).getText();
    },
    
    async getClimateAtIndex(index) {
        await browser.wait(EC.presenceOf(this.planet.ClimateAtIndex(index), 5000, 'Element taking too long to appear in the DOM'));
        return this.planet.ClimateAtIndex(index).getText();
    },

    async getGravityAtIndex(index) {
        await browser.wait(EC.presenceOf(this.planet.GravityAtIndex(index), 5000, 'Element taking too long to appear in the DOM'));
        return this.planet.GravityAtIndex(index).getText();
    }

}
