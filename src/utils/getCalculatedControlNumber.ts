function getEncodedNumber(char: string, index: number): number {
  const encodedNumber: number = Number.isInteger(+char)
    ? +char
    : char.charCodeAt(0) - 65 + 10;
  return encodedNumber * [7, 3, 1][index % 3];
}

export function getCalculatedControlNumber(
  personalNumberWithoutControlNumber: string
): number {
  return (
    Array.from(personalNumberWithoutControlNumber).reduce(
      (accum, curr, index) => accum + getEncodedNumber(curr, index),
      0
    ) % 10
  );
}
