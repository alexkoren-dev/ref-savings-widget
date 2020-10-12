import React from 'react';
import { Icons } from '../../icons';
import './logo.scss';

export const Logo = ({ url = '/' }) => (
  <a href={url} className="refinance-logo">
    <Icons name="logo" />
  </a>
);
