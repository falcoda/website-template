import "./Button.scss";

import React, { ReactNode } from "react";

type ButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  label?: string;
  icon?: ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  label,
  icon,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className ?? ""} styledButton`}
      type={type}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;
