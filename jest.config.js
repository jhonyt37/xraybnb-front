module.exports = {
    displayName: 'ds',
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$',
        },
    },
    coverageThreshold: {
        "global": {
            "functions": 70,
            "lines": 70,
            "statements": 70
        }
    },
    coverageDirectory: './coverage',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: [
        'node_modules/(?!.*\\.mjs$)',
        "<rootDir>/src/app/layout/service/app.layout.service.ts"],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
};
