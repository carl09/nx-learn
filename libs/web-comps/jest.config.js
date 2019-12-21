module.exports = {
  name: 'web-comps',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/web-comps',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
