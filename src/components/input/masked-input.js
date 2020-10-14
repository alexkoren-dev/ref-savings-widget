import React from 'react';
import { Icons } from '../../icons';
import { IMaskInput } from 'react-imask';
import './input.scss';

export const MaskedInput = ({
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
  onChange,
  triggerValidation,
  onFocus = () => {},
  ...rest
}) => (
  <div className={`custom-input ${className}`}>
    <div
      className="custom-input__input-container"
    >
      {prefix && <div className="custom-input__prefix">{prefix}</div>}
      <IMaskInput
        id={id}
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        className={`custom-input__input ${error ? 'invalid' : ''}`}
        ref={reference || null}
        onFocus={onFocus}
        onBlur={() => triggerValidation(name)}
        onAccept={onChange}
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
