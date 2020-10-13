import React from 'react';
import './button.scss';

export const Button = ({
  children,
  disabled,
  className = '',
  type = 'button',
  onClick = () => {},
  color = 'primary',
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    onClick={onClick}
    data-type={color}
    disabled={disabled}
    className={`custom-button ${className}`}
  >
    {children}
  </button>
);
