# Testing Share sheet modal functionality

    Given user is search results page 

    When user opens the share sheet modal from the first result card
    Then user should see the "Share this itinerary" heading
    And the share sheet modal section should be visible
    And the input field in the share sheet modal should contain correct URL
    And all shared options should be visible
    
    When user clicks on the "Copy" button
    Then the link should be copied to the clipboard
