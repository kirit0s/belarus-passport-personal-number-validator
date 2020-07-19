import test from 'ava';
import { Generator } from '../src/generate';

test('test', t => {
  const x = new Generator(4);
  // [...new Generator(5)]; //?
  const y = x[Symbol.iterator](); //?
  y.next(); //?
  y.next(); //?
  y.next(); //?
  y.next(); //?
  y.next(); //?
  y.next(); //?
  y.next(); //?
  y.next(); //?
  y.next(); //?
});
