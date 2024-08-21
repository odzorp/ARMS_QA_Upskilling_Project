/// <reference types="cypress" />

describe.only("SauceDemoTest", () => {
  let selectedItemNames = [];
  let selectedItemPrices = [];
  let totalItemsAdded = 0;
  let remainingItems = [];

  before(() => {
    cy.visit("/");
  });

  it("LoginTest", () => {
    cy.fixture("login").then((login) => {
      cy.get('[data-test="username"]').type(login.username);
      cy.get('[data-test="password"]').type(login.password);
      cy.get('[data-test="login-button"]').click();
      cy.url().then((url) => {
        cy.log("Current URL: " + url);
      });
      cy.wait(3000);
    });
  });

  it("Adds the first three items to the cart and verifies the cart count", () => {
    for (let i = 0; i < 3; i++) {
      cy.get(".inventory_item")
        .eq(i)
        .within(() => {
          cy.get(".inventory_item_price").then(($price) => {
            selectedItemPrices.push(parseFloat($price.text().replace("$", "")));
            cy.log(selectedItemPrices);
          });

          cy.get(".inventory_item_price").then(($name) => {
            selectedItemNames.push(parseFloat($name.text()));
            cy.log(selectedItemNames);
          });

          cy.get("button").contains("Add to cart").click();
          totalItemsAdded++;

          cy.log(totalItemsAdded);
        });
    }
  });




  it("Remove Third Item from Cart", () => {
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.wait(3000);
    cy.get('[data-test="inventory-item"]')
      .eq(2)
      .within(() => {
        cy.get("button").contains("Remove").click();
        totalItemsAdded--;
        cy.log(totalItemsAdded);

        remainingItems = [
          {
            name: selectedItemNames[0],
            price: selectedItemPrices[0],
          },

          {
            name: selectedItemNames[1],
            price: selectedItemPrices[1],
          },
        ];
        cy.log(remainingItems);
      });
    cy.get('[data-test="inventory-item"]').should("have.length", 2);
    cy.get(".shopping_cart_badge").should("contain", "2");
  });

  it("Verify Required Fields on Checkout", () => {
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').should("be.visible");
    cy.get('[data-test="lastName"]').should("be.visible");
    cy.get('[data-test="postalCode"]').should("be.visible");

    fillCheckoutForm(generateRandomString(10), generateRandomString(10), "");
    cy.get('[data-test="error"]').should(
      "have.text",
      "Error: Postal Code is required"
    );

    cy.get('[data-test="firstName"]').clear();
    cy.get('[data-test="lastName"]').clear();

    fillCheckoutForm(generateRandomString(10), "", generateRandomNumber(5));
    cy.get('[data-test="error"]').should(
      "have.text",
      "Error: Last Name is required"
    );

    cy.get('[data-test="firstName"]').clear();
    cy.get('[data-test="postalCode"]').clear();

    fillCheckoutForm("", generateRandomString(10), generateRandomNumber(5));
    cy.get('[data-test="error"]').should(
      "have.text",
      "Error: First Name is required"
    );
    cy.get('[data-test="lastName"]').clear();
    cy.get('[data-test="postalCode"]').clear();
  });

  it("Complete Checkout", () => {
    fillCheckoutForm(
      generateRandomString(10),
      generateRandomString(10),
      generateRandomNumber(5)
    );
    cy.get('[data-test="error"]').should("not.exist");
  });

  it("Verify Sum of Item Prices Matches The Total on The Checkout Overview Page", () => {
    cy.get('[data-test="subtotal-label"]').then(($subtotal) => {
      const itemTotal = parseFloat(
        $subtotal.text().replace("Item total: $", "")
      );
      const calculatedTotal = remainingItems.reduce(
        (sum, item) => sum + item.price,
        0
      );
      cy.log("Selected Item Prices:", selectedItemPrices);
      cy.log("Calculated Total:", calculatedTotal);
      expect(calculatedTotal).to.equal(itemTotal);
    });

    it("Verify Total Amount Including Tax", () => {
      cy.get('[data-test="tax-label"]').then(($tax) => {
        const tax = parseFloat($tax.text().replace("Tax: $", ""));

        cy.get('[data-test="total-label"]').then(($total) => {
          const total = parseFloat($total.text().replace("Total: $", ""));

          const calculatedTotal = remainingItems.reduce(
            (sum, item) => sum + item.price,
            0
          );
          expect(total).to.equal(itemTotal + tax);
          expect(total).to.equal(calculatedTotal + tax);
        });
      });
    });

    it("Compete Order and Verify Success", () => {
      cy.get('[data-test="finish"]').click();
      cy.get('[data-test="complete-header"]').should(
        "have.text",
        "THANK YOU FOR YOUR ORDER"
      );
      cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
    });
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

  function fillCheckoutForm(firstName = "", lastName = "", postalCode = "") {
    if (firstName) cy.get('[data-test="firstName"]').type(firstName);
    if (lastName) cy.get('[data-test="lastName"]').type(lastName);
    if (postalCode) cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();
  }
});
