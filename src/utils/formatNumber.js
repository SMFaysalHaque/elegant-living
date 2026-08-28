// Formats a number with South-Asian style comma grouping
// (last three digits grouped, then every two digits). E.g. 159000 -> "1,59,000".
export const formatNumber = (number) => {
  if (number === null || number === undefined) return "";

  const [integerPart, decimalPart] = number.toString().split(".");
  const lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);

  let formattedNumber = "";

  if (otherNumbers !== "") {
    formattedNumber =
      otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  } else {
    formattedNumber = lastThree;
  }

  return decimalPart ? `${formattedNumber}.${decimalPart}` : formattedNumber;
};
