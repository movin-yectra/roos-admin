import React from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Enzyme, { ReactWrapper, mount, shallow } from "enzyme";

import { expect } from "chai";
import { Given, When, Then } from "@cucumber/cucumber";

import { act } from "react-dom/test-utils";
import Adapter from "@cfaester/enzyme-adapter-react-18";

import Settings from "../../src/pages/Settings/Index";
import MyDetails from "../../src/pages/Settings/views/MyDetails";
import RestaurantProfile from "../../src/pages/Settings/views/RestaurantProfile";
import Password from "../../src/pages/Settings/views/Password";
import Notifications from "../../src/pages/Settings/views/Notifications";

import RestaurantDetails from "../../src/pages/Settings/components/RestaurantDetails";
import CuisineDetails from "../../src/pages/Settings/components/CuisineDetails";
import DayTime from "../../src/pages/Settings/components/DayTime";
import PaymentMethod from "../../src/pages/Settings/components/PaymentMethod";
import Address from "../../src/pages/Settings/components/Address";
import Images from "../../src/pages/Settings/components/Images";
import Urls from "../../src/pages/Settings/components/Urls";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});

global.document = dom.window.document;
global.window = dom.window;

Enzyme.configure({ adapter: new Adapter() });

let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

Given("Settings page is loaded", () => {
  shallow(
    <Router>
      <Settings />
    </Router>
  );
});

When("When a particular tab is clicked", () => {
  wrapper = mount(
    <Router>
      <Settings />
    </Router>
  );
  act(async () => {
    let tab = wrapper.find("#settings-tab");
    if (tab) tab.simulate("click");
  });
});

Then("Respective page of the tab is opened", () => {
  let page = wrapper.find(
    <Router>
      <Settings />
    </Router>
  );
  page.exists();
});

//My Details Tab

Given("My Detail tab is present", () => {
  shallow(
    <Router>
      <Settings />
    </Router>
  );
});

When("{string} tab is clicked", (MyDetails) => {
  wrapper = mount(
    <Router>
      <Settings />
    </Router>
  );
  act(async () => {
    let tab = wrapper.find("#settings-tab");
    if (tab) tab.simulate("click");
  });
});

Then("Navigated to My Detail page", () => {
  let page = wrapper.find(
    <Router>
      <MyDetails />
    </Router>
  );
  page.exists();
});

Then(
  "Personal details like firstName, email, businessEmail,mobileNo are entered in the form",
  () => {
    act(async () => {
      let firstName = wrapper.find("#firstName");
      firstName.simulate("change", { target: { value: "john" } });
      firstName.exists();

      let email = wrapper.find("#email");
      email.simulate("change", { target: { value: "john@mail.com" } });
      email.exists();

      let businessEmail = wrapper.find("#businessEmail");
      businessEmail.simulate("change", { target: { value: "john@mail.com" } });
      businessEmail.exists();

      let mobileNo = wrapper.find("#mobileNo");
      mobileNo.simulate("change", { target: { value: "1234567890" } });
      mobileNo.exists();
    });
  }
);

Then("{string} button is clicked to update the data", (UpdateAndSave) => {
  wrapper = mount(
    <Router>
      <MyDetails />
    </Router>
  );
  act(async () => {
    let tab = wrapper.find("#update-save");
    if (tab) tab.simulate("click");
  });
});

//Restaurant Profile Tab

Given("Restaurant Profile tab is present", () => {
  shallow(
    <Router>
      <Settings />
    </Router>
  );
});

When("OnClick of {string} tab", (RestaurantProfile) => {
  wrapper = mount(
    <Router>
      <Settings />
    </Router>
  );
  act(async () => {
    let tab = wrapper.find("#settings-tab");
    if (tab) tab.simulate("click");
  });
});

Then("Restaurant Profile page is navigated", () => {
  let page = wrapper.find(
    <Router>
      <RestaurantProfile />
    </Router>
  );
  page.exists();
});

//Restaurant details Tab

