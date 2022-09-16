export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.svelte$': ['svelte-jester', { preprocess: true }],
    '^.+\\.ts$': 'ts-jest',
    // If using js (needs package babel-jest and @babel/preset-env)
    //"^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ['js', 'svelte', 'ts'],
  // As of Jest 28 "jest-environment-jsdom" is no longer shipped by default
  testEnvironment: 'jest-environment-jsdom',
  // If ignore ESM
  // transformIgnorePatterns: [
  //   "node_modules/(?!(tailwindcss)/)",
  // ]
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
}
