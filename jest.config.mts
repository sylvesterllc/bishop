// import type {Config} from 'jest';
// import {defaults} from 'jest-config';

// const config: Config = {
//   // verbose: true,
//   // moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
//   // preset: 'ts-jest',
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   transform: {
//     '^.+\\.ts?$': 'ts-jest',
//   },
//   transformIgnorePatterns: ['<rootDir>/node_modules/'],
  
// };

// export default config;

module.exports =  {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

// export default config;