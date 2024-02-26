import React from "react";
import BaseIcon from "../ui/BaseIcon";

interface IProps {
  id?: string;
  name?: string;
  types?: "button" | "submit" | "reset";
  defaultClass: string;
  handleClick?: any;
  handleSubmit?: any;
  icon?: any;
  iconPosition?: any;
  iconColor?: any;
}

const Button: React.FC<IProps> = ({
  id,
  name,
  types,
  defaultClass,
  handleClick,
  handleSubmit,
  icon,
  iconPosition,
  iconColor,
}) => {
  return (
    <>
      <button
        id={id}
        type={types}
        className={`rounded-1 ${defaultClass}`}
        onClick={handleClick}
        onSubmit={handleSubmit}
      >
        {iconPosition === "start" && <BaseIcon icon={icon} classes="me-1" />}
        {name && name}
        {iconPosition === "end" && (
          <BaseIcon icon={icon} classes="ms-1" iconsColor={iconColor} />
        )}
      </button>
    </>
  );
};

export default Button;
