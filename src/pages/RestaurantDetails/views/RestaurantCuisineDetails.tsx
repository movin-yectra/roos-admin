import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import Skeleton from "react-loading-skeleton";

//custom components
import BaseButton from "../../../common/components/controls/BaseButton";

//validations
import { CuisineDetailsValidation } from "../validation/schema";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { addSelectedServicesMode } from "../../../store/features/restaurantDetailsSlice";

const RestaurantCuisineDetails: React.FC = () => {
  const [serviceModeTypes, setServiceModeTypes] = useState<any>();
  const selectors = useAppSelector((state) => state.restaurant.restaurant);
  const storeServiceModeselectors = useAppSelector(
    (state) => state.restaurant.restaurant.selectedServices
  );
  const servicesModeSelectors = useAppSelector(
    (store) => store.roosCommon.dropDown.dropDownData
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  interface FormValues {
    serviceMode: string[];
  }
  const initialValues: FormValues = {
    serviceMode: storeServiceModeselectors,
  };

  const handleSubmit = (values: FormValues) => {
    dispatch(addSelectedServicesMode(values.serviceMode));
    navigate("../date-time", { replace: true });
  };

  useEffect(() => {
    if (servicesModeSelectors?.serviceMode) {
      setServiceModeTypes(servicesModeSelectors.serviceMode);
    }
  }, [servicesModeSelectors?.serviceMode]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={CuisineDetailsValidation}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="row g-0 vh-100">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="col-md-6 restaurant-left-bg p-4 d-flex flex-column h-100"
              >
                <div className="mt-3">
                  <h4 className="fw-semibold">Enter your serving Details</h4>
                  <p className="text-muted">It takes less than 5 minutes !!</p>
                </div>
                <div className="mt-4 d-flex flex-column h-100">
                  <div className="">
                    <h4>Service Mode</h4>
                    {formik.errors.serviceMode && (
                      <div className="text-danger">
                        {formik.errors.serviceMode}
                      </div>
                    )}
                    {serviceModeTypes &&
                      serviceModeTypes.map((option) => (
                        <label
                          className={`form-check mt-3 ${
                            formik.errors.serviceMode && "text-danger"
                          }`}
                          key={option.code}
                        >
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            name="serviceMode"
                            value={option.name}
                            checked={formik.values.serviceMode.includes(
                              option.name
                            )}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (e.target.checked) {
                                formik.setFieldValue("serviceMode", [
                                  ...formik.values.serviceMode,
                                  option.name,
                                ]);
                              } else {
                                formik.setFieldValue(
                                  "serviceMode",
                                  formik.values.serviceMode.filter(
                                    (code) => code !== option.name
                                  )
                                );
                              }
                            }}
                          />
                          {option.name}
                        </label>
                      ))}
                  </div>
                  <div className="mt-auto d-flex justify-content-between">
                    <BaseButton
                      name="Back"
                      defaultClass="btn btn-outline-secondary rounded-1 px-3 py-2"
                      handleClick={() => navigate("/restaurant-details")}
                    />
                    <BaseButton
                      types="submit"
                      name="Coming up: Day & Timings"
                      defaultClass="btn btn-warning px-3 py-2"
                    />
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="col-md-6 p-4 restaurant-right-bg"
              >
                <div className="d-flex flex-column">
                  <div className="text-center">
                    <img
                      src={selectors.restaurantLogo}
                      alt="logo"
                      className="border rounded-1"
                      width={125}
                      height={125}
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="fw-bolder mb-0">{selectors.restaurantName}</p>
                  </div>
                  <div
                    className="mt-1 text-center"
                    style={{ overflowWrap: "break-word" }}
                  >
                    <p className="px-4">{selectors.description}</p>
                  </div>
                  <div className="mt-2 rounded-1 px-2 mt-2 card-shadow ">
                    {formik.values.serviceMode && (
                      <div className="mt-2 d-flex align-items-center ">
                        <h5 className="">Services Mode :</h5>
                        <div className="d-flex">
                          {formik.values.serviceMode.map((item, i) => (
                            <h6 className="ms-4" key={i}>
                              {item}
                            </h6>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-start">
                    <Skeleton width={"90%"} className="mt-4" />
                    <Skeleton width={"70%"} className="mt-4" />
                    <Skeleton width={"60%"} className="mt-4" />
                  </div>
                </div>
              </motion.div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RestaurantCuisineDetails;
