import "./StyledDropdown.scss";

import React, { useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

import { ChevronDown, GrClose } from "../../../assets/svg/svgIcons";

interface StyledDropdownProps<T> {
  value: T | undefined;
  setValue: (value: T | undefined) => void;
  itemList: T[];
  label: string;
  itemLabelKey: keyof T;
  itemIdKey: keyof T;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const StyledDropdown = <T extends { [key: string]: any }>({
  value,
  setValue,
  itemList,
  label,
  itemLabelKey,
  itemIdKey,
  disabled = false,
  className = "",
  placeholder = "Search...",
}: StyledDropdownProps<T>) => {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const handleClickItem = () => setIsComponentVisible(!isComponentVisible);

  const setItem = (itemId: any) => {
    const newItem = itemList.find((item) => item[itemIdKey] === itemId);
    if (newItem) setValue(newItem);
    setIsComponentVisible(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      ref.current &&
      !ref.current.contains(target) &&
      target.className !== "itemName" &&
      target.className !== "searchInput"
    ) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const filteredItems = itemList.filter((item) =>
    item[itemLabelKey].toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = () => {
    setValue(undefined);
    setSearchTerm("");
  };

  return (
    <div
      className={`styledDropdown ${disabled ? "disabled" : ""} ${className}`}
    >
      <span className="label">{label}</span>
      <div className="selectElement">
        <div className={`selectMenu ${isComponentVisible ? "active" : ""}`}>
          <div className="selectMenuName" onClick={handleClickItem}>
            <div className="selectName">
              {value ? (
                <span>
                  <span className="itemName">{value[itemLabelKey]}</span>
                  <FiEdit2 onClick={handleEdit} />
                </span>
              ) : (
                <input
                  type="text"
                  placeholder={placeholder}
                  value={searchTerm}
                  className="searchInput"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
            </div>
            <ChevronDown className="arrowDown" />
          </div>
          <div className="submenu" ref={ref}>
            <div className="subselectItemTitle">
              <span>Choose {label.toLowerCase()}</span>
              <GrClose onClick={() => setIsComponentVisible(false)} />
            </div>
            <div className="submenuItemsContainer">
              {filteredItems.map((item) => (
                <div
                  className="subselectItem"
                  key={itemIdKey.toString() + item[itemIdKey]}
                  onClick={() => setItem(item[itemIdKey])}
                >
                  <span>{item[itemLabelKey]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyledDropdown;
