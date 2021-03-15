Feature: Search for planets
    
    Scenario: Searching for a valid planet
        Given The app is opened and the search planet option is selected
        When The user searches for a valid planet
        Then The results should show the planets “Population”, “Climate” and “Gravity”

    Scenario: Searching for a non-valid planet
        Given The app is opened and the search planet option is selected
        When The user searches for a non-valid planet
        Then The results for planets should show “Not found”

    Scenario: Performing an empty search should remove previous search results
        Given Previous search results for a planet are present
        When The user performs an empty search for a planet
        Then An empty planet result list is shown

    Scenario: After performing a search on people with results the user can switch to planet and search with the same value
        Given A search for a valid people was executed
        When Switching to planet and searching for the same people name which does not exist as person
        Then The results for planets should show “Not found”

    Scenario: The search engine can show results based on partial matching 
        Given The app is opened and the search planet option is selected
        When The user searches using a term that partial matches multiple planets
        Then A result list is shown of partial matching planets

