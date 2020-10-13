export const formatMoney = (value, fractionDigits = 0) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  const formatted = formatter.format(value);
  return formatted.replace('$', ''); // remove '$' sign at the end
};
