import test from 'ava';
import { validate } from '../src/index';

test('check valid personal number v1', t => {
  const result = validate('3270287A012PB2');
  t.true(result.valid);
  t.is(result.error, null);
});

test('check valid personal number v2', t => {
  const result = validate('3041088A042PB2');
  t.true(result.valid);
  t.is(result.error, null);
});

test('check valid personal number v3', t => {
  const result = validate('0000000A000PB2');
  t.true(result.valid);
  t.is(result.error, null);
});

test('check invalid control number in personal number', t => {
  const result = validate('3270287A012PB3');
  t.false(result.valid);
  t.is(result.error, 'Control numbers are not equal');
});

test('check invalid type in personal number', t => {
  const result = validate(123 as any);
  t.false(result.valid);
  t.is(result.error, 'Personal number must be string');
});

test('check invalid length in personal number', t => {
  const result = validate('3270287A012PB31');
  t.false(result.valid);
  t.is(result.error, 'Personal number must contain 14 symbols');
});

test('check invalid symbols in personal number', t => {
  const result = validate('3270287А012РВ3');
  t.false(result.valid);
  t.is(
    result.error,
    'Personal number must contain only numbers and uppercase Latin letters'
  );
});
