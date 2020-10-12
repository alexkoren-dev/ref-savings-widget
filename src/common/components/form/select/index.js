import React from 'react';
import ReactSelect from 'react-select';
import { Icons } from '../../../icons';

import './select.scss';

const formatOptionLabel = (option, { context }) => {
  if (option.icon) {
    return (
      <span className="icon-option">
        <Icons name={option.icon} fill={context === 'value' ? '#818BFF' : '#000'} />
        <span className="icon-option__label">{option.label}</span>
      </span>
    );
  }

  return option.label;
};

export const Select = ({
  name,
  id,
  value = null,
  options = {},
  preffix,
  onChange,
  disabled,
  menuIsOpen,
  placeholder,
  defaultValue,
  defaultMenuIsOpen,
  triggerValidation,
  onFocus = () => {},
  isClearable = false,
  error,
  errorMessage,
  hideError,
  ...rest
}) => (
  <div className={`select-box ${error ? 'invalid' : ''}`}>
    <ReactSelect
      inputId={id}
      name={name}
      value={value}
      options={options}
      placeholder={placeholder}

      classNamePrefix="select"
      className={`select-container ${preffix || ''}`}
      isDisabled={disabled}
      menuIsOpen={menuIsOpen}
      isClearable={isClearable}
      defaultValue={defaultValue}

      onFocus={onFocus}
      onChange={onChange}
      onBlur={() => triggerValidation(name)}
      defaultMenuIsOpen={defaultMenuIsOpen}

      formatOptionLabel={formatOptionLabel}

      isSearchable={false}
      {...rest}
    />
    {error && !hideError && (
      <span className="custom-input__error">
        <Icons name="warning" />
        {errorMessage || error}
      </span>
    )}
  </div>
);
