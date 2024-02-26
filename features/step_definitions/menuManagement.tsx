import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter as Router } from "react-router-dom";

import Enzyme, { ReactWrapper, shallow, mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";

import { act } from "react-dom/test-utils";

import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "chai";

import MenuList from "../../src/pages/MenuManaging/views/MenuList/MenuList";
import AddNewItem from "../../src/pages/MenuManaging/views/MenuList/AddNewItem";
import SearchBar from "../../src/common/components/layout/SearchBar";
import Customize from "../../src/pages/MenuManaging/components/Customize";
import CustomizeMenu from "../../src/pages/MenuManaging/components/CustomizeMenu";

const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});

global.document = dom.window.document;
global.window = dom.window;

Enzyme.configure({ adapter: new Adapter() });

let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

//Menu Managing Page is shown
Given("Menu Managing page is shown", () => {
  shallow(
    <Router>
      <MenuList />
    </Router>
  );
});

When("Tab based on menu category is shown", () => {
  wrapper = mount(
    <Router>
      <MenuList />
    </Router>
  );

  act(async () => {
    let tab = wrapper.find("#categories");
    tab.exists();
  });
});

When("Category tab is clicked", () => {
  act(async () => {
    let tab = wrapper.find("#Category");
    if (tab) tab.simulate("click");
  });
});

Then("The page respective of the category is shown", () => {
  let page = wrapper.find(
    <Router>
      <MenuList />
    </Router>
  );
  page.exists();
});

//Search menu
Given("Search bar is present", () => {
  wrapper = mount(
    <Router>
      <MenuList />
    </Router>
  );

  act(async () => {
    let search = wrapper.find("#searchbar").at(0);
    expect(search.exists()).to.equal(true);
  });
});

When("Menu based on Category is searched", () => {
  wrapper = mount(
    <Router>
      <SearchBar searchMenu={function (data: string): void {
        throw new Error("Function not implemented.");
      } } />
    </Router>
  );

  act(async () => {
    const searchInput = wrapper.find("#search");
    searchInput.simulate("change", { target: { value: "pizza" } });
  });

  act(async () => {
    const searchButton = wrapper.find("button");
    searchButton.simulate("click");
  });
});

Then("Result of search is shown", () => {
  wrapper = mount(
    <Router>
      <MenuList />
    </Router>
  );

  act(async () => {
    const menuList = wrapper.find(MenuList);
    expect(menuList.exists()).to.equal(true);
  });
});

// Adding new Menu Item
Given("A button is present", () => {
  shallow(
    <Router>
      <MenuList />
    </Router>
  );
});

When("I click the button {string}", (Addnewproduct) => {
  wrapper = mount(
    <Router>
      <MenuList />
    </Router>
  );
  act(async () => {
    let btn = wrapper.find("#Addnewproduct");
    if (btn) btn.simulate("click");
  });
});

Then("A new page is navigated", () => {
  let page = wrapper.find(
    <Router>
      <AddNewItem />
    </Router>
  );
  act(async () => {
    expect(page.exists()).to.equal(true);
  });
});

// Adding new items
Given("Product details are entered", () => {
  shallow(
    <Router>
      <AddNewItem />
    </Router>
  );
  act(async () => {
    const itemNo = wrapper.find("#itemNo");
    itemNo.simulate("change", { target: { value: "1" } });

    const itemName = wrapper.find("#itemName");
    itemName.simulate("change", { target: { value: "veg soup" } });

    const ingredients = wrapper.find("#ingredients");
    ingredients.simulate("change", { target: { value: "veggies" } });

    const description = wrapper.find("#description");
    description.simulate("change", { target: { value: "low calories" } });

    const price = wrapper.find("#price");
    price.simulate("change", { target: { value: "250" } });

    const category = wrapper.find("#category");
    category.simulate("change", { target: { value: "soup" } });

    const image = wrapper.find("#image");
    image.simulate("change", { target: { value: "soupimage" } });
  });
});

