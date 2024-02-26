import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//custom components
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseIcon from "../../../common/components/ui/BaseIcon";

//icons
import { faCheck } from "../../../common/ui/Icons/Icons";

//serives
import { RestaeurantSignupServices } from "../services";
import { useAppAlert } from "../../../common/hooks/useAppAlert";
import BaseSpinner from "../../../common/components/ui/BaseSpinner";

const stripePromise = loadStripe(
  "pk_test_51NaBYtSISltPdh7I76W9fT2j1bDkZgOGFROyMQ1W8Rc0rj75vsIrgcvmOBNbRcvp0IF3c5iI6kSgtlvYqiROTWsn007p0ql6Ro"
);

const Payment: React.FC = () => {
  const stripe = useStripe();
  const elements: any = useElements();
  const { setIsLoading } = useAppAlert();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url:
            "https://roos-admin-panel.web.app/payment/payment-success",
        },
        redirect: "always",
      })
      .then((response) => {
        if (response) {
          setIsLoading(false);
        }
      });
  };
  return (
    <div className="row g-0">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="col-md-6 restaurant-left-bg p-4 d-flex flex-column vh-100 "
      >
        <h2 className="w-75 fw-semibold">
          Manage All Your Restaurant needs at one place.
        </h2>
        <div className="p-4">
          <PaymentElement />
          <div className="mt-5">
            <BaseButton
              types="submit"
              name="Pay now"
              defaultClass="btn btn-warning px-3 py-2 w-100"
              handleClick={(e) => handleSubmit(e)}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="col-md-6 restaurant-right-bg vh-100"
      >
        <div className="card m-auto w-75 mt-5 rounded-1 border-0 shadow p-4">
          <div className="card-header bg-white border-bottom-0 text-center">
            <h4 className="fw-semibold">Order Summary</h4>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="fw-semibold">Business plan</h6>
                <small className="text-secondary">200*12</small>
              </div>
              <div className="text-end">
                <h6 className="fw-semibold">$165/Mon</h6>
                <small className="text-secondary">$456</small>
              </div>
            </div>
            <div className="mt-3 border-dahsed pb-3">
              <small className="align-items-center d-block">
                <BaseIcon icon={faCheck} classes="text-success " /> sample text
                inputsample text input
              </small>
              <small className="align-items-center d-block">
                <BaseIcon icon={faCheck} classes="text-success " /> sample text
                inputsample text input
              </small>
              <small className="align-items-center d-block">
                <BaseIcon icon={faCheck} classes="text-success " /> sample text
                inputsample text input
              </small>
              <small className="align-items-center d-block">
                <BaseIcon icon={faCheck} classes="text-success " /> sample text
                inputsample text input
              </small>
              <small className="align-items-center d-block">
                <BaseIcon icon={faCheck} classes="text-success " /> sample text
                inputsample text input
              </small>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4 border-2 border-bottom pb-3">
              <div className="text-secondary">
                <h6 className="fw-semibold">Subtotal</h6>
                <h6 className="fw-semibold">Fee</h6>
              </div>
              <div className="text-end">
                <h6 className="fw-semibold">$165/Mon</h6>
                <h6 className="fw-semibold">$9</h6>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-4">
              <div className="text-secondary">
                <h5 className="fw-semibold">Total Amount</h5>
              </div>
              <div className="text-end">
                <h5 className="fw-semibold">$174</h5>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const PaymentWrapper: React.FC = () => {
  const [clientSec1, setClientSecret] = useState<null | any>(null);
  const _services = new RestaeurantSignupServices();
  const getClientSecret = async () => {
    await _services
      .getClientSecret()
      .then((data) => {
        console.log(data);
        setClientSecret(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getClientSecret();
  }, []);
  return (
    <>
      {clientSec1 != null ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSec1,
          }}
        >
          <Payment />
        </Elements>
      ) : (
        <BaseSpinner />
      )}
    </>
  );
};
export default PaymentWrapper;
