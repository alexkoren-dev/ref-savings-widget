import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Slider from 'react-rangeslider';
import { CellForm, Modal, InputNumber, MaskedInput, SelectSTATE, Loader } from '../components';
import { validationSchema, ALL_FIELDS } from './validation-shema';
import { calculateMonthlySavings } from './calculation';
import { TOOLTIPS } from '../helpers/constants';
import './savings-widget.scss';
const formatMoney = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const formatted = formatter.format(value);
  return formatted.replace('$', ''); // remove '$' sign at the end
};
const DefaultFormValues = {
  state: { label: 'TX', value: 'TX' },
  origination_date: '01/2018',
  mortgage_amount: 430000,
  interest_rate: 4.5,
  cashout_amount: 0,
  monthly_payment: 2800,
  mortgage_term: 30,
};
export const SavingsWidget = ({ onSubmit }) => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [isModalShown, setIsModalShown] = useState(false);
  const [savingsInfo, setSavingsInfo] = useState(null);
  const [isFormValid, setIsFormValid] = useState(true);
  // FORM
  const {
    setValue,
    register,
    errors,
    watch,
    handleSubmit,
    triggerValidation,
    getValues,
    formState,
  } = useForm({
    mode: 'onBlur',
    validationSchema,
    defaultValues: DefaultFormValues,
  });
  const recalculateSavings = async (values) => {
    setIsCalculating(true);
    const newSavingsInfo = await calculateMonthlySavings({
      state: values.state,
      originationDate: values.origination_date,
      mortgageAmount: values.mortgage_amount,
      interestRate: values.interest_rate,
      monthlyPayment: values.monthly_payment,
      cashoutAmount: values.cashout_amount,
      mortgageTerm: values.mortgage_term,
    });
    setSavingsInfo(newSavingsInfo);
    setIsCalculating(false);
  };
  useEffect(() => {
    ALL_FIELDS.forEach(field => register({ name: field.fieldName }));
    recalculateSavings(DefaultFormValues);
  }, []);
  const onFormValuesChange = () => {
    const currentValues = getValues();
    recalculateSavings(currentValues);
  };
  const triggerValidationAndRecalculate = async (name) => {
    const isValid = await triggerValidation(name);
    setIsFormValid(isValid);
    if (isValid) {
      onFormValuesChange();
    }
  };
  const onSubmitForm = (data) => {
    onSubmit(data, savingsInfo);
  };
  const renderModal = () => (
    <Modal
      closeIcon
      bgIsAsctive
      loading={false}
      closeHook={() => setIsModalShown(false)}
      center
    >
      <div className="modal-calculating-info">
        <span className="modal-calculating-info__header">Calculating Your Savings</span>
        <p>
          Your actual monthly mortgage rate depends on a variety of factors, including your credit
          score, existing debt obligations and value of the property. We assume a '700' FICO score
          when obtaining rate estimates for 15 year, 20 year and 30 year mortgage products.
          Your credit score may differ.
        </p>
        <p>
          We assume your current monthly payment includes property taxes and insurance held in an
          escrow account by your lender. Our new monthly payment also includes estimated property
          taxes and insurance held in an escrow. We use an average home insurance and property tax
          based on your state. In actuality, property taxes and insurance differ by property type,
          property value, your locality and a variety of other factors. By using this feature of
          our website, you agree to our terms of use and privacy policy.
        </p>
      </div>
    </Modal>
  );
  const renderSavingsEstimate = () => {
    if (isCalculating) {
      return (
        <div>
          <span className="enter-info-label">Calculating your savings</span>
          <Loader />
          <span className="new-mo-payment">New Mo. Payment: $--- (---%)</span>
        </div>
      );
    }
    if (!isFormValid) {
      return (
        <div>
          <span className="enter-info-label">Calculating your savings</span>
          <span className="each-month-label">Check your inputs!</span>
          <span className="new-mo-payment">New Mo. Payment: $--- (---%)</span>
        </div>
      );
    }
    return (
      <div>
        <span className="enter-info-label">
          With a refinance, we could help you save:
        </span>
        <div className="savings">
          <div className="amount">
            <span className="dollar-sign">$</span>
            <span className="value">{formatMoney(savingsInfo.monthlySavings)}</span>
          </div>
          <span className="each-month-label">each month!</span>
        </div>
        <span className="new-mo-payment">
          New Mo. Payment: $
          {formatMoney(savingsInfo.monthlyPayment)}
          {' '}
          <br />
          {/* Old Rate:{' '}{savingsInfo.oldRate}<br/> */}
          New APR:
          {' '}
          {savingsInfo.rate}
          %
          <br />
          {/* New Mortgage Balance:{' '}{formatMoney(savingsInfo.newMortgageBalance)} */}
        </span>
        <span className="how-calculated" onClick={() => setIsModalShown(true)}>How is this calculated?</span>
      </div>
    );
  };
  return (
    <div className="widget">
      {isModalShown && renderModal()}
      <div className="widget__header">
        <span className="title">Refinance.com Quick-Quote</span>
        <span className="subtitle">*Average monthly savings in less than 1 minute</span>
      </div>
      <form className="form-page" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="section-form">
          <div className="form-page__row widget__interest-monthly-row">
            <CellForm
              id="state"
              label="State"
              prefix="state"
            >
              <SelectSTATE
                name="state"
                id="state"
                placeholder="State"
                reference={register}
                value={watch('state') || null}
                onChange={v => setValue('state', v, true)}
                error={errors.state && errors.state.message}
                triggerValidation={triggerValidationAndRecalculate}
              />
            </CellForm>
            <CellForm
              id="origination_date"
              label="Origination Date"
              info={TOOLTIPS.ORIGINATION_DATE}
            >
              <MaskedInput
                id="origination_date"
                name="origination_date"
                placeholder="mm/yyyy"
                error={errors.origination_date && errors.origination_date.message}
                reference={register}
                mask="00/0000"
                onChange={newStatus => setValue('origination_date', newStatus)}
                value={watch('origination_date')}
                triggerValidation={triggerValidationAndRecalculate}
              />
            </CellForm>
          </div>
          <div className="form-page__row widget__interest-monthly-row">
            {/* <CellForm
              id="interest_rate"
              label="Interest rate"
              info={TOOLTIPS.INTEREST_RATE}
              noRightMargin
            >
              <InputNumber
                prefix=""
                name="interest_rate"
                placeholder="X.X%"
                error={errors.interest_rate && errors.interest_rate.message}
                reference={register}
                triggerValidation={() => triggerValidationForInterestAndPayment()}
                hideError
              />
            </CellForm> */}
            <CellForm
              id="mortgage_amount"
              label="Original Mortgage"
              info={TOOLTIPS.ORIGINAL_MORTGAGE_AMOUNT}
            >
              <InputNumber
                prefix="$"
                name="mortgage_amount"
                placeholder="Mortgage Amount"
                error={errors.mortgage_amount && errors.mortgage_amount.message}
                reference={register}
                triggerValidation={triggerValidationAndRecalculate}
                hideError
              />
            </CellForm>
            <CellForm
              id="monthly_payment"
              label="Current Payment/mo."
              info={TOOLTIPS.CURRENT_MONTHLY_PAYMENT}
            >
              <InputNumber
                prefix="$"
                name="monthly_payment"
                placeholder="Monthly"
                error={errors.monthly_payment && errors.monthly_payment.message}
                reference={register}
                triggerValidation={triggerValidationAndRecalculate}
                hideError
              />
            </CellForm>
          </div>
          <div className="slider-form">
            <div className="slider-form__info">
              <span className="name">CASH OUT AMOUNT</span>
              <span className="value">
                $
                {formatMoney(watch('cashout_amount'))}
              </span>
            </div>
            <Slider
              min={0}
              max={300000}
              step={1000}
              value={watch('cashout_amount')}
              format={value => `${value} $`}
              tooltip={false}
              orientation="horizontal"
              onChange={v => setValue('cashout_amount', v, true)}
              onChangeComplete={() => triggerValidationAndRecalculate('cashout_amount')}
            />
            <div className="slider-form__labels">
              <span>$0</span>
              <span>$300,000</span>
            </div>
          </div>
          {/* <span>remove -- keep it @ 30 years</span> */}
          {/* <div className="slider-form">
            <div className="slider-form__info">
              <span className="name">MORTGAGE TERM</span>
              <span className="value">
                {watch('mortgage_term')}
                {' '}
                Years
              </span>
            </div>
            <Slider
              min={5}
              max={30}
              step={5}
              value={watch('mortgage_term')}
              format={value => `${value} Years`}
              tooltip={false}
              orientation="horizontal"
              onChange={v => setValue('mortgage_term', v, true)}
              onChangeComplete={() => triggerValidationAndRecalculate('mortgage_term')}
            />
            <div className="slider-form__labels">
              <span>5 Years</span>
              <span>30 Years</span>
            </div>
          </div> */}
          <div className="custom-estimate">
            { renderSavingsEstimate() }
            <button
              type="submit"
              disabled={isCalculating || !isFormValid}
              className="custom-button"
            >
              Claim My Savings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};