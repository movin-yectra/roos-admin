import React, { useEffect, useState } from "react";
import {
  FieldArray,
  Formik,
  FormikProvider,
  useFormik,
} from "formik";

//custom componetns
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseDropDown from "../../../common/components/controls/BaseDropDown";
import BaseCheckBox from "../../../common/components/controls/BaseCheckBox";
import BaseButton from "../../../common/components/controls/BaseButton";

//models
import { ListItem } from "../../../common/models";
import { ServiceType } from "../../RestaurantDetails/models";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateServiceMode } from "../../../store/features/restaurantDetailsSlice";

//custom Hooks
import { useAppAlert } from "../../../common/hooks/useAppAlert";
import { useDropdown } from "../../../common/hooks/useControls";

//icons
import { faCaretDown, faPlus, faTrash } from "../../../common/ui/Icons/Icons";

//validations
import { RestaurantOpenCloseValidation } from "../../RestaurantDetails/validation/schema";

//services
import { SettingServices } from "../services";

const SettingDayTime: React.FC = () => {
  const [dropdownResponse, setDropdownResponse] = useState<ListItem[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceType[]>([]);
  const [selectedDay, setSelectedDay] = useState<any>();

  const {
    dropdownHandleClick,
    toggleDropdown,
    refOutside,
    selectedDropdownValue,
    setSelectedDropdownValue,
  } = useDropdown();

  const dispatch = useAppDispatch();

  const selectors = useAppSelector((state) => state.restaurant.restaurant);

  const _services = new SettingServices();

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const selectorsBusinessID = useAppSelector((store) => store.businessId);

  const initialValuesTime: ServiceType = new ServiceType();

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
    initialValues: initialValuesTime,
    validationSchema: RestaurantOpenCloseValidation,
    onSubmit,
  });

  const handleOpenTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexDB: number,
    index: number
  ) => {
    const openTime = convertTo12HourFormat(event.target.value);
    formik.setFieldValue(
      `restaurantOpenCloseTime.${indexDB}.timings.${index}.openAt`,
      openTime
    );
  };

  const handleCloseTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexDB: number,
    index: number
  ) => {
    const openTime = convertTo12HourFormat(event.target.value);
    formik.setFieldValue(
      `restaurantOpenCloseTime.${indexDB}.timings.${index}.closeAt`,
      openTime
    );
  };

  const convertTo12HourFormat = (time24: string): string => {
    const [hours, minutes] = time24.split(":");
    const parsedHours = parseInt(hours, 10);
    const suffix = parsedHours >= 12 ? "PM" : "AM";
    const convertedHours = parsedHours % 12 || 12;
    const formattedHours =
      convertedHours < 10 ? `0${convertedHours}` : convertedHours;
    return `${formattedHours}:${minutes} ${suffix}`;
  };

  const handleDropdownChange = (value: ListItem) => {
    setSelectedDropdownValue(value?.value);
    const storeValue = selectedService.find(
      (item) => item.serviceMode === value?.value
    );
    if (storeValue) {
      formik.setValues(storeValue);
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
      <Formik
        initialValues={formik.initialValues}
        onSubmit={() => formik.handleSubmit()}
      >
        {(formiks) => (
          <>
            <div className="d-flex align-center justify-content-between">
              <div className="mt-2">
                <h5 className="fw-semibold">Restaurant opening days & time </h5>
              </div>
              <div className="col-3" ref={refOutside}>
                <BaseDropDown
                  listOfOptions={dropdownResponse}
                  defaultClass=""
                  toggle={toggleDropdown}
                  onChange={(value: ListItem) => {
                    handleDropdownChange(value);
                    dispatch(updateServiceMode(formik.values));
                  } }
                  name="status"
                  handleClick={dropdownHandleClick}              >
                  <BaseInput
                    name="status"
                    inputClass="border-body rounded-1 shadow-none"
                    value={
                      selectedDropdownValue ? selectedDropdownValue : "Selecte"
                    }
                    inputIcon={faCaretDown}
                    readOnly
                  />
                </BaseDropDown>
              </div>
            </div>
            <div className="mt-2 row g-0">
              <div className="col-md-5">
                {formik.values.restaurantOpenCloseTime?.map((day, index) => (
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
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="col-md-7">
                {formik.values.restaurantOpenCloseTime?.map((day, indexDB) => (
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
                                  <div className="col-md-6">Open At</div>
                                  <div className="col-md-6">Close At</div>
                                </div>
                                {day.timings?.map((value, i) => (
                                  <div className="row mb-2" key={i}>
                                    <div className="col-md-5">
                                      <BaseInput
                                        type="time"
                                        name={`timings[${i}].openAt`}
                                        inputClass={`bg-light-1 border-0 border-bottom rounded-0 ${
                                          formik.errors
                                            .restaurantOpenCloseTime &&
                                          formik.touched
                                            .restaurantOpenCloseTime &&
                                          "border-danger border-2"
                                        }`}
                                        value={value.openAt.replace(
                                          /\s?[APMapm]{2}\s*$/,
                                          ""
                                        )}
                                        handleChange={(event) => {
                                          handleOpenTimeChange(
                                            event,
                                            indexDB,
                                            i
                                          );
                                        }}
                                      />
                                    </div>
                                    <div className="col-md-5">
                                      <BaseInput
                                        type="time"
                                        inputClass={`bg-light-1 border-0 border-bottom rounded-0 ${
                                          formik.errors
                                            .restaurantOpenCloseTime &&
                                          formik.touched
                                            .restaurantOpenCloseTime &&
                                          "border-danger border-2"
                                        }`}
                                        name={`timings[${i}].closeAt`}
                                        value={value.closeAt.replace(
                                          /\s?[APMapm]{2}\s*$/,
                                          ""
                                        )}
                                        handleChange={(event) =>
                                          handleCloseTimeChange(
                                            event,
                                            indexDB,
                                            i
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="col-md-2">
                                      <BaseButton
                                        types="button"
                                        icon={faTrash}
                                        iconPosition={"start"}
                                        defaultClass="btn text-danger"
                                        handleClick={() =>
                                          arrayHelpers.remove(i)
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
                                  Note : if your restaurant have interval basis
                                  opening and closing add more timing
                                </p>
                              </>
                            )}
                          />
                        </div>
                      </FormikProvider>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex align-items-end justify-content-end">
              <BaseButton
                id="update-save"
                defaultClass="btn btn-warning"
                name="Update"
                types="submit"
                handleClick={onSubmit}
              />
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

export default SettingDayTime;
