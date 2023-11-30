import "./ButtonSwitcher.scss";

import React, { useCallback } from "react";

type AcceptableTypes = ButtonSwitcherValue;

interface ButtonSwitcherProps {
  value: AcceptableTypes;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  datas: AcceptableTypes[];
  className?: string;
  localStorageKey?: string;
}

export interface ButtonSwitcherValue {
  id: string;
  name: string;
}

const ButtonSwitcher: React.FC<ButtonSwitcherProps> = ({
  value,
  setValue,
  datas,
  className,
  localStorageKey,
}) => {
  const handleClick = useCallback(
    (item: ButtonSwitcherValue) => {
      setValue(item);
      if (localStorageKey) {
        localStorage.setItem(localStorageKey, item.id);
      }
    },
    [setValue],
  );

  return (
    <div className={`buttonSwitcher ${className}`}>
      {datas.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className={`buttonSetValue ${value.id === item.id ? "selected" : ""}`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default ButtonSwitcher;
