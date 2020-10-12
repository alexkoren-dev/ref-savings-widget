import { US_STATES } from '../common/helpers/constants';

export const ALL_FIELDS = [
  { fieldName: 'state', selectField: true, options: US_STATES },
  { fieldName: 'origination_date' },
  { fieldName: 'mortgage_amount' },
  { fieldName: 'interest_rate' },
  { fieldName: 'monthly_payment' },
  { fieldName: 'cashout_amount' },
  { fieldName: 'mortgage_term' },
];
