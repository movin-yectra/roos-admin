/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";

//custom componetns
import BaseButton from "../../../common/components/controls/BaseButton";

//validations
import { CuisineDetailsValidation } from "../validation/schema";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  updateSelectedServicesMode,
  updateSelectedServicesModeRemove,
} from "../../../store/features/restaurantDetailsSlice";

//services
import { SettingServices } from "../services";

//custom hooks
import { useAppAlert } from "../../../common/hooks/useAppAlert";

const SettingCuisineDetails: React.FC = () => {
  const [serviceModeTypes, setServiceModeTypes] = useState<any>();
  
  const selectorsBusinessID = useAppSelector((store) => store.businessId);

  const selectors = useAppSelector((state) => state.restaurant.restaurant);

  const storeServiceModeselectors = useAppSelector(
    (state) => state.restaurant.restaurant.selectedServices
  );

  const dropDownDataSelectors = useAppSelector(
    (store) => store.roosCommon.dropDown.dropDownData
  );

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const _services = new SettingServices();

  const dispatch = useAppDispatch();
  
  class FormValues {
    serviceMode: string[];
  }
  const initialValues: FormValues = new FormValues();

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
    initialValues,
    validationSchema: CuisineDetailsValidation,
    onSubmit,
  });

  useEffect(() => {
    if (dropDownDataSelectors?.serviceMode) {
      setServiceModeTypes(dropDownDataSelectors.serviceMode);
    }
    formik.setValues({
      serviceMode: storeServiceModeselectors,
    });
  }, [dropDownDataSelectors?.serviceMode]);

  useEffect(() => {
    dispatch(updateSelectedServicesMode(formik.values.serviceMode));
  }, [formik.values.serviceMode]);

  return (
    <>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <div className="mt-4 d-flex flex-column h-100">
              <div className="mt-2">
                <h5 className="fw-semibold">Service Mode</h5>
              </div>

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
                      checked={formik.values.serviceMode?.includes(option.name)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                          dispatch(
                            updateSelectedServicesModeRemove(
                              formik.values.serviceMode
                            )
                          );
                        }
                      }}
                    />
                    {option.name}
                  </label>
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
        </form>
      </FormikProvider>
    </>
  );
};

export default SettingCuisineDetails;
