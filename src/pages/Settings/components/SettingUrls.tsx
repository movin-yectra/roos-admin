import React, { useEffect } from "react";
import { useFormik } from "formik";

//custom components
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseButton from "../../../common/components/controls/BaseButton";

//models
import { RestaurantUrlsValidations } from "../../RestaurantDetails/validation/schema";

//validations
import { RestaurantMediaUrlModel } from "../../RestaurantDetails/models";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateSettingRestaurantUrls } from "../../../store/features/restaurantDetailsSlice";

//services
import { SettingServices } from "../services";

//custom hooks
import { useAppAlert } from "../../../common/hooks/useAppAlert";

const SettingUrls: React.FC = () => {
  const _services = new SettingServices();

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const selectors = useAppSelector((store) => store.businessId);
  const restaurantSelectors = useAppSelector((store) => store.restaurant);
  
  //store hook
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((store) => store.restaurant);

  //formik initialValues
  const initialValues: RestaurantMediaUrlModel = new RestaurantMediaUrlModel();

  //formik submit action
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

  //formik config
  const formik = useFormik({
    initialValues,
    validationSchema: RestaurantUrlsValidations,
    onSubmit,
  });

  //every change to update the restaurantDetailsSlice state
  useEffect(() => {
    dispatch(updateSettingRestaurantUrls(formik.values));
  }, [formik.values]);

  useEffect(() => {
    formik.setValues({
      website: restaurant?.websiteUrl,
      business: restaurant?.businessUrl,
      facebook: restaurant?.facebookId,
      instagram: restaurant?.instagramId,
      localAccountId: "",
    });
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="mt-2">
              <h5 className="fw-semibold">Resuaurant URL</h5>
            </div>
            <div className="mt-2">
              <div className="col-md-6">
                <BaseInput
                  label="Website"
                  type="text"
                  placeholder="Enter website url"
                  name="website"
                  inputClass="bg-light rounded-1"
                  value={formik.values.website}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  formik={formik}
                />
              </div>
              <div className="col-md-6 mt-2">
                {" "}
                <BaseInput
                  label="Business URL"
                  type="text"
                  placeholder="Enter business url"
                  name="business"
                  inputClass="bg-light rounded-1"
                  value={formik.values.business}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  formik={formik}
                />
              </div>
              <div className="col-md-6 mt-2">
                <BaseInput
                  label="Facebook"
                  type="text"
                  placeholder="Enter facebook url"
                  name="facebook"
                  inputClass="bg-light rounded-1"
                  value={formik.values.facebook}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  formik={formik}
                />
              </div>
              <div className="col-md-6 mt-2">
                <BaseInput
                  label="Instagram"
                  type="text"
                  placeholder="Enter instagram url"
                  name="instagram"
                  inputClass="bg-light rounded-1"
                  value={formik.values.instagram}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                  formik={formik}
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

export default SettingUrls;
