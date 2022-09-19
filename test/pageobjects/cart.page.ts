import BasePage from '../common/basepage';

class CartPage extends BasePage {

    ////////////////////// Locators \\\\\\\\\\\\\\\\\\\\\\\\\\\
    get checkoutButton () { return $('[href="/checkout"]') }

    ////////////////////// Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\
    public async clickCheckoutButton () {
        await (await this.checkoutButton).waitForClickable();
        await (await this.checkoutButton).click();
    }

    public open () {
        return super.open('cart.php');
    }
}

export default new CartPage();
