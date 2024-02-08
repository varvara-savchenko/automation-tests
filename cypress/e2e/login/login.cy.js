describe("Test login functionality", () => {
    it('should check error for invalid email address', () => {
        cy.visit('/en/')

        cy.log("Open sign in form by clicking on button")
        cy.get("[data-test=TopNav-SingInButton]")
            .should("be.visible")
            .and("have.text", "Sign in")
            .click()

        cy.log("Sign in modal should be opened")
        cy.contains("h2", "Continue to your account").parent().should("be.visible")

        cy.log("All login options are presented")
        const loginOptions = ["Email", "Facebook", "Google", "Apple"]
        loginOptions.forEach((option) => {
            cy.get(`[data-test=MagicLogin-LoginVia${option}]`).should("be.visible")
        })

        cy.log("Select login via email and type invalid email address")
        cy.get("[data-test=MagicLogin-LoginViaEmail]").click()
        cy.get("[data-test=MagicLogin-Email]").should("have.attr", "placeholder", "e.g. your@email.com").type("email.com")
        cy.get("[data-test=MagicLogin-Continue]").should("have.text", "Continue").click()

        cy.log("Verify that error is shown")
        cy.get("[name=loginIntro]").find("svg").click()
        cy.get("[aria-live=polite]")
            .should("be.visible")
            .and("have.text", "Please use this format: your@email.com")
            .and("have.css", "background-color", "rgb(210, 28, 28)")
    })
})