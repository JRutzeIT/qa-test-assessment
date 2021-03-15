# QA Engineer Assessment Solution

## Introduction
Name: Jeroen Rütze

Test automation scripts were written using Cucumber and Protractor.
The scripts also use a Page Object Model structure.
Since the source code of the application was available I mapped the pages based on the application.
All the testscripts were made independent from each other.
A test report is included of the last run.
Scenario "Performing an empty search should remove previous search results" will fail as intended for planets and people.

## Assumptions
The following assumptions were made:
* End to end tests should not overlap unit tests.
* The described functionality has to be covered.
* Additional flows/tests should be verified first before making them.

## Project structure
Features can be found in e2e/features.
Steps definitions can be found in e2e/steps.
Page objects can be found in e2e/pages.
Test results can be found in test-reports.

## Executing the tests
Install first using `npm install`.
Run the tests using `npm run e2e`.

## Findings

1. The page shows a maximum of 10 results, the API however has more then 10 results.

2. It seems that there is no sorting applied. Maybe we should at least add an alphabetic order. 

3. The results are 10 per page but there is no pagination.

4. There is no result counter on the page

5. Searching by the letter ',' gives results of planets and people while it does not match their names.

6. After clearing the search field and clicking on the search button or pressing enter in the search field, results remain on the screen.
    Our specifications however state that the results should be emptied.
    Scenario "Performing an empty search should remove previous search results" fails for both people and planets because of this reason.

## Remarks 

1. While installing using 'npm install' I received the following error:
    ```
    > tnt-assignment@0.0.0 postinstall C:\qa-test-assessment-master
    > ./node_modules/protractor/bin/webdriver-manager update  
    
    '.' is not recognized as an internal or external command,      
    ```
    Windows environment variables were correct, node version is 10.32.
    I fixed this by editing 'package.json'.
    ```
        "postinstall": "./node_modules/protractor/bin/webdriver-manager update"
    ```
    Was changed to:
    ```
        "postinstall": "node ./node_modules/protractor/bin/webdriver-manager update"
    ```
    
2. Running the e2e tests resulted in the following error:
    ```
    E/launcher - Error: Error: When config.framework is custom, config.frameworkPath is required.
    ```
    I therefore added the framework path to protractor.conf.js.
    ```
      frameworkPath: require.resolve('protractor-cucumber-framework'),  
    ```

3. After adding the frameworkPath running e2e still resulted in an error:
    ```
    DevTools listening on ws://127.0.0.1:57488/devtools/browser/a1d090bd-548a-4113-9015-636e3a287610
    [20:48:30] E/launcher - Error: Error: ENOENT: no such file or directory, open 'C:\qa-test-assessment-master\test-reports\cucumber-test-results.json'
    ```
    Directory test-reports was manually added to solve this error.
    
4. Added "SELENIUM_PROMISE_MANAGER: false" to the 'protractor.conf.js' file.
    Control_flow needs to be turned off when we use async/await, otherwise the web driver control flow becomes unreliable.

5. Added an id to the searchbutton in the 'search-form.component.html' file.

6. Added an id to the Results not found in the 'app.component.html' file.

7. Renamed the assessment-check.feature to basicFunctionlaity.feature.
    Changed the original scenario from a imperative style to a declarative style.
    Adjusted the step file accordingly.

8. The main features states the following:
    ```
    *	When for example you have searched for a full planet name and you’ve got results, 
    if you switch to People and search for the same thing (that has no matching people based on a partial name), 
    you should get a “Not found” in the results.
    ```
    Since the gherkin needs to be declarative, I attempted to write the following scenario:
    ```
    Scenario: After performing a search on planets with results the user can switch to people and search with the same value
        Given A search for a valid planet was executed
        When Switching to people and searching for the same planet name which does not exist as person
        Then The results should show “Not found”
    ```
    It has to be checked with the business if this scenario covers the original information.


