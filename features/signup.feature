Feature: Login

    Scenario: Signup Page
        Given User is on the signup page
        When User enters a valide userName, businessEmail, userEmail, mobileNumber, categoryType
        Then User clicks the "Coming up: Restaurant details" button in personalDetails page

    Scenario: Signup Page
        Given User is on the signup details page
        When User enters a valide restaurantName, websiteUrl, avaliableType, restaurantType
        Then User clicks the "Coming up: Restaurant address" button in restaurantDetails page

    Scenario: Signup Page
        Given User is on the signup address page
        When User enters a valide address, city, state, country, zipcode
        Then User clicks the "Coming up: Payment Page" button in restaurantAddress page

    Scenario: Signup Page
        Given User is on the signup payment page
        When User enters card details like card number, valid date, cardHolder name
        Then Onclick of "Paynow" button
        Then Navigated to success page