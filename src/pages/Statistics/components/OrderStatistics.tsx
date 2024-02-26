import React from "react";
import BaseIcon from "../../../common/components/ui/BaseIcon";
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "../../../common/ui/Icons/Icons";

const OrderStatistics = () => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div
          className="card border-0 rounded-1 bg-lightGreen p-2"
          style={{ width: "30%" }}
        >
          <div className="row g-0 align-items-center  ">
            <div className="col-md-8">
              <h6 className="card-title">Food orders</h6>
              <p className="card-text m-0">
                <small className="text-muted">Total $45667</small>
              </p>
            </div>
            <div className="col-md-4">
              <div className="card-body bg-light p-1 m-0 text-center rounded-1">
                <p className="card-text m-0">
                  <small>Today</small>
                </p>
                <p className="card-text m-0">
                  <small className="text-muted">
                    <BaseIcon
                      icon={faArrowTrendUp}
                      classes="text-success fs-9"
                    />{" "}
                    422
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card border-0 rounded-1 bg-lightGreen p-2"
          style={{ width: "30%" }}
        >
          <div className="row g-0 align-items-center  ">
            <div className="col-md-8">
              <h6 className="card-title">Total revenue</h6>
              <p className="card-text m-0">
                <small className="text-muted">Total $45667</small>
              </p>
            </div>
            <div className="col-md-4">
              <div className="card-body bg-light p-1 m-0 text-center rounded-1">
                <p className="card-text m-0">
                  <small>Today</small>
                </p>
                <p className="card-text m-0">
                  <small className="text-muted">
                    <BaseIcon
                      icon={faArrowTrendDown}
                      classes="text-danger fs-9"
                    />{" "}
                    2.4%
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card border-0 rounded-1 bg-lightGreen p-2"
          style={{ width: "30%" }}
        >
          <div className="row g-0 align-items-center  ">
            <div className="col-md-8">
              <h6 className="card-title">Food orders</h6>
              <p className="card-text m-0">
                <small className="text-muted">Total $45667</small>
              </p>
            </div>
            <div className="col-md-4">
              <div className="card-body bg-light p-1 m-0 text-center rounded-1">
                <p className="card-text m-0">
                  <small>Today</small>
                </p>
                <p className="card-text m-0">
                  <small className="text-muted">
                    <BaseIcon
                      icon={faArrowTrendDown}
                      classes="text-danger fs-9"
                    />{" "}
                    2.4%
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderStatistics;
