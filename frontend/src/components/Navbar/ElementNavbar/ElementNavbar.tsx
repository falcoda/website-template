import React, { useEffect, useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
interface ElementNavBarProps {
  href: string;
  text: string;
  icon: string;
  className?: string;
  onLinkClick?: () => void;
}

const ElementNavBar: React.FC<ElementNavBarProps> = ({
  href,
  text,
  icon,
  className,
  onLinkClick,
}) => {
  const match = useMatch(href);
  const [IconComponent, setIconComponent] = useState<React.FC<{
    className?: string;
  }> | null>(null);

  useEffect(() => {
    import(`../../../assets/svg/navbar/${icon}.svg`)
      .then((module) => {
        setIconComponent(() => module.ReactComponent);
      })
      .catch((error) => {
        console.log("Error loading SVG icon:", error);
      });
  }, [icon]);

  return (
    <li className={`nav-item ${className} ${match ? "active" : ""}`}>
      <NavLink
        to={href}
        className={`nav-link `}
        onClick={onLinkClick}
        aria-current="page"
        end={href === "/"}
      >
        {IconComponent && <IconComponent className="navLogo" />}
        <span className="link-text">{text}</span>
      </NavLink>
    </li>
  );
};

export default React.memo(ElementNavBar);
