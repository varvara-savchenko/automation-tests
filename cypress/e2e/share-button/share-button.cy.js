function checkCopiedText(value) {
    cy.window().then(win => {
        win.navigator.clipboard.readText().then(text => {
            expect(text).to.eq(value)
        })
    })
}

describe("Test for Share sheet modal", () => {
    it("should check Share button functionality on desktop", () => {
        cy.visit("/en/search/results/bratislava-slovakia/amsterdam-netherlands/anytime/anytime/")

        cy.log("Open share sheet modal from result card")
        cy.get("[data-test=ResultCardPriceSectionActionButtons]:first").invoke("show").click()
        cy.contains("h2", "Share this itinerary").should("be.visible")
        cy.get("[data-test='ShareSheetModalSection']")
            .should("be.visible")
            .within(() => {
                cy.log("Check that input is prefilled")
                cy.get("[data-test='ShareSheetModalInputField']")
                    .should("be.visible")
                    .invoke("val")
                    .should("contain", "https://kiwi.com/u/")
                    .as("sharedUrl")

                cy.log("All shared options are visible")
                const shareOptions = ["WhatsApp", "Messenger", "Telegram", "Viber", "Email"]
                shareOptions.forEach(option => {
                    cy.contains("button", option).should("be.visible")
                })

                cy.log("Allow clipboard permission")
                cy.wrap(
                    Cypress.automation("remote:debugger:protocol", {
                        command: "Browser.grantPermissions",
                        params: {
                            permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"],
                            origin: window.location.origin,
                        },
                    }),
                )

                cy.log("Click on Copy button and confirm that link is copied")
                cy.contains("button", "Copy").click()
                cy.get("@sharedUrl").then(sharedUrl => checkCopiedText(sharedUrl))
            })
    })
})