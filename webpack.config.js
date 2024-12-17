const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

module.exports = {
  mode: 'development',
  entry: './src/index.tsx', // Make sure this points to your TypeScript entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Ensure this is set to the correct path
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Process JavaScript and JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.tsx?$/, // Process TypeScript files
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader', // Use ts-loader to handle .ts and .tsx files
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Allow .tsx extensions
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': JSON.stringify(env)  // Expose environment variables
      }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Your HTML template
    }),
  ],
};
