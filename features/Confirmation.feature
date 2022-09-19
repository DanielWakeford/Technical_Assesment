@smokeTest
Feature: Completing Checkout Payment presents User with confirmation page
  Background: Complete Checkout
    Given I am on the landing page

  Scenario: Completing Checkout presents the User with the purchase confirmation page
    Given I have a product in my cart
    When I complete the checkout process
    Then I am presented with a purchase confirmation page for my order
