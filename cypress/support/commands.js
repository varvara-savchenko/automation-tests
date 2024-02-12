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