const rates = {
  USD: 1,
  EGP: 49.06,
  EUR: 0.92,
};

const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];
  return (amount / fromRate) * toRate;
};

module.exports = convertCurrency;
