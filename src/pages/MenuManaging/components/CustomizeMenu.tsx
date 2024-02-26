/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

//custom components
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseInput from "../../../common/components/controls/BaseInput";

//icons
import { faImage, faPlus } from "../../../common/ui/Icons/Icons";

//custom Hooks
import { useInputControls } from "../../../common/hooks/useControls";

//services
import { MenuService } from "../services";
import { RoosBaseServices } from "../../../common/services";

//models
import { CustomizedListModel } from "../models";

//store
import { useAppDispatch, useAppSelector } from "../../../store";
import { createCustomizations } from "../../../store/features/menuSlice";
import BaseIcon from "../../../common/components/ui/BaseIcon";
import { useAppAlert } from "../../../common/hooks/useAppAlert";

const CustomizeMenu: React.FC = () => {
  //getCustomizedList
  const [customizedList, setCustomizedList] = useState<CustomizedListModel[]>(
    []
  );
  const [isInputEnableDisabled, setIsInputEnableDisabled] =
    useState<string>("");

  // Memoize the customizedList state to prevent unnecessary re-renders
  const memoizedcustomizedList = useMemo(
    () => customizedList,
    [customizedList]
  );

  const selector = useAppSelector((store) => store.menu.createMenu);

  const {
    setResponseMassage,
    setIsLoading,
    setShowModel,
    isLoading,
  } = useAppAlert();

  const _service = new MenuService();
  const _services_image = new RoosBaseServices();

  const { handleInputNumber } = useInputControls();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMenuId = useParams();

  const handleCategoryChange = (categoryIndex, value) => {
    setCustomizedList((prevCustomizedList) => {
      const updatedData = [...prevCustomizedList];
      updatedData[categoryIndex] = {
        ...updatedData[categoryIndex],
        category: value,
      };
      return updatedData;
    });
  };
  //image upload API call
  const customizedHandleImageChange = (categoryIndex, optionIndex, value) => {
    const file: any = value.target.files?.[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let image: any = reader.result;
      if (reader.result) {
        const base64 = image.replace(/^data:image\/[a-z]+;base64,/, "");
        _services_image
          .getBaseToImage(base64)
          .then((response) => {
            setCustomizedList((prevCustomizedList) => {
              const updatedData = [...prevCustomizedList];
              const updatedOptions = [...updatedData[categoryIndex].options];
              updatedOptions[optionIndex] = {
                ...updatedOptions[optionIndex],
                image: response.imageResponse,
              };
              updatedData[categoryIndex] = {
                ...updatedData[categoryIndex],
                options: updatedOptions,
              };
              return updatedData;
            });
          })
          .catch(() => {
            console.log("Error Image");
          });
      }
    };
  };

  const customizedHandleInputChange = (
    categoryIndex,
    optionIndex,
    property,
    value
  ) => {
    setCustomizedList((prevCustomizedList) => {
      const updatedData = [...prevCustomizedList];
      const updatedOptions = [...updatedData[categoryIndex].options];
      updatedOptions[optionIndex] = {
        ...updatedOptions[optionIndex],
        [property]: value,
      };
      updatedData[categoryIndex] = {
        ...updatedData[categoryIndex],
        options: updatedOptions,
      };
      return updatedData;
    });
  };

  const handleAddOption = (categoryIndex) => {
    setCustomizedList((prevCustomizedList) => {
      const updatedData = [...prevCustomizedList];
      const updatedOptions = [...updatedData[categoryIndex].options];
      const newOption = {
        itemName: "",
        price: 0,
        quantity: "",
        image: "",
      };
      updatedOptions.push(newOption);
      updatedData[categoryIndex] = {
        ...updatedData[categoryIndex],
        options: updatedOptions,
      };
      return updatedData;
    });
  };

  const handleAddCategory = () => {
    setCustomizedList((prevCustomizedList) => {
      const updatedData = [...prevCustomizedList];
      const newCategory = {
        category: "",
        options: [
          {
            itemName: "",
            price: 0,
            quantity: "",
            image: "",
          },
        ],
      };
      updatedData.unshift(newCategory);
      setIsInputEnableDisabled("");
      return updatedData;
    });
  };
  //API Calls
  const getCustomizedList = () => {
    if (isMenuId.menuId) {
      const result = _service
        .getCustomization(isMenuId.menuId)
        .then((response) => setCustomizedList(response))
        .catch((err) => console.log(err));
      return result;
    }
  };

  const updateCustomization = (list, value) => {
    if (isMenuId.menuId) {
      setIsLoading(true);
      if (list.category && list.id) {
        _service
          .updateCustomization(isMenuId.menuId, list)
          .then((response) => {
            setShowModel(true);
            setResponseMassage({
              message: "Customization Update Successfully",
              statusCode: 200,
            });
            if (response) {
              _service
                .createCustomization(isMenuId.menuId, list.category, value)
                .then((response) => {
                  setIsLoading(false);
                })
                .catch((error) => {
                  setIsLoading(false);
                });
            }
          })
          .catch((error) => {
            setIsLoading(false);
            setShowModel(true);
            setResponseMassage({
              message: "Customization Not Updated",
              statusCode: 404,
            });
          });
      } else {
        _service
          .createCustomization(isMenuId.menuId, list.category, value)
          .then((response) => {
            setIsLoading(false);
            setShowModel(true);
            setResponseMassage({
              message: "Customization Create Successfully",
              statusCode: 200,
            });
          })
          .catch((error) => {
            setIsLoading(false);
            setShowModel(true);
            setResponseMassage({
              message: "Customization Not Created",
              statusCode: 404,
            });
          });
      }
    }
  };

  const optionsDelete = (categoryIndex, optionIndex, category, optionId) => {
    setIsLoading(true);
    if (isMenuId.menuId) {
      _service
        .deleteCustomization(isMenuId.menuId, category, optionId)
        .then((reponse) => {
          if (reponse) {
            setShowModel(true);
            setIsLoading(false);
            setResponseMassage({
              message: "Customization Delete Successfully",
              statusCode: 200,
            });
            setCustomizedList((prevCustomizedList) => {
              const updatedData = [...prevCustomizedList];
              const categoryData = updatedData[categoryIndex];
              const updatedOptions = categoryData.options.filter(
                (_, index) => index !== optionIndex
              );

              // Check if options.length is 0, remove the entire object
              if (updatedOptions.length === 0) {
                updatedData.splice(categoryIndex, 1);
              } else {
                // Update the state with the modified options array
                updatedData[categoryIndex] = {
                  ...categoryData,
                  options: updatedOptions,
                };
              }

              return updatedData;
            });
          }
        })
        .catch((error) => {
          if (error) {
            setIsLoading(false);
            setCustomizedList((prevCustomizedList) => {
              const updatedData = [...prevCustomizedList];
              const updatedOptions = updatedData[categoryIndex].options.filter(
                (_, index) => index !== optionIndex
              );

              // Update the state with the modified options array
              updatedData[categoryIndex] = {
                ...updatedData[categoryIndex],
                options: updatedOptions,
              };
              return updatedData;
            });
          }
        });
    } else {
      setIsLoading(false);
      setCustomizedList((prevCustomizedList) => {
        const updatedData = [...prevCustomizedList];
        const categoryData = updatedData[categoryIndex];
        const updatedOptions = categoryData.options.filter(
          (_, index) => index !== optionIndex
        );

        // Check if options.length is 0, remove the entire object
        if (updatedOptions.length === 0) {
          updatedData.splice(categoryIndex, 1);
        } else {
          // Update the state with the modified options array
          updatedData[categoryIndex] = {
            ...categoryData,
            options: updatedOptions,
          };
        }

        return updatedData;
      });
    }
  };

  const createMenuCustomize = () => {
    setIsLoading(true);
    _service
      .createMenu(selector)
      .then((response) => {
        if (response) {
          setResponseMassage({
            message: "Menu Created Successfully",
            statusCode: 200,
          });
          setIsLoading(false);
          setShowModel(true);
          navigate("/menu-managing");
        }
      })
      .catch((error) => {
        setResponseMassage({
          message: error,
          statusCode: 404,
        });
        setIsLoading(false);
        if (error) {
          navigate("/menu-managing");
        }
      });
  };
  useEffect(() => {
    if (isMenuId) {
      getCustomizedList();
    }
  }, [isLoading]);
  useEffect(() => {
    dispatch(createCustomizations(customizedList));
  }, [customizedList]);

  return (
    <>
      {memoizedcustomizedList && (
        <div className="m-5">
          <div className="card border-0 shadow-sm bg-transparent">
            <div className="card-body p-4 bg-white">
              <div className="pb-3 d-flex justify-content-between">
                <div className="">
                  <BaseButton
                    types="button"
                    name="Add New Customization"
                    defaultClass="btn btn-outline-success my-2"
                    icon={faPlus}
                    handleClick={handleAddCategory}
                  />
                </div>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr className="text-center">
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {memoizedcustomizedList &&
                  memoizedcustomizedList.map((list, categoryIndex) => (
                    <tbody key={categoryIndex}>
                      <tr className="border-end">
                        <td colSpan={2} className="border-end-0">
                          <div className="custom-tooltip">
                            <BaseInput
                              type="text"
                              name={list.category}
                              value={list.category}
                              inputClass="border-0 rounded-0 bg-white"
                              placeholder="Enter Category"
                              handleChange={(e) =>
                                handleCategoryChange(
                                  categoryIndex,
                                  e.target.value
                                )
                              }
                            />

                            <span className="tooltip-text">
                              You can edit this field Name
                            </span>
                          </div>
                        </td>
                      </tr>
                      {list?.options?.map((item, optionIndex) => (
                        <tr key={optionIndex}>
                          <td>
                            <BaseInput
                              name="itemName"
                              value={item.itemName}
                              placeholder="Name"
                              inputClass={`rounded-0 bg-white ${
                                isInputEnableDisabled !==
                                list.category + optionIndex
                                  ? "border-0"
                                  : "border"
                              }`}
                              handleChange={(e) =>
                                customizedHandleInputChange(
                                  categoryIndex,
                                  optionIndex,
                                  "itemName",
                                  e.target.value
                                )
                              }
                              disabled={
                                isInputEnableDisabled !==
                                list.category + optionIndex
                              }
                            />
                          </td>
                          <td>
                            <BaseInput
                              type="number"
                              name="price"
                              value={item.price}
                              placeholder="Price"
                              inputClass={`rounded-0 bg-white ${
                                isInputEnableDisabled !==
                                list.category + optionIndex
                                  ? "border-0"
                                  : "border"
                              }`}
                              handleChange={(e) =>
                                customizedHandleInputChange(
                                  categoryIndex,
                                  optionIndex,
                                  "price",
                                  e.target.value
                                )
                              }
                              handleKeyPress={(e) => handleInputNumber(e)}
                              disabled={
                                isInputEnableDisabled !==
                                list.category + optionIndex
                              }
                            />
                          </td>
                          <td>
                            <BaseInput
                              type="text"
                              name="quantity"
                              value={item.quantity}
                              placeholder="250gm"
                              inputClass={`rounded-0 bg-white ${
                                isInputEnableDisabled !==
                                list.category + optionIndex
                                  ? "border-0"
                                  : "border"
                              }`}
                              handleChange={(e) =>
                                customizedHandleInputChange(
                                  categoryIndex,
                                  optionIndex,
                                  "quantity",
                                  e.target.value
                                )
                              }
                              disabled={
                                isInputEnableDisabled !==
                                list.category + optionIndex
                              }
                            />
                          </td>
                          <td>
                            <div className="container">
                              <div className="custom-file ">
                                <input
                                  type="file"
                                  className={`custom-file-input bg-dark ${
                                    isInputEnableDisabled !==
                                    list.category + optionIndex
                                      ? "border-0 bg-white"
                                      : "border"
                                  }`}
                                  onChange={(files) =>
                                    customizedHandleImageChange(
                                      categoryIndex,
                                      optionIndex,
                                      files
                                    )
                                  }
                                  disabled={
                                    isInputEnableDisabled !==
                                    list.category + optionIndex
                                  }
                                />
                                <label
                                  className={`custom-file-label d-flex align-items-center bg-white rounded-0 ${
                                    isInputEnableDisabled !==
                                    list.category + optionIndex
                                      ? "border-0"
                                      : "border"
                                  }`}
                                  htmlFor="customFile"
                                >
                                  <BaseIcon icon={faImage} classes="me-2" />
                                  {item.image
                                    .replace(
                                      "https://rossstorageaccount.blob.core.windows.net/",
                                      ""
                                    )
                                    .slice(0, 15) || "select image"}
                                </label>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex justify-content-around">
                              <div className="">
                                {isInputEnableDisabled !==
                                list.category + optionIndex ? (
                                  <BaseButton
                                    types="button"
                                    defaultClass="btn text-primary"
                                    name="Update"
                                    handleClick={() => {
                                      setIsInputEnableDisabled(
                                        list.category + optionIndex
                                      );
                                    }}
                                  />
                                ) : (
                                  <BaseButton
                                    types="button"
                                    defaultClass="btn text-success"
                                    name="Update"
                                    handleClick={() => {
                                      setIsInputEnableDisabled("");
                                      updateCustomization(list, item);
                                    }}
                                  />
                                )}
                              </div>
                              <div className="">
                                {isInputEnableDisabled !==
                                list.category + optionIndex ? (
                                  <BaseButton
                                    types="button"
                                    defaultClass="btn text-danger"
                                    name="Delete"
                                    handleClick={() =>
                                      optionsDelete(
                                        categoryIndex,
                                        optionIndex,
                                        list.category,
                                        item.optionId
                                      )
                                    }
                                  />
                                ) : (
                                  <BaseButton
                                    types="button"
                                    defaultClass="btn text-danger"
                                    name="Cancel"
                                    handleClick={() => {
                                      setIsInputEnableDisabled("");
                                      updateCustomization(list, item);
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-end">
                        <td colSpan={2} className="border-end-0">
                          <BaseButton
                            defaultClass="btn text-primary mt-2 px-4"
                            name="Add"
                            handleClick={() => handleAddOption(categoryIndex)}
                            icon={faPlus}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
              <div className="text-center">
                <BaseButton
                  types="button"
                  defaultClass="btn btn-warning"
                  name="Back To Menu"
                  handleClick={() => {
                    navigate(-1);
                  }}
                />
                {isMenuId.menuId ? (
                  ""
                ) : (
                  <BaseButton
                    types="button"
                    defaultClass="btn btn-success ms-3"
                    name="Add This Menu"
                    handleClick={createMenuCustomize}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomizeMenu;
