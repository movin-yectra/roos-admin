import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { useFormik } from "formik";

//custom components
import BaseImageUpload from "../../../common/components/ui/BaseImageUpload";
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseTextArea from "../../../common/components/controls/BaseTextArea";

//validations
import { RestaurantDetailsValidation } from "../validation/schema";

//models
import { RestaurantDataModel } from "../models";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  addRestaurantDetails,
} from "../../../store/features/restaurantDetailsSlice";
import { AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";

const RestaurantBasicDetails: React.FC = () => {
  const selectors = useAppSelector((store) => store.restaurant.restaurant);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  const initialValues: RestaurantDataModel = new RestaurantDataModel();

  const onSubmit = () => {
    if (Object.keys(formik.errors).length === 0) {
      navigate("cuisine-details", { replace: true });
      dispatch(addRestaurantDetails(formik.values));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RestaurantDetailsValidation,
    onSubmit: onSubmit,
  });

  useEffect(() => {
    formik.setValues({
      // localAccountId: localAccountId,
      name: selectors?.restaurantName,
      description: selectors?.description,
      image: selectors?.restaurantLogo,
    });
  }, []);

  return (
    <>
      <AuthenticatedTemplate>
        <div className="row g-0 h-100 w-100">
          <div className="w-50">
            <div className="position-fixed top-0 start-0 end-0 bottom-0">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{ hidden: { x: "100%" }, visible: { x: 0 } }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="col-md-6 restaurant-left-bg p-4 d-flex flex-column h-100"
              >
                <form
                  className="d-flex flex-column h-100"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="mt-3">
                    <h4 className="fw-semibold">
                      Enter your restaurant Details
                    </h4>
                    <p className="text-muted">
                      It takes less than 5 minutes !!
                    </p>
                  </div>

                  <div className="row g-0">
                    <div className="col-4">
                      <h5>Restaurant logo</h5>
                      <div className="d-flex">
                        <BaseImageUpload
                          getImageData={(val) => {
                            formik.setFieldValue("image", val);
                          }}
                          title="Add Image"
                          formik={formik.touched.image}
                          imageValue={formik.values.image}
                        />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <BaseInput
                        label="Restaurant Name"
                        type="text"
                        placeholder="Enter Address"
                        name="name"
                        inputClass="border-0 bg-light-1"
                        value={formik.values.name}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        formik={formik}
                      />
                    </div>

                    <div className="col-12 mt-4">
                      <BaseTextArea
                        name="description"
                        label="Description"
                        placeholder="write short description about this restaurant"
                        textAreaHeight={130}
                        inputClass="border-0 bg-light-1"
                        formik={formik}
                        handleChange={formik.handleChange}
                        handleBlur={formik.handleBlur}
                        value={formik.values.description}
                      />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <BaseButton
                      types="submit"
                      name="Coming up: cuisine details"
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
            className="col-md-6 restaurant-right-bg p-4 w-50 vh-100"
          >
            <div className="d-flex flex-column ">
              <div className="text-center">
                {formik.values.image ? (
                  <img
                    src={formik.values.image}
                    alt="logo"
                    className="p-2 border rounded-1"
                    width={125}
                    height={125}
                  />
                ) : (
                  <Skeleton width={120} height={120} className="mt-3" />
                )}
              </div>
              <div className="mt-3 text-center">
                {formik.values.name ? (
                  <p className="fw-bolder mb-0">{formik.values.name}</p>
                ) : (
                  <Skeleton width={"50%"} className="mt-3" />
                )}
              </div>
              <div
                className="mt-1 text-center"
                style={{ overflowWrap: "break-word" }}
              >
                {formik.values.description ? (
                  <p className="px-4">{formik.values.description}</p>
                ) : (
                  <Skeleton width={"30%"} />
                )}
              </div>
              <div className="mt-5 text-start">
                <Skeleton width={"100%"} />
                <Skeleton width={"90%"} className="mt-4" />
                <Skeleton width={"70%"} className="mt-4" />
                <Skeleton width={"60%"} className="mt-4" />
                <Skeleton width={"50%"} className="mt-4" />
                <Skeleton width={"40%"} className="mt-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>Page Not Found..</UnauthenticatedTemplate>
    </>
  );
};

export default RestaurantBasicDetails;
