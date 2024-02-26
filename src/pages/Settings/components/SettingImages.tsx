import React, {useEffect } from "react";
import { useFormik } from "formik";

//custom components
import BaseImageUpload from "../../../common/components/ui/BaseImageUpload";
import BaseButton from "../../../common/components/controls/BaseButton";

//validations
import { imagesSchama } from "../validation/schema";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateSettingRestaurantImages } from "../../../store/features/restaurantDetailsSlice";

//model
import { RestaurantImagesModel } from "../../RestaurantDetails/models";

//services
import { SettingServices } from "../services";

//custom hooks
import { useAppAlert } from "../../../common/hooks/useAppAlert";

const SettingImages: React.FC = () => {
  const _services = new SettingServices();

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  //store hook
  const selectors = useAppSelector((store) => store.businessId);
  const dispatch = useAppDispatch();
  const { restaurant } = useAppSelector((store) => store.restaurant);

  //formik initialValues
  const initialValues: RestaurantImagesModel = new RestaurantImagesModel();

  //formik submit action
  const onSubmit = () => {
    setIsLoading(true);
    _services
      .updateRestaurantDetails(
        selectors.businessId,
        restaurant
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
    validationSchema: imagesSchama,
    onSubmit,
  });

  useEffect(() => {
    dispatch(updateSettingRestaurantImages(formik.values));
  }, [formik.values]);

  useEffect(() => {
    formik.setValues({
      imageOne: restaurant?.imageOne,
      imageTwo: restaurant?.imageTwo,
      imageThree: restaurant?.imageThree,
    });
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="mt-2">
              <h5 className="fw-semibold">Resuaurant Images</h5>
            </div>
            <div className="my-5 d-flex">
              <BaseImageUpload
                getImageData={(val) => {
                  formik.setFieldValue("imageOne", val);
                }}
                title="Add Image"
                formik={formik.touched.imageOne}
                imageValue={formik.values.imageOne}
              />
              <BaseImageUpload
                getImageData={(val) => {
                  formik.setFieldValue("imageTwo", val);
                }}
                bgClass="ms-5"
                title="Add Image"
                formik={formik.touched.imageOne}
                imageValue={formik.values.imageTwo}
              />
              <BaseImageUpload
                getImageData={(val) => {
                  formik.setFieldValue("imageThree", val);
                }}
                bgClass="ms-5"
                title="Add Image"
                formik={formik.touched.imageOne}
                imageValue={formik.values.imageThree}
              />
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

export default SettingImages;
