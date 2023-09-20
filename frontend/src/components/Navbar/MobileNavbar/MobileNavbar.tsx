import "./MobileNavbar.scss";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { BurgerClose, BurgerOpen } from "../../../assets/svg/svgIcons";
import ElementNavBar from "../ElementNavbar/ElementNavbar";
import navItems from "../NavItems";

const MobileNavbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav
      className={`mobileNavbar`}
      role="navigation"
      aria-label="Site Navigation"
    >
      <button className="navbar-toggler" type="button">
        <NavLink to="/">
          <span className="navbar-brand">Logo</span>
        </NavLink>
        {collapsed ? (
          <BurgerClose onClick={toggleNavbar} className={`burger-close-btn`} />
        ) : (
          <BurgerOpen onClick={toggleNavbar} className={`burger-open-btn`} />
        )}
      </button>
      <div className={`navbar-collapse ${collapsed ? "show" : ""}`}>
        <ul className="navbar-nav">
          {navItems.map((item) => (
            <ElementNavBar
              key={item.href}
              href={item.href}
              text={item.text}
              icon={item.icon}
              className={item.className}
              onLinkClick={() => setCollapsed(false)}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(MobileNavbar);
