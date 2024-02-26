Feature: Login

    Scenario: Logging into home
        Given User is on the login page
        When User enters a valide username
        And User enters a valid password
        And User clicks "login" button
        Then User is logged into home page