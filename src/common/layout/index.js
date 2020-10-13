import React from 'react';
import { HeaderRegistration } from './header';

import './layout.scss';

export const Layout = ({ children, color = 'blue' }) => (
  <div className="registration-layout" data-color={color}>
    <HeaderRegistration />
    <section className="registration-layout__wrapper">
      {children}
    </section>
  </div>
);
