const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: [path.join(__dirname, 'src', 'app')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
    clean: false,
  },
}
