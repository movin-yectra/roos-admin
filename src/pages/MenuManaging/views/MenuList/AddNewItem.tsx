import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";

//custom Hook
import { useAppAlert } from "../../../../common/hooks/useAppAlert";
import { useDropdown } from "../../../../common/hooks/useControls";
import { useInputControls } from "../../../../common/hooks/useControls";

//custom components
import BaseButton from "../../../../common/components/controls/BaseButton";
import BaseDropDown from "../../../../common/components/controls/BaseDropDown";
import BaseInput from "../../../../common/components/controls/BaseInput";
import BaseImageUpload from "../../../../common/components/ui/BaseImageUpload";
import BaseTextArea from "../../../../common/components/controls/BaseTextArea";

//validations
import { addNewItemSchema } from "../../validation/schema";

//services
import { IMenuService, MenuService } from "../../services";

//models
import { ListItem } from "../../../../common/models/index";
import { AddNewProductModel } from "../../models";

//icon
import { faCaretDown } from "../../../../common/ui/Icons/Icons";
import { createMenuItem } from "../../../../store/features/menuSlice";

//store
import { useAppDispatch, useAppSelector } from "../../../../store";

const AddNewItem: React.FC = () => {
  const dropdownResponse: ListItem[] = [];

  //store
  const categorySelector = useAppSelector((store) => store.category.categories);
  const selectorBusinessId = useAppSelector(
    (store) => store.businessId.businessId
  );
  const menuSelector = useAppSelector((store) => store.menu.createMenu);

  //custom hook
  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();
  //services
  const service: IMenuService = new MenuService();
  let request = new AddNewProductModel();

  //hook
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { menuId } = useParams();

  const {
    dropdownHandleClick,
    toggleDropdown,
    refOutside,
    setSelectedDropdownValue,
  } = useDropdown();

  //formik initial value
  const initialValues: AddNewProductModel = {
    price: "",
    category: "",
    productNo: "",
    productName: "",
    addedIngredients: "",
    productDescription: "",
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    businessId: selectorBusinessId,
  };
  // formik submit
  const onSubmit = () => {
    setIsLoading(true);
    request = formik.values;

    service
      .createMenu(request)
      .then((response) => {
        if (response) {
          setResponseMassage({
            message: "Menu Created Successfully",
            statusCode: 200,
          });
          setTimeout(() => {
            setIsLoading(false);
            setShowModel(true);
          }, 1000);
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
        }, 2000);
      });

    setTimeout(() => {
      setShowModel(false);
      navigate("/menu-managing");
    }, 2500);
  };

  const updateMenuItem = () => {
    setIsLoading(true);
    service
      .updateMenu(`${menuId}`, formik.values)
      .then((response) => {
        if (response) {
          setResponseMassage({
            message: "Updated menu Successfully",
            statusCode: 200,
          });
          setTimeout(() => {
            setIsLoading(false);
            setShowModel(true);
          }, 1000);
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
        }, 1000);
      });

    setTimeout(() => {
      setShowModel(false);
      navigate("/menu-managing");
    }, 2500);
  };

  //formik config
  const formik = useFormik({
    initialValues,
    validationSchema: addNewItemSchema,
    onSubmit,
  });

  //custom hook
  const { handleInputNumber } = useInputControls(formik);

  const handleCustomize = () => {
    formik.setTouched({
      productNo: true,
      productName: true,
      addedIngredients: true,
      category: true,
      productDescription: true,
      price: true,
      imageOne: true,
      imageTwo: true,
      imageThree: true,
    });
    if (Object.keys(formik.errors).length === 0) {
      navigate("customize");
    }
  };

  const handleClick = () => {
    dropdownHandleClick();
    dispatch(createMenuItem(formik.values));
    navigate("category-customize");
  };

  useEffect(() => {
    if (categorySelector && Array.isArray(categorySelector)) {
      categorySelector.forEach((list) => {
        let item: ListItem = new ListItem();
        item.text = list.value;
        item.value = list.value;
        dropdownResponse.push(item);
      });
    }
    if (location.pathname === "/menu-managing/add-newItem") {
      formik.resetForm();
    }
  }, []);

  useEffect(() => {
    if (menuId) {
      service
        .getMenuItem(`${menuId}`)
        .then((response) => {
          formik.setValues({
            imageOne: response?.imageOne,
            imageTwo: response?.imageTwo,
            imageThree: response?.imageThree,
            productNo: response.productNo,
            productName: response.productName,
            productDescription: response.productDescription,
            price: response.price,
            businessId: response.businessId,
            addedIngredients: response.addedIngredients,
            category: response.category,
          });
        })
        .catch((errors) => console.log(errors));
    } else {
      formik.setValues({
        imageOne: menuSelector?.imageOne,
        imageTwo: menuSelector?.imageTwo,
        imageThree: menuSelector?.imageThree,
        productNo: menuSelector?.productNo,
        productName: menuSelector?.productName,
        productDescription: menuSelector?.productDescription,
        price: menuSelector?.price,
        businessId: selectorBusinessId,
        addedIngredients: menuSelector?.addedIngredients,
        category: menuSelector?.category,
      });
    }
  }, [categorySelector]);

  useEffect(() => {
    dispatch(createMenuItem(formik.values));
  }, [formik.values]);

  return (
    <>
      <div className="py-5">
        <form onSubmit={formik.handleSubmit}>
          <div className="d-flex justify-content-between align-items-center mb-4 ms-5 g-0">
            <div className="">
              <BaseInput
                name="productNo"
                type="number"
                label="Product No"
                placeholder="Product No"
                inputClass="border-0"
                value={formik.values.productNo}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                handleKeyPress={handleInputNumber}
                formik={formik}
              />
            </div>

            <div className="">
              <BaseInput
                name="productName"
                type="text"
                label="Product Name"
                placeholder="Type your dish name"
                inputClass="border-0"
                value={formik.values.productName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                formik={formik}
              />
            </div>
            <div className="">
              <BaseInput
                name="addedIngredients"
                type="text"
                label="Added Ingredients"
                placeholder="Type your dish name"
                inputClass="border-0"
                value={formik.values.addedIngredients}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                formik={formik}
              />
            </div>

            <div className="col-md-3">
              <label
                className={`fs-6 ${
                  formik.errors.category && formik.touched.category
                    ? "text-danger"
                    : ""
                }`}
              >
                Category
              </label>
              <div className="col-8" ref={refOutside}>
                <BaseDropDown
                  listOfOptions={dropdownResponse}
                  defaultClass=""
                  toggle={toggleDropdown}
                  onChange={(value: ListItem) => {
                    formik.values.category = value.value;
                    setSelectedDropdownValue(value);
                  }}
                  name="Category"
                  type="button"
                  handleClick={handleClick}
                >
                  <BaseInput
                    name="category"
                    inputClass="border-body rounded-1 shadow-none"
                    placeholder="Category"
                    value={formik.values.category}
                    handleChange={formik.handleChange}
                    formik={formik}
                    inputIcon={faCaretDown}
                    readOnly
                  />
                </BaseDropDown>
              </div>
            </div>
          </div>
          <div className="row ms-5 g-0">
            <div className="col-md-6">
              <BaseTextArea
                name="productDescription"
                label="Product Description"
                placeholder="write short description about this item"
                textAreaHeight={140}
                textAreaWidth={450}
                value={formik.values.productDescription}
                handleChange={formik.handleChange}
                formik={formik}
              />
            </div>
            <div className="col-md-3">
              <BaseInput
                name="price"
                type="number"
                label="Price"
                placeholder="$345"
                inputClass="border-0"
                value={formik.values.price}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
                handleKeyPress={handleInputNumber}
                formik={formik}
              />
            </div>
          </div>

          {/* upload image */}

          <label className="ms-5 ps-3 mt-3">Add Images</label>
          <div className="my-3 d-flex  justify-content-evenly align-items-center imageUpload">
            <BaseImageUpload
              getImageData={(val) => {
                formik.setFieldValue("imageOne", val);
              }}
              title="Add Image"
              //formik={formik.touched.imageOne}
              imageValue={formik.values.imageOne}
            />
            <BaseImageUpload
              getImageData={(val) => {
                formik.setFieldValue("imageTwo", val);
              }}
              title="Add Image"
              //formik={formik.touched.imageOne}
              imageValue={formik.values.imageTwo}
            />
            <BaseImageUpload
              getImageData={(val) => {
                formik.setFieldValue("imageThree", val);
              }}
              title="Add Image"
              //formik={formik.touched.imageOne}
              imageValue={formik.values.imageThree}
            />

            <label className="text-body-secondary fw-lighter">
              Try to add images less than 3MB for better loading
            </label>
          </div>

          <div className="d-flex justify-content-center" id="addMenu">
            <BaseButton
              defaultClass="btn btn-warning my-4 me-2"
              name="Back"
              handleClick={() => navigate("/menu-managing")}
            />
            {menuId ? (
              <BaseButton
                types="button"
                defaultClass="btn btn-success my-4"
                name="Update Menu"
                handleClick={updateMenuItem}
              />
            ) : (
              <BaseButton
                types="submit"
                defaultClass="btn btn-success my-4"
                name="Add menu"
              />
            )}
            <BaseButton
              types="button"
              defaultClass="btn btn-success ms-2 my-4"
              name="Customize"
              handleClick={handleCustomize}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewItem;
