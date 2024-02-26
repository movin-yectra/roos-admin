/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { FieldArray, FormikProvider, useFormik } from "formik";
import DatePicker from "react-datepicker";

//custom components
import BaseDropDown from "../../../common/components/controls/BaseDropDown";
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseButton from "../../../common/components/controls/BaseButton";

//model
import { ListItem } from "../../../common/models";

//custom Hooks
import { useDropdown } from "../../../common/hooks/useControls";

//Icons
import { faCaretDown, faPlus, faTrash } from "../../../common/ui/Icons/Icons";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateServiceMode } from "../../../store/features/restaurantDetailsSlice";

//validation
import { RestaurantOpenCloseValidation } from "../validation/schema";
import { ServiceType } from "../models";
import BaseCheckBox from "../../../common/components/controls/BaseCheckBox";

const RestaurantDateTime: React.FC = () => {
  const dropdownResponse : ListItem[] = []
  const [selectedService, setSelectedService] = useState<ServiceType[]>([]);
  const [selectedDay, setSelectedDay] = useState<any>();

  const {
    dropdownHandleClick,
    toggleDropdown,
    refOutside,
    selectedDropdownValue,
    setSelectedDropdownValue,
  } = useDropdown();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const selectors = useAppSelector((state) => state.restaurant.restaurant);
  const selectorsData = useAppSelector((state) => state.restaurant);

  const initialValuesTime: ServiceType = new ServiceType();

  const formik = useFormik({
    initialValues: initialValuesTime,
    validationSchema: RestaurantOpenCloseValidation,
    onSubmit: (value: any) => {
      navigate("../address-details", { replace: true });
      dispatch(updateServiceMode(value));
    },
  });
  const handleDropdownChange = (value: ListItem) => {
    setSelectedDropdownValue(value?.value);

    const storeData = selectors.serviceTypes.find(
      (service) => service.serviceMode === value.value
    );

    if (storeData) {
      formik.setValues(storeData);
    }
  };

  useEffect(() => {
    if (selectors.serviceTypes) {
      selectors.serviceTypes.forEach((list) => {
        let item: ListItem = new ListItem();
        item.text = list.serviceMode;
        item.value = list.serviceMode;
        dropdownResponse.push(item);
      });
      setSelectedService(selectors.serviceTypes);
    }
  }, []);
  useEffect(() => {
    handleDropdownChange(dropdownResponse[0]);
  }, [selectedService]);

  useEffect(() => {
    dispatch(updateServiceMode(formik.values));
  }, [formik.values]);

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
              className="col-md-6 restaurant-left-bg p-4 d-flex flex-column h-100 overflow-y-scroll"
            >
              <div className="d-flex flex-column h-100">
                <div>
                  <h4 className="fw-semibold">
                    Enter your Restaurant available timings
                  </h4>
                  <p className="text-muted">
                    It takes less than 5 minutes !! rtre
                  </p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="my-2">
                    <div className="d-flex align-center justify-content-between">
                      <div>
                        <h5 className="fw-semibold">
                          Restaurant opening days & time{" "}
                        </h5>
                      </div>
                      <div className="col-3" ref={refOutside}>
                        <BaseDropDown
                          listOfOptions={dropdownResponse}
                          defaultClass=""
                          toggle={toggleDropdown}
                          onChange={(value: ListItem) => {
                            handleDropdownChange(value);
                          }}
                          name="status"
                          handleClick={dropdownHandleClick}
                        >
                          <BaseInput
                            name="status"
                            inputClass="border-body rounded-1 shadow-none"
                            value={
                              selectedDropdownValue
                                ? selectedDropdownValue
                                : "Selecte"
                            }
                            inputIcon={faCaretDown}
                            readOnly
                          />
                        </BaseDropDown>
                      </div>
                    </div>
                    <div className="mt-3 row g-0">
                      <div className="col-md-4">
                        {formik.values.restaurantOpenCloseTime?.map(
                          (day, index) => (
                            <div className="mt-2" key={index}>
                              <BaseCheckBox
                                id={day.day}
                                inputClass="fs-5"
                                labelClass="fs-5"
                                defaultChecked={day.closed}
                                label={day.day}
                                name="closed"
                                types="checkbox"
                                handleChange={(e) => {
                                  e.target.checked
                                    ? setSelectedDay(day.day)
                                    : setSelectedDay(null);
                                  formik.setFieldValue(
                                    `restaurantOpenCloseTime[${index}].closed`,
                                    e.target.checked
                                  );
                                  formik.setFieldValue(
                                    `restaurantOpenCloseTime[${index}].timings`,
                                    [
                                      {
                                        openAt: "",
                                        closeAt: "",
                                      },
                                    ]
                                  );
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>

                      <div className="col-md-8">
                        {formik.values.restaurantOpenCloseTime?.map(
                          (day, indexDB) => (
                            <div key={indexDB}>
                              {selectedDay === day.day && (
                                <FormikProvider value={formik}>
                                  <div className="card-shadow p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <h5 className="bg-light text-info">
                                        DAY : {day.day}
                                      </h5>
                                      <h6 className="text-success">
                                        {formik.values.serviceMode}
                                      </h6>
                                    </div>

                                    <FieldArray
                                      name={`restaurantOpenCloseTime[${indexDB}].timings`}
                                      render={(arrayHelpers) => (
                                        <>
                                          <div className="row">
                                            <div className="col-md-6">
                                              Open At
                                            </div>
                                            <div className="col-md-6">
                                              Close At
                                            </div>
                                          </div>
                                          {arrayHelpers.form.values.restaurantOpenCloseTime[
                                            indexDB
                                          ].timings?.map((value, index) => (
                                            <div
                                              className="row mb-2"
                                              key={index}
                                            >
                                              <div className="col-md-5">
                                                <DatePicker
                                                  onChange={(date: any) => {
                                                    let selectedTime =
                                                      date.toLocaleTimeString(
                                                        [],
                                                        {
                                                          hour: "2-digit",
                                                          minute: "2-digit",
                                                        }
                                                      );

                                                    formik.setFieldValue(
                                                      `restaurantOpenCloseTime.${indexDB}.timings.${index}.openAt`,
                                                      selectedTime
                                                    );
                                                  }}
                                                  value={value.openAt}
                                                  placeholderText="HH:MM AM"
                                                  showTimeSelect
                                                  showTimeSelectOnly
                                                  timeIntervals={1}
                                                  timeCaption="Time"
                                                  dateFormat="h:mm aa"
                                                  className={`form-control bg-light-1 border-0 border-bottom rounded-0 ${
                                                    formik.errors
                                                      .restaurantOpenCloseTime &&
                                                    formik.touched
                                                      .restaurantOpenCloseTime &&
                                                    "border-danger border-2"
                                                  }`}
                                                />
                                              </div>
                                              <div className="col-md-5">
                                                <DatePicker
                                                  onChange={(date: any) => {
                                                    let selectedTime =
                                                      date.toLocaleTimeString(
                                                        [],
                                                        {
                                                          hour: "2-digit",
                                                          minute: "2-digit",
                                                        }
                                                      );

                                                    const openTime =
                                                      formik.values
                                                        .restaurantOpenCloseTime[
                                                        indexDB
                                                      ].timings[index].openAt;

                                                    if (
                                                      selectedTime > openTime
                                                    ) {
                                                      formik.setFieldValue(
                                                        `restaurantOpenCloseTime.${indexDB}.timings.${index}.closeAt`,
                                                        selectedTime
                                                      );
                                                    }
                                                  }}
                                                  value={value.closeAt}
                                                  placeholderText="HH:MM PM"
                                                  showTimeSelect
                                                  showTimeSelectOnly
                                                  timeIntervals={1}
                                                  timeCaption="Time"
                                                  dateFormat="h:mm aa"
                                                  className={`form-control bg-light-1 border-0 border-bottom rounded-0 ${
                                                    formik.errors
                                                      .restaurantOpenCloseTime &&
                                                    formik.touched
                                                      .restaurantOpenCloseTime &&
                                                    "border-danger border-2"
                                                  }`}
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
                                          ))}{" "}
                                          <div className="mt-2">
                                            <BaseButton
                                              types="button"
                                              icon={faPlus}
                                              defaultClass="btn border rounded-5"
                                              name="Add"
                                              handleClick={() => {
                                                arrayHelpers.push({
                                                  openAt: "",
                                                  closeAt: "",
                                                });
                                              }}
                                            />
                                          </div>
                                          <p className="pt-2 fs-9">
                                            Note : if your restaurant have
                                            interval basis opening and closing
                                            add more timing
                                          </p>
                                        </>
                                      )}
                                    />
                                  </div>
                                </FormikProvider>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-4 d-flex justify-content-between">
                      <BaseButton
                        types="button"
                        name="Back"
                        defaultClass="btn btn-outline-secondary rounded-1 px-3 py-2"
                        handleClick={() => navigate("../cuisine-details")}
                      />
                      <BaseButton
                        types="submit"
                        name="Coming up: Payment details"
                        defaultClass="btn btn-warning px-3 py-2"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="col-md-6 restaurant-right-bg p-4"
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
            <div className="mt-2 rounded-1 p-2 mt-2 card-shadow ">
              {selectorsData.restaurant.selectedServices && (
                <div className="mt-2 d-flex align-items-center ">
                  <h5 className="">Services Mode :</h5>
                  <div className="d-flex">
                    {selectorsData.restaurant.selectedServices.map(
                      (item, i) => (
                        <h6 className="ms-4" key={i}>
                          {item}
                        </h6>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-2 card-shadow rounded-1 px-3">
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
                      {item?.restaurantOpenCloseTime?.map((child, i) => (
                        <div className="row g-0" key={i}>
                          <div className="m-1 col-4">{child.day}</div>
                          <div className="col-5">
                            {child.timings.map((value, index) => (
                              <div className="row" key={index}>
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
            <div className="mt-2 card-shadow rounded-1 px-3 mt-2"></div>
            <div className="mt-2 text-start">
              <Skeleton width={"60%"} className="mt-4" />
              <Skeleton width={"50%"} className="mt-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RestaurantDateTime;
