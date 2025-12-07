const currencyMap: Record<string, string> = {
  USD: "$",
  usd: "$",
  UAH: "грн",
  uah: "грн",
  EUR: "€",
  eur: "€",
};

export const formatCurrency = (currency: string): string => {
  return currencyMap[currency] || currency;
};

