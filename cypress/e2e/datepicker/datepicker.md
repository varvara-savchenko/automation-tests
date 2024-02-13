# Datepicker functionality on Kiwi.com landing page

    Given user is on Kiwi.com landing page
    And the datepicker inputs are set to Anytime by default

    When user clicks on the Departure input 
    Then calendar is opened

    When user selects the first day of the next month in calendar
    And save changes by clicking on "Set dates" button
    Then departure input has the value of the first day of the next month
    And url has the value of the first day of the next month 