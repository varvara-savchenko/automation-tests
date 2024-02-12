# Interaction between search results and backend calls

    Given user intercepts the backend call for search results
    When user searches for a trip from Prague to Barcelona
    Then the origin and destination in the backend call should match "City:prague_cz" and "City:barcelona_es" respectively

    Given user intercepts the backend call for search results sorted by Fastest
    When users clicks on Fastest sorting button
    Then sorting in the backend call should equal "DURATION"

    Given user intercepts the backend call for Business class results
    When users selects Business class flights
    Then class in the backend call should equal "BUSINESS"
