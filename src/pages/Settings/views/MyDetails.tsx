/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";

//custom components
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseInput from "../../../common/components/controls/BaseInput";

//icons
import { faEnvelope } from "../../../common/ui/Icons/Icons";

//validations
import { myDetailsSchema } from "../validation/schema";

//custom Hooks
import { useInputControls } from "../../../common/hooks/useControls";

//azure
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { SettingServices } from "../services";
import { useAppAlert } from "../../../common/hooks/useAppAlert";
import { useAppSelector } from "../../../store";

class MyDetailsModel {
  firstName?: string;
  email?: string;
  mobileNo?: string;
}

const MyDetails: React.FC = () => {
  const _services = new SettingServices();

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const selectorsBusinessID = useAppSelector((store) => store.businessId);
  const selectors = useAppSelector((state) => state.restaurant.restaurant);
  
  const { accounts } = useMsal();
  const initialValues: MyDetailsModel = {
    firstName: "",
    email: "",
    mobileNo: "",
  };

  const onSubmit = () => {
    console.log("submited");

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
    validationSchema: myDetailsSchema,
    onSubmit,
  });
  console.log(formik.errors);
  const { handleInputNumber } = useInputControls(formik);

  useEffect(() => {
    if (accounts[0]) {
      formik.setValues({
        firstName: accounts[0]?.idTokenClaims?.given_name ?? "",
        email: accounts[0]?.username ?? "",
        mobileNo: accounts[0]?.idTokenClaims?.extension_PhoneNumber ?? "",
      } as MyDetailsModel);
    }
  }, []);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="col-md-6">
              <BaseInput
                name="firstName"
                type="text"
                label="Name"
                placeholder="Name"
                value={formik.values.firstName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                formik={formik}
              />
            </div>
            <div className="col-md-8 mt-3">
              <BaseInput
                iconClass="text-warning"
                inputIcon={faEnvelope}
                name="email"
                type="email"
                label="Email"
                placeholder="killanjames@gmail.com"
                value={formik.values.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                formik={formik}
              />
            </div>

            <div className="col-md-8 mt-3">
              <BaseInput
                name="mobileNo"
                type="number"
                label="Mobile no"
                placeholder="+91 9475945704"
                formik={formik}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                handleKeyPress={handleInputNumber}
                value={formik.values.mobileNo}
              />
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="d-flex align-items-end justify-content-end">
            <BaseButton
              id="update-save"
              defaultClass="btn btn-warning ms-4"
              name="Update"
              types="submit"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default MyDetails;
