class VerifyAmountsPage {
  getItemTotal() {
    return cy.get('[data-test="subtotal-label"]').invoke('text').then(text => 
      parseFloat(text.replace("Item total: $", ""))
    );
  }

  calculateRemainingItems() {
    let totalItemPrices = 0;
    return cy.get('.cart_item').each($item => {
      cy.wrap($item).find('.inventory_item_price').invoke('text').then(priceText => {
        totalItemPrices += parseFloat(priceText.replace("$", ""));
      });
    }).then(() => totalItemPrices);
  }

  getTaxAmount() {
    return cy.get('[data-test="tax-label"]').invoke('text').then(text => 
      parseFloat(text.replace("Tax: $", ""))
    );
  }

  getTotalAmount() {
    return cy.get('[data-test="total-label"]').invoke('text').then(text => 
      parseFloat(text.replace("Total: $", ""))
    );
  }

  verifyItemTotal() {
    return this.calculateRemainingItems().then(calculatedItemPrices => {
      return this.getItemTotal().then(itemSubTotal => {
        expect(calculatedItemPrices).to.equal(itemSubTotal);
      });
    });
  }

  verifyTotalAmount() {
    return this.calculateRemainingItems().then(calculatedItemPrices => {
      return this.getTaxAmount().then(tax => {
        return this.getTotalAmount().then(totalAmount => {
          expect(calculatedItemPrices + tax).to.equal(totalAmount);
          return this.getItemTotal().then(itemSubTotal => {
            expect(itemSubTotal + tax).to.equal(totalAmount);
          });
        });
      });
    });
  }

  finishCheckout() {
    cy.get('[data-test="finish"]').click();
  }
}

export default VerifyAmountsPage;
