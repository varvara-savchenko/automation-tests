describe("Test login functionality", () => {
    it('should check error for invalid login', () => {
        cy.visit('https://courses.ultimateqa.com/users/sign_in')

        cy.log("navbar elements are visible")
        cy.get(".sign-in__form").should("be.visible").within(() => {
            cy.get(".form__group").spread((emailForm, passwordForm) => {
                cy.log("Enter email address")
                cy.get(emailForm)
                    .find("input")
                    .should("have.attr", "placeholder", "Email")
                    .type("example@email.com")

                cy.log("Enter incorrect password")
                cy.get(passwordForm)
                    .find("input")
                    .should("be.visible")
                    .and("have.attr", "placeholder", "Password")
                    .type("123")

                cy.log("Click on Sign in button")
                cy.contains("button", "Sign in").click()

                cy.log("Error is shown")
                cy.get(".form-error__list-item")
                    .should("be.visible")
                    .and("have.text", "Invalid email or password.")
            })
        })
    })
})
