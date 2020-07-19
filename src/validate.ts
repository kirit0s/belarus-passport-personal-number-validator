import { getCalculatedControlNumber } from './utils/getCalculatedControlNumber';

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

function compareControlNumbers(x: number, y: number): boolean | never {
  if (x !== y) {
    throw new Error('Control numbers are not equal');
  }
  return true;
}

export function validate(
  personalNumber: string
): {
  error: string | null;
  valid: boolean;
} {
  try {
    checkValidSymbols(personalNumber);
    const valid = compareControlNumbers(
      getCalculatedControlNumber(personalNumber.slice(0, -1)),
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
}
