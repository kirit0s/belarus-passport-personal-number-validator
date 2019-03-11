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

type ErrorBehavior = 'boolean' | 'error' | 'throwError';

interface IConfig {
  errorBehavior: ErrorBehavior;
}

const defaultConfig: IConfig = {
  errorBehavior: 'boolean',
};

// function checkConfig(config: IConfig) {
//   const errorBehaviorParams = Object.values(ErrorBehavior);
//   const checkErrorBehavior = errorBehaviorParams.includes(config.errorBehavior);
//   if (checkErrorBehavior === false) {
//     throw new Error(
//       `errorBehavior must contain one of [${errorBehaviorParams.join(', ')}]`
//     );
//   }
// }

function compareControlNumbers(x: number, y: number): boolean | never {
  if (x !== y) {
    throw new Error('control numbers are not equal');
  }
  return true;
}

export default (
  personalNumber: string,
  config: IConfig = defaultConfig
): any => {
  // checkConfig(config);

  try {
    checkValidSymbols(personalNumber);
    return compareControlNumbers(
      getCalculatedControlNumber(personalNumber),
      +personalNumber.slice(-1)
    );
  } catch (err) {
    const { errorBehavior } = config;
    if (errorBehavior === 'boolean') {
      return false;
    }
    if (errorBehavior === 'error') {
      return err;
    }
    throw err;
  }
};
