import React from 'react';
import { Input } from './index';
import './input.scss';

export const InputNumber = ({
  min = 0,
  step = 1,
  ...rest
}) => (
  <Input
    step="any"
    min={min}
    type="number"
    {...rest}
  />
);
