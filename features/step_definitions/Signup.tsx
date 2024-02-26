import React from "react";

import { BrowserRouter } from "react-router-dom";
import Enzyme, { ReactWrapper, mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { act } from "react-dom/test-utils";
import { Given, When, Then } from "@cucumber/cucumber";

import RestaurantSignup from "../../src/pages/SignUp/views/RestaurantSignup";
import RestaurantDetails from "../../src/pages/SignUp/views/RestaurantDetails";
import AddressDeatils from "../../src/pages/SignUp/views/AddressDeatils";
import Payment from "../../src/pages/SignUp/views/Payment";
import Success from "../../src/pages/SignUp/views/SuccessPage";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});

global.document = dom.window.document;
global.window = dom.window;

Enzyme.configure({ adapter: new Adapter() });

let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

Given("User is on the signup page", () => {
  wrapper = mount(
    <BrowserRouter>
      <RestaurantSignup />
    </BrowserRouter>
  );
});

When(
  "User enters a valide userName, businessEmail, userEmail, mobileNumber, categoryType",
  () => {
    act(async () => {
      let adress = wrapper
        .find("#userName")
        .simulate("change", { target: { value: "userName" } });
      let businessEmail = wrapper
        .find("#businessEmail")
        .simulate("change", { target: { value: "businessEmail" } });
      let userEmail = wrapper
        .find("#userEmail")
        .simulate("change", { target: { value: "userEmail" } });
      let mobileNumber = wrapper
        .find("#mobileNumber")
        .simulate("change", { target: { value: "mobileNumber" } });
      let categoryType = wrapper
        .find("#categoryType")
        .simulate("change", { target: { value: "categoryType" } });
      adress.exists();
      businessEmail.exists();
      userEmail.exists();
      mobileNumber.exists();
      categoryType.exists();
    });
  }
);

Then("User clicks the {string} button in personalDetails page", (name) => {
  act(async () => {
    let value = wrapper.find({ name });
    value.simulate("click");
    value.exists();
  });
});

Given("User is on the signup details page", () => {
  wrapper = mount(
    <BrowserRouter>
      <RestaurantDetails />
    </BrowserRouter>
  );
});

When(
  "User enters a valide restaurantName, websiteUrl, avaliableType, restaurantType",
  () => {
    act(async () => {
      let restaurantName = wrapper
        .find("#restaurantName")
        .simulate("change", { target: { value: "restaurantName" } });
      let websiteUrl = wrapper
        .find("#websiteUrl")
        .simulate("change", { target: { value: "websiteUrl" } });
      let avaliableType = wrapper
        .find("#avaliableType")
        .simulate("change", { target: { value: "avaliableType" } });
      let restaurantType = wrapper
        .find("#restaurantType")
        .simulate("change", { target: { value: "restaurantType" } });

      restaurantName.exists();
      websiteUrl.exists();
      avaliableType.exists();
      restaurantType.exists();
    });
  }
);

Then("User clicks the {string} button in restaurantDetails page", (name) => {
  act(async () => {
    let value = wrapper.find({ name });
    value.simulate("click");
    value.exists();
  });
});

Given("User is on the signup address page", () => {
  wrapper = mount(
    <BrowserRouter>
      <AddressDeatils />
    </BrowserRouter>
  );
});

When("User enters a valide address, city, state, country, zipcode", () => {
  act(async () => {
    let address = wrapper
      .find("#address")
      .simulate("change", { target: { value: "address" } });
    let city = wrapper
      .find("#city")
      .simulate("change", { target: { value: "city" } });
    let countery = wrapper
      .find("#country")
      .simulate("change", { target: { value: "country" } });
    let state = wrapper
      .find("#state")
      .simulate("change", { target: { value: "state" } });
    let zipcode = wrapper
      .find("#zipcode")
      .simulate("change", { target: { value: "zipcode" } });
    address.exists();
    city.exists();
    countery.exists();
    state.exists();
    zipcode.exists();
  });
});

Then("User clicks the {string} button in restaurantAddress page", (name) => {
  act(async () => {
    let value = wrapper.find({ name });
    value.simulate("click");
    value.exists();
  });
});

Given("User is on the signup payment page", () => {
  wrapper = mount(
    <BrowserRouter>
      <Payment />
    </BrowserRouter>
  );
});

When(
  "User enters card details like card number, valid date, cardHolder name",
  () => {
    act(async () => {
      let cardNumber = wrapper
        .find("#cardNumber")
        .simulate("change", { target: { value: "cardNumber" } });
      let validDate = wrapper
        .find("#validDate")
        .simulate("change", { target: { value: "validDate" } });
      let cardHolderName = wrapper
        .find("#cardHolderName")
        .simulate("change", { target: { value: "cardHolderName" } });

      cardNumber.exists();
      validDate.exists();
      cardHolderName.exists();
    });
  }
);

Then("Onclick of {string} button", (name) => {
  act(async () => {
    let value = wrapper.find({ name });
    value.simulate("click");
    value.exists();
  });
});

Then("Navigated to success page", () => {
  wrapper = mount(
    <BrowserRouter>
      <Success />
    </BrowserRouter>
  );
});
