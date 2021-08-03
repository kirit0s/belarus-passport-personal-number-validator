import test from 'ava';
import { validate, ValidationError } from '../src/index';

test('check valid personal number v1', t => {
  const result = validate('3270287A012PB2');
  t.deepEqual(result, { error: null, valid: true });
});

test('check valid personal number v2', t => {
  const result = validate('3041088A042PB2');
  t.deepEqual(result, { error: null, valid: true });
});

test('check valid personal number v3', t => {
  const result = validate('0000000A000PB2');
  t.deepEqual(result, { error: null, valid: true });
});

test('check invalid control number in personal number', t => {
  const result = validate('3270287A012PB3');
  t.deepEqual(result, {
    error: ValidationError.ControlNumbersAreNotEqual,
    valid: false,
  });
});

test('check invalid type in personal number', t => {
  const result = validate(123 as any);
  t.deepEqual(result, { error: ValidationError.MustBeString, valid: false });
});

test('check invalid length in personal number', t => {
  const result = validate('3270287A012PB31');
  t.deepEqual(result, {
    error: ValidationError.MustContain14symbols,
    valid: false,
  });
});

test('check invalid symbols in personal number', t => {
  const result = validate('3270287А012РВ3');
  t.deepEqual(result, {
    error: ValidationError.OnlyNumbersAndUppercaseLatin,
    valid: false,
  });
});
