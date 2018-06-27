const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');

process.env.NODE_ENV = 'production';

module.exports = merge(common, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        CLOUDINARY_API: JSON.stringify(process.env.CLOUDINARY_API),
        CLOUDINARY_PRESET: JSON.stringify(process.env.CLOUDINARY_PRESET),
        NODE_ENV: JSON.stringify('production')
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});
