import BaseErrors from "../ui/BaseErrors";

interface TextAreaInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  textAreaClass?: string;
  textAreaHeight?: number;
  textAreaWidth?: number;
  inputClass?: string;
  value?: any;
  handleChange?: any;
  handleBlur?: any;
  formik?: any;
}

const BaseTextArea: React.FC<TextAreaInputProps> = ({
  label,
  name,
  placeholder,
  inputClass,
  textAreaHeight,
  textAreaWidth,
  value,
  handleChange,
  handleBlur,
  formik,
}) => {
  return (
    <>
      <div>
        <label
          className={`form-label mb-0 ${
            formik.errors[`${name}`] && formik.touched[`${name}`]
              ? "text-danger"
              : ""
          }`}
        >
          {label}
        </label>
      </div>
      <div className="form-group">
        <textarea
          className={`form-control ${
            formik
              ? formik.errors[`${name}`] && formik.touched[`${name}`]
                ? "border-danger"
                : inputClass
              : inputClass && inputClass
          }`}
          name={name}
          style={{ height: textAreaHeight, width: textAreaWidth }}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>
        {formik && <BaseErrors name={name} formik={formik}></BaseErrors>}
      </div>
    </>
  );
};

export default BaseTextArea;
