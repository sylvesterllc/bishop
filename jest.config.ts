import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  // [...]
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: [
    "<rootDir>/**/*.(test).{js,jsx,ts,tsx}",
    "<rootDir>/__tests__/**/?(*.)(spec|test).{js,jsx,ts,tsx,mts}"
  ],
  
  testPathIgnorePatterns: ["node_modules"], 
  extensionsToTreatAsEsm: ['.ts', '.mts'],
  // transformIgnorePatterns: [
  //   `/node_modules/(?!(somePkg)|react-dnd|core-dnd|@react-dnd|@sylvesterllc/utility-helper)`,
  // ],
  transformIgnorePatterns: [
    '/node_modules/@sylvesterllc/(?!utility-helper)',
    
  ],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  resolver: '<rootDir>/mjs-resolver.ts',
}

export default jestConfig