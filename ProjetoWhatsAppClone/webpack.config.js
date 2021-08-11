const path = require('path')

module.exports = {
  target: 'node',
  devtool: 'source-map',
  entry: {
    app: './src/app.js',
    'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath:'/dist',
    clean: false,
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: "node-loader",
      },
    ],
  },
}
