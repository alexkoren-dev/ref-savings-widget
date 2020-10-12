import React from 'react';
import { Icons } from '../../../icons';
import './input.scss';

export const Input = ({
  id,
  name,
  type = 'text',
  placeholder,
  disabled,
  className = '',
  prefix,
  reference,
  error,
  hideError = false,
  errorMessage,
  onFocus = () => {},
  triggerValidation,
  ...rest
}) => (
  <div className={`custom-input ${className}`}>
    <div
      className="custom-input__input-container"
    >
      {prefix && <div className="custom-input__prefix">{prefix}</div>}
      <input
        id={id}
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        className={`custom-input__input ${error ? 'invalid' : ''}`}
        ref={reference || null}
        onFocus={onFocus}
        onBlur={() => triggerValidation && triggerValidation(name)}
        {...rest}
      />
    </div>
    {error && !hideError && (
      <span className="custom-input__error">
        <Icons name="warning" />
        {errorMessage || error}
      </span>
    )}
  </div>
);
