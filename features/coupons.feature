Feature: Create Coupons page
    Create Coupons page

    Scenario: Coupons List page
        Given render the coupons list page
        When  click the "Add New Coupon" button
        Then  render the create coupons list page

    Scenario: Create Coupons page
        Given render the create coupons page
        When  click to enable/disable coupon type checkbox
        When  click to Offer applicable to all items type checkbox
        Then  enter to coupon code, upload logo, discount type, Amount ,start date, end date
        And   click to select products applicable for offer cook icon open offcanvas and select checkbox
        And   enter to description
        And   click to "Create coupon"

    Scenario: Show Coupons Deatils
        Given render the create coupons details
