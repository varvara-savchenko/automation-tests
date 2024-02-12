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

Cypress.Commands.add("scrollSliderHandle", { prevSubject: "element" }, (subject, position) => {
    let clientX, screenX, pageX;
    if (position === "max") {
        clientX = screenX = pageX = 5000;
    } else if (position === "min") {
        clientX = screenX = pageX = 0;
    }

    cy.get(subject)
        .scrollIntoView()
        .trigger("mousedown", { button: 0 })
        .wait(1500)
        .trigger("mousemove", { clientX, screenX, pageX, clientY: 900, screenY: 900, pageY: 900 })
        .trigger("mouseup", { force: true });
})

Cypress.Commands.add("checkBackendVariables", ({ interceptionAlias, variablesToCheck }) => {
    return cy.wait(`@${interceptionAlias}`).then((interception) => {
        const variables = interception.request.body.variables;
        Object.entries(variablesToCheck).forEach(([variable, expectedValue]) => {
            switch (variable) {
                case "sorting":
                    const sorting = variables.options.sortBy;
                    cy.wrap(sorting).should('deep.equal', expectedValue);
                    break;
                case "cabinClass":
                    const cabinClass = variables.search.cabinClass.cabinClass;
                    cy.wrap(cabinClass).should('deep.equal', expectedValue);
                    break;
                case "origin":
                    const origin = variables.search.itinerary.source.ids;
                    cy.wrap(origin).should('deep.equal', expectedValue);
                    break;
                case "destination":
                    const destination = variables.search.itinerary.destination.ids;
                    cy.wrap(destination).should('deep.equal', expectedValue);
                    break;
                default:
                    throw new Error(`Invalid variable name: ${variable}`);
            }
        })
    })
})
