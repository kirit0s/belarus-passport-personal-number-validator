function checkValidSymbols(symbols: string) {
  if (typeof symbols !== 'string') {
    throw new Error('Personal number must be string');
  }
  if (symbols.length !== 14) {
    throw new Error('Personal number must contain 14 symbols');
  }
  if (/^[0-9A-Z]*$/.test(symbols) === false) {
    throw new Error(
      'Personal number must contain only numbers and uppercase Latin letters'
    );
  }
}

function getCalculatedControlNumber(personalNumber: string) {
  function getСonvertedNumber(char: string, index: number) {
    const neededNumber = Number.isInteger(+char)
      ? +char
      : char.charCodeAt(0) - 65 + 10;
    return neededNumber * [7, 3, 1][index % 3];
  }
  const withoutLast = (x: string) => x.slice(0, -1);
  const sum = (x: number, y: number) => x + y;

  return (
    Array.from(withoutLast(personalNumber))
      .map(getСonvertedNumber)
      .reduce(sum) % 10
  );
}

function compareControlNumbers(x: number, y: number): boolean | never {
  if (x !== y) {
    throw new Error('Control numbers are not equal');
  }
  return true;
}

export default (personalNumber: string): any => {
  try {
    checkValidSymbols(personalNumber);
    const valid = compareControlNumbers(
      getCalculatedControlNumber(personalNumber),
      +personalNumber.slice(-1)
    );
    return {
      error: null,
      valid,
    };
  } catch (err) {
    return {
      error: err.message,
      valid: false,
    };
  }
};
