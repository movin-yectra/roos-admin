import { faCircleCheck, faDownload } from "../../../common/ui/Icons/Icons";
import BaseIcon from "../../../common/components/ui/BaseIcon";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import BaseButton from "../../../common/components/controls/BaseButton";
import { useNavigate } from "react-router-dom";

//stripe public key
const stripePromise = loadStripe(
  "pk_test_51NaBYtSISltPdh7I76W9fT2j1bDkZgOGFROyMQ1W8Rc0rj75vsIrgcvmOBNbRcvp0IF3c5iI6kSgtlvYqiROTWsn007p0ql6Ro"
);

const SuccessPage = () => {
  const navigate = useNavigate();
  const [paymentResponse, setPaymentResponse] = useState<any>();

  useEffect(() => {
    if (!stripePromise) return;
    stripePromise.then(async (stripe: any) => {
      const currentUrl = new URL(window.location.href);
      const clientSecret: any = currentUrl.searchParams.get(
        "payment_intent_client_secret"
      );
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );
      setPaymentResponse(paymentIntent ? paymentIntent : error);
      console.log(error, paymentIntent);
    });
  }, [stripePromise]);

  const handleNavigationtoBusiness = () => {
    navigate("/restaurant-details");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="success-icon shadow rounded-circle">
          <BaseIcon icon={faCircleCheck} classes="fs-3" />
        </div>
        <div className="card-data">
          <div className="card bg-transparent px-2  text-center text-white rounded-4 border-0">
            <div className="card-body mx-3">
              <p className="card-title mt-3">Payment Success!</p>
              <p className="card-subtitle  card-text-opacity fs-8">
                Your payment has been successfully done.
              </p>
              <hr />
              <p className="card-text pt-2 pb-1">
                <p className="card-subtitle card-text-opacity fs-8">
                  Total payment
                </p>
                <p className="fs-5 fw-bold">
                  {paymentResponse?.currency.toUpperCase()}{" "}
                  {paymentResponse?.amount}
                </p>
              </p>

              <div className="row">
                <div className="col">
                  <div className="card card-success text-start text-white border-white h-75">
                    <div className="card-body">
                      <p className="card-subtitle card-text-opacity fs-8">
                        Ref Number
                      </p>
                      <p className="fs-8">{paymentResponse?.created}</p>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card card-success text-start text-white border-white h-75">
                    <div className="card-body">
                      <p className="card-text">
                        <p className="card-subtitle card-text-opacity fs-8">
                          Payment Time
                        </p>
                        <p className="fs-8">25th Feb 2023, 13:22</p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="card card-success text-start text-white border-white h-75">
                    <div className="card-body">
                      <p className="card-subtitle card-text-opacity fs-8">
                        Payment Method
                      </p>
                      <p className="fs-8">
                        {paymentResponse?.payment_method_types[0]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="card card-success text-start text-white border-white h-75">
                    <div className="card-body">
                      <p className="card-text d-flex flex-column justify-content-center">
                        <p className="card-subtitle card-text-opacity fs-8">
                          Sender Name
                        </p>
                        <p className="fs-8">Antonio Roberto</p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="pt-2  m-0 fs-8">
                <BaseIcon icon={faDownload} classes="me-2" />
                Get PDF Receipt
              </p>

              <div className="mb-4">
                <BaseButton
                  defaultClass="btn text-light"
                  name="Continue to Restaurant Details"
                  handleClick={handleNavigationtoBusiness}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
