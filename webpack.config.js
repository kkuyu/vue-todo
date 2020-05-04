const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')

require('@babel/polyfill')

module.exports = (env, opts) => {
  const config = {
    resolve: {
      extensions: ['.vue', '.js'],
      alias: {
        "~": path.join(__dirname),
        "scss": path.join(__dirname, "./scss")
      }
    },
    entry: {
      app: ['@babel/polyfill', path.join(__dirname, 'main.js')]
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html')
      }),
      new CopyPlugin([
        {
          from: 'assets/',
          to: ''
        }
      ])
    ]
  }

  if (opts.mode === 'development') {
    // development
    return merge(config, {
      devtool: 'evel',
      devServer: {
        open: false,
        hot: true
      }
    })
  } else {
    // production
    return merge(config, {
      devtool: 'cheap-module-source-map',
      plugins: [new CleanWebpackPlugin()]
    })
  }
}
