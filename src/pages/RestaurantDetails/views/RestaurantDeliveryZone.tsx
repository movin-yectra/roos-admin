/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";

//custom component
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseCheckBox from "../../../common/components/controls/BaseCheckBox";

//icons
import { faPlus, faTrash } from "../../../common/ui/Icons/Icons";

//models
import { ListItem } from "../../../common/models/base.model";
// import { DeliveryTypesModel } from "../models";

//validations
import { DeliveryZoneValidation } from "../validation/schema";


//store
import { useAppSelector } from "../../../store";
// import { adddeliveryMode } from "../../../store/features/restaurantDetailsSlice";

export class DeliveryTypesModel {
  preparingTime: string;
  deliveryMode: Array<string>;
  isDeliveryRadius: boolean;
  isDeliveryZipcode: boolean;
  deliveryFee: Array<DeliveryFeeModel>;
}

export class DeliveryFeeModel {
  deliveryRadius: string;
  deliveryFee: string;
  symbol: string;
}

const RestaurantDeliveryZone: React.FC = () => {
  const dropdownResponse: ListItem[] = [];
  const navigate = useNavigate();
  const selectors = useAppSelector((state) => state.restaurant.restaurant);
  const selectorsData = useAppSelector((state) => state.restaurant);

  const initialValues: DeliveryTypesModel = {
    preparingTime: "",
    deliveryMode: [],
    isDeliveryRadius: false,
    isDeliveryZipcode: false,
    deliveryFee: [
      {
        deliveryRadius: "",
        deliveryFee: "",
        symbol: "",
      },
    ],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: DeliveryZoneValidation,
    onSubmit: (value) => {
      // dispatch(adddeliveryMode(value));
      navigate("../tax-details");
    },
  });

  //   const { handleInputNumber, handleInputString } = useInputControls(formik);
  const deliveryMode = [
    { name: "Uber Eats", value: "Uber Eats" },
    { name: "Door Dash", value: "Door Dash" },
    { name: "Self Delivery", value: "Self Delivery" },
  ];
  console.log(formik.values.deliveryMode);
  useEffect(() => {
    if (deliveryMode && Array.isArray(deliveryMode)) {
      deliveryMode.forEach((list) => {
        let item: ListItem = new ListItem();
        item.text = list.name;
        item.value = list.value;
        dropdownResponse.push(item);
      });
    }
    // formik.setValues({
    //   preparingTime: selectors?.leadTime,
    //   deliveryMode: selectors?.deliveryMode,
    //   isDeliveryRadius: selectors?.deliveryRadius,
    //   isDeliveryZipcode: selectors?.deliveryZipcode,
    //   deliveryFee: selectors?.deliveryFee,
    // });
  }, []);
  return (
    <>
      <div className="row g-0 vh-100 w-100 ">
        <div className="w-50">
          <div className="position-fixed top-0 start-0 end-0 bottom-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="col-md-6 restaurant-left-bg p-4 d-flex flex-column h-100 overflow-y-scroll"
            >
              <form
                className="d-flex flex-column h-100"
                onSubmit={formik.handleSubmit}
              >
                <div className="mt-1">
                  <h4 className="fw-semibold">Enter Delivery Details</h4>
                  <p className="text-muted">It takes less than 5 minutes !!</p>
                </div>
                <div>
                  <div className="col-md-6">
                    <BaseInput
                      label="Preparing time"
                      name="preparingTime"
                      value={formik.values.preparingTime}
                      handleChange={formik.handleChange}
                      type="text"
                      placeholder="Enter preparing time"
                      inputClass="border-0 bg-light-1"
                      formik={formik}
                    />
                  </div>
                  <div className="row gx-4 gy-0">
                    <FormikProvider value={formik}>
                      <div className="mt-3">Delivery Mode</div>
                      <div className="col-md-8 mt-2 d-flex justify-content-between ">
                        <label
                          className={`form-check ${
                            formik.errors.deliveryMode &&
                            formik.touched.deliveryMode &&
                            "text-danger"
                          }`}
                        >
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            name="deliveryMode"
                            value="Door Dash"
                          />
                          Door Dash
                        </label>
                        <label
                          className={`form-check ${
                            formik.errors.deliveryMode &&
                            formik.touched.deliveryMode &&
                            "text-danger"
                          }`}
                        >
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            name="deliveryMode"
                            value="Uber Eats"
                          />
                          Uber Eats
                        </label>
                        <label
                          className={`form-check ${
                            formik.errors.deliveryMode &&
                            formik.touched.deliveryMode &&
                            "text-danger"
                          }`}
                        >
                          <Field
                            className="form-check-input"
                            type="checkbox"
                            name="deliveryMode"
                            value="Self Delivery"
                          />
                          Self Delivery
                        </label>
                      </div>
                      <div className="mt-2">
                        <small className="text-danger">
                          {formik.errors.deliveryMode}
                        </small>
                      </div>
                      {formik.values.deliveryMode?.includes(
                        "Self Delivery"
                      ) && (
                        <div className="mt-3 col-12">
                          <div className="col-md-4 fs-5">Delivery Fee</div>
                          <div className="row mt-2">
                            <div className="col-md-6">
                              <BaseCheckBox
                                id="isDeliveryRadius"
                                label="Delivery by Radius"
                                name="DeliveryBy"
                                types="radio"
                                defaultChecked={selectors.deliveryRadius}
                                handleChange={(e) => {
                                  formik.setFieldValue(
                                    "isDeliveryRadius",
                                    e.target.checked
                                  );
                                  formik.values.isDeliveryZipcode &&
                                    formik.setFieldValue(
                                      "isDeliveryZipcode",
                                      false
                                    );
                                }}
                              />
                            </div>
                            <div className="col-md-6">
                              <BaseCheckBox
                                id="isDeliveryZipcode"
                                label="Delivery by Postal Code"
                                name="DeliveryBy"
                                defaultChecked={selectors.deliveryZipcode}
                                types="radio"
                                handleChange={(e) => {
                                  formik.setFieldValue(
                                    "isDeliveryZipcode",
                                    e.target.checked
                                  );
                                  formik.values.isDeliveryRadius &&
                                    formik.setFieldValue(
                                      "isDeliveryRadius",
                                      false
                                    );
                                }}
                              />
                            </div>
                          </div>
                          <FieldArray
                            name="deliveryModeFee"
                            render={(arrayHelpers) => (
                              <>
                                <div className="row mt-2">
                                  <div className="col-md-4">
                                    Delivery{" "}
                                    {formik.values.isDeliveryRadius
                                      ? "Radius"
                                      : "Zipcode"}
                                  </div>
                                  <div className="col-md-4">
                                    Delivery Fee(appx)
                                  </div>
                                </div>

                                {arrayHelpers.form.values.deliveryModeFee?.map(
                                  (value, index) => (
                                    <div
                                      className="row mb-2 align-items-center"
                                      key={index}
                                    >
                                      <div className="col-md-4">
                                        <BaseInput
                                          name="deliveryRadius"
                                          value={value.deliveryRadius}
                                          type="text"
                                          placeholder={`Enter ${
                                            formik.values.isDeliveryRadius
                                              ? "Radius"
                                              : "Zipcode"
                                          }`}
                                          inputClass={` bg-light-1 ${
                                            formik.errors.deliveryFee &&
                                            formik.touched.deliveryFee
                                              ? "border-danger"
                                              : "border-0"
                                          }`}
                                          handleChange={(e) =>
                                            formik.setFieldValue(
                                              `deliveryModeFee.${index}.deliveryRadius`,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                      <div className="col-md-4">
                                        <BaseInput
                                          name="deliveryFee"
                                          type="text"
                                          placeholder="$ 10"
                                          value={value.deliveryFee}
                                          inputClass={` bg-light-1 ${
                                            formik.errors.deliveryFee &&
                                            formik.touched.deliveryFee
                                              ? "border-danger"
                                              : "border-0"
                                          }`}
                                          handleChange={(e) => {
                                            formik.setFieldValue(
                                              `deliveryModeFee.${index}.deliveryFee`,
                                              e.target.value
                                            );
                                          }}
                                        />
                                      </div>
                                      <div className="col-md-2">
                                        <BaseButton
                                          types="button"
                                          icon={faTrash}
                                          iconPosition="start"
                                          defaultClass="btn text-danger"
                                          handleClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                                <div className="mt-2">
                                  <BaseButton
                                    defaultClass="btn border rounded-5"
                                    name="Add"
                                    icon={faPlus}
                                    types="button"
                                    iconPosition="start"
                                    handleClick={() => {
                                      arrayHelpers.push({
                                        deliveryRadius: "",
                                        deliveryFee: "",
                                      });
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          />
                        </div>
                      )}
                    </FormikProvider>
                  </div>
                </div>
                <div className="mt-auto pt-2 d-flex justify-content-between ">
                  <BaseButton
                    types="button"
                    name="Back"
                    defaultClass="btn btn-outline-secondary rounded-1 px-3 py-2"
                    handleClick={() => navigate("../address-details")}
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
                    {selectorsData.restaurant.address}{" "}
                    {selectorsData.restaurant.city}
                    {selectorsData.restaurant.state}{" "}
                    {selectorsData.restaurant.zipCode === null
                      ? ""
                      : selectorsData.restaurant.zipCode}
                  </h6>
                </div>
              </div>
            </div>
            <div className="mt-2 card-shadow rounded-1 px-3 py-2 mt-2">
              <div className="mt-2 ">
                <h5 className="">Delivery Details</h5>
                <div className="row">
                  <div className="col-4">
                    <div>Preparing Time </div>
                    <div>Delivery Mode </div>
                    {/* {formik.values.deliveryMode === "Self Delivery" &&
                      "Delivery Fee"} */}
                  </div>
                  <div className="col-7">
                    <div>{formik.values.preparingTime}</div>
                    <div>{formik.values.deliveryMode}</div>
                    {formik.values.isDeliveryRadius && (
                      <div>
                        {formik.values.deliveryFee?.map((item, i) => (
                          <div key={i}>
                            <h6>
                              Delivery Radius: {item.deliveryFee}km - Fee :{" "}
                              {item.deliveryRadius}$
                            </h6>
                          </div>
                        ))}
                      </div>
                    )}
                    {formik.values.isDeliveryZipcode && (
                      <div>
                        {formik.values.deliveryFee?.map((item, i) => (
                          <div key={i}>
                            <h6>
                              Delivery Radius: {item.deliveryFee}km - Fee : $
                              {item.deliveryRadius}
                            </h6>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RestaurantDeliveryZone;
