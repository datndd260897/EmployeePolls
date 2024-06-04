module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts']
};