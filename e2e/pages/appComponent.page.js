var EC = protractor.ExpectedConditions;

module.exports = {
    
    locator: {
        title: element(by.css('h1[_ngcontent-c0]')),
        notFound: element(by.id('noSearchResult'))
    },

    getTitle() {
        return this.locator.title.getText();
    },

    async getNoSearchResults() {
        await browser.wait(EC.presenceOf(this.locator.notFound, 5000, 'Element taking too long to appear in the DOM'));
        return this.locator.notFound.getText();
    },

  };


