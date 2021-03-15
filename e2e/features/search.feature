Feature: Search functions

Scenario: The user can perform a search by clicking the search button
    Given The app is opened and the search people option is selected
    When The user performs a valid search by clicking the search button
    Then A result list is shown

Scenario: The user can perform a search by pressing “enter” on the search field
    Given The app is opened and the search people option is selected
    When The user performs a valid search by pressing “enter” on the search field
    Then A result list is shown
