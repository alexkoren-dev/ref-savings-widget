import React from 'react';
import { Icons } from '../../icons';
import { Tooltip } from '../tooltip';
import './info-tooltip.scss';

export const InfoTooltip = ({
  content = '',
  text,
  color = '#65DA98',
  ...rest
}) => (
  <Tooltip
    content={content}
    {...rest}
  >
    <Icons name="info" fill={color} />
    {text && <span className="mobile-desc">{text}</span>}
  </Tooltip>
);
