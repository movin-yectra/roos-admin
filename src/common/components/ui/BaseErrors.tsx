import React from "react";

interface IProps {
  formik?: any;
  name: string;
}

const BaseErrors: React.FC<IProps> = ({ formik, name }) => {
  return (
    <div>
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-start text-danger fs-9">
          {formik.errors[name]} !
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default BaseErrors;
