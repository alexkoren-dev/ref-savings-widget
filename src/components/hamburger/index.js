import React from 'react';
import './hamburger.scss';

export const Hamburger = ({ open, onClick }) => (
  <div
    className={`hamburger ${open ? 'open' : ''}`}
    onClick={() => onClick(!open)}
    aria-label="menu"
  >
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
);
