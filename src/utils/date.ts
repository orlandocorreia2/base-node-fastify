export const dateFutureDays = (days: number): Date => {
  const dateFuture = new Date();
  dateFuture.setDate(dateFuture.getDate() + days);
  return dateFuture;
};
