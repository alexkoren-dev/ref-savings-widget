import React from 'react';
import { InfoTooltip } from '../info-tooltip';
import './cell-form.scss';

export const CellForm = ({
  id,
  info,
  label,
  prefix = '',
  prefixLabel = '',
  noRightMargin = false,
  optional = false,
  className = '',
  children,
}) => {
  const infoClassName = info ? 'cell-form--info' : '';
  const noRightMarginClassName = noRightMargin ? 'cell-form--no-right-margin' : '';
  const classNames = `${prefix} ${infoClassName} ${noRightMarginClassName} ${className}`;

  return (
    <section className={`cell-form cell-form--tooltip-above ${classNames}`}>
      <div className="cell-form__label-wrapper">
        <label className={`cell-form__label ${prefixLabel || ''}`} htmlFor={id}>{label}</label>
        {optional && <span className="optional-label">(optional)</span>}
        {info && <InfoTooltip content={info} />}
      </div>
      <div className="cell-form__field">
        {children}
      </div>
    </section>
  );
};
