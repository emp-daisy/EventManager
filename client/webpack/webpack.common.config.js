const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

module.exports = {
  entry: [path.resolve(__dirname, './../src/index.jsx')],
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        CLOUDINARY_API: JSON.stringify(env.CLOUDINARY_API),
        CLOUDINARY_PRESET: JSON.stringify(env.CLOUDINARY_PRESET)
      },
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Tether: 'tether'
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
          limit: 1000,
          name: '/assets/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '/fonts/[name].[ext]?[hash]',
        }
      }
    ]
  }
};
