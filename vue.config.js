const publicPath = process.env.VUE_APP_PATH
module.exports = {
  publicPath,
  devServer: {
    publicPath
  }
}
