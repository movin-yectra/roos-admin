/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";

//custom component
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseDropDown from "../../../common/components/controls/BaseDropDown";
import BaseCheckBox from "../../../common/components/controls/BaseCheckBox";
import BaseButton from "../../../common/components/controls/BaseButton";

//model
import { ListItem } from "../../../common/models/base.model";
import { DeliveryTypesModel } from "../../RestaurantDetails/models";

//store
import { adddeliveryMode } from "../../../store/features/restaurantDetailsSlice";
import { useAppDispatch, useAppSelector } from "../../../store";

//validations
import { DeliveryZoneValidation } from "../../RestaurantDetails/validation/schema";

//custom hooks
import { useDropdown } from "../../../common/hooks/useControls";
import { useAppAlert } from "../../../common/hooks/useAppAlert";

//services
import { SettingServices } from "../services";

//icons
import { faPlus, faTrash } from "../../../common/ui/Icons/Icons";

const SettingDeliveryZone: React.FC = () => {
  const [dropdownResponse, ] = useState<ListItem[]>([]);
  const {
    dropdownHandleClick,
    toggleDropdown,
    setSelectedDropdownValue,
    selectedDropdownValue,
  } = useDropdown();
  const dispatch = useAppDispatch();
  const selectors = useAppSelector((state) => state.restaurant.restaurant);

  const _services = new SettingServices();

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const selectorsBusinessID = useAppSelector((store) => store.businessId);

  const initialValues: DeliveryTypesModel = {
    preparingTime: "",
    deliveryMode: "",
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

  const onSubmit = () => {
    setIsLoading(true);
    _services
      .updateRestaurantDetails(selectorsBusinessID.businessId, selectors)
      .then((response) => {
        if (response) {
          setResponseMassage({
            message: "Updated Successfully ",
            statusCode: 200,
          });
          setTimeout(() => {
            setIsLoading(false);

            setShowModel(true);
          }, 3000);
        }
      })
      .catch((errors) => {
        setResponseMassage({
          message: errors.message,
          statusCode: 404,
        });
        setTimeout(() => {
          setIsLoading(false);

          setShowModel(true);
        }, 3000);
      });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: DeliveryZoneValidation,
    onSubmit,
  });

  const deliveryMode = [
    { name: "Uber Eats", value: "Uber Eats" },
    { name: "Door Dash", value: "Door Dash" },
    { name: "Self Delivery", value: "Self Delivery" },
  ];

  useEffect(() => {
    if (selectors.leadTime && selectors.deliveryFee) {
      formik.setValues({
        preparingTime: selectors?.leadTime,
        deliveryMode: selectors?.deliveryMode,
        isDeliveryRadius: selectors?.deliveryRadius,
        isDeliveryZipcode: selectors?.deliveryZipcode,
        deliveryFee: selectors?.deliveryFee,
      });
    }
    if (deliveryMode && Array.isArray(deliveryMode)) {
      deliveryMode.forEach((list) => {
        let item: ListItem = new ListItem();
        item.text = list.name;
        item.value = list.value;
        dropdownResponse.push(item);
      });
    }
  }, []);

  useEffect(() => {
    dispatch(adddeliveryMode(formik.values));
  }, [formik.values]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="mt-2">
              <h5 className="fw-semibold">Delivery Zone Details</h5>
            </div>
            <div className="row gx-4 gy-0">
              <div className="col-md-12 mt-4">
                <div className="row g-auto">
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
                    <div className="col-md-6 mt-3">
                      <BaseDropDown
                        listOfOptions={dropdownResponse}
                        defaultClass=""
                        toggle={toggleDropdown}
                        onChange={(value: ListItem) => {
                          setSelectedDropdownValue(value);
                          formik.setFieldValue("deliveryMode", value.value);
                          if (value.value === "Self Delivery") {
                            formik.setFieldError("deliveryModeFee", "");
                          }
                        }}
                        name="deliveryMode"
                        handleClick={dropdownHandleClick}
                      >
                        <BaseInput
                          name="deliveryMode"
                          type="text"
                          label="Delivery Mode"
                          placeholder="Select Delivery Mode"
                          value={formik.values.deliveryMode}
                          inputClass="shadow-none bg-light-1 border-0"
                          readOnly
                          formik={formik}
                        />
                      </BaseDropDown>
                    </div>
                    <FormikProvider value={formik}>
                      {selectedDropdownValue.value === "Self Delivery" && (
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
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-end justify-content-end">
          <BaseButton
            id="update-save"
            defaultClass="btn btn-warning"
            name="Update"
            types="submit"
          />
        </div>
      </form>
    </>
  );
};

export default SettingDeliveryZone;
