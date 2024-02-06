// const mock = {
//     method: "POST",
//     matcher: /SearchReturnItinerariesQuery/,
//     fixture: "fixtures/searchResults.json",
//     alias: "searchResults"
// }

function mockRoute(method, matcher, fixture, alias) {
    cy.intercept(method, matcher, { fixture }).as(alias)

    Cypress.Commands.add("searchVisit", (path, opts = {}) => {
        for (const mock of mocks) {
            if (
                Array.isArray(opts.disabledMocksByAlias) &&
                (opts.disabledMocksByAlias.includes(mock.alias) ||
                    opts.disabledMocksByAlias.includes(`@${mock.alias}`))
            ) {
                continue
            }
            mockRoute(mock.method, mock.matcher, mock.fixture, mock.alias)
        }
        cy.visit(path, {
            ...opts,
            failOnStatusCode: true,
        })
    })
}

Cypress.Commands.add("returnResults", () => {
    mockRoute(
        "POST",
        /SearchReturnItinerariesQuery/,
        "searchResults.json",
        "returnResults",
    )
})