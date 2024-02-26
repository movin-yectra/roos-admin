import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  icon: any;
  classes?: string;
  iconsColor?: string;
  handleIconClick?: () => void;
}

const BaseIcon: React.FC<IProps> = ({ icon, classes, iconsColor, handleIconClick }) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      className={classes}
      style={{ color: iconsColor }}
      onClick={handleIconClick}
    />
  );
};

export default BaseIcon;
