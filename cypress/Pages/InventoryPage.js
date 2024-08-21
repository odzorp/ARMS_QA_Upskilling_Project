class InventoryPage {
  addItemsToCart(itemNo, selectedItemPrices, selectedItemNames, totalItemsAdded) {
    for (let i = 0; i < itemNo; i++) {
      cy.get(".inventory_item")
        .eq(i)
        .within(() => {
          cy.get(".inventory_item_price").then(($price) => {
            selectedItemPrices.push(parseFloat($price.text().replace("$", "")));
            cy.log(selectedItemPrices);
          });

          cy.get(".inventory_item_name").then(($name) => {
            selectedItemNames.push($name.text()); 
            cy.log(selectedItemNames);
          });

          cy.get("button").contains("Add to cart").click();
          totalItemsAdded++;
          cy.log(totalItemsAdded);
        });
    }
  }

  verifyCartCount(expectedCount) {
    cy.get('[data-test="shopping-cart-badge"]').should(
      "have.text",
      expectedCount.toString()
    );
  }

  goToCart() {
    cy.get('[data-test="shopping-cart-link"]').click();
  }
}

export default InventoryPage;
