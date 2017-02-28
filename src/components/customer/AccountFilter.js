export default function AccountFilter(val) {
  let value = val;
  if (value && value !== undefined) {
    value = parseFloat(value).toFixed(2);
    let result = '';
    let counter = 0;
    value = (value || 0).toString();
    const numList = value.split('.');
    const intPart = numList[0].toString();
    for (let i = intPart.length - 1; i >= 0; i--) {
      counter++;
      result = intPart.charAt(i) + result;
      if (!(counter % 3) && i !== 0) { result = `,${result}`; }
    }
    result = result.replace('-,', '-');
    if (numList[1]) {
      if (value >= 0) {
        value = `${result}.${numList[1]}`;
      } else {
        value = `${result}.${numList[1]}`;
      }
    } else {
      value = `${result}.00`;
    }
    return value;
  } else if (value === 0) {
    return '0.00';
  }
  return '--';
}