Given("Restaurant details tab is rendered", () => {
  shallow(
    <Router>
      <RestaurantDetails />
    </Router>
  );
});

When(
  "Restaurant details like restaurant name, description and logo are entered",
  () => {
    wrapper = mount(
      <Router>
        <RestaurantDetails />
      </Router>
    );
    act(async () => {
      let restaurantName = wrapper.find("#restaurantName");
      restaurantName.simulate("change", { target: { value: "KFC" } });
      restaurantName.exists();

      let description = wrapper.find("#description");
      description.simulate("change", {
        target: {
          value: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      });
      description.exists();

      let logo = wrapper.find("#logo");
      logo.simulate("change", { target: { value: "logo" } });
      logo.exists();
    });
  }
);

Then(
  "{string} button is clicked to update restaurant name, description and logo",
  (UpdateAndSave) => {
    act(async () => {
      let tab = wrapper.find("#update-save");
      if (tab) tab.simulate("click");
    });
  }
);

//Cuisine details Tab

Given("Render Cuisine details tab", () => {
  shallow(
    <Router>
      <CuisineDetails />
    </Router>
  );
});

When("Cuisine available types and serving types checkbox are selected", () => {
  wrapper = mount(
    <Router>
      <RestaurantDetails />
    </Router>
  );
  act(async () => {
    let availableType = wrapper.find("#availableType");
    availableType.simulate("change", { target: { value: "Delivery" } });
    availableType.exists();

    let servingType = wrapper.find("#servingType");
    servingType.simulate("change", { target: { value: "Buffet" } });
    servingType.exists();
  });
});

Then(
  "{string} button is clicked to update Cuisine available types and serving types",
  (UpdateAndSave) => {
    act(async () => {
      let tab = wrapper.find("#update-save");
      if (tab) tab.simulate("click");
    });
  }
);

//Day & Time Tab

Given("Render DayTime tab", () => {
  shallow(
    <Router>
      <DayTime />
    </Router>
  );
});

When("Open and close time for every day is entered", () => {
  wrapper = mount(
    <Router>
      <DayTime />
    </Router>
  );
  act(async () => {
    let value = wrapper.find("#dayTime-data");
    value.simulate("change", { target: { value: "john" } });
    value.exists();
  });
});

Then(
  "{string} button is clicked to update Time for every day",
  (UpdateAndSave) => {
    act(async () => {
      let tab = wrapper.find("#update-save");
      if (tab) tab.simulate("click");
    });
  }
);

//Payment Tab

Given("Render Payment tab", () => {
  shallow(
    <Router>
      <PaymentMethod />
    </Router>
  );
});

When("Payment method is selected", () => {
  wrapper = mount(
    <Router>
      <PaymentMethod />
    </Router>
  );
  act(async () => {
    let value = wrapper.find("#payment-data");
    value.simulate("change", { target: { value: "Credit Card" } });
    value.exists();
  });
});

Then("{string} button is clicked to update Payment method", (UpdateAndSave) => {
  act(async () => {
    let tab = wrapper.find("#update-save");
    if (tab) tab.simulate("click");
  });
});

//Address Tab

Given("Render Address tab", () => {
  shallow(
    <Router>
      <Address />
    </Router>
  );
});

When("Outlet address is entered", () => {
  wrapper = mount(
    <Router>
      <Address />
    </Router>
  );
  act(async () => {
    let address = wrapper.find("#address");
    address.simulate("change", { target: { value: "23-1" } });
    address.exists();

    let city = wrapper.find("#city");
    city.simulate("change", { target: { value: "Coimbatore" } });
    city.exists(); 
    
    let country = wrapper.find("#country");
    country.simulate("change", { target: { value: "India" } });
    country.exists(); 

    let state = wrapper.find("#state");
    state.simulate("change", { target: { value: "Tamilnadu" } });
    state.exists(); 

    let zipcode = wrapper.find("#zipcode");
    zipcode.simulate("change", { target: { value: "641101" } });
    zipcode.exists(); 

    let deliveryZoneCode = wrapper.find("#deliveryZoneCode");
    deliveryZoneCode.simulate("change", { target: { value: "112233" } });
    deliveryZoneCode.exists(); 
  });
});

Then(
  "{string} button is clicked to update the outlet address",
  (UpdateAndSave) => {
    act(async () => {
      let tab = wrapper.find("#update-save");
      if (tab) tab.simulate("click");
    });
  }
);

//Images Tab

Given("Render Images tab", () => {
  shallow(
    <Router>
      <Images />
    </Router>
  );
});

When("New images can be uploaded", () => {
  wrapper = mount(
    <Router>
      <Images />
    </Router>
  );
  act(async () => {
    let value = wrapper.find("#images");
    value.simulate("change", { target: { value: "image" } });
    value.exists();
  });
});

Then(
  "{string} button is clicked to update with new images",
  (UpdateAndSave) => {
    act(async () => {
      let tab = wrapper.find("#update-save");
      if (tab) tab.simulate("click");
    });
  }
);

//Url Tab

Given("Render Url tab", () => {
  shallow(
    <Router>
      <Urls />
    </Router>
  );
});

When("Website url, social media url are added", () => {
  wrapper = mount(
    <Router>
      <Urls />
    </Router>
  );
  act(async () => {
    let website = wrapper.find("#websiteUrl");
    website.simulate("change", { target: { value: "www.kfc.com" } });
    website.exists();

    let business = wrapper.find("#businessUrl");
    business.simulate("change", { target: { value: "www.kfc.com" } });
    business.exists();

    let facebook = wrapper.find("#facebookUrl");
    facebook.simulate("change", { target: { value: "www.kfc.com" } });
    facebook.exists();

    let instagram = wrapper.find("#instagramUrl");
    instagram.simulate("change", { target: { value: "www.kfc.com" } });
    instagram.exists();
  });
});

Then("{string} button is clicked to update with Urls", (UpdateAndSave) => {
  act(async () => {
    let tab = wrapper.find("#update-save");
    if (tab) tab.simulate("click");
  });
});

//Password Tab

Given("Password tab is shown", () => {
  shallow(
    <Router>
      <Settings />
    </Router>
  );
});

When("Click the {string} tab", (Password) => {
  wrapper = mount(
    <Router>
      <Settings />
    </Router>
  );
  act(async () => {
    let tab = wrapper.find("#settings-tab");
    if (tab) tab.simulate("click");
  });
});

Then("Navigation to Password page is performed", () => {
  let page = wrapper.find(
    <Router>
      <Password />
    </Router>
  );
  page.exists();
});

Then("New Password can be created", () => {
  act(async () => {
    let currentPassword = wrapper.find("#currentPassword");
    currentPassword.simulate("change", { target: { value: "password" } });
    currentPassword.exists();

    let newPassword = wrapper.find("#newPassword");
    newPassword.simulate("change", { target: { value: "password1" } });
    newPassword.exists();

    let confirmPassword = wrapper.find("#confirmPassword");
    confirmPassword.simulate("change", { target: { value: "password1" } });
    confirmPassword.exists();
  });
});

Then("{string} button is clicked to update new password", (UpdateAndSave) => {
  wrapper = mount(
    <Router>
      <Password />
    </Router>
  );
  act(async () => {
    let tab = wrapper.find("#update-save");
    if (tab) tab.simulate("click");
  });
});

//Notification Tab

Given("Notifications tab is shown", () => {
  shallow(
    <Router>
      <Settings />
    </Router>
  );
});

When("onClick the {string} tab", (Notifications) => {
  wrapper = mount(
    <Router>
      <Settings />
    </Router>
  );
  act(async () => {
    let tab = wrapper.find("#settings-tab");
    if (tab) tab.simulate("click");
  });
});

Then("Navigation to Notifications page is done", () => {
  let page = wrapper.find(
    <Router>
      <Notifications />
    </Router>
  );
  page.exists();
});
