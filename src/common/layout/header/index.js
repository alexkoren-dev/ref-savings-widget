import React, { useState } from 'react';
import { Logo, Hamburger } from '../../components';
import './header.scss';

const ListMenu = [
  { value: 'About', url: 'about' },
  { value: 'FAQs', url: 'faq' },
  { value: 'Sign up', url: 'sign-up' },
  { value: 'Log In', url: 'login' },
];

export const HeaderRegistration = () => {
  const [open, onChange] = useState(false);

  const goToPage = (url) => {
    const baseUrl = process.env.APP_BASE_URL;
    window.location.href = `${baseUrl}${url}`;
  };

  return (
    <header className="header-registration">
      <Logo url={process.env.BASE_URL} />
      <Hamburger open={open} onClick={() => onChange(!open)} />
      <ul className={`header-registration__list ${open ? 'open' : ''}`}>
        {ListMenu.map(({ value, url }) => (
          <li className="header-registration__item" key={url}>
            <a onClick={() => goToPage(url)} className="link">
              {value}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};
