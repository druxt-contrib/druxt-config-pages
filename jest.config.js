module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}'],
  coverageDirectory: './coverage/',
  // A floor, not a target: the measured baseline of the current tests, rounded
  // down. Raise it as coverage genuinely improves, and never lower it to make a
  // merge request pass. Collecting coverage with no threshold is the shape this
  // replaces, and it enforces nothing while looking like it does.
  coverageThreshold: {
    global: {
      statements: 97,
      branches: 76,
      functions: 87,
      lines: 100,
    },
  },
  // cobertura feeds the merge request coverage view, text feeds the regex the
  // pipeline reads.
  coverageReporters: ['cobertura', 'lcov', 'text'],
  coveragePathIgnorePatterns: ['/dist/', '/node_modules/'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  modulePathIgnorePatterns: ['/example/'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/example/'],
  transform: {
    '^.+\\.(js)$': 'esbuild-jest',
    '^.+\\.(mjs)$': 'esbuild-jest',
    '^.+\\.(vue)$': 'vue-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(druxt)/)'],
}
