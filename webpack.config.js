const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    content: './src/content.ts',
    background: './src/background.ts',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin({
      failOnError: true,
      extensions: ['js', 'ts'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.js'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/static' }],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
};
