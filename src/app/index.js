import React from 'react';
import { SavingsWidget } from '../savings-widget';
import { redirect } from '../helpers/redirect';

export const App = () => {
  const onSubmit = (data, savingsInfo) => {
    const baseUrl = `${process.env.APP_BASE_URL}sign-up`;
    let params = '';
    params += `?s=${savingsInfo.monthlySavings}`;
    params += `&bal=${data.mortgage_amount}`;
    params += `&mp=${data.monthly_payment}`;
    params += `&st=${data.state.value}`;
    params += `&t=${data.mortgage_term * 12}`; // convert years to months (12 months in a year)
    redirect(`${baseUrl}${params}`);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SavingsWidget onSubmit={onSubmit} />
    </div>
  );
};
