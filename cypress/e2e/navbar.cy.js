const navbarItems = [
  { url: "https://ultimateqa.ck.page/academy-coming-soon", text: "Java SDET Academy" },
  { url: "#", text: "Learning" },
  { url: "https://ultimateqa.com/testimonials/", text: "Success Stories" },
  { url: "https://ultimateqa.com/blog/", text: "Blog" },
  { url: "https://ultimateqa.com/about/", text: "About" }
]

describe('Test fake landing page', () => {
  it('should navbar on fake landing page', () => {
    cy.viewport("macbook-15")
    cy.visit('https://ultimateqa.com/fake-landing-page')

    cy.log("navbar elements are visible")
    cy.get("#main-menu").should("be.visible").within(() => {
      navbarItems.forEach((item) => {
        cy.contains("a", item.text).should("have.attr", "href", item.url)
      })
    })
  })
})