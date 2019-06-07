module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      'root': ['./src'],
      'alias': {
        'base': './src/base',
        'pages': './src/pages',
        'navigator': './src/navigator',
        'constants': './src/constants',
        'utils': './src/utils',
        'components': './src/components',
        'action': './src/actions',
        'reducer': './src/reducer',
      }
    }]
  ]
};
