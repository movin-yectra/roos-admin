import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import BaseCheckBox from "../../../common/components/controls/BaseCheckBox";
import BaseInput from "../../../common/components/controls/BaseInput";
import {
  faBowlFood,
  faCaretDown,
  faImage,
  faTrashCan,
} from "../../../common/ui/Icons/Icons";
import BaseDropDown from "../../../common/components/controls/BaseDropDown";
import { ListItem } from "../../../common/models/base.model";
import { useDropdown } from "../../../common/hooks/useControls";
import { useFormik } from "formik";
import { CouponValidationSchema } from "../validation/schema";
import BaseButton from "../../../common/components/controls/BaseButton";
import CouponCanvas from "../components/CouponCanvas";
import BaseIcon from "../../../common/components/ui/BaseIcon";
import "react-quill/dist/quill.snow.css"; // Import the styles

import { CouponsResponseModel } from "../models";
import { useAppAlert } from "../../../common/hooks/useAppAlert";
import { CouponService, ICouponService } from "../services";
import { useAppSelector } from "../../../store";
import { useNavigate, useParams } from "react-router-dom";
import { RoosBaseServices } from "../../../common/services";

const CreateCoupons: React.FC = () => {
  const dropdownResponse: ListItem[] = [];
  const [value, setValue] = useState("");

  const [minDate, setMinDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");

  const [ids, setIds] = useState<string[]>([]);
  const [productNames, setProductNames] = useState<string[]>([]);

  const { dropdownHandleClick, toggleDropdown } = useDropdown();

  const { setIsLoading } = useAppAlert();
  const { couponId } = useParams();

  const navigate = useNavigate();

  const service: ICouponService = new CouponService();

  const _services_image = new RoosBaseServices();

  const selectorBusinessId = useAppSelector(
    (store) => store.businessId.businessId
  );

  const dropdownDown = [
    { name: "Percentage discount", value: "PERCENTAGEDISCOUNT" },
    { name: "Fixed product discount", value: "FIXEDPRODUCTDISCOUNT" },
  ];

  const toolbar = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        { header: "3" },
        { header: "4" },
        { header: "5" },
        { header: "5" },
        { font: [] },
      ],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],

      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const initialValues: CouponsResponseModel = {
    businessId: selectorBusinessId,
    couponCode: "",
    maxUsers: "",
    startDate: null,
    endDate: null,
    discountType: "",
    amount: "",
    couponStatus: false,
    offerApplicableForAllItem: false,
    logo: null,
    description: "",
    products: null,
  };

  const htmlToPlainText = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const getByCouponCode = (code: string) => {
    service
      .getCouponByCode(code)
      .then((response) => {
        setIsLoading(false);
        formik.setFieldError("couponCode", "Coupon code already exists");
      })
      .catch((errors) => {
        setIsLoading(false);
        formik.setFieldError("couponCode", "");
      });
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const convertDateFormat = (inputDate) => {
    //   const [day, month, year] = inputDate.split("-");

    //   const convertedDate = new Date(`${year}-${month}-${day}`);

    //   const formattedDate = convertedDate.toISOString().split("T")[0];

    //   return formattedDate;

    const [year, month, day] = inputDate.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const onSubmit = () => {
    formik.values.products = ids;

    const resultArray = formik.values.products.map((item) => ({
      menuItemId: item,
    }));
    formik.values.products = resultArray;
    console.log(formik.values.startDate);
    formik.values.description = htmlToPlainText(value);
    formik.values.startDate = formatDate(formik.values.startDate);
    formik.values.endDate = formatDate(formik.values.endDate);

    setIsLoading(true);
    service
      .createCoupon(formik.values)
      .then((response) => {
        setIsLoading(false);
        navigate(-1);
      })
      .catch((errors) => {
        setIsLoading(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CouponValidationSchema,
    onSubmit,
  });

  const handleImageUpload = (event): void => {
    const file: any = event.target.files?.[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      let image: any = reader.result;
      if (reader.result) {
        const base64 = image.replace(/^data:image\/[a-z]+;base64,/, "");
        _services_image
          .getBaseToImage(base64)
          .then((response) => {
            console.log("url", response);
            formik.setFieldValue("logo", response.imageResponse);
          })
          .catch(() => {
            console.log("Error Image");
          });
      }
    };
    // if (file) {
    //   const imageUrl = URL.createObjectURL(file);
    //   formik.setFieldValue("logo", imageUrl);
    //   console.log(file);
    // }

    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   console.log(reader.result);
    //   formik.setFieldValue("image", reader.result);
    // };
    // reader.onerror = (err) => {
    //   console.log("reader.result", err);
    // };
  };

  const handleUpdateCoupon = () => {
    formik.values.products = ids;

    const resultArray = formik.values.products.map((item) => ({
      menuItemId: item,
    }));
    formik.values.products = resultArray;

    console.log("update form", formik.values);
    setIsLoading(true);

    service
      .updateCoupon(`${couponId}`, formik.values)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        navigate(-1);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleGetSelectedItems = (selectedItems) => {
    const extractedIds: string[] = [];
    const extractedProductNames: string[] = [];

    if (selectedItems.length > 0) {
      selectedItems.forEach((item: any) => {
        extractedIds.push(item.id);
        extractedProductNames.push(item.productName);
      });

      if (JSON.stringify(ids) !== JSON.stringify(extractedIds)) {
        setIds(extractedIds);
      }

      if (
        JSON.stringify(productNames) !== JSON.stringify(extractedProductNames)
      ) {
        setProductNames(extractedProductNames);
      }
    }
  };

  const handleDeleteProduct = (menu: any) => {
    console.log("Before deletion:", productNames);
    setProductNames((prevProductNames) =>
      prevProductNames.filter((item) => item !== menu)
    );
  };

  const handleStartDateChange = (event: any) => {
    formik.setFieldValue("startDate", event.target.value);
    setStartDate(event.target.value);
  };

  useEffect(() => {
    if (dropdownDown && Array.isArray(dropdownDown)) {
      dropdownDown.forEach((list) => {
        let item: ListItem = new ListItem();
        item.text = list.name;
        item.value = list.value;
        dropdownResponse.push(item);
      });
    }
  }, []);

  useEffect(() => {
    if (couponId) {
      setIsLoading(true);
      service
        .getCoupon(`${couponId}`)
        .then((response) => {
          console.log(response);
          setIsLoading(false);

          if (response && response.description !== undefined) {
            setValue(response.description);
          }

          formik.setValues({
            businessId: response.businessId,
            couponCode: response.couponCode,
            // startDate: response.startDate,
            // endDate: response.endDate,
            startDate: convertDateFormat(response.startDate),
            endDate: convertDateFormat(response.endDate),
            description: response.description,
            discountType: response.discountType,
            amount: response.amount,
            maxUsers: response.maxUsers,
            couponStatus: response.couponStatus,
            offerApplicableForAllItem: response?.offerApplicableForAllItem,
            logo: response.logo,
            products: response.products,
          });
        })
        .catch((errors) => console.log(errors));
    }
  }, [couponId]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setMinDate(currentDate);
  }, []);

  return (
    <div className="px-5 mt-2 mb-4">
      <div className="d-flex justify-content-between border-2 border-bottom pb-1">
        <div className="">
          <h4 className="fw-semibold">Coupons</h4>
        </div>
      </div>
      <div className="row g-0 mt-3">
        <form className="col-md-8" onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-between mb-3">
            <div className="col-md-5 p-2 border d-flex justify-content-center bg-white">
              <BaseCheckBox
                boxClass="form-switch form-check-reverse"
                id="couponStatus"
                name="couponStatus"
                label="Enable/Disable Coupon"
                types="checkbox"
                checked={formik.values.couponStatus}
                handleChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div className="col-md-5  d-flex justify-content-center">
              <div className="w-100">
                <BaseInput
                  name="couponCode"
                  type="text"
                  inputClass="rounded-0"
                  placeholder="Eg. “New coupon”"
                  label="Coupon Code"
                  value={formik.values.couponCode}
                  handleChange={formik.handleChange}
                  handleBlur={(e) => {
                    formik.handleBlur(e);
                    console.log("Coupon Code Value:", formik.values.couponCode);
                    getByCouponCode(formik.values.couponCode);
                  }}
                />
                {formik.errors.couponCode && (
                  <div style={{ color: "red" }}>{formik.errors.couponCode}</div>
                )}
              </div>
            </div>
            <div className="col-md-5  d-flex justify-content-center">
              <div className="w-100">
                <BaseInput
                  name="logo"
                  type="file"
                  inputIcon={faImage}
                  iconPosition="start"
                  inputClass="rounded-0 custom-file-input text-black-50"
                  placeholder="Add Image"
                  label="Upload Logo"
                  formik={formik}
                  handleChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <div className="col-md-5  d-flex justify-content-center">
              <div className="w-100">
                <label>Discount type</label>
                <BaseDropDown
                  listOfOptions={dropdownResponse}
                  defaultClass=""
                  toggle={toggleDropdown}
                  onChange={(value: ListItem) => {
                    formik.setFieldValue("discountType", value.value);
                  }}
                  name="discountType"
                  handleClick={dropdownHandleClick}
                  formik={formik}
                >
                  <BaseInput
                    name="discountType"
                    inputClass="border-body rounded-0 shadow-none"
                    placeholder="Today"
                    value={formik.values.discountType}
                    inputIcon={faCaretDown}
                    readOnly={true}
                  />
                </BaseDropDown>
              </div>
            </div>
            <div className="col-md-5  d-flex justify-content-center">
              <div className="w-100">
                {formik.values.discountType === "PERCENTAGEDISCOUNT" ? (
                  <BaseInput
                    name="amount"
                    type="number"
                    inputClass="rounded-0"
                    placeholder="45 %"
                    label="Amount Percentage"
                    value={formik.values.amount}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                  />
                ) : (
                  <BaseInput
                    name="amount"
                    type="number"
                    inputClass="rounded-0"
                    placeholder="$45"
                    label="Amount"
                    value={formik.values.amount}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <div className="col-md-5  d-flex justify-content-center">
              <div className="w-100">
                <BaseInput
                  name="startDate"
                  type="date"
                  inputClass={`text-black-50 border-bottom rounded-0 ${
                    formik.errors.startDate &&
                    formik.touched.startDate &&
                    "border-danger border-2"
                  }`}
                  label="Start date"
                  value={formik.values.startDate}
                  minDate={minDate}
                  formik={formik}
                  handleChange={(event) => {
                    handleStartDateChange(event);
                  }}
                />
              </div>
            </div>
            <div className="col-md-5  d-flex justify-content-center">
              <div className="w-100">
                <BaseInput
                  name="endDate"
                  type="date"
                  inputClass="rounded-0 text-black-50"
                  label="End date"
                  value={formik.values.endDate}
                  minDate={startDate}
                  formik={formik}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div className="col-md-5 p-2 mt-3 border d-flex justify-content-center bg-white">
              <BaseCheckBox
                boxClass="form-switch form-check-reverse"
                id="offerApplicableForAllItem"
                name="offerApplicableForAllItem"
                label="Offer applicable to all items"
                types="checkbox"
                checked={formik.values.offerApplicableForAllItem}
                handleChange={formik.handleChange}
              />
            </div>

            <div className="col-md-5  d-flex justify-content-center">
              <div className="w-100">
                <BaseInput
                  name="maxUsers"
                  type="number"
                  inputClass="rounded-0"
                  placeholder="No. of Users"
                  label="No. of Users"
                  value={formik.values.maxUsers}
                  handleChange={formik.handleChange}
                />
                {formik.errors.maxUsers && (
                  <div style={{ color: "red" }}>{formik.errors.maxUsers}</div>
                )}
              </div>
            </div>
          </div>
          {!formik.values.offerApplicableForAllItem && (
            <div className="mb-3">
              <div className="mb-1">Select products applicable for offer</div>
              <div className="row bg-white g-0 shadow-sm p-3 border">
                <CouponCanvas onGetSelectedItems={handleGetSelectedItems} />
                <div className="col-10">
                  {productNames.map((menu, index) => (
                    <span
                      className="badge text-bg-light px-2 py-2 ms-2 mt-2 border"
                      key={index}
                    >
                      {menu}
                      <span role="button">
                        <BaseIcon
                          icon={faTrashCan}
                          classes="text-danger ms-2"
                          handleIconClick={() => handleDeleteProduct(menu)}
                        />
                      </span>
                    </span>
                  ))}
                </div>

                <div
                  className="col-2 text-end"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-title="Tooltip on top"
                >
                  <span
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    role="button"
                  >
                    <BaseIcon icon={faBowlFood} classes="fs-3 text-success" />
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mb-3" style={{ height: "230px" }}>
            <label htmlFor="">Description</label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={toolbar}
              formats={formats}
              bounds={".app"}
              placeholder={"Description..."}
              className="bg-white"
              style={{ height: "150px" }}
            />
          </div>
          <div className="">
            {couponId ? (
              <BaseButton
                types="button"
                defaultClass="btn btn-warning mt-3"
                name="Update Coupon"
                handleClick={handleUpdateCoupon}
              />
            ) : (
              <BaseButton
                types="submit"
                defaultClass="btn btn-warning mt-3"
                name="Create Coupon"
              />
            )}
          </div>
        </form>
        <div className="col-md-4 px-4 ">
          <div className="text-center">Preview of coupon</div>
          <div className="card-shadow border border-5 border-success  rounded-1 p-3 mt-3 ">
            {formik.values.logo && (
              <div className="text-center">
                <img
                  src={formik.values.logo}
                  alt="logo"
                  width={80}
                  height={80}
                  className="rounded"
                />
              </div>
            )}
            {formik.values.amount && formik.values.discountType && (
              <div className="mt-3 text-center">
                Get{" "}
                {formik.values.discountType === "PERCENTAGEDISCOUNT" ? (
                  <span className="fw-semibold">
                    {formik.values.amount + "%"}
                  </span>
                ) : (
                  formik.values.amount + "$"
                )}{" "}
                at your next buy
              </div>
            )}

            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: value }}
            ></div>
            <div className="text-center border-dash-top pt-3">
              <p className="mb-1 text-muted">Coupon code</p>
              <h4>{formik.values.couponCode?.toUpperCase()}</h4>
              {formik.values.endDate && (
                <small>
                  Valid until{" "}
                  {formik.values.endDate?.split("-").reverse().join("-")}
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupons;
