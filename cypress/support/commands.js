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

Cypress.Commands.add("checkBackendVariables", ({ interceptionAlias, variablesToCheck }) => {
    return cy.wait(`@${interceptionAlias}`).then((interception) => {
        const variables = interception.request.body.variables;
        const expectedVariables = {
            sorting: variables.options.sortBy,
            cabinClass: variables.search.cabinClass.cabinClass,
            origin: variables.search.itinerary.source.ids,
            destination: variables.search.itinerary.destination.ids
        }

        Object.entries(variablesToCheck).forEach(([name, expectedValue]) => {
            if (expectedVariables.hasOwnProperty(name)) {
                cy.wrap(expectedVariables[name]).should('deep.equal', expectedValue)
            } else {
                throw new Error(`Invalid variable name: ${name}`)
            }
        })
    })
})

