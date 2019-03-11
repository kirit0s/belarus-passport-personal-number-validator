import test from 'ava';
import isPersonalNumberValid from '../src/index';

test('check valid personal number v1', t => {
  t.true(isPersonalNumberValid('3270287A012PB2'));
});

test('check valid personal number v2', t => {
  t.true(isPersonalNumberValid('3041088A042PB2'));
});

test('check invalid control number in personal number', t => {
  t.false(isPersonalNumberValid('3270287A012PB3'));
});

test('check invalid control number in personal number with errorBehavior = "error"', t => {
  const result = isPersonalNumberValid('3270287A012PB3', {
    errorBehavior: 'error',
  });
  t.true(result instanceof Error);
  t.is(result.message, 'control numbers are not equal');
});

test('check invalid type value in personal number', t => {
  t.throws(
    () => isPersonalNumberValid(1, { errorBehavior: 'throwError' }),
    'Personal number must be string'
  );
});

test('check invalid string length in personal number', t => {
  t.throws(
    () =>
      isPersonalNumberValid('3270287A012PB', { errorBehavior: 'throwError' }),
    'Personal number must contain 14 symbols'
  );
});

test('check invalid symbol personal number', t => {
  t.throws(
    () =>
      isPersonalNumberValid('3270287Я012PB2', { errorBehavior: 'throwError' }),
    'Personal number must contain only numbers and uppercase Latin letters'
  );
});

test('check invalid symbol number with errorBehavior = "boolean"', t => {
  t.false(
    isPersonalNumberValid('3270287Я012PB2', { errorBehavior: 'boolean' })
  );
});

test('check invalid symbol number with errorBehavior = "error"', t => {
  const result = isPersonalNumberValid('3270287Я012PB2', {
    errorBehavior: 'error',
  });
  t.true(result instanceof Error);
  t.is(
    result.message,
    'Personal number must contain only numbers and uppercase Latin letters'
  );
});

test('check invalid config.errorBehavior', t => {
  t.throws(
    () => isPersonalNumberValid('3270287A012PB2', { errorBehavior: 'invalid' }),
    'errorBehavior must contain one of ["boolean", "error", "throwError"]'
  );
});
