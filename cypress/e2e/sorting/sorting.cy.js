function checkCheapestSorting() {
    cy.get("[data-test='ResultCardPrice']").find("span").each((resultPrice, index, totalCount) => {
        cy.wrap(resultPrice).invoke("text").then((resultPrice) => {
            const currentPrice = +(resultPrice.replace(/[^\d]/g, '')) //remove extra characters and transform into number 
            if (index < totalCount.length - 1) {
                const resultPriceNext = totalCount[index + 1];
                cy.wrap(resultPriceNext).invoke("text").then((resultPriceNext) => {
                    const nextPrice = +(resultPriceNext.replace(/[^\d]/g, ''))
                    expect(currentPrice).to.be.lte(nextPrice);
                })
            }
        })
    })
}

describe("Test for sorting functionality on results page", () => {
    it("should check that results are sorted by cheapest", () => {
        cy.acceptCookies()
        cy.visit("https://www.kiwi.com/en/search/results/prague-czechia/barcelona-spain/anytime/anytime?sortBy=price")
        cy.wait(10000) //need to wait due to real API, in testing env I'd mock this data

        cy.log("Cheapest sorting is preselected")
        cy.get("[data-test='SortBy-price']")
            .should("be.visible")
            .and("have.css", "border-bottom-color", "rgb(1, 114, 203)")

        cy.log("Get price from each result card and compare values")
        checkCheapestSorting()

        cy.log("num of results is increased after clicking Load more button")
        cy.get("[data-test='ResultCardWrapper']").then(resultCard => {
            const resultCount = resultCard.length
            cy.contains("button", "Load more").click()
            cy.wait(5000)
            cy.get("[data-test='ResultCardWrapper']").its("length").should("be.gt", resultCount)
        })

        cy.log("Cheapest sorting should apply for newly added results as well")
        checkCheapestSorting()
    })
})
