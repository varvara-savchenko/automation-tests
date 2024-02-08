const viewports = ["macbook-15", "iphone-x"]
const greenColor = "rgb(0, 165, 142)"
const navbarItems = [
  { url: "/en/", text: "Travel" },
  { url: "https://cars.kiwi.com?preflang=en&adplat=headerlinks", text: "Cars" },
  { url: "https://rooms.kiwi.com/?label=pagenavtab-link-1549681-click", text: "Stays" },
  { url: "https://www.kiwi.com/stories/", text: "Stories" },
  { url: "https://www.kiwi.com/en/cheap-flights/travel-hacks/", text: "Travel hacks" },
  { url: "https://www.kiwi.com/en/deals/?pageName=dealsMain&dealsProvider=cheapest", text: "Deals" }
]

viewports.forEach((viewport) => {
  describe(`${viewport}: test navbar on Kiwi.com landing page`, () => {
    it('should navbar elements on Kiwi.com landing page', () => {
      cy.acceptCookies()
      cy.viewport(viewport)
      cy.visit('/en/')

      cy.log("Logo is visible with correct href attribute")
      cy.get("[data-test=Logo]")
        .should("be.visible")
        .and("have.attr", "href", "/en/?destination=-")

      if (viewport === "iphone-x") {
        cy.log("open navbar dialog on responsive")
        cy.get("[data-test=TopNav] button:eq(0)").click()
      }

      cy.log("Navbar items are visible with correct text and link")
      cy.get("[data-test=HeaderLinks]:first").within(() => {
        navbarItems.forEach((item) => {
          cy.contains("a", item.text).should("have.attr", "href", item.url)
        })

        cy.log("Current active page has green color")
        cy.contains("a", "Travel").should("have.css", "color", greenColor)
      })

      if (viewport === "iphone-x") {
        cy.log("close navbar popover on responsive and verify")
        cy.contains("button", "Close").click()
        cy.contains("[role=dialog]").should("not.exist")
      }
    })
  })
})
