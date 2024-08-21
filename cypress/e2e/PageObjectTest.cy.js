/// <reference types="cypress" />
import LoginPage from "../Pages/LoginPage";
import InventoryPage from "../Pages/InventoryPage";
import FillDetailsPage from "../Pages/FillDetailsPage";
import CartPage from "../Pages/CartPage";
import SuccessPurchasePage from "../Pages/SuccessPurchasePage";
import VerifyAmountsPage from "../Pages/VerifyAmountsPage";

describe.only("PageObjectTest", () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const fillDetailsPage = new FillDetailsPage();
  const cartPage = new CartPage();
  const successPurchasePage = new SuccessPurchasePage();
  const verifyAmountsPage = new VerifyAmountsPage();

  let selectedItemNames = [];
  let selectedItemPrices = [];
  let totalItemsAdded = 0;
  let remainingItems = [];

  before(() => {
    loginPage.visit();
  });

  it("LoginTest", () => {
    cy.fixture("login").then((login) => {
      loginPage.enterUsername(login.username);
      loginPage.enterPassword(login.password);
      loginPage.clickLoginButton();
      loginPage.validateLoginSuccess();
    });
  });

  it("Adds the first three items to the cart and verifies the cart count", () => {
    inventoryPage.addItemsToCart(
      3,
      selectedItemPrices,
      selectedItemNames,
      totalItemsAdded
    );
    inventoryPage.verifyCartCount(3);
    inventoryPage.goToCart();
  });

  it("Remove Third Item from Cart", () => {
    cartPage.removeItemFromCart(
      2,
      selectedItemPrices,
      selectedItemNames,
      remainingItems,
      totalItemsAdded
    );
    cartPage.proceedToCheckout();
  });

  it("Verify Required Fields on Checkout", () => {
    fillDetailsPage.fillCheckoutForm(
      generateRandomString(10),
      generateRandomString(10),
      ""
    );
    fillDetailsPage.verifyErrorMessage("Error: Postal Code is required");
    fillDetailsPage.clearField(true, true, false);

    fillDetailsPage.fillCheckoutForm(
      generateRandomString(10),
      "",
      generateRandomNumber(5)
    );
    fillDetailsPage.verifyErrorMessage("Error: Last Name is required");
    fillDetailsPage.clearField(true, false, true);

    fillDetailsPage.fillCheckoutForm(
      "",
      generateRandomString(10),
      generateRandomNumber(5)
    );
    fillDetailsPage.verifyErrorMessage("Error: First Name is required");
    fillDetailsPage.clearField(false, true, true);
  });

  it("Complete Checkout", () => {
    fillDetailsPage.fillCheckoutForm(
      generateRandomString(10),
      generateRandomString(10),
      generateRandomNumber(5)
    );
  });

  it("Verify Sum of Item Prices Matches The Total on The Checkout Overview Page", () => {
   verifyAmountsPage.getItemTotal();
  verifyAmountsPage.getTaxAmount();
verifyAmountsPage.verifyItemTotal();
 });

  it("Verify Total Amount Including Tax", () => {
    verifyAmountsPage.getItemTotal();
    verifyAmountsPage.getTaxAmount();
    verifyAmountsPage.verifyTotalAmount();
    verifyAmountsPage.finishCheckout();
  });

  it("Complete Order and Verify Success", () => {
    successPurchasePage.verifyOrderSuccess();
  });

  /*----------HELPER FUNCTIONS-----------------*/

  function generateRandomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  function generateRandomNumber(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }
});
