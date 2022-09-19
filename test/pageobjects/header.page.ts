import BasePage from '../common/basepage';

class HeaderPage extends BasePage {

    ////////////////////// Locators \\\\\\\\\\\\\\\\\\\\\\\\\\\
    get headerCartPreview () { return $('.navUser-item--cart') }
    get headerCartPreviewViewCart () { return $('.previewCartAction-viewCart') }

    ////////////////////// Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\
    public async navigateToCartViaHeader () {
        await (await this.headerCartPreview).waitForClickable();
        await (await this.headerCartPreview).click();
        await (await this.headerCartPreviewViewCart).waitForClickable();
        await (await this.headerCartPreviewViewCart).click();
    }

}

export default new HeaderPage();
