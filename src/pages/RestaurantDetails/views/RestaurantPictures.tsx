import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

//custom components
import BaseImageUpload from "../../../common/components/ui/BaseImageUpload";
import BaseButton from "../../../common/components/controls/BaseButton";

//models
import { RestaurantImagesModel } from "../models";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { addRestaurantImage } from "../../../store/features/restaurantDetailsSlice";

//validations
import { imagesSchama } from "../../Settings/validation/schema";

const RestaurantPictures: React.FC = () => {
  const selectors = useAppSelector((state) => state.restaurant.restaurant);
  const selectorsData = useAppSelector((state) => state.restaurant);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: RestaurantImagesModel = new RestaurantImagesModel();

  const onSubmit = (value) => {
    if (Object.keys(formik.errors).length === 0) {
      navigate("../restaurant-urls", { replace: true });
      dispatch(addRestaurantImage(value));
      console.log(value);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    formik.setValues({
      imageOne: selectors?.imageOne,
      imageTwo: selectors?.imageTwo,
      imageThree: selectors?.imageThree,
    });
  }, []);

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
              className="col-md-6 restaurant-left-bg p-4 d-flex flex-column h-100"
            >
              <form
                className="d-flex flex-column h-100"
                onSubmit={formik.handleSubmit}
              >
                <div className="mt-3">
                  <h4 className="fw-semibold">
                    Enter your Restaurant Pictures
                  </h4>
                  <p className="text-muted">It takes less than 5 minutes !!</p>
                </div>
                <div className="py-5 my-5 d-flex">
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
                    formik={formik.touched.imageTwo}
                    imageValue={formik.values.imageTwo}
                  />
                  <BaseImageUpload
                    getImageData={(val) => {
                      formik.setFieldValue("imageThree", val);
                    }}
                    bgClass="ms-5"
                    title="Add Image"
                    formik={formik.touched.imageThree}
                    imageValue={formik.values.imageThree}
                  />
                </div>
                <div className="mt-auto pt-5 d-flex justify-content-between">
                  <BaseButton
                    name="Back"
                    defaultClass="btn btn-outline-secondary rounded-1 px-3 py-2"
                    handleClick={() => navigate("../tax-details")}
                  />
                  <BaseButton
                    name="Coming up: website URLs"
                    defaultClass="btn btn-warning px-3 py-2"
                    types="submit"
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
          className="col-md-6 restaurant-right-bg p-4 w-50"
        >
          <div className="d-flex flex-column ">
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

            <div className="mt-2 card-shadow rounded-1 px-3 mt-2">
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
                      {item.restaurantOpenCloseTime?.map((child, i) => (
                        <div className="row g-0">
                          <div className="m-1 col-4" key={i}>
                            {child.day}
                          </div>
                          <div className="col-5">
                            {child.timings.map((value, i) => (
                              <div className="row">
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
            <div className="mt-2 card-shadow rounded-1 p-2 mt-2">
              <div className="mt-2 row align-items-center ">
                <h5 className="col-4">Outlet Address :</h5>
                <div className="col-8 d-flex justify-content-start">
                  <h6 className="">
                    {selectorsData.restaurant.address}{" "}
                    {selectorsData.restaurant.city}
                    {selectorsData.restaurant.state}{" "}
                    {selectorsData.restaurant.zipCode === null
                      ? ""
                      : selectorsData.restaurant.zipCode}{" "}
                  </h6>
                </div>
              </div>
            </div>
            <div className="mt-2 card-shadow rounded-1 px-3 py-2 mt-2">
              <div className="mt-2 ">
                <h5 className="">Delivery Details</h5>
                <div className="row">
                  <div className="col-4">
                    <div>Preparing Time </div>
                    <div>Delivery Mode </div>
                    {selectorsData.restaurant.deliveryMode ===
                      "Self Delivery" && "Delivery Fee"}
                  </div>
                  <div className="col-7">
                    <div>{selectorsData.restaurant.leadTime}</div>
                    <div>{selectorsData.restaurant.deliveryMode}</div>
                    {selectorsData.restaurant.deliveryRadius && (
                      <div>
                        {selectorsData.restaurant.deliveryFee?.map(
                          (item, i) => (
                            <div key={i}>
                              <h6>
                                Delivery Radius: {item.deliveryFee}km - Fee :{" "}
                                {item.deliveryRadius}$
                              </h6>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {selectorsData.restaurant.deliveryZipcode && (
                      <div>
                        {selectorsData.restaurant.deliveryFee?.map(
                          (item, i) => (
                            <div key={i}>
                              <h6>
                                Delivery Radius: {item.deliveryFee}km - Fee : $
                                {item.deliveryRadius}
                              </h6>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 card-shadow rounded-1 px-3 mt-2">
              <div className="mt-2 row align-items-center ">
                <h5 className="col-4">Tax Details :</h5>
                <div className="col-8 d-flex justify-content-start">
                  {selectorsData.restaurant.taxDetails?.map((item, i) => (
                    <div key={i}>
                      <div>Name : {item.taxName}</div>
                      <div>Amount : {item.taxValue} </div>
                      <div>Units :{item.taxUnits}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2 card-shadow rounded-1 p-2 py-2 mt-2">
              <div className="mt-2 d-flex align-items-center ">
                <h5 className="">Restaurant Images :</h5>
                <div className="d-flex ms-5">
                  {formik.values.imageOne && (
                    <img
                      src={formik.values.imageOne}
                      alt=""
                      width={50}
                      height={50}
                    />
                  )}
                  {formik.values.imageTwo && (
                    <img
                      src={formik.values.imageTwo}
                      alt=""
                      width={50}
                      height={50}
                      className="ms-2"
                    />
                  )}
                  {formik.values.imageThree && (
                    <img
                      src={formik.values.imageThree}
                      alt=""
                      width={50}
                      height={50}
                      className="ms-2"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default RestaurantPictures;
