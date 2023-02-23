export default {
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  transform: {
    '\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  // globalSetup: '<rootDir>/.env/',
};
