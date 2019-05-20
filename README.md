# Belarus personal number validator

Validator for personal number in passport of Belarus.

## Install

```js
npm i belarus-personal-number-validator
```

## Usage

```js
import { validate } from 'belarus-personal-number-validator';

validate('0000000A000PB2'); //=> {valid: true, error: null}
validate('0000000A000PB3'); //=> {valid: false, error: 'Control numbers are not equal'}
```

## Validation errors

- 'Personal number must be string'
- 'Personal number must contain 14 symbols'
- 'Personal number must contain only numbers and uppercase Latin letters'
- 'Control numbers are not equal'
