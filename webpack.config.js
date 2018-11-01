const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,

  output: {
    path: path.resolve('public'),
    publicPath: '/',
    filename: 'bundle.min.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
        use: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}
