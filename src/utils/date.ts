export const dateFutureDays = (days: number): Date => {
  const dateFuture = new Date();
  dateFuture.setDate(dateFuture.getDate() + days);
  return dateFuture;
};

export const setLastHour = (date: Date): Date => {
  date.setHours(20);
  date.setMinutes(59);
  date.setSeconds(59);
  date.setMilliseconds(999);
  return date;
};

export const generateExpiredAtDate = (value: string): Date => {
  return new Date(`${value}T23:59:59.999Z`);
};
