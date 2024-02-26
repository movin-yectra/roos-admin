Feature: Menu Managing

    Scenario: Menu Managing Page is shown
        Given Menu Managing page is shown
        When Tab based on menu category is shown
        And Category tab is clicked
        Then The page respective of the category is shown

    Scenario: Search menu
        Given Search bar is present
        When Menu based on Category is searched
        Then Result of search is shown

    Scenario: Adding new Menu Item
        Given A button is present
        When I click the button "Add new product"
        Then A new page is navigated

    Scenario: Adding new items
        Given Product details are entered
        When "Add Image" card is clicked to upload images
        And "Add this to menu" button is clicked
        Then Item is added to menu

    Scenario: Update the menuItem
        Given Update button is present
        When Onclick of the button "Update"
        And Navigated to update menuItem page
        And Edit the fields that are to be updated in menuItem
        And Click "Update Menu" button
        Then Menu is updated

    Scenario: Delete the menuItem
        Given Button Delete is present
        When Click the "Delete" button
        Then Menu is deleted

    Scenario: Add Customization
        Given Customize button is placed in AddNewMenu Page
        When For customization "Customize" button is pressed
        And Home Page of Customization displayed
        And Clicking "AddCustomization" button traverses to customization page
        And If no customization is needed move back to previous screen using "Back" button
        And Menu can be customized with the options like name, price, quantity, image
        And Click "Add" to add the customized variant
        And Here too we can move back to previous screen with "Back"

    Scenario: Edit customization option 
        Given Edit button is available for editing   
        When Click "Edit", if a variant has to be edited
        Then That particular variant is edited

    Scenario: Delete customization option
        Given Delete can be used to remove option
        When "Delete" button removes an option
        Then The option is removed from list
        

