const webpack = require('webpack');
const common = require('./webpack.common.config');
const merge = require('webpack-merge');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

// process.env.NODE_ENV = 'development';

module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    publicPath: '/',
    contentBase: './public',
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        CLOUDINARY_API: JSON.stringify(env.CLOUDINARY_API),
        CLOUDINARY_PRESET: JSON.stringify(env.CLOUDINARY_PRESET),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      },
    }),
  ],
});
