import { format } from "date-fns/format"
import { addMonths } from "date-fns/addMonths"
import { startOfMonth } from "date-fns/startOfMonth"
const nextMonth = addMonths(new Date(), 1)
const inputFirstDayOfNextMonth = format(startOfMonth(nextMonth), "EEE d MMM") // eg. Fri 01 Feb
const urlFirstDayOfNextMonth = format(startOfMonth(nextMonth), "yyyy-MM-dd") // eg. 2024-02-01

describe("Test datepicker functionality", () => {
    it("should check basic datepicker functionality on Kiwi.com landing page", () => {
        cy.visit('/en/')

        cy.log("Check there are datepicker inputs are set to Anytime by default")
        cy.get("[data-test=SearchFieldDateInput]").spread((departureInput, returnInput) => {
            cy.get(departureInput)
                .should("have.value", "Anytime")
            cy.get(returnInput)
                .should("have.value", "Anytime")
        })

        cy.log("Click on Departure input to open calendar")
        cy.contains("[data-test=SearchDateInput]", "Departure").click()
        cy.get("[data-test=NewDatePickerOpen]").should("be.visible")

        cy.log("Select first day of the next month and save changes")
        cy.get("[data-test=CalendarContainer]:last [data-test=DayContentContainer]:first").click()
        cy.get("[data-test=SearchFormDoneButton]").should("have.text", "Set dates").click()

        cy.log("Departure input and URL should have value of first day of next month")
        cy.get("[data-test='SearchFieldDateInput']:first").invoke("val").should("eq", inputFirstDayOfNextMonth)
        cy.url().should("contain", `outboundDate=${urlFirstDayOfNextMonth}`)
    })
})