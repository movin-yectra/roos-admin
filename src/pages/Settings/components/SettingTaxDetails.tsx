import { useEffect, useState } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";

//custom componetns
import BaseInput from "../../../common/components/controls/BaseInput";
import BaseButton from "../../../common/components/controls/BaseButton";

//icon
import { faPlus, faTrash } from "../../../common/ui/Icons/Icons";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateSettingTaxDetails } from "../../../store/features/restaurantDetailsSlice";

//models
import { ListItem } from "../../../common/models/base.model";
import { TaxDetailsModel } from "../../RestaurantDetails/models";

//validations
import { TaxDetailsValidation } from "../../RestaurantDetails/validation/schema";

//custom hook
import { useInputControls } from "../../../common/hooks/useControls";
import { useAppAlert } from "../../../common/hooks/useAppAlert";

//services
import { SettingServices } from "../services";

const SettingTaxDetails:React.FC = () => {
  const [dropdownResponse, setDropdownResponse] = useState<ListItem[]>([]);

  const dispatch = useAppDispatch();
  const selectors = useAppSelector((state) => state.restaurant.restaurant);
  const selectorsDropDown = useAppSelector(
    (state) => state.roosCommon.dropDown
  );

  const _services = new SettingServices();

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const selectorsBusinessID = useAppSelector((store) => store.businessId);

  const initialValues: TaxDetailsModel = {
    taxDetails: [
      {
        taxName: "",
        taxValue: "",
        taxUnits: "",
      },
    ],
  };

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
    initialValues: initialValues,
    validationSchema: TaxDetailsValidation,
    onSubmit,
  });

  const { handleInputNumber } = useInputControls(formik);

  const listOfUnits = [
    { name: "$", value: `${selectorsDropDown.dropDownData.currencyCode}` },
  ];

  useEffect(() => {
    if (listOfUnits && Array.isArray(listOfUnits)) {
      listOfUnits.forEach((list) => {
        let item: ListItem = new ListItem();
        item.text = list.name;
        item.value = list.value;
        dropdownResponse.push(item);
      });
    }
    if (selectors?.taxDetails.length > 0) {
      formik.setValues({ taxDetails: selectors?.taxDetails });
    }
  }, []);

  useEffect(() => {
    dispatch(updateSettingTaxDetails(formik.values.taxDetails));
  }, [formik.values]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="mt-3">
              <h5 className="fw-semibold">TAX details</h5>
            </div>
            <div className="row gx-4 gy-0">
              <div className="col-md-12">
                <div className="row g-auto">
                  <div>
                    <FormikProvider value={formik}>
                      <FieldArray
                        name="taxDetails"
                        render={(arrayHelpers) => (
                          <>
                            <div className="row mt-2">
                              <div className="col-md-3">Tax Name</div>
                              <div className="col-md-3">Tax Amount</div>
                              <div className="col-md-3">Tax Units</div>
                            </div>
                            {arrayHelpers.form.values.taxDetails?.map(
                              (value, index) => (
                                <div className="row mb-2" key={index}>
                                  <div className="col-md-3">
                                    <BaseInput
                                      type="text"
                                      name="taxName"
                                      placeholder="Tax Name"
                                      value={value.taxName}
                                      inputClass={` bg-light-1 ${
                                        formik.errors.taxDetails &&
                                        formik.touched.taxDetails
                                          ? "border-danger"
                                          : "border-0"
                                      }`}
                                      handleChange={(e) => {
                                        formik.setFieldValue(
                                          `taxDetails.${index}.taxUnits`,
                                          "$"
                                        );
                                        formik.setFieldValue(
                                          `taxDetails.${index}.taxName`,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="col-md-3">
                                    <BaseInput
                                      type="number"
                                      name="taxValue"
                                      placeholder="$ 45"
                                      value={value.taxValue}
                                      inputClass={` bg-light-1 ${
                                        formik.errors.taxDetails &&
                                        formik.touched.taxDetails
                                          ? "border-danger"
                                          : "border-0"
                                      }`}
                                      handleChange={(e) => {
                                        formik.setFieldValue(
                                          `taxDetails.${index}.taxValue`,
                                          e.target.value
                                        );
                                        formik.setFieldValue(
                                          `taxDetails.${index}.taxUnits`,
                                          "$"
                                        );
                                      }}
                                      handleKeyPress={handleInputNumber}
                                    />
                                  </div>
                                  <div className="col-md-3">
                                    {/* <BaseDropDown
                                      listOfOptions={dropdownResponse}
                                      defaultClass=""
                                      toggle={toggleDropdown}
                                      onChange={(value: ListItem) => {
                                        setSelectedDropdownValue(value);
                                        formik.setFieldValue(
                                          `taxDetails.${index}.taxUnits`,
                                          value.value
                                        );
                                      }}
                                      name="taxUnits"
                                      handleClick={dropdownHandleClick}
                                    >
                                      <BaseInput
                                        name="taxUnits"
                                        inputClass={`border-body rounded-1 shadow-none bg-light-1 ${
                                          formik.errors.taxDetails &&
                                          formik.touched.taxDetails
                                            ? "border-danger"
                                            : "border-0"
                                        }`}
                                        value={value.taxUnits}
                                        inputIcon={faCaretDown}
                                        iconPosition="start"
                                        placeholder="Select"
                                        readOnly
                                      />
                                    </BaseDropDown> */}
                                    <BaseInput
                                      type="text"
                                      name="taxUnits"
                                      value={value.taxUnits}
                                      inputClass={` bg-light-1 ${
                                        formik.errors.taxDetails &&
                                        formik.touched.taxDetails
                                          ? "border-danger"
                                          : "border-0"
                                      }`}
                                      handleChange={()=>formik.setFieldValue(
                                        `taxDetails.${index}.taxUnits`,
                                        "$"
                                      )}
                                      handleKeyPress={handleInputNumber}
                                    />
                                  </div>

                                  <div className="col-md-2">
                                    <BaseButton
                                      types="button"
                                      icon={faTrash}
                                      iconPosition="start"
                                      handleClick={() =>
                                        arrayHelpers.remove(index)
                                      }
                                      defaultClass="btn text-danger"
                                    />
                                  </div>
                                </div>
                              )
                            )}

                            <div className="mt-3">
                              <BaseButton
                                types="button"
                                name="Add"
                                icon={faPlus}
                                handleClick={() =>
                                  arrayHelpers.push({
                                    taxName: "",
                                    taxValue: "",
                                    taxUnits: "",
                                  })
                                }
                                iconPosition="start"
                                defaultClass="btn border rounded-5"
                              />
                            </div>
                          </>
                        )}
                      />
                    </FormikProvider>
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

export default SettingTaxDetails;
