class CartPage {
  removeItemFromCart(
    index,
    selectedItemPrices,
    selectedItemNames,
    remainingItems,
    totalItemsAdded
  ) {
    cy.get('[data-test="inventory-item"]')
      .eq(index)
      .within(() => {
        cy.get("button").contains("Remove").click();
        totalItemsAdded--;
        cy.log(totalItemsAdded);
      });
   
    for (let i = 0; i < selectedItemNames.length; i++) {
      if (i !== index) {
        remainingItems.push({
          name: selectedItemNames[i],
          price: selectedItemPrices[i]
        });
      }
    }

    cy.log(`Remaining items: ${JSON.stringify(remainingItems)}`);

      return remainingItems;

  }

  proceedToCheckout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export default CartPage;
