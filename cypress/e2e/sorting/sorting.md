# Testing Sorting Functionality

  Scenario: Verify that results are sorted by cheapest: 
    Given user is on landing page
    When "Cheapest" sorting option is preselected
    Then results should be sorted by price

    When user clicks on the "Load more" button
    Then the number of results should increase
    And the prices of the newly added results should also be in ascending order