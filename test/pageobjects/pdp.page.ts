import BasePage from '../common/basepage';

class PdpPage extends BasePage {

    ////////////////////// Locators \\\\\\\\\\\\\\\\\\\\\\\\\\\
    get addToCartButton () { return $('#form-action-addToCart')}
    get previewModal () { return $('#previewModal')}
    get closeAddToCartModalButton () { return $('#previewModal').$('.modal-close')}

    ////////////////////// Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\

    async clickAddToCart() {
        await browser.setupInterceptor();
        await (await this.addToCartButton).waitForClickable();
        await browser.expectRequest('POST', '/remote/v1/cart/add', 200);
        await (await this.addToCartButton).click();
        await browser.waitUntil( async () => (await browser.hasPendingRequests()) === false,
        {
            timeout: 5000,
            timeoutMsg: '5 second timeout waiting for pending add to card request'
        })
        await browser.assertExpectedRequestsOnly();
        await browser.resetExpectations();
    }

    async closeAddToCartModal() {
        await (await this.closeAddToCartModalButton).waitForClickable()
        await (await this.closeAddToCartModalButton).click();
    }

    public open () {
        return super.open(process.env.PLP_URL_SLUG);
    }
}

export default new PdpPage();