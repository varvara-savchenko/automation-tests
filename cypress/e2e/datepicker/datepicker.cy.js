import { format } from "date-fns/format"
import { addMonths } from "date-fns/addMonths"
import { startOfMonth } from "date-fns/startOfMonth"
const nextMonth = addMonths(new Date(), 1)
const inputFirstDayOfNextMonth = format(startOfMonth(nextMonth), "EEE d MMM") // eg. Fri 01 Feb
const urlFirstDayOfNextMonth = format(startOfMonth(nextMonth), "yyyy-MM-dd") // eg. 2024-02-01

describe("Test datepicker functionality", () => {
    it("should check basic datepicker functionality on Kiwi.com landing page", () => {
        cy.acceptCookies()
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

        cy.log("Click on Return input to open Time of Stay")
        cy.contains("[data-test='SearchDateInput']", "Return").click()
        cy.contains("[data-test='TimeToStayHeading']", "Time of stay").click()
        cy.get("[data-test='PickerTimeToStay']").within(() => {
            cy.log("Time of Stay heading and slider are visible")
            cy.contains("Stay 2 – 10 nights").should("be.visible")
            cy.get("[data-test='TimeToStaySlider']").should("be.visible")

            cy.log("Select max number of nights")
            cy.get("[data-test='SliderHandle-1']").scrollSliderHandle("max")
            cy.get("[data-test='SliderHandle-0']").scrollSliderHandle("max")
        })

        cy.log("Click on Set dates button")
        cy.get("[data-test='SearchFormDoneButton']").should("have.text", "Set dates").click()

        cy.log("Return input and URL should have value of 31 nights")
        cy.get("[data-test=SearchFieldDateInput]:last").invoke("val").should("eq", "31 nights")
        cy.url().should("contain", `inboundDate=31&outboundDate=${urlFirstDayOfNextMonth}`)
    })
})