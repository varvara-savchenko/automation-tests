describe("Test diff status codes on Kiwi.com webpage", () => {
    it('should check 404 on non-existent page', () => {
        cy.request({ url: '/404/', failOnStatusCode: false }).its('status').should('equal', 404)
    })
    it('should check 200 on existing page', () => {
        cy.request("/").its('status').should('equal', 200)
    })
    it('should check 302 for missing trailnig slash', () => {
        cy.request({ url: "/en", followRedirect: false }).then(response => {
            expect(response.status).to.eq(302)
            const redirectedUrl = response.headers.location
            expect(redirectedUrl).to.eq("https://www.kiwi.com/en/")
        })
    })
})

