import React, { useEffect, useState } from "react";
import BaseCheckBox from "../../../common/components/controls/BaseCheckBox";
import { IMenuService, MenuService } from "../../MenuManaging/services";
import { useAppAlert } from "../../../common/hooks/useAppAlert";
import { useAppSelector } from "../../../store";
import SearchBar from "../../../common/components/layout/SearchBar";
import { menuListResponseModel } from "../../MenuManaging/models";

interface IProps {
  onGetSelectedItems: (selectedItems: { id: string; productName: string }[]) => void;
}

const CouponCanvas: React.FC<IProps> = ({ onGetSelectedItems }) => {
  const { setIsLoading } = useAppAlert();
  const [menuList, setMenuList] = useState<menuListResponseModel[]>([]);

  const [checkedItems, setCheckedItems] = useState({});

  const service: IMenuService = new MenuService();

  const selectorBusinessId = useAppSelector(
    (store) => store.businessId.businessId
  );

  useEffect(() => {
    if (selectorBusinessId) {
      service
        .getAllMenu(selectorBusinessId)
        .then((response) => {
          setMenuList(response);
          setIsLoading(false);
        })
        .catch((errors) => {
          setIsLoading(false);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectorBusinessId]);

  const handleSearchMenu = (menuValue: string) => {
    setIsLoading(true);

    service
      .getMenuSearch(selectorBusinessId, menuValue)
      .then((response) => {
        setMenuList(response);
        setIsLoading(false);
      })
      .catch((error) => setIsLoading(false));
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      return {
        ...prevCheckedItems,
        [id]: !prevCheckedItems[id],
      };
    });
  };

  const getSelectedItems = () => {
    const selectedItems = menuList
      .filter((menu) => checkedItems[menu.id])
      .map((menu) => ({ id: menu.id, productName: menu.productName }));

    onGetSelectedItems(selectedItems);

    return selectedItems;
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Select products applicable for offer
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className=" border-bottom pb-3 border-2">
            <div id="searchbar">
              <SearchBar searchMenu={handleSearchMenu} />
            </div>
          </div>
          <div className="pt-3">
            {menuList.length > 0 &&
              menuList.map((menu, index) => (
                <div key={index} className="mb-2">
                  <BaseCheckBox
                    id={`checkbox-${menu.id}`}
                    name={`checkbox-${menu.id}`}
                    types="checkbox"
                    label={menu.productName}
                    checked={checkedItems[menu.id] || false}
                    handleChange={() => handleCheckboxChange(menu.id)}
                  />
                </div>
              ))}
          </div>

          <div>
            <p>Selected Items: {getSelectedItems().join(", ")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponCanvas;
