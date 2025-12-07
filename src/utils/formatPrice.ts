export const formatPrice = (price: number, currency = "грн"): string => {
  const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formatted} ${currency}`;
};
