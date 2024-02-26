import React from "react";
import { expect } from "chai";
import { Given, When, Then } from "@cucumber/cucumber";
import Enzyme, { ReactWrapper, mount, shallow } from "enzyme";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Adapter from "@cfaester/enzyme-adapter-react-18";

import Overview from "../../src/pages/Home/views/OverView";
import OrderDetails from "../../src/pages/Home/components/OrderDetails";
import CustomerDetails from "../../src/pages/Home/views/CustomerDetails";
import PlaceNewOrder from "../../src/pages/Home/views/PlaceNewOrder";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});

global.document = dom.window.document;
global.window = dom.window;

Enzyme.configure({ adapter: new Adapter() });

let overview: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
let customer: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
let neworder: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

Given("I am on the overview page", () => {
  shallow(<Overview></Overview>);
});
When("I click on the customer name", () => {
  const wrapper = shallow(
    <Router>
      <Overview />
    </Router>
  );
  wrapper.find(".theadStyle");
  act(async () => {
    wrapper.simulate("click");
    wrapper.exists();
  });
});
Then("I should see the customer order details", () => {
  shallow(
    <Router>
      <OrderDetails />
    </Router>
  );
});
Given("I am on the order details page", () => {});
Then("I click the edit button", async () => {
  overview = mount(
    <Router>
      <Overview />
    </Router>
  );
  act(async () => {
    let editBtn = overview.find(".editorder");
    editBtn.simulate("click");
  });
});
Then("I should be see to the order edit page", () => {
  overview.exists();
});

When("I click the {string} button", async (viewDeatils) => {
  let viewCostomer = overview.find("[href='/customer-details']").children();
  viewCostomer.exists();
  overview.exists(<CustomerDetails />);
});
Then(
  "I should see the customer name, order ID, email, phone, address, paid via, order status",
  () => {
    customer = mount(
      <Router>
        <CustomerDetails></CustomerDetails>
      </Router>
    );

    customer.exists();
  }
);
Then("I should see the order details", () => {
  customer.exists(<OrderDetails />);
});

Then("click to {string} button go to home page", async (goToHome) => {
  let backButton = customer.find("#click-back");
  backButton.exists();
});

Given("I am on the add new order page", () => {
  neworder = mount(
    <Router>
      <PlaceNewOrder></PlaceNewOrder>
    </Router>
  );
});

When("I click the incerment button incerment the quantity", () => {
  const incr = neworder.find("#qty-incerment");
  incr.exists();
});

When("I click the decerment button decerment the quantity", () => {
  const dec = neworder.find("#qty-decerment");
  dec.exists();
});

When("I click the Add button add order details page", () => {
  const add = neworder.find("#add-new-item");
  add.exists();
});
