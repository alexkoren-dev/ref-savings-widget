import React from 'react';

import { Header } from "../header";
import { SavingsWidget } from '../savings-widget';

import SavingsWidgetSVG from '../assets/svg/savings-widget.svg';
import SavingsWidgetTextSVG from '../assets/svg/savings-widget-text.svg';
import SavingsWidgetPicSVG from '../assets/svg/savings-widget-pic.svg';

import './app.scss';

export const App = () => {
  const onSubmit = (data, savingsInfo) => {
    const baseUrl = process.env.APP_BASE_URL + 'sign-up';
    let params = '';
    params += `?s=${savingsInfo.monthlySavings}`;
    params += `&bal=${data.mortgage_amount}`;
    params += `&mp=${data.monthly_payment}`;
    params += `&st=${data.state.value}`;
    params += `&t=${data.mortgage_term * 12}`; // convert years to months (12 months in a year)
    window.location.href = `${baseUrl}${params}`;
  };

  return (
    <div className="layout">
      <Header />

      <section className="layout__wrapper">
        <div className="get-started-page">
          <div className="left">
            <img className="xl-screen" src={SavingsWidgetSVG} alt="svg icon" />

            <img className="l-screen" src={SavingsWidgetPicSVG} alt="svg icon" />
            <img className="l-screen" src={SavingsWidgetTextSVG} alt="svg icon" />
          </div>

          <SavingsWidget onSubmit={onSubmit} />
        </div>
      </section>
    </div>
  );
};
