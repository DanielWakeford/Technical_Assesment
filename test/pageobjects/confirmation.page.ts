import BasePage from '../common/basepage';
import generator from '../utilities/generator';
import waitFor from '../utilities/waitFor';

class ConfirmationPage extends BasePage {

    ////////////////////// Locators \\\\\\\\\\\\\\\\\\\\\\\\\\\
    get orderSummary () { return $('[data-test="cart"]')}

    ////////////////////// Methods \\\\\\\\\\\\\\\\\\\\\\\\\\\

}

export default new ConfirmationPage();
