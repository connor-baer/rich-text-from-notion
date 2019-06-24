module.exports = {
  rootDir: '.',
  roots: ['src'],
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules', 'src'],
  coverageDirectory: './__coverage__',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/index.{js,jsx}',
    '!src/**/*.story.{js,jsx}',
    '!**/node_modules/**'
  ]
};
