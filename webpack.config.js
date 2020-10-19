const path              = require('path');
const HTMLWebPackplugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: ['./src/js/app.js']
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devServer: {
    contentBase: './public'
  },
  plugins:[
        new HTMLWebPackplugin({
          filename: 'index.html',
          template: './src/index.html'
        })
  ],
  module: {
    rules:[
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          } 
        }
    ]
  }

};