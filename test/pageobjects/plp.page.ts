import BasePage from '../common/basepage';

class PlpPage extends BasePage {

    ////////////////////// Locators \\\\\\\\\\\\\\\\\\\\\\\\\\\
    get productCardsArray () { return $$('.product')}
    get headerQuickSearchInput () { return $('//input[@id="nav-quick-search"]') }

    ////////////////////// Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\

    async selectFirstProduct() {
        let firstProduct = await this.productCardsArray[0]
        await firstProduct.waitForClickable();
        await firstProduct.click();
        await expect(browser).not.toHaveUrlContaining('/search');
    };

    public open () {
        return super.open(process.env.PLP_URL_SLUG);
    }
}

export default new PlpPage();