module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  clearMocks: true,
  testPathIgnorePatterns: ['/.history/'],
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  resetMocks: false,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: [
    // '<rootDir>/**/src/**/*.{js,jsx,ts,tsx}',
    
    // '!**/example/**',
    // '!**/es/**',
    // '!**/lib/**',
    // '!**/dist/**',
    // '!**/.umi/**',
    // '!**/src/utils/**'
    '**/src/hooks/**',
    '!**/demo/**',
  ],
};