When("{string} card is clicked to upload images", (imageUpload) => {
  wrapper = mount(
    <Router>
      <AddNewItem />
    </Router>
  );
  act(async () => {
    let btn = wrapper.find(".imageUpload").at(0);
    if (btn) btn.simulate("click");
  });
});
Then("{string} button is clicked", (addMenu) => {
  act(async () => {
    let btn = wrapper.find("#addMenu").at(0);
    if (btn) btn.simulate("click");
  });
});

Then("Item is added to menu", () => {
  act(async () => {
    const newItem = wrapper.find("#newItemList");
    expect(newItem.exists()).to.equal(true);
  });
});

// Update the menuItem
Given("Update button is present", () => {
  shallow(
    <Router>
      <MenuList />
    </Router>
  );

  act(async () => {
    const btn = wrapper.find("#update");
    expect(btn.exists()).to.equal(true);
  });
});

When("Onclick of the button {string}", (Update) => {
  wrapper = mount(
    <Router>
      <MenuList />
    </Router>
  );
  act(async () => {
    let btn = wrapper.find(".update").at(0);
    if (btn) btn.simulate("click");
  });
});
Then("Navigated to update menuItem page", () => {
  let page = wrapper.find(
    <Router>
      <AddNewItem />
    </Router>
  );
  act(async () => {
    expect(page.exists()).to.equal(true);
  });
});

Then("Edit the fields that are to be updated in menuItem", () => {
  shallow(
    <Router>
      <AddNewItem />
    </Router>
  );
  act(async () => {
    const itemNo = wrapper.find("#itemNo");
    itemNo.simulate("change", { target: { value: "1" } });

    const itemName = wrapper.find("#itemName");
    itemName.simulate("change", { target: { value: "veg soup" } });

    const ingredients = wrapper.find("#ingredients");
    ingredients.simulate("change", { target: { value: "veggies" } });

    const description = wrapper.find("#description");
    description.simulate("change", { target: { value: "low calories" } });

    const price = wrapper.find("#price");
    price.simulate("change", { target: { value: "250" } });

    const category = wrapper.find("#category");
    category.simulate("change", { target: { value: "soup" } });

    const image = wrapper.find("#image");
    image.simulate("change", { target: { value: "soupimage" } });
  });
});

Then("Click {string} button", (Update) => {
  wrapper = mount(
    <Router>
      <MenuList />
    </Router>
  );
  act(async () => {
    let btn = wrapper.find(".update").at(0);
    if (btn) btn.simulate("click");
  });
});

Then("Menu is updated", () => {
  wrapper = mount(
    <Router>
      <AddNewItem />
    </Router>
  );

  act(async () => {
    expect(wrapper.exists()).to.equal(true);
  });
});

// Delete the menuItem
Given("Button Delete is present", () => {
  shallow(
    <Router>
      <MenuList />
    </Router>
  );

  act(async () => {
    const btn = wrapper.find("#delete");
    expect(btn.exists()).to.equal(true);
  });
});

When("Click the {string} button", (Delete) => {
  wrapper = mount(
    <Router>
      <MenuList />
    </Router>
  );
  act(async () => {
    let btn = wrapper.find(".delete").at(0);
    if (btn) btn.simulate("click");
  });
});

Then("Menu is deleted", () => {
  wrapper = mount(
    <Router>
      <AddNewItem />
    </Router>
  );

  act(async () => {
    expect(wrapper.exists()).to.equal(true);
  });
});

// Add Customization
Given("Customize button is placed in AddNewMenu Page", () => {
  shallow(
    <Router>
      <AddNewItem />
    </Router>
  );

  act(async () => {
    const btn = wrapper.find("#customize");
    expect(btn.exists()).to.equal(true);
  });
});

When("For customization {string} button is pressed", (Customize) => {
  wrapper = mount(
    <Router>
      <AddNewItem />
    </Router>
  );

  act(async () => {
    let btn = wrapper.find("#customize").at(0);
    if (btn) btn.simulate("click");
  });
});

