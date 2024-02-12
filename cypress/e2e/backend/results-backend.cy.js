describe("Test for results <-> backend calls interaction", () => {
    it("should check that BE calls are correct", () => {
        cy.log("intercept the call and visit the page")
        cy.intercept("POST", /SearchReturnItinerariesQuery/).as("searchResultsDefault")
        cy.visit("/en/search/results/prague-czechia/barcelona-spain/anytime/anytime")
        cy.checkBackendVariables({
            interceptionAlias: "searchResultsDefault",
            variablesToCheck: {
                origin: ["City:prague_cz"],
                destination: ["City:barcelona_es"]
            }
        })

        cy.log("intercept the call and sort results by Fastest")
        cy.intercept("POST", /SearchReturnItinerariesQuery/).as("searchResultsFastest")
        cy.get("[data-test=SortBy-duration]").click()
        cy.wait(5000)
        cy.checkBackendVariables({
            interceptionAlias: "searchResultsFastest",
            variablesToCheck: {
                sorting: "DURATION"
            }
        })

        cy.log("intercept the call and select Business class flights")
        cy.intercept("POST", /SearchReturnItinerariesQuery/).as("searchResultsBusiness")
        cy.get("[data-test=CabinClassField-active-economy]").click()
        cy.get("[data-test=CabinClassPicker-filter-business]").click()
        cy.get("[data-test=CabinClassFooter-done]").click()
        cy.wait(15000) //to avoid flakiness since we work with real API
        cy.checkBackendVariables({
            interceptionAlias: "searchResultsBusiness",
            variablesToCheck: {
                duration: "BUSINESS"
            }
        })
    })
})