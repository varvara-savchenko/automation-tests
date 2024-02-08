# Testing Status Codes

    Given user is on Kiwi.com non-existent webpage
    Then the response status code should be 404

    Given user is on Kiwi.com landing webpage
    Then the response status code should be 200

    Given user accesses landing webpage without a trailing slash
    Then user is automatically redirected to the same page with a trailing slash
    And response status code should be 302
