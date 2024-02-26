import React, { useEffect } from "react";
import { useFormik } from "formik";

//custom componetns
import BaseInput from "../../../common/components/controls/BaseInput";

//validations
import { addressSchema } from "../validation/schema";

//custom hook
import { useInputControls } from "../../../common/hooks/useControls";

//model
import { AddressDetailsModel } from "../../RestaurantDetails/models";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateSettingRestaurantAddress } from "../../../store/features/restaurantDetailsSlice";
import BaseButton from "../../../common/components/controls/BaseButton";
import { SettingServices } from "../services";
import { useAppAlert } from "../../../common/hooks/useAppAlert";

const SettingAddress: React.FC = () => {
  const _services = new SettingServices();

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const selectorsBusinessID = useAppSelector((store) => store.businessId);
  const restaurantSelectors = useAppSelector((store) => store.restaurant);
  
  //store
  const { restaurant } = useAppSelector((state) => state.restaurant);
  const dispatch = useAppDispatch();

  //formik initialValues
  const initialValues: AddressDetailsModel = new AddressDetailsModel();

  //submit action
  const onSubmit = () => {
    setIsLoading(true);
    _services
      .updateRestaurantDetails(selectorsBusinessID.businessId, restaurantSelectors)
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

  //formik config
  const formik = useFormik({
    initialValues,
    validationSchema: addressSchema,
    onSubmit,
  });

  //custom Hook
  const { handleInputNumber, handleInputString } = useInputControls(formik);

  useEffect(() => {
    formik.setValues({
      address: restaurant?.address,
      city: restaurant?.city,
      state: restaurant?.state,
      country: restaurant?.country,
      zipcode: restaurant?.zipCode,
      deliveryZone: restaurant?.deliveryZone,
    });
  }, []);

  useEffect(() => {
    dispatch(updateSettingRestaurantAddress(formik.values));
  }, [formik.values]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="mt-2">
              <h5 className="fw-semibold">Address Details</h5>
            </div>
            <div className="row gx-4 gy-0">
              <div className="col-md-12">
                <div className="row g-auto">
                  <div className="col-md-6">
                    <BaseInput
                      label="Address"
                      type="text"
                      placeholder="Enter Address"
                      name="address"
                      formik={formik}
                      value={formik.values.address}
                      handleChange={(e) => {
                        formik.setFieldValue("address", e.target.value);
                      }}
                      handleBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="col-md-6">
                    <BaseInput
                      label="City"
                      type="text"
                      placeholder="Enter City"
                      name="city"
                      formik={formik}
                      value={formik.values.city}
                      handleChange={(e) => {
                        formik.setFieldValue("city", e.target.value);
                      }}
                      handleBlur={formik.handleBlur}
                      handleKeyPress={handleInputString}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <BaseInput
                  label="Country"
                  type="text"
                  placeholder="Enter Country"
                  name="country"
                  formik={formik}
                  value={formik.values.country}
                  handleChange={(e) => {
                    formik.setFieldValue("country", e.target.value);
                  }}
                  handleBlur={formik.handleBlur}
                  handleKeyPress={handleInputString}
                />
              </div>
              <div className="col-md-6 mt-3">
                <BaseInput
                  label="State"
                  type="text"
                  placeholder="Enter State"
                  name="state"
                  formik={formik}
                  value={formik.values.state}
                  handleChange={(e) => {
                    formik.setFieldValue("state", e.target.value);
                  }}
                  handleBlur={formik.handleBlur}
                  handleKeyPress={handleInputString}
                />
              </div>
              <div className="col-md-6 mt-3">
                <BaseInput
                  label="Zipcode"
                  type="number"
                  placeholder="Enter Zipcode"
                  name="zipcode"
                  formik={formik}
                  value={formik.values.zipcode}
                  handleChange={(e) => {
                    formik.setFieldValue("zipcode", e.target.value);
                  }}
                  handleBlur={formik.handleBlur}
                  handleKeyPress={handleInputNumber}
                />
              </div>

              <div className="mt-4 col-12">
                <h5>Delivery Zone</h5>
              </div>
              <div className="col-md-6">
                <BaseInput
                  label="Enter delivery zone code"
                  type="number"
                  placeholder="Enter delivery zone code"
                  name="deliveryZone"
                  formik={formik}
                  value={formik.values.deliveryZone}
                  handleChange={(e) => {
                    formik.setFieldValue("deliveryZone", e.target.value);
                  }}
                  handleBlur={formik.handleBlur}
                  handleKeyPress={handleInputNumber}
                />
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

export default SettingAddress;
