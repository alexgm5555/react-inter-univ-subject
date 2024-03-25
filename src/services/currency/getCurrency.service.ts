import connectDB from '../connectDB';

const urlCurrency =  `${process.env.REACT_APP_API_CURRENCY}`;

export const getActualCurrency = () => {
  const connect: any = new connectDB();
  return connect.get(urlCurrency);
}
