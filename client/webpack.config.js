const webpack = require('webpack');
const path = require('path');

exports.default = {
  entry: [path.resolve(__dirname, './src/index.jsx')],
  output: {
    path: path.resolve(__dirname),
    filename: 'dist/bundle.js',
    hotUpdateChunkFilename: 'dist/hot/hot-update.js',
    hotUpdateMainFilename: 'dist/hot/hot-update.json'
  },
  devServer: {
    publicPath: '/',
    contentBase: './public',
    hot: true,
    historyApiFallback: true
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
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
