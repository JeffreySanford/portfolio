import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  projects: [
    {
      displayName: 'frontend',
      preset: './jest-preset.js',
      setupFilesAfterEnv: ['<rootDir>/apps/frontend/src/test-setup.ts'],
      coverageDirectory: './coverage/apps/frontend',
      testPathIgnorePatterns: ['<rootDir>/apps/frontend-e2e/'],
      transform: {
        '^.+\\.(ts|mjs|js|html)$': [
          'jest-preset-angular',
          {
            tsconfig: '<rootDir>/apps/frontend/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
          },
        ],
      },
      transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
      snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
      ],
    },
    {
      displayName: 'backend',
      preset: './jest-preset.js',
      testEnvironment: 'node',
      testPathIgnorePatterns: ['<rootDir>/apps/backend-e2e/'],
      transform: {
        '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/apps/backend/tsconfig.spec.json' }],
      },
      moduleFileExtensions: ['ts', 'js', 'html'],
      coverageDirectory: './coverage/apps/backend',
    },
  ],
};

export default config;
