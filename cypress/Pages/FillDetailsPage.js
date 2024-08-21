class FillDetailsPage {
    fillCheckoutForm(firstName, lastName, postalCode) {
        if (firstName) cy.get('[data-test="firstName"]').type(firstName);
        if (lastName) cy.get('[data-test="lastName"]').type(lastName);
        if (postalCode) cy.get('[data-test="postalCode"]').type(postalCode);
        cy.get('[data-test="continue"]').click();
}
verifyErrorMessage(expectedMessage) {
    cy.get('[data-test="error"]').should('have.text', expectedMessage);
}
clearField(firstName, lastName,postalCode) {
    if (firstName) cy.get('[data-test="firstName"]').clear();
    if (lastName) cy.get('[data-test="lastName"]').clear();
    if(postalCode) cy.get('[data-test="postalCode"]').clear();
}
}

export default FillDetailsPage;
