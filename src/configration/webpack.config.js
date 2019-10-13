const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // entry point
  entry: './JavaScript/index.js',
  // 出力するパスは絶対パスで書きます
  output: {
    path: `${__dirname}/../dist/`,
    filename: 'build.js'
  },
  devServer: {
    contentBase: `/dist/`,
    publicPath: '/',
    noInfo: true,
    historyApiFallback: true,
    watchContentBase: true,
    port:8080
  },
  devtool: 'source-map',
  module: {
    rules: [
      // 拡張子.vueのファイルに対する設定
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 拡張子.jsのファイルに対する設定
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [ 
            path.resolve(__dirname, "src"),
            require.resolve("bootstrap-vue"), 
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ]
      },
      {
        test: /\.css$/,
        use: [ 'vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  externals: [
    {
      jquery: 'jQuery'
    }
  ],
  resolve: {
    // モジュールを読み込むときに検索するディレクトリの設定
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    // importするときに省略できる拡張子の設定
    extensions: ['.js', '.vue'],
    alias: {
      // 例えばmain.js内で `import Vue from 'vue';` と記述したときの`from vue`が表すファイルパスを指定
      'vue$': 'vue/dist/vue.esm.js'
    },
  },
  // プラグインを列挙
  plugins: [
    new HtmlWebpackPlugin({
      template: "../templates/index.html"
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  performance: { hints: false},
  mode: "production"
}