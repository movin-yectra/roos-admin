/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import BaseButton from "../../../common/components/controls/BaseButton";
import BaseInput from "../../../common/components/controls/BaseInput";
import { useAppDispatch, useAppSelector } from "../../../store";
import { faPlus, faTrashCan } from "../../../common/ui/Icons/Icons";
import { IMenuService, MenuService } from "../services";
import { useAppAlert } from "../../../common/hooks/useAppAlert";
import { fetchCategories } from "../../../store/features/categorySlice";
import { useNavigate } from "react-router-dom";
import { categoryValueModel } from "../models";

const CategoryCustomize = () => {
  const [categoryId, setCategoryId] = useState("");


  const [categoryValue, setCategoryValue] = useState<categoryValueModel[]>([]);
  const [isDropdown, setIsDropdown] = useState(false);

  const service: IMenuService = new MenuService();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selector = useAppSelector((store) => store.category.categories);

  const selectorCategoryId = useAppSelector(
    (store) => store.category.categoryId
  );
  const selectorBusinessId = useAppSelector(
    (store) => store.businessId.businessId
  );

  const { setIsLoading } = useAppAlert();

  const handleIconClickDropdown = () => {
    console.log("icon clicked");
    setIsDropdown(true);
  };


  useEffect(() => {
    setCategoryValue(selector);
  }, [selector]);

  const handleAddInput = () => {
    setCategoryValue([
      ...categoryValue,
      { categoryId: categoryValue.length + 1, code: "", value: "" },
    ]);
  };
  const convertToAcronym = (str: string) => {
    const trimmedStr = str.trim();

    const acronym = trimmedStr
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");

    return acronym;
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedInputFields = [...categoryValue];
    const updatedObject = {
      ...updatedInputFields[index],
      value,
      code: convertToAcronym(value),
    };
    updatedInputFields[index] = updatedObject;
    setCategoryValue(updatedInputFields);
  };

  const createCategory = () => {
    let value = {
      businessId: selectorBusinessId,
      category: categoryValue,
    };
    service
      .createCategory(value)
      .then((response) => {
        setIsLoading(false);
        setCategoryId(response.categoryId);
        dispatch(fetchCategories(selectorBusinessId));
      })
      .catch((error) => setIsLoading(false));
  };

  const updateCategory = () => {
    let updateValue = {
      businessId: selectorBusinessId,
      category: categoryValue,
    };

    service
      .updateCategory(selectorCategoryId, updateValue)
      .then((response) => {
        setIsLoading(false);
        setCategoryId(response.categoryId);
        dispatch(fetchCategories(selectorBusinessId));
      })
      .catch((error) => setIsLoading(false));
  };

  const handleRemoveInput = (id: any) => {
    service
      .deleteCategory(selectorBusinessId, id)
      .then((response) => {
        setIsLoading(false);
        dispatch(fetchCategories(selectorBusinessId));
      })
      .catch((error) => setIsLoading(false));
  };

  return (
    <>
      <div className="card border-0 shadow m-5">
        <div className="card-body px-5">
          <h6 className="card-title">Create New Category</h6>
          <div className="card-text">
            <div>
              {categoryValue.length > 0 &&
                categoryValue.map((input, index) => (
                  <div className="row mt-3" key={index}>
                    <div className="col-md-10 mb-3">
                      <BaseInput
                        name="inputfield"
                        type="text"
                        value={input.value}
                        iconPosition="end"
                        handleIconClick={handleIconClickDropdown}
                        handleChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        handleBlur={(e) => console.log(e.target.value)}
                      />
                    </div>

                    <div className="col-md-2">
                      <BaseButton
                        defaultClass="btn text-black"
                        types="button"
                        icon={faTrashCan}
                        iconPosition="start"
                        handleClick={() => handleRemoveInput(input.categoryId)}
                      />
                      
                    </div>
                  </div>
                ))}
            </div>

            <BaseButton
              defaultClass="btn text-primary"
              types="button"
              name="Add new category"
              icon={faPlus}
              iconPosition="start"
              handleClick={handleAddInput}
            />
          </div>
        </div>

        <div className="d-flex align-self-end mb-3 me-5">
          <BaseButton
            defaultClass="btn btn-warning me-3"
            types="button"
            name="Back"
            handleClick={() => navigate(-1)}
          />

          <BaseButton
            defaultClass="btn btn-primary"
            types="button"
            name={selector.length === 0 ? "Add" : "Update"}
            handleClick={
              selector.length === 0 ? createCategory : updateCategory
            }
          />
        </div>
      </div>
    </>
  );
};

export default CategoryCustomize;
