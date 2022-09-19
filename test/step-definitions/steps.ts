import { Given, When, Then } from '@wdio/cucumber-framework';

import BasePage from '../common/basepage';
import waitFor from '../utilities/waitFor';
import HeaderPage from '../pageobjects/header.page';
import LandingPage from '../pageobjects/landing.page';
import PlpPage from '../pageobjects/plp.page';
import PdpPage from '../pageobjects/pdp.page';
import CartPage from '../pageobjects/cart.page';
import CheckoutPage from '../pageobjects/checkout.page';
import confirmationPage from '../pageobjects/confirmation.page';

let basepage = new BasePage();

const pages = {
    landing: LandingPage
}

Given(/^I wait for "(.*?)" seconds/, async (waitTimeInSeconds) => {
    await waitFor.waitForTime(waitTimeInSeconds);
});

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

Given(/^I clear the session storage/, async () => {
    await basepage.clearSessionStorage();
})

Given(/^I search for "(.*?)"/, async (searchQuery) => {
    await LandingPage.openQuickSearch();
    await expect(LandingPage.headerQuickSearchInput).toBeDisplayed();
    await LandingPage.inputQuickSearch(searchQuery, true);
    await expect(browser).toHaveUrlContaining('/search');
});

Given(/^I select the first Product/, async () => {
    await PlpPage.selectFirstProduct();
    await expect(PdpPage.addToCartButton).toBeDisplayed();
});

Given(/^I Add the product to Cart/, async () => {
    await PdpPage.clickAddToCart();
    await expect(PdpPage.previewModal).toBeDisplayed();
    await PdpPage.closeAddToCartModal();
    await expect(PdpPage.previewModal).not.toBeDisplayed();
});

Given(/^I Navigate to Cart via the Header/, async () => {
    await HeaderPage.navigateToCartViaHeader();
    await expect(browser).toHaveUrlContaining('/cart');
});

Given(/^I Click the Checkout Button/, async () => {
    await CartPage.clickCheckoutButton();
    await expect(browser).toHaveUrlContaining('/checkout');
});

Given(/^I complete the "(.*?)" section of Checkout/, async (section: String) => {
    switch (section.toUpperCase()) {
        case "CUSTOMER":
            await CheckoutPage.inputEmail();
            await CheckoutPage.checkPrivacyPolicy();
            await CheckoutPage.continue();
            break;
        case "SHIPPING":
            await CheckoutPage.inputRequiredShippingFields();
            await CheckoutPage.continue();
            break
        case "PAYMENT":
            await CheckoutPage.inputRequiredPaymentFields();
            break
        default:
            break;
    }
});

Given(/^I Submit a Payment/, async () => {
    await CheckoutPage.submitPayment(); 
});

Given(/^I have a product in my cart/, async () => {
    await LandingPage.openQuickSearch();
    await expect(LandingPage.headerQuickSearchInput).toBeDisplayed();
    await LandingPage.inputQuickSearch("Spoon", true);
    await expect(browser).toHaveUrlContaining('/search');
    await PlpPage.selectFirstProduct();
    await expect(PdpPage.addToCartButton).toBeDisplayed();
    await PdpPage.clickAddToCart();
    await expect(PdpPage.previewModal).toBeDisplayed();
    await PdpPage.closeAddToCartModal();
    await expect(PdpPage.previewModal).not.toBeDisplayed();
});

Given(/^I complete the checkout process/, async () => {
    await HeaderPage.navigateToCartViaHeader();
    await expect(browser).toHaveUrlContaining('/cart');
    await CartPage.clickCheckoutButton();
    await expect(browser).toHaveUrlContaining('/checkout');
    await CheckoutPage.inputEmail();
    await CheckoutPage.checkPrivacyPolicy();
    await CheckoutPage.continue();
    await CheckoutPage.inputRequiredShippingFields();
    await CheckoutPage.continue();
    await CheckoutPage.inputRequiredPaymentFields();
    await CheckoutPage.submitPayment();
});

Given(/^I am presented with a purchase confirmation page for my order/, async () => {
    await basepage.waitForBrowserReadyState(10);
    await expect(browser).toHaveUrlContaining('/order-confirmation');
    await expect(await browser.getTitle()).toContain("Order Confirmation - Cornerstone Demo");
    await expect(await confirmationPage.orderSummary).toBeDisplayed();
});
