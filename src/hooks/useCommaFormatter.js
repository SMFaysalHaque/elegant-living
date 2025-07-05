export const useCommaFormatter = () => {
  const CommaFormatter = (number) => {
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

  return {
    CommaFormatter,
  };
};
