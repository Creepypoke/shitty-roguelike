const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: {
    app: './src/main.ts',
    vendors: ['phaser'],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  // optimization: {
  // splitChunks: {
  //   cacheGroups: {
  //     commons: {
  //       test: /[\\/]node_modules[\\/]/,
  //       name: 'vendors',
  //       chunks: 'all',
  //     },
  //   },
  // },
  // },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'),
    https: false,
    compress: true,
    port: 9000,
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/index.html').replace(/\\/g, '/'),
          to: path.resolve(__dirname, 'dist').replace(/\\/g, '/'),
        },
        {
          from: path.resolve(__dirname, 'assets', '**', '*').replace(/\\/g, '/'),
          to: path.resolve(__dirname, 'dist').replace(/\\/g, '/'),
        },
      ],
    }),
  ],
}
