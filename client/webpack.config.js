const webpack = require('webpack');
const path = require('path');

exports.default = {
  entry: [path.resolve(__dirname, './src/index.js')],
  output: {
    path: path.resolve(__dirname),
    filename: 'dist/bundle.js'
  },
  devServer: {
    publicPath: '/',
    contentBase: './public',
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    modules: [
      'node_modules', 'src'
    ],
    extensions: ['.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: [
            'react',
            [
              'es2015', {
                loose: true,
                modules: false
              }
            ]
          ]
        }
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }, {
        test: [
          /\.jpe?g$/, /\.png$/, /\.ico$/, /\.gif$/
        ],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'dist/asset/[name].[hash:8].[ext]'
        }
      }
    ]
  }
};
