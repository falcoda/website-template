import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

import ElementNavBar from './ElementNavbar/ElementNavbar';

import './Navbar.scss';
interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className='navbar' role='navigation' aria-label='Site Navigation'>
      <button className='navbar-toggler' type='button'>
        <RxHamburgerMenu onClick={toggleNavbar} />
      </button>
      <div className={`navbar-collapse ${collapsed ? 'show' : ''}`}>
        <ul className='navbar-nav'>
          <li className=''>
            <NavLink to='/' className='navTitleDiv'>
              TITRE
            </NavLink>
          </li>
          <ElementNavBar
            href='/'
            text='Home'
            icon='home'
            className='Home'
            onLinkClick={() => setCollapsed(false)}
          />
        </ul>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
