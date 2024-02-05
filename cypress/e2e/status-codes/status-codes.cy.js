describe("Test diff status codes on ultimateqa webpage", () => {
    it('should check 404 on non-existent page', () => {
        cy.request({ url: '/404', failOnStatusCode: false }).its('status').should('equal', 404)
    })
    it('should check 200 on existing page', () => {
        cy.request("/").its('status').should('equal', 200)
    })
    it('should check 402 on inactive page', () => {
        cy.visit("/automation/")
        cy.intercept('GET', 'https://academy.ultimateqa.com/inactive').as('redirectRequest')
        cy.contains("a", "Selenium Java").click({ force: true }) //needed here
        cy.wait('@redirectRequest').then((interception) => {
            expect(interception.response.statusCode).to.equal(402)
        })
    })
})

