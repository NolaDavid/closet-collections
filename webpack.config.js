const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client', 'src', 'Index.tsx'),
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ['file-loader']
      }
    ]
  },

  resolve: {
    alias: {
      'react-native$': 'react-native-web'
    },
    extensions: ['.tsx', '.ts', '.js', 'jsx', '.web.js'],

  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist')
  },


};
