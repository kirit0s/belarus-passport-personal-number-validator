module.exports = w => ({
  files: ['src/*.ts', 'dist/*.js'],
  tests: ['tests/*.test.ts'],
  env: {
    type: 'node',
    runner: 'node',
  },
  debug: true,
  testFramework: 'ava',
  // delays: { run: 500 },
});
