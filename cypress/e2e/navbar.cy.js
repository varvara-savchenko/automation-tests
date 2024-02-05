const viewports = ["macbook-15", "iphone-x"]
const pinkColor = "rgb(141, 60, 250)"
const navbarItems = [
  { url: "https://ultimateqa.ck.page/academy-coming-soon", text: "Java SDET Academy" },
  { url: "#", text: "Learning" },
  { url: "https://ultimateqa.com/testimonials/", text: "Success Stories" },
  { url: "https://ultimateqa.com/blog/", text: "Blog" },
  { url: "https://ultimateqa.com/about/", text: "About" },
  { url: "https://forms.clickup.com/2314027/p/f/26ktb-6387/56LKNUZ9BDYXSC73SY/unlock-your-automation-potentialwitha-free-framework-assessment", text: "I want a free DISCOVERY SESSION" }
]

viewports.forEach((viewport) => {
  describe(`${viewport}: test fake landing page`, () => {
    it('should navbar on fake landing page', () => {
      cy.viewport(viewport)
      cy.visit('/fake-landing-page')

      cy.log("navbar elements are visible")
      cy.get("#main-menu").should("be.visible").within(() => {
        cy.log("Logo is visible")
        cy.get("img").should("be.visible")

        if (viewport === "iphone-x") {
          cy.get(".mobile_menu_bar").click()
        }

        cy.log("Navbar items are visible with correct text and link")
        navbarItems.forEach((item) => {
          cy.contains("a", item.text).should("have.attr", "href", item.url)
        })

        cy.log("Free discovery session has purple color")
        cy.contains("a", "I want a free DISCOVERY SESSION").should("have.css", "color", pinkColor)
      })
    })
  })

})