import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import {defaults} from 'jest-config';
import tsconfigJson from './tsconfig.json';

const config: Config.InitialOptions = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    verbose: true,
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.json',
            useESM: true
        }
    },
    transform: {},
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
    // moduleNameMapper: pathsToModuleNameMapper(tsconfigJson.compilerOptions.paths, { prefix: '<rootDir>/' }),
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    "testMatch": [
        // "__tests__/**/*.mts",
        "__tests__/*.mts",
        // '**/__tests__/**/*.mjs',
      ]
};
export default config;


