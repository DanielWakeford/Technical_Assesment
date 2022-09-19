import BasePage from '../common/basepage';

class LandingPage extends BasePage {

    ////////////////////// Locators \\\\\\\\\\\\\\\\\\\\\\\\\\\
    get headerQuickSearch () { return $('#quick-search-expand') }
    get headerQuickSearchInput () { return $('//input[@id="nav-quick-search"]') }

    ////////////////////// Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\
    public async openQuickSearch () {
        await (await this.headerQuickSearch).waitForClickable();
        await (await this.headerQuickSearch).click();
    }

    public async inputQuickSearch (searchQuery, performSearch?: Boolean) {
        await (await this.headerQuickSearchInput).waitForClickable();
        await (await this.headerQuickSearchInput).setValue(searchQuery);
        if (performSearch) {
            await browser.keys("Enter");
        }
    }

    public open () {
        return super.open('');
    }
}

export default new LandingPage();
