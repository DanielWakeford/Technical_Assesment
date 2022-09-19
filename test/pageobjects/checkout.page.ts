import BasePage from '../common/basepage';
import generator from '../utilities/generator';
import waitFor from '../utilities/waitFor';

class CheckoutPage extends BasePage {

    ////////////////////// Locators \\\\\\\\\\\\\\\\\\\\\\\\\\\
    get submitButton () { return $('[type="submit"]')}
    get emailInput () { return $('#email') }
    get privacyPolicyCheckbox () { return $('#privacyPolicy')}
    get deliveryFirstNameInput () { return $('[data-test="firstNameInput-text"]')}
    get deliveryLastNameInput () { return $('[data-test="lastNameInput-text"]')}
    get deliveryAddressLine1Input () { return $('[data-test="addressLine1Input-text"]')}
    get deliveryCityInput () { return $('[data-test="cityInput-text"]')}
    get deliveryPostCodeInput () { return $('[data-test="postCodeInput-text"]')}
    get deliveryPhoneInput () { return $('[data-test="phoneInput-text"]')}
    get paymentCreditCardInput () { return $('#ccNumber')}
    get paymentExpiryInput () { return $('#ccExpiry')}
    get paymentNameOnCardInput () { return $('#ccName')}
    get paymentCvvInput () { return $('#ccCvv')}
    get paymentSubmit () { return $('#checkout-payment-continue')}
    get loadingNotification () { return $('.loadingNotification')}

    ////////////////////// Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\
    public async continue() {
        await (await this.submitButton).waitForClickable();
        await (await this.submitButton).click();
        await (await this.loadingNotification).waitForDisplayed({ reverse: true})
    }

    public async inputEmail() {
        await (await this.emailInput).waitForClickable();
        await (await this.emailInput).setValue((await generator.randomString(10))+"@email.com");
    }

    public async checkPrivacyPolicy() {
        await (await this.privacyPolicyCheckbox).waitForDisplayed();
        var isCheckboxChecked = await (await this.privacyPolicyCheckbox).getAttribute("value")
        if(isCheckboxChecked === "false"){
            await (await this.privacyPolicyCheckbox).click({ x : 0});
        }
    }

    public async inputRequiredShippingFields() {
        await (await this.deliveryFirstNameInput).waitForClickable();
        await (await this.deliveryFirstNameInput).setValue(process.env.TEST_DELIVERY_F_NAME);
        await (await this.deliveryLastNameInput).setValue(process.env.TEST_DELIVERY_L_NAME);
        await (await this.deliveryAddressLine1Input).setValue(process.env.TEST_DELIVERY_ADDRESS);
        await (await this.deliveryCityInput).setValue(process.env.TEST_DELIVERY_CITY);
        await (await this.deliveryPostCodeInput).setValue(process.env.TEST_DELIVERY_POST_CODE);
        await (await this.deliveryPhoneInput).setValue(process.env.TEST_DELIVERY_PHONE);
        await (await this.loadingNotification).waitForDisplayed({ reverse: true})
    }

    public async inputRequiredPaymentFields() {
        await (await this.paymentCreditCardInput).waitForClickable();
        await (await this.paymentCreditCardInput).setValue(process.env.TEST_PAYMENT_CC_NUMBER);
        await (await this.paymentExpiryInput).setValue(process.env.TEST_PAYMENT_EXPIRY);
        await (await this.paymentNameOnCardInput).setValue(process.env.TEST_PAYMENT_NAME_ON_CARD);
        await (await this.paymentCvvInput).setValue(process.env.TEST_PAYMENT_CVV);
    }

    public async submitPayment() {
        await (await this.paymentSubmit).waitForClickable();
        await (await this.paymentSubmit).click();
        await (await this.loadingNotification).waitForDisplayed({ reverse: true})
    }

    public open() {
        return super.open('checkout');
    }

}

export default new CheckoutPage();
