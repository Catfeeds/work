module.exports = {
  entry:[ // 入口
    './js/user.js'
  ],
  output: { // 输出
    path: __dirname + "/js/",
    publicPath: "./js/",
    filename: 'user_es5.js'
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  }, 
  module: {
    loaders: [ // 预处理
      {
        test: /\.js?$/, // 预处理jsx 
        exclude: /(node_modules)/,
        loader: 'babel?presets[]=react,presets[]=es2015' // 'babel-loader' is also a legal name to reference
      }
    ]
  }
};