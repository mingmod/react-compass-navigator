const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, options) => {

  const plugins = [
    new MiniCssExtractPlugin({
      filename: 'master.css'
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ]

  let externals = ['react']

  let entry = './src/ReactCompassNavigator.jsx'
  if (options.env.WEBPACK_SERVE) {
    entry = './src/dev/index.jsx'
    plugins.push(new HtmlWebpackPlugin({ template: './src/dev/index.html' }))
    externals = []
  }

  return {
    mode: 'development',
    entry,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        type: 'umd',
        name: 'ReactCompassNavigator',
      }
    },
    plugins,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.s?css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        }
      ]
    },
    externals,
    devServer: {
      port: 3200
    },
  }
}
