/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandom(min, max, int) {
  const value = Math.random() * (max - min) + min;
  return int
    ? Math.floor(value)
    : value;
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
  const newMonthlySavings = getRandom(100, 1000, true);
  const newMonthlyPayment = getRandom(1000, 2000, true);
  const newRate = getRandom(1, 10);

  return {
    monthlySavings: newMonthlySavings,
    monthlyPayment: newMonthlyPayment,
    rate: newRate.toFixed(2),
  };
};
