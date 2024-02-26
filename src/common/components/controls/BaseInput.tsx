import React from "react";
import BaseIcon from "../ui/BaseIcon";
import BaseErrors from "../ui/BaseErrors";
import BaseButton from "./BaseButton";

interface TextInputProps {
  name: string;
  value?: any;
  type?:
    | "text"
    | "email"
    | "number"
    | "password"
    | "time"
    | "button"
    | "file"
    | "date";
  label?: string;
  inputClass?: string;
  placeholder?: string;
  readOnly?: boolean;
  minLength?: number;
  maxLength?: number;
  inputIcon?: any;
  iconPosition?: string;
  iconClass?: string;
  handleBlur?: any;
  handleChange?: any;
  handleClick?: any;
  handleKeyPress?: any;
  handleIconClick?: any;
  formik?: any;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  minDate?: string;
}

const BaseInput: React.FC<TextInputProps> = ({
  inputIcon,
  iconPosition,
  iconClass,
  inputClass,
  label,
  value,
  name,
  placeholder,
  readOnly,
  type,
  minLength,
  maxLength,
  handleChange,
  handleBlur,
  handleClick,
  handleKeyPress,
  handleIconClick,
  formik,
  disabled,
  required,
  id,
  minDate,
}) => {
  return (
    <>
      <div>
        {label && (
          <label
            className={`form-label mb-0 ${
              formik
                ? formik.errors[`${name}`] && formik.touched[`${name}`]
                  ? "text-danger"
                  : ""
                : ""
            }`}
          >
            {label}
          </label>
        )}
        <div className="form-group">
          <div
            className={
              iconPosition === "start" ? "has-search" : "input-container"
            }
          >
            {iconPosition === "start" ? (
              <span className={"form-control-feedback"}>
                <BaseIcon icon={inputIcon} classes={iconClass} />
              </span>
            ) : null}
            <input
              id={id}
              type={type}
              value={value || ""}
              name={name}
              placeholder={placeholder}
              readOnly={readOnly}
              minLength={minLength}
              maxLength={maxLength}
              className={`form-control ${
                formik
                  ? formik.errors[`${name}`] && formik.touched[`${name}`]
                    ? "border-danger"
                    : inputClass
                  : inputClass && inputClass
              } `}
              onChange={handleChange}
              onBlur={handleBlur}
              onClick={handleClick}
              onKeyDown={handleKeyPress}
              disabled={disabled}
              required={required}
              min={minDate}
            />

            {iconPosition === "end" ? (
              <span className={"form-control-feedback"}>
                <BaseButton
                  defaultClass="btn btn-icon"
                  icon={inputIcon}
                  handleClick={handleIconClick}
                />
              </span>
            ) : null}
          </div>

          {formik && <BaseErrors name={name} formik={formik}></BaseErrors>}
        </div>
      </div>
    </>
  );
};

export default BaseInput;
