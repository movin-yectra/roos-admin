/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useFormik } from "formik";

//custom component
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseCheckBox from "../../../common/components/controls/BaseCheckBox";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateSettingOthers } from "../../../store/features/restaurantDetailsSlice";

//services
import { SettingServices } from "../services";

//custom hooks
import { useAppAlert } from "../../../common/hooks/useAppAlert";

//model
export class APIKeysModel {
  autoAccept?: boolean;
  apiKey: string;
  apiToken: string;
  autoPrint?: boolean;
}

const SettingOther: React.FC = () => {
  const _services = new SettingServices();

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const selectors = useAppSelector((store) => store.businessId);
  const restaurantSelectors = useAppSelector((store) => store.restaurant);
  
  const dispatch = useAppDispatch();

  const initialValues: APIKeysModel = {
    autoAccept: false,
    apiKey: "",
    apiToken: "",
    autoPrint: false,
  };

  const onSubmit = () => {
    setIsLoading(true);
    _services
      .updateRestaurantDetails(
        selectors.businessId,
        restaurantSelectors.restaurant
      )
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
    onSubmit,
  });

  useEffect(() => {
    if (restaurantSelectors.restaurant.apiKey && restaurantSelectors.restaurant.apiToken) {
      formik.setValues({
        autoAccept: restaurantSelectors.restaurant?.autoAccept,
        apiKey: restaurantSelectors.restaurant?.apiKey,
        apiToken: restaurantSelectors.restaurant?.apiToken,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(updateSettingOthers(formik.values));
  }, [formik.values]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-0">
          <div className="col-md-12">
            <div className="mt-2">
              <h5 className="fw-semibold">Other Details</h5>
            </div>
            <div className="row gx-4 gy-0">
              <div className="col-md-12 mt-2">
                <h5>Auto Print</h5>
                <div className="d-inline-block mb-3">
                  <BaseCheckBox
                    boxClass="form-switch form-check fs-5"
                    id="autoPrint"
                    name="autoPrint"
                    types="checkbox"
                    defaultChecked={restaurantSelectors.restaurant.autoPrint}
                    handleChange={formik.handleChange}
                  />
                </div>
                <h5>Auto Accept</h5>
                <div className="d-inline-block mb-3">
                  <BaseCheckBox
                    boxClass="form-switch form-check fs-5"
                    id="autoAccept"
                    name="autoAccept"
                    types="checkbox"
                    defaultChecked={restaurantSelectors.restaurant.autoAccept}
                    handleChange={formik.handleChange}
                  />
                </div>
                <h5>APIs</h5>
                <div className="row align-items-center">
                  <div className="col-4">
                    <BaseInput
                      label="API Token"
                      type="text"
                      placeholder="Enter local account id"
                      name="apiToken"
                      inputClass="bg-light-1 rounded-1"
                      value={formik.values.apiToken}
                      handleChange={formik.handleChange}
                    />
                  </div>
                  <div className="col-4">
                    <BaseInput
                      label="API Key"
                      type="text"
                      placeholder="Enter local account id"
                      name="apiKey"
                      inputClass="bg-light-1 rounded-1"
                      value={formik.values.apiKey}
                      handleChange={formik.handleChange}
                    />
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

export default SettingOther;
