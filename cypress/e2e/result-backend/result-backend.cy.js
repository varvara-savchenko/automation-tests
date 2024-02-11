describe("Test for results <-> backend calls interaction", () => {
    it("should check that BE calls are correct", () => {
        cy.log("intercept the call and visit the page")
        cy.intercept("POST", /SearchReturnItinerariesQuery/).as("searchResults")
        cy.visit("/en/search/results/prague-czechia/barcelona-spain/anytime/anytime")

        cy.log("Verify that origin and destination are correct")
        cy.checkBackend("searchResults", {
            BEargs: ["requestOrigin", "requestDestination"],
        }).then(({ requestOrigin, requestDestination }) => {
            expect(requestOrigin).to.deep.equal(["City:prague_cz"])
            expect(requestDestination).to.deep.equal(["City:barcelona_es"])
        })

        cy.log("intercept the call and sort results by Fastest")
        cy.intercept("POST", /SearchReturnItinerariesQuery/).as("searchResultsFastest")
        cy.get("[data-test=SortBy-duration]").click()
        cy.checkBackend("searchResultsFastest", {
            BEargs: ["requestSorting"],
        }).then(({ requestSorting }) => {
            expect(requestSorting).to.deep.equal("DURATION")
        })

        cy.log("intercept the call and select Business class flights")
        cy.intercept("POST", /SearchReturnItinerariesQuery/).as("searchResultsBusiness")
        cy.get("[data-test=CabinClassField-active-economy]").click()
        cy.get("[data-test=CabinClassPicker-filter-business]").click()
        cy.get("[data-test=CabinClassFooter-done]").click()
        cy.wait(15000) //to avoid flakiness since we work with real API
        cy.checkBackend("searchResultsBusiness", {
            BEargs: ["requestClass"],
        }).then(({ requestClass }) => {
            expect(requestClass).to.deep.equal('BUSINESS')
        })
    })
})
