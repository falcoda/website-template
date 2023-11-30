import "./HeaderButtons.scss";

import React from "react";

interface HeaderButtonsProps {
  activeButton: string;
  setActiveButton?: (button: string) => void;
  buttons: string[];
  showHelpMeWith?: boolean;
  helpMeWithText?: string;
}

const HeaderButtons: React.FC<HeaderButtonsProps> = ({
  activeButton,
  setActiveButton,
  buttons,
  helpMeWithText,
}) => {
  const activeIndex = buttons.indexOf(activeButton);
  return (
    <div className="mainContainerHeaders">
      <div className="headerButtonsWrapper">
        {buttons.map((button, index) => {
          const isActive = button === activeButton;
          let className = "headerButtons";
          if (isActive) {
            className += " activeButton";
          } else if (index === activeIndex - 1) {
            className += " nextToLeftActive";
          }

          return (
            <button
              key={button}
              className={className}
              onClick={() => setActiveButton && setActiveButton(button)}
            >
              <div className="buttonContent">
                {button.charAt(0).toUpperCase() + button.slice(1)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderButtons;
