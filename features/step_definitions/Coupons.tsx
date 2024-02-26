import React from "react";

import { BrowserRouter } from "react-router-dom";
import Enzyme, { ReactWrapper, mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { act } from "react-dom/test-utils";
import { Given, When, Then } from "@cucumber/cucumber";

//components
import CouponsList from "../../src/pages/Coupens/views/CouponsList";
import CreateCoupons from "../../src/pages/Coupens/views/CreateCoupons";
import CouponCanvas from "../../src/pages/Coupens/components/CouponCanvas";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});

global.document = dom.window.document;
global.window = dom.window;

Enzyme.configure({ adapter: new Adapter() });

let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

//// Definition Coupons List page
Given("render the coupons list page", () => {
  wrapper = mount(
    <BrowserRouter>
      <CouponsList />
    </BrowserRouter>
  );
});
When("click the {string} button", (name) => {
  act(async () => {
    let value = wrapper.find({ name });
    value.simulate("click");
    value.exists();
  });
});

//// Definition Create Coupons page
Given("render the create coupons page", () => {
  wrapper = mount(
    <BrowserRouter>
      <CreateCoupons />
    </BrowserRouter>
  );
});
When("click to enable/disable coupon type checkbox", () => {
  act(async () => {
    let value = wrapper.find("#enable/disable-coupon");
    value.simulate("change", { target: { value: true } });
    value.exists();
  });
});
When("click to Offer applicable to all items type checkbox", () => {
  act(async () => {
    let value = wrapper.find("#Offer-applicable-to-all-items");
    value.simulate("change", { target: { value: true } });
    value.exists();
  });
});
Then(
  "enter to coupon code, upload logo, discount type, Amount ,start date, end date",
  () => {
    act(async () => {
      let value = wrapper.find("#coupon-code");
      value.simulate("change", { target: { value: "WOW" } });
      value.exists();
    });
    act(async () => {
      let value = wrapper.find("#coupon-image");
      value.simulate("click");
      value.exists();
    });
    act(async () => {
      let value = wrapper.find("#discount-type");
      value.simulate("change", { target: { value: "Percentage discount" } });
      value.exists();
    });
    act(async () => {
      let value = wrapper.find("#amount");
      value.simulate("change", { target: { value: "45$" } });
      value.exists();
    });
    act(async () => {
      let value = wrapper.find("#start-date");
      value.simulate("change", { target: { value: "17-09-1988" } });
      value.exists();
    });
    act(async () => {
      let value = wrapper.find("#end-date");
      value.simulate("change", { target: { value: "10-09-1988" } });
      value.exists();
    });
  }
);
Then(
  "click to select products applicable for offer cook icon open offcanvas and select checkbox",
  () => {
    wrapper = mount(
      <BrowserRouter>
        <CouponCanvas
          onGetSelectedItems={function (selectedItems: any): void {
            throw new Error("Function not implemented.");
          }}
        />
      </BrowserRouter>
    );
    act(async () => {
      let value = wrapper.find("#select-product");
      value.simulate("click", { target: { value: "pizza" } });
      value.exists();
    });
  }
);
Then("enter to description", () => {
  act(async () => {
    let value = wrapper.find("#coupons-description");
    value.simulate("change", { target: { value: "Description" } });
    value.exists();
  });
});
Then("click to {string}", () => {
  act(async () => {
    let value = wrapper.find("#create-coupon");
    value.simulate("click");
    value.exists();
  });
});

//// Definition Create Coupons page
Given("render the create coupons details", () => {
  wrapper = mount(
    <BrowserRouter>
      <CouponsList />
    </BrowserRouter>
  );
});
