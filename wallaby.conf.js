module.exports = w => ({
  files: ['src/**/*.ts'],
  tests: ['tests/*.test.ts'],
  env: {
    type: 'node',
    runner: 'node',
  },
  debug: true,
  testFramework: 'ava',
  // delays: { run: 500 },
});
