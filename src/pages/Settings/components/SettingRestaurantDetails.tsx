/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useFormik } from "formik";

//custom componetns
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseTextArea from "../../../common/components/controls/BaseTextArea";
import BaseImageUpload from "../../../common/components/ui/BaseImageUpload";
import BaseButton from "../../../common/components/controls/BaseButton";

//validations
import { restaurantDetailsSchema } from "../validation/schema";

//models
import { RestaurantDataModel } from "../../RestaurantDetails/models";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateSettingRestaurantDetails } from "../../../store/features/restaurantDetailsSlice";

//services
import { SettingServices } from "../services";

//custom hooks
import { useAppAlert } from "../../../common/hooks/useAppAlert";

const SettingRestaurantDetails: React.FC = () => {
  const _services = new SettingServices();

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const selectors = useAppSelector((store) => store.businessId);
  const restaurantSelectors = useAppSelector((store) => store.restaurant);

  //store Hooks
  const { restaurant } = useAppSelector((store) => store.restaurant);

  const dispatch = useAppDispatch();

  //formik initialValues
  const initialValues: RestaurantDataModel = new RestaurantDataModel();

  // submit action
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
    validationSchema: restaurantDetailsSchema,
    onSubmit,
  });

  useEffect(() => {
    formik.setValues({
      name: restaurant?.restaurantName,
      description: restaurant?.description,
      image: restaurant?.restaurantLogo,
    });
  }, []);

  useEffect(() => {
    dispatch(updateSettingRestaurantDetails(formik.values));
  }, [formik.values]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-0">
          <div className="mt-2">
            <h5 className="fw-semibold">Resuaurant Details</h5>
          </div>
          <div className="col">
            <div className="col-md-4">
              <BaseInput
                name="name"
                type="text"
                label="Restaurant name"
                placeholder="Restaurant name"
                formik={formik}
                value={formik.values.name}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
              />
            </div>

            <div className="col-md-6 mt-3">
              <BaseTextArea
                name="description"
                label="Description"
                placeholder="write short description about this item"
                textAreaHeight={130}
                formik={formik}
                handleChange={formik.handleChange}
                value={formik.values.description}
                handleBlur={formik.handleBlur}
              />
            </div>
            <div className="col-md-6 mt-3">
              <label className="mb-2">Restaurant logo</label>
              <div className="d-flex ">
                <div className="" role="button">
                  <BaseImageUpload
                    getImageData={(val) => {
                      formik.setFieldValue("image", val);
                    }}
                    bgClass=""
                    title="Add Image"
                    formik={formik.touched.image}
                    imageValue={formik.values.image}
                  />
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

export default SettingRestaurantDetails;
