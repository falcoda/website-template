import "./DesktopNavbar.scss";

import React from "react";
import { NavLink } from "react-router-dom";

import ElementNavBar from "../ElementNavbar/ElementNavbar";
import navItems from "../NavItems";

const DesktopNavbar: React.FC = () => {
  return (
    <nav
      className={`desktopNavbar`}
      role="navigation"
      aria-label="Site Navigation"
    >
      <div className={`navbar-collapse`}>
        <ul className="navbar-nav">
          <li className="navTitleDiv">
            <NavLink to="/">
              <div className="navTitle">TITLE</div>
            </NavLink>
          </li>
          {navItems.map((item) => (
            <ElementNavBar
              key={item.href}
              href={item.href}
              text={item.text}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(DesktopNavbar);
