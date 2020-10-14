import React, { useState } from 'react';
import { Hamburger } from '../components';
import { Icons } from "../icons";
import './header.scss';

const ListMenu = [
  { value: 'About', url: `${process.env.APP_BASE_URL}about` },
  { value: 'FAQs', url: `${process.env.APP_BASE_URL}faq` },
  { value: 'Sign up', url: `${process.env.APP_BASE_URL}sign-up` },
  { value: 'Log In', url: `${process.env.APP_BASE_URL}login` },
];

export const Header = () => {
  const [open, onChange] = useState(false);

  return (
    <header className="layout-header">
      <a href="/" className="refinance-logo">
        <Icons name="logo" />
      </a>

      <Hamburger open={open} onClick={() => onChange(!open)} />
      <ul className={`layout-header__list ${open ? 'open' : ''}`}>
        {ListMenu.map(({ value, url }) => (
          <li className="layout-header__item" key={url}>
            <a href={url} className="link">{value}</a>
          </li>
        ))}
      </ul>
    </header>
  );
};
