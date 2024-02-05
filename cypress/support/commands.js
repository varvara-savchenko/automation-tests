Cypress.Commands.add('acceptCookies', () => {
    cy.setCookie('__kwc_agreed', 'true');
    cy.setCookie('preferred_currency', 'czk');
})


