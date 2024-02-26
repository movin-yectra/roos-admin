import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//custom components
import SearchBar from "../../../../common/components/layout/SearchBar";
import BaseButton from "../../../../common/components/controls/BaseButton";
import BaseTable from "../../../../common/components/ui/BaseTable";

//services
import { IMenuService, MenuService } from "../../services";

//models
import { menuListResponseModel } from "../../models";
import { AddNewMenuModel } from "../../../../store/models";

//stores
import { useAppDispatch, useAppSelector } from "../../../../store";
import { createMenuItem } from "../../../../store/features/menuSlice";

//custom hooks
import { useAppAlert } from "../../../../common/hooks/useAppAlert";

//icons
import { faPen, faPlus, faTrashCan } from "../../../../common/ui/Icons/Icons";

const MenuList: React.FC = () => {
  const selector = useAppSelector((store) => store.category.categories);
  const selectorBusinessId = useAppSelector(
    (store) => store.businessId.businessId
  );

  const { setIsLoading, setResponseMassage, setShowModel } = useAppAlert();

  const [btnName, setBtnName] = useState<any>();
  const [menuList, setMenuList] = useState<menuListResponseModel[]>([]);

  const service: IMenuService = new MenuService();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToAddNewProduct = (meneId) => {
    navigate(`../edit-menu/${meneId}`);
  };

  const removeMenuItem = (id) => {
    service
      .deleteMenu(id)
      .then((response) => {
        if (response) {
          setResponseMassage({
            message: "Menu Deleted Successfully",
            statusCode: 200,
          });
          setTimeout(() => {
            setIsLoading(false);
            setShowModel(true);
          }, 1000);

          setTimeout(() => {
            setShowModel(false);
            filterMenuList(selector[0].value);
          }, 1200);
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
  };

  const filterMenuList = (btnValue) => {
    let value;
    let businessId = selectorBusinessId;
    setIsLoading(true);
    setBtnName(btnValue);

    if (btnValue != undefined) {
      value = btnValue;
    }
    service
      .getMenuList(businessId, value)
      .then((response) => {
        setMenuList(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setMenuList([]);
      });
  };

  const searchMenu = (value: string) => {
    setIsLoading(true);

    service
      .getMenuSearch(selectorBusinessId, value)
      .then((response) => {
        setMenuList(response);
        setIsLoading(false);
      })
      .catch((error) => setIsLoading(false));
  };

  const handleSearchMenu = (menuValue: string) => {
    searchMenu(menuValue);
  };

  useEffect(() => {
    if (selector[0]?.value) {
      setBtnName(selector[0]?.value);

      let path = selector[0]?.value.toLowerCase().split(" ").join("");
      setIsLoading(true);
      filterMenuList(selector[0]?.value);
      navigate(`/menu-managing/${path}`);
    }
  }, [selector[0]?.value]);

  return (
    <div className="mx-5 mt-4">
      <Link to={"/menu-managing/add-newItem"}>
        <BaseButton
          defaultClass="btn btn-success my-3"
          name="Add Menu"
          icon={faPlus}
          iconPosition="start"
          id="Addnewproduct"
          handleClick={() => dispatch(createMenuItem(new AddNewMenuModel()))}
        />
      </Link>
      {selector ? (
        <div>
          <div className="my-3 d-flex justify-content-between">
            <div>
              {selector.map((button, index) => (
                <Link
                  to={`/menu-managing/${button.value
                    .toLowerCase()
                    .split(" ")
                    .join("")}`}
                  key={index}
                >
                  <BaseButton
                    defaultClass={`me-4 btn ${
                      button.value === btnName ? "btn-dark" : "btn-outline-dark"
                    }`}
                    name={button.value}
                    id="menuBtn"
                    handleClick={() => filterMenuList(button.value)}
                  />
                </Link>
              ))}
            </div>
            <div id="searchbar">
              <SearchBar searchMenu={handleSearchMenu} />
            </div>
          </div>
          <div>
            <div>
              <BaseTable
                theadClass="text-start"
                header={[
                  "Item No",
                  "Item Images",
                  "Item Name",
                  "Item Description",
                  "Added Ingredients",
                  "Price",
                ]}
              >
                {menuList.length > 0 &&
                  menuList.map((item, index) => (
                    <tr key={index} className="text-start">
                      <td className="col-1 text-center">{item.productNo}</td>
                      <td className="col-2">
                        <img
                          src={item.imageOne}
                          alt="img"
                          width="75"
                          className="rounded-1"
                        />
                      </td>
                      <td className="col-2">{item.productName}</td>
                      <td className="col-2" style={{ textAlign: "justify" }}>
                        {item.productDescription}
                      </td>
                      <td className="col-2">{item.addedIngredients}</td>
                      <td className="col-1">${item.price}</td>
                      <td className="col-2">
                        <div className="d-flex flex-column align-items-center">
                          <BaseButton
                            defaultClass="btn btn-warning"
                            name="Update"
                            icon={faPen}
                            handleClick={() => navigateToAddNewProduct(item.id)}
                          />

                          <BaseButton
                            defaultClass="btn btn-outline-dark mt-2"
                            name="Delete"
                            icon={faTrashCan}
                            iconPosition="after"
                            handleClick={() => removeMenuItem(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </BaseTable>
            </div>
          </div>
        </div>
      ) : (
        setIsLoading(true)
      )}
    </div>
  );
};

export default MenuList;
