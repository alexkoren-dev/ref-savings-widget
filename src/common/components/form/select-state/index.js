import React from 'react';
import { Select } from '../select';
import { US_STATES } from '../../../helpers/constants';
import './index.scss';

export const SelectSTATE = (props) => (
  <Select
    options={US_STATES}
    preffix="state"
    {...props}
  />
);
