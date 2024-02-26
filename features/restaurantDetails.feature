Feature: Restaurant Details page
    Restaurant Details page

    Scenario: Restaurant details page
        Given render the restaurant details page
        When  click the image container
        Then  enter the name
        Then  enter the description
        And   click to Coming up: cuisine details button

    Scenario: Serving details page
        Given render the serving details page
        When  click to available type checkbox
        Then  click to serving type checkbox
        And   click to Coming up: day&time button
        And   click to back button go to restaurant details page

    Scenario: Available payment methods
        Given render the payment methods page
        When  click to payment type checkbox
        Then  click to Coming up: address-details button
        And   click to back button go to date and time page

    Scenario: Outlet address
        Given render the address page
        When  enter to address, city, countery, state, zipcode, deliveryZone
        Then  click to Coming up: Restaurant image button
        And   click to back button go to payment methods page

    Scenario: Restaurant pictures
        Given render the restaurant pictures page
        When  click the image container
        Then  click to Coming up: website urls button
        And   click to back button go to address page

    Scenario: Restaurant URLs
        Given render the restaurant-urls page
        When  enter to website, business, facebook, instagram
        Then  click to done button
        And   click to back button go to restaurant pictures page

