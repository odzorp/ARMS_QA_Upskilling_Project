class SuccessPurchasePage{
    verifyOrderSuccess(){
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');   
     
}
}
export default SuccessPurchasePage;