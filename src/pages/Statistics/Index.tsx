import React, { useEffect } from "react";

import OrderStatistics from "./components/OrderStatistics";
import ChartStatistics from "./components/ChartStatistics";
import { ListItem } from "../../common/models";

const Statistics: React.FC = () => {
  const dropdownResponse: ListItem[] = [];

  useEffect(() => {
    let item: ListItem = new ListItem();
    if (item) {
      item.text = "Monday";
      item.value = "Monday";
      dropdownResponse.push(item);
      item = new ListItem();
      item.text = "Tuesday";
      item.value = "Tuesday";
      dropdownResponse.push(item);
      item = new ListItem();
      item.text = "Wednesday";
      item.value = "Wednesday";
      dropdownResponse.push(item);
      item = new ListItem();
      item.text = "Thursday";
      item.value = "Thursday";
      dropdownResponse.push(item);
      item = new ListItem();
      item.text = "Friday";
      item.value = "Friday";
      dropdownResponse.push(item);
      item = new ListItem();
      item.text = "Saturday ";
      item.value = "Saturday ";
      dropdownResponse.push(item);
      item = new ListItem();
      item.text = "Sunday ";
      item.value = "Sunday ";
      dropdownResponse.push(item);
    }
  }, []);

  return (
    <>
      <div className="row g-0 px-4 vh-100">
        <div className="col-md-8 px-4">
          <div>
            <OrderStatistics />
          </div>
          <div className="mt-4"></div>
          <div>
            <ChartStatistics />
          </div>
        </div>
        <div className="col-md-4 px-4 mt-3">
          <h3 className="text-center mb-4">Top Selling</h3>
          <div className="card mb-3 border-0 rounded-1">
            <div className="card-body">
              <h6 className="card-title">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
              <h6 className="card-title mt-3">
                <span className="badge text-bg-secondary me-2">4</span>card
                title
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
