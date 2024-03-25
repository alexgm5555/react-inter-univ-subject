export const formatMoney = (number = 0) => {
  //TODO: genera error de hidratacion en next con versiones de node menores a 14.xx
  //referencia error https://github.com/vercel/next.js/discussions/19409#discussioncomment-135775
  const options = {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  };
  const numberFormat = new Intl.NumberFormat('es-CO', options);
  return numberFormat.format(number).replace(/\s/g, '');
};