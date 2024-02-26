import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { motion } from "framer-motion";

//custom component
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseButton from "../../../common/components/controls/BaseButton";

//icons
import { faCaretDown, faPlus, faTrash } from "../../../common/ui/Icons/Icons";

//models
import { TaxDetailsModel } from "../models";

//validations
import { TaxDetailsValidation } from "../validation/schema";

//custom hooks
import {
  useDropdown,
  useInputControls,
} from "../../../common/hooks/useControls";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { addTaxDetails } from "../../../store/features/restaurantDetailsSlice";
import { ListItem } from "../../../common/models";

const RestaurantTaxDetails: React.FC = () => {
  const [dropdownResponse, setDropdownResponse] = useState<ListItem[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectors = useAppSelector((state) => state.restaurant.restaurant);
  const selectorsData = useAppSelector((state) => state.restaurant);

  const { dropdownHandleClick, toggleDropdown, setSelectedDropdownValue } =
    useDropdown();

  const initialValues: TaxDetailsModel = {
    taxDetails: [
      {
        taxName: "",
        taxValue: "",
        taxUnits: "",
      },
    ],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: TaxDetailsValidation,
    onSubmit: (value) => {
      dispatch(addTaxDetails(value.taxDetails));
      navigate("../restaurant-pictures");
      console.log(value);
    },
  });
  const { handleInputNumber } = useInputControls(formik);
  const listOfUnits = [
    { name: "%", value: "%" },
    { name: "$", value: "$" },
    { name: "₹", value: "₹" },
  ];

  useEffect(() => {
    if (listOfUnits && Array.isArray(listOfUnits)) {
      listOfUnits.forEach((list) => {
        let item: ListItem = new ListItem();
        item.text = list.name;
        item.value = list.value;
        dropdownResponse.push(item);
      });
    }
    if (selectors?.taxDetails.length > 0) {
      formik.setValues({ taxDetails: selectors?.taxDetails });
    }
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
                  <h4 className="fw-semibold">Enter TAX Details</h4>
                  <p className="text-muted">It takes less than 5 minutes !!</p>
                </div>

                <div>
                  <FormikProvider value={formik}>
                    <FieldArray
                      name="taxDetails"
                      render={(arrayHelpers) => (
                        <>
                          <div className="row mt-2">
                            <div className="col-md-3">Tax Name</div>
                            <div className="col-md-3">Tax Amount</div>
                            <div className="col-md-3">Tax Units</div>
                          </div>
                          {arrayHelpers.form.values.taxDetails?.map(
                            (value, index) => (
                              <div className="row mb-2" key={index}>
                                <div className="col-md-3">
                                  <BaseInput
                                    type="text"
                                    name="taxName"
                                    placeholder="Tax Name"
                                    value={value.taxName}
                                    inputClass={` bg-light-1 ${
                                      formik.errors.taxDetails &&
                                      formik.touched.taxDetails
                                        ? "border-danger"
                                        : "border-0"
                                    }`}
                                    handleChange={(e) => {
                                      formik.setFieldValue(
                                        `taxDetails.${index}.taxName`,
                                        e.target.value
                                      );
                                      formik.setFieldValue(
                                        `taxDetails.${index}.taxUnits`,
                                        "$"
                                      );
                                    }}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <BaseInput
                                    type="number"
                                    name="taxValue"
                                    placeholder="$ 45"
                                    value={value.taxValue}
                                    inputClass={` bg-light-1 ${
                                      formik.errors.taxDetails &&
                                      formik.touched.taxDetails
                                        ? "border-danger"
                                        : "border-0"
                                    }`}
                                    handleChange={(e) => {
                                      formik.setFieldValue(
                                        `taxDetails.${index}.taxValue`,
                                        e.target.value
                                      );
                                      formik.setFieldValue(
                                        `taxDetails.${index}.taxUnits`,
                                        "$"
                                      );
                                    }}
                                    handleKeyPress={handleInputNumber}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <BaseInput
                                    type="text"
                                    name="taxUnits"
                                    value={value.taxUnits}
                                    inputClass={` bg-light-1 ${
                                      formik.errors.taxDetails &&
                                      formik.touched.taxDetails
                                        ? "border-danger"
                                        : "border-0"
                                    }`}
                                    handleChange={() =>
                                      formik.setFieldValue(
                                        `taxDetails.${index}.taxUnits`,
                                        "$"
                                      )
                                    }
                                    handleKeyPress={handleInputNumber}
                                  />
                                </div>

                                <div className="col-md-2">
                                  <BaseButton
                                    types="button"
                                    icon={faTrash}
                                    iconPosition="start"
                                    handleClick={() =>
                                      arrayHelpers.remove(index)
                                    }
                                    defaultClass="btn text-danger"
                                  />
                                </div>
                              </div>
                            )
                          )}

                          <div className="mt-3">
                            <BaseButton
                              types="button"
                              name="Add"
                              icon={faPlus}
                              handleClick={() =>
                                arrayHelpers.push({
                                  taxName: "",
                                  taxValue: "",
                                  taxUnits: "",
                                })
                              }
                              iconPosition="start"
                              defaultClass="btn border rounded-5"
                            />
                          </div>
                        </>
                      )}
                    />
                  </FormikProvider>
                </div>
                <div className="mt-auto pt-2 d-flex justify-content-between ">
                  <BaseButton
                    types="button"
                    name="Back"
                    defaultClass="btn btn-outline-secondary rounded-1 px-3 py-2"
                    handleClick={() => navigate("../delivery-zone")}
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
                    {selectorsData.restaurant.deliveryMode ===
                      "Self Delivery" && "Delivery Fee"}
                  </div>
                  <div className="col-7">
                    <div>{selectorsData.restaurant.leadTime}</div>
                    <div>{selectorsData.restaurant.deliveryMode}</div>
                    {selectorsData.restaurant.deliveryRadius && (
                      <div>
                        {selectorsData.restaurant.deliveryFee?.map(
                          (item, i) => (
                            <div key={i}>
                              <h6>
                                Delivery Radius: {item.deliveryFee}km - Fee :{" "}
                                {item.deliveryRadius}$
                              </h6>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {selectorsData.restaurant.deliveryZipcode && (
                      <div>
                        {selectorsData.restaurant.deliveryFee?.map(
                          (item, i) => (
                            <div key={i}>
                              <h6>
                                Delivery Radius: {item.deliveryFee}km - Fee : $
                                {item.deliveryRadius}
                              </h6>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 card-shadow rounded-1 px-3 mt-2">
              <div className="mt-2 row align-items-center ">
                <h5 className="col-4">Tax Details :</h5>
                <div className="col-8 d-flex justify-content-start">
                  {formik.values.taxDetails?.map((item, i) => (
                    <div key={i} className="row">
                      <div>Name : {item.taxName}</div>
                      <div>Amount : {item.taxValue} </div>
                      <div>Units :{item.taxUnits}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RestaurantTaxDetails;
