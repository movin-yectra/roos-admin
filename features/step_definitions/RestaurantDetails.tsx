import React from "react";
import { Given, When, Then } from "@cucumber/cucumber";
import Enzyme, { ReactWrapper, mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Adapter from "@cfaester/enzyme-adapter-react-18";

import RestaurantDetails from "../../src/pages/RestaurantDetails/views/RestaurantDetails";
import CuisineDetails from "../../src/pages/RestaurantDetails/views/CuisineDetails";
import PaymentMethods from "../../src/pages/RestaurantDetails/views/PaymentMethods";
import AddressDetails from "../../src/pages/RestaurantDetails/views/AddressDetails";
import RestaurantPictures from "../../src/pages/RestaurantDetails/views/RestaurantPictures";
import RestaurantUrls from "../../src/pages/RestaurantDetails/views/RestaurantUrls";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});

global.document = dom.window.document;
global.window = dom.window;

Enzyme.configure({ adapter: new Adapter() });

let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

/////////////////////////////////////////////

Given("render the restaurant details page", () => {
  wrapper = mount(
    <BrowserRouter>
      <RestaurantDetails />
    </BrowserRouter>
  );
});
When("click the image container", () => {
  act(async () => {
    let value = wrapper.find("#restaurant-image");
    value.simulate("click");
    value.exists();
  });
});
Then("enter the name", () => {
  act(async () => {
    let value = wrapper.find("#restaurant-name");
    value.simulate("change", { target: { value: "john" } });
    value.exists();
  });
});
Then("enter the description", () => {
  act(async () => {
    let value = wrapper.find("#restaurant-description");
    value.simulate("change", { target: { value: "Description" } });
    value.exists();
  });
});
Then("click to Coming up: cuisine details button", () => {
  act(async () => {
    let value = wrapper.find("#coming-up-duisine");
    value.simulate("click");
    value.exists();
  });
});
// ///////////////////////////////////////////

Given("render the serving details page", () => {
  wrapper = mount(
    <BrowserRouter>
      <CuisineDetails />
    </BrowserRouter>
  );
});

When("click to available type checkbox", () => {
  act(async () => {
    let value = wrapper.find("#available-type");
    value.simulate("change", { target: { value: "DELIVERY" } });
    value.exists();
  });
});

Then("click to serving type checkbox", () => {
  act(async () => {
    let value = wrapper.find("#serving-type");
    value.simulate("change", { target: { value: "BUFFET" } });
    value.exists();
  });
});

Then("click to Coming up: day&time button", () => {
  act(async () => {
    let value = wrapper.find("#coming-up-date-time");
    value.simulate("click");
    value.exists();
  });
});

Then("click to back button go to restaurant details page", () => {
  act(async () => {
    let value = wrapper.find("#back");
    value.simulate("click");
    value.exists();
  });
});

////////////////////////////////////////////////

Given("render the payment methods page", () => {
  wrapper = mount(
    <BrowserRouter>
      <PaymentMethods />
    </BrowserRouter>
  );
});

When("click to payment type checkbox", () => {
  act(async () => {
    let value = wrapper.find("#payment-type");
    value.simulate("change", { target: { value: "CREDIT CARD" } });
    value.exists();
  });
});

Then("click to Coming up: address-details button", () => {
  act(async () => {
    let value = wrapper.find("#coming-up-address");
    value.simulate("click");
    value.exists();
  });
});
Then("click to back button go to date and time page", () => {
  act(async () => {
    let value = wrapper.find("#back");
    value.simulate("click");
    value.exists();
  });
});

//////////////////////////////////////////////////

Given("render the address page", () => {
  wrapper = mount(
    <BrowserRouter>
      <AddressDetails />
    </BrowserRouter>
  );
});
When("enter to address, city, countery, state, zipcode, deliveryZone", () => {
  act(async () => {
    let adress = wrapper
      .find("#adress")
      .simulate("change", { target: { value: "adress" } });
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
    let deliveryZone = wrapper
      .find("#deliveryZone")
      .simulate("change", { target: { value: "deliveryZone" } });
    adress.exists();
    city.exists();
    countery.exists();
    state.exists();
    zipcode.exists();
    deliveryZone.exists();
  });
});
Then("click to Coming up: Restaurant image button", () => {
  act(async () => {
    let value = wrapper.find("#restaurant-image");
    value.simulate("click");
    value.exists();
  });
});
Then("click to back button go to payment methods page", () => {
  act(async () => {
    let value = wrapper.find("#back");
    value.simulate("click");
    value.exists();
  });
});

//////////////////////////////////////////////////

Given("render the restaurant pictures page", () => {
  wrapper = mount(
    <BrowserRouter>
      <RestaurantPictures />
    </BrowserRouter>
  );
});

When("click to Coming up: website urls button", () => {
  act(async () => {
    let value = wrapper.find("#website-urls");
    value.simulate("click");
    value.exists();
  });
});

Then("click to back button go to address page", () => {
  act(async () => {
    let value = wrapper.find("#back");
    value.simulate("click");
    value.exists();
  });
});

/////////////////////////////////////////////////

Given("render the restaurant-urls page", () => {
  wrapper = mount(
    <BrowserRouter>
      <RestaurantUrls />
    </BrowserRouter>
  );
});

When("enter to website, business, facebook, instagram", () => {
  act(async () => {
    let website = wrapper
      .find("#website")
      .simulate("change", { target: { value: "website" } });
    let business = wrapper
      .find("#business")
      .simulate("change", { target: { value: "business" } });
    let facebook = wrapper
      .find("#facebook")
      .simulate("change", { target: { value: "facebook" } });
    let instagram = wrapper
      .find("#instagram")
      .simulate("change", { target: { value: "instagram" } });
    website.exists();
    business.exists();
    facebook.exists();
    instagram.exists();
  });
});

Then("click to done button", () => {
  act(async () => {
    let value = wrapper.find("#done");
    value.simulate("click");
    value.exists();
  });
});

Then("click to back button go to restaurant pictures page", () => {
  act(async () => {
    let value = wrapper.find("#back");
    value.simulate("click");
    value.exists();
  });
});
