import React from "react";

interface Props {
  id: string;
  name: string;
  value?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  types: "checkbox" | "radio";
  label?: string;
  boxClass?: string;
  inputClass?: string;
  labelClass?: string;
  handleChange?: any;
  required?: boolean;
}

const BaseCheckBox: React.FC<Props> = ({
  id,
  defaultChecked,
  checked,
  value,
  types,
  boxClass,
  inputClass,
  labelClass,
  label,
  name,
  handleChange,
  required,
}) => {
  return (
    <>
      <div className={`form-check ${boxClass}`}>
        <input
          className={`form-check-input ${inputClass}`}
          type={types}
          name={name}
          value={value}
          id={id}
          onChange={handleChange}
          defaultChecked={defaultChecked}
          checked={checked}
          required={required}
        />
        {label && (
          <label className={labelClass} htmlFor={id}>
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export default BaseCheckBox;
