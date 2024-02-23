import React, { useState, ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ListItem } from "../../models";
import BaseErrors from "../ui/BaseErrors";
import BaseButton from "./BaseButton";

interface IProps {
  name: string;
  listOfOptions: Array<ListItem>;
  defaultClass: string;
  children: ReactNode;
  onChange: (selectedOption: ListItem) => void;
  toggle?: boolean;
  formik?: any;
  handleClick?: any;
  listClass?: string;
  listStyleActive?: boolean;
  type?: string;
}

const BaseSelect: React.FC<IProps> = ({
  listOfOptions,
  defaultClass,
  children,
  onChange,
  toggle,
  formik,
  handleClick,
  name,
  listClass,
  listStyleActive,
  type,
}) => {
  const [selectedOption, setSelectedOption] = useState<ListItem>(
    new ListItem()
  );

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const refOutside = useRef<any>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (refOutside.current && !refOutside.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  document.addEventListener("click", handleClickOutside, true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div ref={refOutside}>
        <div className={`dropdown ${defaultClass}`} onClick={toggleDropdown}>
          {children}
          <ul
            className={`dropdown-menu w-100 border-0 rounded-1 p-0 mt-1 shadow-lg ${
              isOpen ? "show" : ""
            } ${listClass}`}
          >
            {listOfOptions &&
              listOfOptions.map((item: ListItem, i: number) => (
                <li
                  className={`dropdown-item p-2 text-truncate ${
                    // item instanceof ListItem &&
                    item.text === selectedOption.text &&
                    (listStyleActive ? "active" : "")
                  }`}
                  key={i}
                  onClick={() => {
                    // if (item instanceof ListItem) {
                    setSelectedOption(item);
                    onChange(item);
                    // }
                    toggle = false;
                  }}
                  role="button"
                >
                  {/*item instanceof ListItem ? */ item.text /* : item*/}
                </li>
              ))}
            {type === "button" && (
              <li className="active">
                <BaseButton
                  types="button"
                  defaultClass="btn text-primary text-nowrap"
                  name="Create/Edit category"
                  handleClick={handleClick}
                />
              </li>
            )}
          </ul>
        </div>

        {formik && <BaseErrors name={name} formik={formik}></BaseErrors>}
      </div>
    </>
  );
};

export default BaseSelect;
