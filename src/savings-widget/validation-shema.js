import {object, number, ref, string} from 'yup';

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
    .typeError('Your current mortgage must have a balance greater than $0.'),
  interest_rate: number()
    .transform(value => value || 0)
    .notRequired()
    .nullable(true)
    .test(
      'interest_rate',
      'Either interest rate or monthly payment must be provided',
      function (value) {
        const monthlyPayment = this.resolve(ref('monthly_payment'));
        return value || monthlyPayment;
      },
    ),
  monthly_payment: number()
    .transform(value => value || 0)
    .notRequired()
    .nullable(true)
    .test(
      'monthly_payment',
      'Either interest rate or monthly payment must be provided',
      function (value) {
        const interestRate = this.resolve(ref('interest_rate'));
        return value || interestRate;
      },
    ),
  cashout_amount: number(),
  mortgage_term: number()
    .integer('Mortgage term must be an integer')
    .min(5)
    .max(30),
});
