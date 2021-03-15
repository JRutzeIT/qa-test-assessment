module.exports = {
    
    locator: {
        radioButtonPeople: element(by.id('people')),
        radioButtonPlanets: element(by.id('planets')),
        fieldSearch: element(by.id('query')),
        buttonSubmit: element(by.id('submitButton'))
    },

    async clickPeople() {
        await this.locator.radioButtonPeople.click();
    },
  
    async clickPlanets() {
        await this.locator.radioButtonPlanets.click();
    },

    async fillSearch(value) {
        await this.locator.fieldSearch.sendKeys(value);
    },

    async pressEnterInSearchField() {
        await this.locator.fieldSearch.sendKeys(protractor.Key.ENTER);
    },

    async clearSearch() {
        await this.locator.fieldSearch.clear();
    },

    async clickSearch() {
        await this.locator.buttonSubmit.click();
    }
  };