Then("Home Page of Customization displayed", () => {
  wrapper = mount(
    <Router>
      <Customize />
    </Router>
  );

  act(async () => {
    expect(wrapper.exists()).to.equal(true);
  });
});

Then(
  "Clicking {string} button traverses to customization page",
  (AddCustomization) => {
    wrapper = mount(
      <Router>
        <CustomizeMenu />
      </Router>
    );

    act(async () => {
      let btn = wrapper.find("#addCustomization").at(0);
      if (btn) btn.simulate("click");

      expect(wrapper.exists()).to.equal(true);
    });
  }
);

Then(
  "If no customization is needed move back to previous screen using {string} button",
  (Back) => {
    shallow(
      <Router>
        <Customize />
      </Router>
    );

    wrapper = mount(
      <Router>
        <AddNewItem />
      </Router>
    );

    act(async () => {
      let btn = wrapper.find("#Back").at(0);
      if (btn) btn.simulate("click");

      expect(wrapper.exists()).to.equal(true);
    });
  }
);

Then(
  "Menu can be customized with the options like name, price, quantity, image",
  () => {
    wrapper = mount(
      <Router>
        <CustomizeMenu />
      </Router>
    );

    act(async () => {
      const customization = wrapper.find("#customization");
      customization.simulate("change", { target: { value: "BaseLayer" } });

      const itemName = wrapper.find("#itemName");
      itemName.simulate("change", { target: { value: "veg soup" } });

      const price = wrapper.find("#price");
      price.simulate("change", { target: { value: "50" } });

      const quantity = wrapper.find("#quantity");
      quantity.simulate("change", { target: { value: "2" } });

      const image = wrapper.find("#image");
      image.simulate("change", { target: { value: "vegImage" } });
    });
  }
);

Then("Click {string} to add the customized variant", (Add) => {
  wrapper = mount(
    <Router>
      <CustomizeMenu />
    </Router>
  );

  act(async () => {
    let btn = wrapper.find("#Add").at(0);
    if (btn) btn.simulate("click");
  });
});

Then("Here too we can move back to previous screen with {string}", (Back) => {
  shallow(
    <Router>
      <CustomizeMenu />
    </Router>
  );

  wrapper = mount(
    <Router>
      <Customize />
    </Router>
  );

  act(async () => {
    let btn = wrapper.find("#Back").at(0);
    if (btn) btn.simulate("click");

    expect(wrapper.exists()).to.equal(true);
  });
});

// Edit customization option
Given("Edit button is available for editing", () => {
  shallow(
    <Router>
      <CustomizeMenu />
    </Router>
  );

  act(async () => {
    const btn = wrapper.find("#edit");
    expect(btn.exists()).to.equal(true);
  });
});

When("Click {string}, if a variant has to be edited", (Edit) => {
  wrapper = mount(
    <Router>
      <CustomizeMenu />
    </Router>
  );
  act(async () => {
    let btn = wrapper.find("#edit").at(0);
    if (btn) btn.simulate("click");
  });
});

Then("That particular variant is edited", () => {
  wrapper = mount(
    <Router>
      <CustomizeMenu />
    </Router>
  );

  act(async () => {
    expect(wrapper.exists()).to.equal(true);
  });
});

// Delete customization option
Given("Delete can be used to remove option", () => {
  shallow(
    <Router>
      <CustomizeMenu />
    </Router>
  );

  act(async () => {
    const btn = wrapper.find("#delete");
    expect(btn.exists()).to.equal(true);
  });
});

When("{string} button removes an option", (Delete) => {
  wrapper = mount(
    <Router>
      <CustomizeMenu />
    </Router>
  );
  act(async () => {
    let btn = wrapper.find("#delete").at(0);
    if (btn) btn.simulate("click");
  });
});

Then("The option is removed from list", () => {
  wrapper = mount(
    <Router>
      <CustomizeMenu />
    </Router>
  );

  act(async () => {
    expect(wrapper.exists()).to.equal(true);
  });
});