export const enum ValidationError {
  MustBeString = 'Personal number must be string',
  MustContain14symbols = 'Personal number must contain 14 symbols',
  OnlyNumbersAndUppercaseLatin = 'Personal number must contain only numbers and uppercase Latin letters',
  ControlNumbersAreNotEqual = 'Control numbers are not equal',
}

function checkValidSymbols(symbols: string) {
  if (typeof symbols !== 'string') {
    const error = {
      tag: 'Err',
      err: ValidationError.MustBeString,
    } as const;
    return error;
  }
  if (symbols.length !== 14) {
    const error = {
      tag: 'Err',
      err: ValidationError.MustContain14symbols,
    } as const;
    return error;
  }
  if (/^[0-9A-Z]*$/.test(symbols) === false) {
    const error = {
      tag: 'Err',
      err: ValidationError.OnlyNumbersAndUppercaseLatin,
    } as const;
    return error;
  }

  const ok = { tag: 'Ok', ok: 'Symbols are valid' } as const;
  return ok;
}

function getEncodedNumber(char: string, index: number): number {
  const encodedNumber = Number.isInteger(+char)
    ? +char
    : char.charCodeAt(0) - 65 + 10;
  return encodedNumber * [7, 3, 1][index % 3];
}

function getCalculatedControlNumber(personalNumber: string): number {
  return (
    Array.from(personalNumber.slice(0, -1)).reduce(
      (accum, curr, index) => accum + getEncodedNumber(curr, index),
      0
    ) % 10
  );
}

function compareControlNumbers(x: number, y: number) {
  const ok = { tag: 'Ok', ok: 'Control numbers are equal' } as const;
  const err = {
    tag: 'Err',
    err: ValidationError.ControlNumbersAreNotEqual,
  } as const;
  return x === y ? ok : err;
}

export function validate(
  personalNumber: string
): { valid: false; error: ValidationError } | { valid: true; error: null } {
  const validateSymbolResult = checkValidSymbols(personalNumber);
  if (validateSymbolResult.tag === 'Err') {
    return { valid: false, error: validateSymbolResult.err };
  }

  const compareResult = compareControlNumbers(
    getCalculatedControlNumber(personalNumber),
    +personalNumber.slice(-1)
  );

  return compareResult.tag === 'Ok'
    ? { valid: true, error: null }
    : { valid: false, error: compareResult.err };
}
