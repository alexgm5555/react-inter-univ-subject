import { useEffect, useState } from "react";
import { getActualCurrency } from "../../../services";
import { formatMoney } from "../../../util/formatMoney";
import { Button } from "../../../components/atoms";


interface props {
  data: any
}

export const ResumeCmp = ( {data}: props ) => {
  const [actCurrency, setActCurrency] = useState<{rates: any}>();

  const creditValue =  `${process.env.REACT_APP_CREDIT_VALUE}`;
  const getDataCurrency = async () => {
    try {
      const dataApi: any = await getActualCurrency()
      setActCurrency(dataApi);
    } catch (error) {
      console.error('Error de conexión al obtener las el total:', error);
    }
  }
  
  const getValueUSD = () =>{
    let valueUSD = 0;
    data.forEach((item: { numCredits: number; }) => {
      valueUSD = valueUSD + (item.numCredits * +150);
    });
    return valueUSD;
  }

  const getValueEuros = () =>{
    const oneUSD = 1/+actCurrency?.rates.USD;
    return getValueUSD() * oneUSD;
  }

  useEffect(() => {
    getDataCurrency();
  }, [data]);
  
  return (
    <span className="hidden md:flex md:w-64 justify-center items-center flex-col">
      <span className="flex flex-col  justify-between">
        <p className="pb-3">Total: {data.length * 3} créditos</p>
        <p>Euros: {formatMoney(Number(getValueEuros().toFixed(2)))}</p> 
        <p>Dolares: {formatMoney(getValueUSD())}</p> 
      </span>
    </span>
  );
};

