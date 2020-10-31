const amortize = require('amortize');
function monthDiff(dateFrom, dateTo) {
  return dateTo.getMonth() - dateFrom.getMonth()
      + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
}
const makeAPIRequest = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export const calculateMonthlySavings = async ({
  state,
  originationDate,
  mortgageAmount,
  interestRate,
  monthlyPayment,
  cashoutAmount,
  mortgageTerm,
}) => {
  const origMo = originationDate.substr(0, 2);
  const origYYYY = originationDate.substr(3, 5);
  const amortizeTerm = monthDiff(new Date(origYYYY, origMo), new Date());
  let unpaidBalance = parseInt(mortgageAmount); // we will calculate this later
  /* as a very initial step, back out from the current monthly payment the taxes and insurance */
  /* taxes are a percentage of the estimated home value */
  // in the future, fetch from api (250 is a magic number, for now)
  // API endpoint is http://161.35.252.159/widget/api/v1.0/tandi for taxrate and insurancerate based on state.
  let annualTaxesArray = await makeAPIRequest('https://savings.refinance.com/widget/api/v1.0/tandi');
  // console.log(annualTaxesArray);
  let annualTaxes = ((annualTaxesArray.tandi.filter(tandi => tandi.state == state.value)[0].taxrate)/100/100 * (mortgageAmount/.8));
  // console.log('annual taxes are ' + annualTaxes);
  /* insurance is a percentage of the home value also, (100 is a magic number, for now) */
  let annualInsurance = ((annualTaxesArray.tandi.filter(tandi => tandi.state == state.value)[0].insurancerate)/100/100 * (mortgageAmount/.8));
  // console.log('annual insurance is' + annualInsurance);
  // in the future, fetch from api
  /* subtract these two to get new monthly payment, principal / interest only. */
  let monthlyPaymentPandI = monthlyPayment - (annualTaxes / 12) - (annualInsurance / 12);
  // console.log('monthly payment P and I only is' + monthlyPaymentPandI);
  /*
  Then, estimate an interest rate based on the monhtly payment,
  mortgage amount and term (assume 30 years).
 */
  let min_rate = 0;
  let max_rate = 100;
  let mid_rate = 0;
  let J = 0; // monthly rate
  let guessed_pmt = 0;
  while (min_rate < (max_rate - 0.0001)) {
    mid_rate = (min_rate + max_rate) / 2; // Divide by 2
    J = mid_rate / 1200; // Convert to monthly decimal
    // calculate payment from interest, term and loan_amt
    guessed_pmt = parseInt(mortgageAmount) * (J / (1 - (1 + J) ** -(mortgageTerm * 12)));
    if (guessed_pmt > monthlyPaymentPandI) {
      max_rate = mid_rate; // current rate is new maximum
    } else {
      min_rate = mid_rate; // current rate is new minimum
    }
  }
  /*
 Then, using the calculated rate, get the unpaid principal balance .
 */
  const amortschedule = amortize({
    amount: (parseInt(mortgageAmount)),
    rate: mid_rate,
    totalTerm: mortgageTerm * 12, // years * 12
    amortizeTerm, // caculated based on diff b/w orig date and today, expressed in months
  });
  unpaidBalance = amortschedule.balance;
  /*
  Then, take that unpaid principa balance and add the cashout amount and figure out amort schedule
    Use the rate returned from API: http://161.35.252.159/widget/api/v1.0/rates : instead of 3.05
  */
 let newRates = await makeAPIRequest('https://savings.refinance.com/widget/api/v1.0/rates');
  let newRate = newRates.rates.filter(rate => rate.loanterm==360)[0].rate / 100;

//  console.log(newRate.rates.filter(loanterm => loanterm == '360'));
  // console.log(newRate);
  const newAmortschedule = amortize({
    amount: (unpaidBalance + parseInt(cashoutAmount)),
    rate: newRate,
    totalTerm: 360,
    amortizeTerm: 360,
  });
  const newMortgBal = amortschedule.balance + parseInt(cashoutAmount);
  const newMonthlyPayment = newAmortschedule.payment+(annualTaxes / 12) + (annualInsurance / 12);
  const newMonthlySavings = monthlyPaymentPandI - newAmortschedule.payment;
  //const newRate = 3.05; // looked up based on state / mortgage term
  return {
    newMortgageBalance: newMortgBal,
    monthlySavings: newMonthlySavings,
    monthlyPayment: newMonthlyPayment,
    oldRate: mid_rate.toFixed(2),
    rate: newRate.toFixed(2),
  };
};