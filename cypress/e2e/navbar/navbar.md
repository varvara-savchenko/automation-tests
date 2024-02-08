# Testing Navbar Elements

    Given user is on Kiwi.com landing webpage
  
    When user opens the page in desktop and in responsive viewports
    And user opens navbar dialog window (responsive only)
    Then navbar elements should be visible
    And logo should be visible
    And navbar items should have correct text and link
    And active page link should have correct color

    When user closes navbar dialog window (responsive only)
    Then navbar dialog window should not exist