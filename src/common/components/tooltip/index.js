import React from 'react';
import TooltipLite from 'react-tooltip-lite';
import './tooltip.scss';

export const Tooltip = ({
  children,
  content = '',
  arrow = true,
  direction = 'up', // up, down, left, right
  eventToggle = null,
  useHover = true,
  arrowSize = 10,
  padding = '1rem',
}) => (
  <TooltipLite
    arrow={arrow}
    content={content}
    padding={padding}
    className='tooltip'
    useHover={useHover}
    arrowSize={arrowSize}
    direction={direction}
    eventToggle={eventToggle}
  >
    {children}
  </TooltipLite>
);
