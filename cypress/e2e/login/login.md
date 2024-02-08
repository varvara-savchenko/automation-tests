# Testing Login Functionality for invalid email affress

    Given user is on Kiwi.com landing webpage

    When user clicks on "Sign in" button
    Then sign in modal is opened 
    And all login options are presented
    Then user selects option to login via email address
    And user types email address in invalid format
    And user clicks on "Continue" button
    Then an error message is displayed stating "Please use this format: your@email.com"
    And an error message has red color
