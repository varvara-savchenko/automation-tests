Cypress.Commands.add('acceptCookies', () => {
    cy.setCookie('__kwc_agreed', 'true');
    cy.setCookie('preferred_currency', 'czk');
})

function mockRoute(method, matcher, fixture, alias) {
    cy.intercept(method, matcher, { fixture }).as(alias)
}

Cypress.Commands.add("returnResults", () => {
    mockRoute(
        "POST",
        /SearchReturnItinerariesQuery/,
        "searchResults.json",
        "returnResults",
    )
})