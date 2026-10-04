export const formatMoney = (amount: number | string) => {
  return `৳${Number(amount).toLocaleString('en-BD')}`;
};
