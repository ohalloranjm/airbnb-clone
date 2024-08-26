//input string must start 'YYYY-MM-DD'
//indices 10+ ignored
export function dateFromString(str) {
  const date = {};
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  date.year = Number(str.slice(0, 4));
  date.monthNum = Number(str.slice(5, 7));
  date.month = MONTHS[date.monthNum - 1];
  date.day = Number(str.slice(8, 10));
  return date;
}

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
