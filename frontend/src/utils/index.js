export function round(num, places) {
  const strNum = String(num) + (String(num).includes('.') ? '' : '.0');
  let [whole, decimal] = strNum.split('.');
  if (!places) {
    const roundUp = Number(decimal[0]) >= 5;
    if (roundUp) whole = String(Number(whole) + 1);
    return whole;
  } else {
    let newDecimal = decimal.slice(0, places);
    while (newDecimal.length < places) newDecimal += '0';
    const roundUp = Number(decimal.slice(places)[0]) >= 5;
    if (roundUp) newDecimal = String(Number(newDecimal) + 1);
    if (newDecimal.length > places) {
      whole = String(Number(whole) + 1);
      newDecimal = newDecimal.slice(1);
    }
    return `${whole}.${newDecimal}`;
  }
}
