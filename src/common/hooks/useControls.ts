import { useEffect, useRef, useState } from "react";
import { ListItem } from "../models/base.model";

//dropdown Hook
export const useDropdown = () => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<ListItem>(
    new ListItem()
  );

  const refOutside = useRef<any>(null);

  const dropdownHandleClick = () => {
    setToggleDropdown(!toggleDropdown);
  };
  const handleOutsideClick = (e: any) => {
    if (refOutside.current && !refOutside.current.contains(e.target)) {
      setToggleDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
  }, []);

  return {
    handleOutsideClick,
    setToggleDropdown,
    dropdownHandleClick,
    setSelectedDropdownValue,
    toggleDropdown,
    refOutside,
    selectedDropdownValue,
  };
};

//input vaildation number and string Hook
export const useInputControls = (formik?: any) => {
  const handleInputNumber = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;

    if (/^[0-9]*$/.test(value)) {
      formik?.setFieldValue(name, value);
    }
    if (event.key === "e" || event.key === "E") {
      event.preventDefault();
    }
  };

  const handleInputString = (event: any) => {
    const value = event.target.value;
    const name = event.target.name;
    const regex = /^[a-zA-Z]*$/;

    if (regex.test(value)) {
      formik.setFieldValue(formik.values[name], value);
    }
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  };
  return { handleInputNumber, handleInputString };
};
