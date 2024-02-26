Feature: Settings Page

    Scenario: Settings Page is shown with four tabs
        Given Settings page is loaded
        When When a particular tab is clicked
        Then Respective page of the tab is opened

    Scenario: My Detail page is shown
        Given My Detail tab is present
        When "My Detail" tab is clicked
        And Navigated to My Detail page
        And Personal details like firstName, email, businessEmail,mobileNo are entered in the form
        Then "UpdateAndSave" button is clicked to update the data

    Scenario: Restaurant Profile page is seen
        Given Restaurant Profile tab is present
        When OnClick of "RestaurantProfile" tab
        Then Restaurant Profile page is navigated

    Scenario: Restaurant details tab
        Given Restaurant details tab is rendered
        When Restaurant details like restaurant name, description and logo are entered
        Then "UpdateAndSave" button is clicked to update restaurant name, description and logo

    Scenario: Cuisine details tab
        Given Render Cuisine details tab
        When Cuisine available types and serving types checkbox are selected
        Then "UpdateAndSave" button is clicked to update Cuisine available types and serving types

    Scenario: Day & Timings tab
        Given Render DayTime tab
        When Open and close time for every day is entered
        Then "UpdateAndSave" button is clicked to update Time for every day

    Scenario: Payment tab
        Given Render Payment tab
        When Payment method is selected
        Then "UpdateAndSave" button is clicked to update Payment method

    Scenario: Address tab
        Given Render Address tab
        When Outlet address is entered
        Then "UpdateAndSave" button is clicked to update the outlet address 

    Scenario: Images tab
        Given Render Images tab
        When New images can be uploaded
        Then "UpdateAndSave" button is clicked to update with new images

    Scenario: Url tab
        Given Render Url tab
        When Website url, social media url are added
        Then "UpdateAndSave" button is clicked to update with Urls

    Scenario: Password page is present
        Given Password tab is shown
        When Click the "Password" tab
        And Navigation to Password page is performed
        And New Password can be created
        Then "UpdateAndSave" button is clicked to update new password

    Scenario: Notifications page is present
        Given Notifications tab is shown
        When onClick the "Notifications" tab
        Then Navigation to Notifications page is done