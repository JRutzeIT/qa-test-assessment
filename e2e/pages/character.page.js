var EC = protractor.ExpectedConditions;

module.exports = {

    character: {
        allNames: element.all(by.css('.card-subtitle.mb-2.text-muted')),
        NameAtIndex: (index) => (element.all(by.css('.card-subtitle.mb-2.text-muted')).get(index)),
        GenderAtIndex: (index) => (element.all(by.css('.card-subtitle.mb-2.text-muted')).get(index).element(by.xpath('..')).all(by.css('.col-sm-10')).get(0)),
        BirthYearAtIndex: (index) => (element.all(by.css('.card-subtitle.mb-2.text-muted')).get(index).element(by.xpath('..')).all(by.css('.col-sm-10')).get(1)),
        EyeColorAtIndex: (index) => (element.all(by.css('.card-subtitle.mb-2.text-muted')).get(index).element(by.xpath('..')).all(by.css('.col-sm-10')).get(2)),
        SkinColorAtIndex: (index) => (element.all(by.css('.card-subtitle.mb-2.text-muted')).get(index).element(by.xpath('..')).all(by.css('.col-sm-10')).get(3))
    },

    async countNames() {
        await browser.wait(EC.presenceOf(this.character.allNames, 5000, 'Element taking too long to appear in the DOM'));
        return this.character.allNames.count();
    },

    async getNameAtIndex(index) {
        await browser.wait(EC.presenceOf(this.character.NameAtIndex(index), 5000, 'Element taking too long to appear in the DOM'));
        return this.character.NameAtIndex(index).getText();
    },

    async getGenderAtIndex(index) {
        await browser.wait(EC.presenceOf(this.character.GenderAtIndex(index), 5000, 'Element taking too long to appear in the DOM'));
        return this.character.GenderAtIndex(index).getText();
    },
    
    async getBirthYearAtIndex(index) {
        await browser.wait(EC.presenceOf(this.character.BirthYearAtIndex(index), 5000, 'Element taking too long to appear in the DOM'));
        return this.character.BirthYearAtIndex(index).getText();
    },

    async getEyeColorAtIndex(index) {
        await browser.wait(EC.presenceOf(this.character.EyeColorAtIndex(index), 5000, 'Element taking too long to appear in the DOM'));
        return this.character.EyeColorAtIndex(index).getText();
    },

    async getSkinColorAtIndex(index) {
        await browser.wait(EC.presenceOf(this.character.SkinColorAtIndex(index), 5000, 'Element taking too long to appear in the DOM'));
        return this.character.SkinColorAtIndex(index).getText();
    },
}