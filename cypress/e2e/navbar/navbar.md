# Testing Navbar Elements

  Scenario: Checking Navbar elements visibility and attributes: 
    Given user is on UltimateQA fake landing webpage
    When user opens the page in desktop and responsive viewports
    And user opens hamburger menu (responsive only)
    Then navbar elements should be visible
    And logo should be visible
    And navbar items should have correct text and link
    And "discovery session" link should have purple color