/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

//custom components
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseButton from "../../../common/components/controls/BaseButton";

//model
import { AddressDetailsModel } from "../models";

import { useAppDispatch, useAppSelector } from "../../../store";
import { addAddressDetails } from "../../../store/features/restaurantDetailsSlice";

//validations
import { AddressDetailsValidations } from "../validation/schema";

//custom Hooks
import { useInputControls } from "../../../common/hooks/useControls";

const RestaurantAddressDetails: React.FC = () => {
  const navigate = useNavigate();
  const selectors = useAppSelector((state) => state.restaurant.restaurant);
  const selectorsData = useAppSelector((state) => state.restaurant);
  const dispatch = useAppDispatch();

  let initialValues: AddressDetailsModel = new AddressDetailsModel();

  const onSubmit = () => {
    if (Object.keys(formik.errors).length === 0) {
      navigate("../delivery-zone", { replace: true });
      dispatch(addAddressDetails(formik.values));
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema: AddressDetailsValidations,
    onSubmit,
  });

  useEffect(() => {
    formik.setValues({
      address: selectors.address,
      city: selectors.city,
      country: selectors.country,
      state: selectors.state,
      zipcode: selectors.zipCode,
      deliveryZone: selectors.deliveryZone,
    });
  }, []);

  const { handleInputNumber, handleInputString } = useInputControls(formik);

  return (
    <>
      <div className="row g-0 vh-100 w-100">
        <div className="w-50">
          <div className="position-fixed top-0 start-0 end-0 bottom-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="col-md-6 restaurant-left-bg p-4 d-flex flex-column h-100"
            >
              <form
                className="d-flex flex-column h-100"
                onSubmit={formik.handleSubmit}
              >
                <div className="mt-1">
                  <h4 className="fw-semibold">Enter your outlet address</h4>
                  <p className="text-muted">It takes less than 5 minutes !!</p>
                </div>
                <div>
                  <div className="mt-1">
                    <h5>Enter your outlet address</h5>
                  </div>
                  <div className="row gx-4 gy-0">
                    <div className="col-md-6">
                      <BaseInput
                        label="Address"
                        type="text"
                        placeholder="Enter Address"
                        name="address"
                        inputClass="border-0 bg-light-1"
                        value={formik.values.address}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        formik={formik}
                      />
                    </div>

                    <div className="col-md-6">
                      <BaseInput
                        label="City"
                        type="text"
                        placeholder="Enter City"
                        name="city"
                        inputClass="border-0 bg-light-1"
                        value={formik.values.city}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleKeyPress={handleInputString}
                        formik={formik}
                      />
                    </div>

                    <div className="col-md-6 mt-2">
                      <BaseInput
                        label="Country"
                        type="text"
                        placeholder="Enter Country"
                        name="country"
                        inputClass="border-0 bg-light-1"
                        value={formik.values.country}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleKeyPress={handleInputString}
                        formik={formik}
                      />
                    </div>

                    <div className="col-md-6 mt-2">
                      <BaseInput
                        label="State"
                        type="text"
                        placeholder="Enter State"
                        name="state"
                        inputClass="border-0 bg-light-1"
                        value={formik.values.state}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleKeyPress={handleInputString}
                        formik={formik}
                      />
                    </div>
                    <div className="col-md-6 mt-2">
                      <BaseInput
                        label="Zipcode"
                        type="number"
                        placeholder="Enter Zipcode"
                        name="zipcode"
                        inputClass="border-0 bg-light-1"
                        value={formik.values.zipcode}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleKeyPress={handleInputNumber}
                        formik={formik}
                        minLength={6}
                        maxLength={6}
                      />
                    </div>

                    <div className="mt-3 col-12">
                      <h5>Delivery Zone</h5>
                    </div>
                    <div className="col-md-6">
                      <BaseInput
                        label="Enter delivery zone code"
                        type="number"
                        placeholder="Enter delivery zone code"
                        name="deliveryZone"
                        inputClass="border-0 bg-light-1"
                        value={formik.values.deliveryZone}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        handleKeyPress={handleInputNumber}
                        formik={formik}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-2 d-flex justify-content-between">
                  <BaseButton
                    types="button"
                    name="Back"
                    defaultClass="btn btn-outline-secondary rounded-1 px-3 py-2"
                    handleClick={() => navigate("../date-time")}
                  />
                  <BaseButton
                    types="submit"
                    name="Coming up: Restaurant images"
                    defaultClass="btn btn-warning px-3 py-2"
                  />
                </div>
              </form>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="col-md-6 restaurant-right-bg p-4 w-50"
        >
          <div className="d-flex flex-column">
            <div className=" text-center">
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
            <div className="mt-2 card-shadow rounded-1 px-3 mt-2">
              <div className="mt-2">
                {selectorsData.restaurant.serviceTypes?.map((item, index) => (
                  <div className="my-3" key={index}>
                    <div className="row g-0 align-items-center">
                      <div className="m-1 col-4">
                        <h5 className="">{item.serviceMode}</h5>
                      </div>
                      <div className="col-5">
                        <div className="row g-0">
                          <div className="col-6">
                            <h6>Open At</h6>
                          </div>
                          <div className="col-6">
                            <h6>Close At</h6>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      {item.restaurantOpenCloseTime?.map((child, i) => (
                        <div className="row g-0">
                          <div className="m-1 col-4" key={i}>
                            {child.day}
                          </div>
                          <div className="col-5">
                            {child.timings.map((value, i) => (
                              <div className="row">
                                <div className="col-6">{value.openAt}</div>

                                <div className="col-6">{value.closeAt}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 card-shadow rounded-1 px-3 mt-2">
              <div className="mt-2 row align-items-center ">
                <h5 className="col-4">Outlet Address :</h5>
                <div className="col-8 d-flex justify-content-start">
                  <h6 className="">
                    {formik.values.address} {formik.values.city}
                    {formik.values.state}{" "}
                    {formik.values.zipcode === null
                      ? ""
                      : formik.values.zipcode}{" "}
                    {formik.values.deliveryZone === null
                      ? ""
                      : formik.values.deliveryZone}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RestaurantAddressDetails;
