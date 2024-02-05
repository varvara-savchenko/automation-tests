# Testing Status Codes

  Scenario: Checking 404 on non-existent page
    Given user is on UltimateQA non-existent webpage
    Then the response status code should be 404

  Scenario: Checking 200 on existing page
   Given user is on UltimateQA landing webpage
    Then the response status code should be 200

  Scenario: Checking 402 on inactive page
    Given user is on UltimateQA automation webpage
    When user clicks on the "Selenium Java" link
    Then user is redirected to inactive page
    And response status code should be 402
