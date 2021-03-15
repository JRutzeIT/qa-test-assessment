Feature: Search functionality for characters (persons)
    
    Scenario: Searching for a valid character
        Given The app is opened and the search people option is selected
        When The user searches for a valid character
        Then The results should show the characters “Name”, “Gender”, “Birth year”, “Eye color” and “Skin color”

    Scenario: Searching for a non-valid character
        Given The app is opened and the search people option is selected
        When The user searches for a non-valid character
        Then The results for characters should show “Not found”

    Scenario: Performing an empty search should remove previous search results
        Given Previous search results for a character are present
        When The user performs an empty search for people
        Then An empty people result list is shown

    Scenario: After performing a search on planets with results the user can switch to people and search with the same value
        Given A search for a valid planet was executed
        When Switching to people and searching for the same planet name which does not exist as person
        Then The results for characters should show “Not found”

    Scenario: The search engine can show results based on partial matching 
        Given The app is opened and the search people option is selected
        When The user searches using a term that partial matches multiple people
        Then A result list is shown of partial matching people

