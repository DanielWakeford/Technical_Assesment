@smokeTest
Feature: Completing Checkout Payment presents User with confirmation page
  Background: Complete Checkout
    And I am on the landing page
    And I search for "Spoon"
    And I select the first Product
    And I Add the product to Cart
    And I Navigate to Cart via the Header
    And I Click the Checkout Button
    And I complete the "Customer" section of Checkout
    And I complete the "Shipping" section of Checkout
    And I complete the "Payment" section of Checkout

  Scenario: Completing Checkout presents the User with the purchase confirmation page
    When I Submit a Payment
    Then I am presented with a purchase confirmation page for my order
