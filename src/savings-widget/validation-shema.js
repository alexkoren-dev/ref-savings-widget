import { object, number, ref, string } from 'yup';

const required = validation => validation.required('This field is required');
const originationDateRegExp = /^(0[1-9]|1[0-2])\/?([0-9]{4})$/;

export const ALL_FIELDS = [
  { fieldName: 'state' },
  { fieldName: 'origination_date' },
  { fieldName: 'mortgage_amount' },
  { fieldName: 'interest_rate' },
  { fieldName: 'monthly_payment' },
  { fieldName: 'cashout_amount' },
  { fieldName: 'mortgage_term' },
];

export const validationSchema = object().shape({
  state: required(object()),
  origination_date: required(string().test(
    'origination_date',
    'This field is required',
    (value) => (originationDateRegExp).test(value),
  )),
  mortgage_amount: number()
    .integer('Mortgage amount must be an integer')
    .min(1, 'Your current mortgage must have a balance greater than $0.')
    .max(999999, 'Your current mortgage must have a balance lower than $1,000,000.')
    .typeError('Please enter a valid number'),
  monthly_payment: number()
    .integer('Monthly payment must be an integer')
    .min(1, 'Monthly payment must be greater than $0.')
    .max(50000, 'Monthly payment must be lower than 50,000$.')
    .typeError('Please enter a valid number'),
  cashout_amount: number(),
});
