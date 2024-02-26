import { Link } from "react-router-dom";

import BaseButton from "../../../common/components/controls/BaseButton";

import { faPlus } from "../../../common/ui/Icons/Icons";

const BeforeOrderTemplate = () => {
  const Icon = "icon";
  const Icon1 = "icon1";

  return (
    <div className="text-center position-relative">
      <div>
        <img
          className="default-image"
          src={require(`../../../assets/orderPreview/${Icon1}.svg`)}
          alt="status"
          width="250px"
        />
      </div>

      <div>
        <img
          src={require(`../../../assets/orderPreview/${Icon}.svg`)}
          alt="status"
          width="250px"
        />
        <div className="position-absolute top-50 start-50 translate-middle mt-5">
          <p className="mb-0"> Tap to see order</p>
          <p>details</p>
          <img
            src={require("../../../assets/Frame.png")}
            alt="logo"
            width={50}
          />
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-end mb-3">
        <Link to={"/place-new-order"}>
          <BaseButton
            name="Place new order"
            types="button"
            defaultClass="btn btn-warning rounded-pill hover-pill py-2 me-3"
            icon={faPlus}
            iconPosition="after"
          />
        </Link>
      </div>
    </div>
  );
};

export default BeforeOrderTemplate;
