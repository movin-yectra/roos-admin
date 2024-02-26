Feature: Overview Details
    Scenario: Display overview page
        Given I am on the overview page
        When I click on the customer name
        Then I should see the customer order details

    Scenario: Edit Order Details
        Given I am on the order details page
        And I click the edit button
        Then I should be see to the order edit page

    Scenario: View Customer Details
        Given I am on the order details page
        When I click the "View full details" button
        And I should see the customer name, order ID, email, phone, address, paid via, order status
        And I should see the order details
        And click to "Back" button go to home page

    Scenario: View Add New Orders
        Given I am on the add new order page
        When I click the incerment button incerment the quantity
        When I click the decerment button decerment the quantity
        When I click the Add button add order details page
        And I should see the order details