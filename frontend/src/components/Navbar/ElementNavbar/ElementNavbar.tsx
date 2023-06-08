import '../Navbar.scss';
import React from 'react';
import { NavLink, useMatch } from "react-router-dom";

interface ElementNavBarProps {
  href: string;
  text: string;
  icon: string;
  className?: string;
  onLinkClick?: () => void;
}

const ElementNavBar: React.FC<ElementNavBarProps> = ({ href, text, icon, className, onLinkClick }) => {
  const match = useMatch(href);

  return (
    <li className={`nav-item ${className} ${match ? 'active' : ''}`}>
      <NavLink
        to={href}
        className={`nav-link `}
        onClick={onLinkClick}
        aria-current="page"
        end={href === "/"}
      >
        <img src={`./svg/${icon}.svg`} alt={`logo ${icon}`} className="navLogo" />
        <span className="link-text">{text}</span>
      </NavLink>
    </li>
  );
};

export default React.memo(ElementNavBar);
