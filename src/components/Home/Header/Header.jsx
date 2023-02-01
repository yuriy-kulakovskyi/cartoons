import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';
import aos from 'aos';
import 'aos/dist/aos.css';

const Header = () => {
  const [visibility, setVisibility] = useState("-100%");
  const header = useRef();

  const showMenu = () => {
    setVisibility("0");
  }

  const hideMenu = () => {
    setVisibility("-100%");
  }

  useEffect(() => {
    aos.init();
  }, []);

  window.onscroll = () => {
    window.scrollY >= 50 ? header.current.classList.add('bg-header')
        : header.current.classList.remove('bg-header');
  }

  return (
    <header className="header" ref={header}>
      {/* Container  */}
      <nav className="header__nav container">
        <a href='#home' className="header__nav__logo" data-aos="fade-right">Rick and Morty</a>

        {/* Nav menu */}
        <ul className="header__nav__list" data-aos="fade-left" style={{top: visibility}}>
          <li className="header__nav__list__item">
            <a href="#characters" className='header__nav__list__item__link'>Characters</a>
          </li>
          <li className="header__nav__list__item">
            <a href="#episodes" className='header__nav__list__item__link'>Episodes</a>
          </li>
          <li className="header__nav__list__item">
            <a href="#locations" className='header__nav__list__item__link'>Locations</a>
          </li>
          <li className="header__nav__list__item">
            <a href="#watchList" className='header__nav__list__item__link'>My watch list</a>
          </li>
        </ul>

        {/* Close button */}
        <svg className="header__nav__close" onClick={hideMenu} viewport="0 0 12 12" version="1.1" style={{top: visibility}}
          xmlns="http://www.w3.org/2000/svg">
          <line x1="1" y1="11"
            x2="11" y2="1"
            stroke="rgb(218, 218, 77)"
            strokeWidth="2" />
          <line x1="1" y1="1"
            x2="11" y2="11"
            stroke="rgb(218, 218, 77)"
            strokeWidth="2" />
        </svg>

        {/* Toggle button */}
        <div className="header__nav__toggle" data-aos="fade-left" onClick={showMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" stroke="rgb(218, 218, 77)"><rect width="8" height="8" x="2.5" y="2.5" rx="2"/><rect width="8" height="8" x="13.5" y="2.5" rx="2"/><rect width="8" height="8" x="2.5" y="13.5" rx="2"/><rect width="8" height="8" x="13.5" y="13.5" rx="2"/></g></svg>
        </div>
      </nav>
    </header>
  );
}

export default Header;