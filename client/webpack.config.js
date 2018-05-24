const webpack = require('webpack');
const path = require('path');

process.env.NODE_ENV = 'production';

module.exports = {
  entry: [path.resolve(__dirname, './src/index.jsx')],
  output: {
    path: path.resolve(__dirname),
    filename: 'dist/bundle.js'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      CLOUDINARY_API: JSON.stringify(process.env.CLOUDINARY_API),
      CLOUDINARY_PRESET: JSON.stringify(process.env.CLOUDINARY_PRESET)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: [
            'react',
            [
              'es2015',
              {
                loose: true,
                modules: false
              }
            ]
          ]
        }
      },
      {
        test: /\.s?css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: [/\.jpe?g$/, /\.png$/, /\.ico$/, /\.gif$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'dist/asset/[name].[hash:8].[ext]'
        }
      }
    ]
  }
};
