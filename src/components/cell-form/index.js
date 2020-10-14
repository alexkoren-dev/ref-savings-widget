import React from 'react';
import TooltipLite from "react-tooltip-lite";

import './cell-form.scss';
import {Icons} from "../../icons";

export const CellForm = ({
  id,
  info,
  label,
  prefix = '',
  noRightMargin = false,
  children,
}) => {
  const infoClassName = info ? 'cell-form--info' : '';
  const noRightMarginClassName = noRightMargin ? 'cell-form--no-right-margin' : '';
  const classNames = `${prefix} ${infoClassName} ${noRightMarginClassName}`;

  return (
    <section className={`cell-form ${classNames}`}>
      <div className="cell-form__label-wrapper">
        <label className={`cell-form__label`} htmlFor={id}>{label}</label>
        {info && (
          <TooltipLite
            arrow={true}
            content={info}
            padding="1rem"
            className="tooltip"
            useHover={true}
            arrowSize={10}
            direction="up"
            eventToggle={null}
          >
            <Icons name="info" fill="#65DA98" />
            {/*{text && <span className="mobile-desc">{text}</span>}*/}
          </TooltipLite>
        )}
      </div>
      <div className="cell-form__field">
        {children}
      </div>
    </section>
  );
};
