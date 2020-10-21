const amortize = require('amortize');

function monthDiff(dateFrom, dateTo) {
  return dateTo.getMonth() - dateFrom.getMonth()
      + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
}
export const calculateMonthlySavings = ({
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
  /*
  First, estimate an interest rate based on the monhtly payment,
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
    if (guessed_pmt > monthlyPayment) {
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
    Years  Months  Product  Interest rate
    30 360  3.05%
    20 240  2.94%
    15 180  2.51%
    60  2.25%
  */
  const newAmortschedule = amortize({
    amount: (unpaidBalance + parseInt(cashoutAmount)),
    rate: 3.05,
    totalTerm: 360,
    amortizeTerm: 360,
  });
  console.log(newAmortschedule);
  const newMortgBal = amortschedule.balance + parseInt(cashoutAmount);
  const newMonthlyPayment = newAmortschedule.payment;
  const newMonthlySavings = monthlyPayment - newAmortschedule.payment;
  const newRate = 3.05; // looked up based on state / mortgage term
  return {
    newMortgageBalance: newMortgBal,
    monthlySavings: newMonthlySavings,
    monthlyPayment: newMonthlyPayment,
    oldRate: mid_rate.toFixed(2),
    rate: newRate.toFixed(2),
  };
};
