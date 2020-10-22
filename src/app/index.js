import React from 'react';
import { SavingsWidget } from '../savings-widget';
import { redirect } from '../helpers/redirect';

export const App = () => {
  const onSubmit = (data, savingsInfo) => {
    const baseUrl = `${process.env.APP_BASE_URL}sign-up`;
    let params = '';
    params += `?sav=${Math.ceil(savingsInfo.monthlySavings)}`; // savings Todo: Round up/down?
    params += `&nmp=${Math.ceil(savingsInfo.monthlyPayment)}`; // new monthly payment
    params += `&nr=${savingsInfo.rate}`; // new rate
    params += `&st=${data.state.value}`;
    params += `&odt=${data.origination_date}`;
    params += `&obal=${data.mortgage_amount}`;
    params += `&i=${data.interest_rate}`;
    params += `&cmp=${data.monthly_payment}`; // current monthly payment
    params += `&co=${data.cashout_amount}`;
    params += `&t=${data.mortgage_term * 12}`; // convert years to months (12 months in a year)
    redirect(`${baseUrl}${params}`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SavingsWidget onSubmit={onSubmit} />
    </div>
  );
};
