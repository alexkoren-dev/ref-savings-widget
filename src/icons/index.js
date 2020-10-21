import React from 'react';
// svg icons
import { Warning } from './svg/warning';
import { Info } from './svg/info';
import { Close } from './svg/close';

const IconsMap = {
  info: Info,
  warning: Warning,
  close: Close,
};

export const Icons = ({ name, ...rest }) => {
  const Icon = IconsMap[name];
  return Icon ? <Icon name={name} {...rest} /> : null;
};
