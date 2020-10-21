import React from 'react';
import ReactSelect from 'react-select';

import { US_STATES } from '../../helpers/constants';
import { Icons } from '../../icons';
import './index.scss';

export const SelectSTATE = ({
  name,
  id,
  value = null,
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
      options={US_STATES}
      placeholder={placeholder}
      preffix="state"

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
