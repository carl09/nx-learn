module.exports = {
  name: 'nx-learn',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nx-learn',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
