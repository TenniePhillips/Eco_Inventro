export const NumberFormat = ({ value }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  };

  return <span>{formatNumber(value)}</span>;
};

export function formatNumber(number) {
  if (number >= 1e9) {
    return `${(number / 1e9).toFixed(2)}b`; // Billion
  } else if (number >= 1e6) {
    return `${(number / 1e6).toFixed(2)}m`; // Million
  } else if (number >= 1e3) {
    return `${(number / 1e3).toFixed(2)}k`; // Thousand
  } else {
    return number.toString();
  }
}
