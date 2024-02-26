import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Enzyme, { ReactWrapper, shallow, mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";

import { act } from "react-dom/test-utils";

import { Given, When, Then } from "@cucumber/cucumber";

import Login from "../../src/pages/Login/Index";
import Home from "../../src/pages/Home/Index";

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});

global.document = dom.window.document;
global.window = dom.window;

Enzyme.configure({ adapter: new Adapter() });

let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

Given("User is on the login page", () => {
  shallow(
    <Router>
      <Login />
    </Router>
  );
});

When("User enters a valide username", () => {
  wrapper = mount(
    <Router>
      <Login />
    </Router>
  );
  act(async () => {
    const emailInput = wrapper.find("#email");
    emailInput.simulate("change", { target: { value: "john" } });
  });
});

When("User enters a valid password", () => {
  wrapper = mount(
    <Router>
      <Login />
    </Router>
  );
  act(async () => {
    const passwordInput = wrapper.find("#password");
    passwordInput.simulate("change", { target: { value: "password" } });
  });
});

When("User clicks {string} button", (login) => {
  act(async () => {
    const loginButton = wrapper.find("#login");
    loginButton.simulate("click");
  });
});

Then("User is logged into home page", () => {
  let page = wrapper.find(
    <Router>
      <Home />
    </Router>
  );
  page.exists();
});
