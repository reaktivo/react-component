module.exports = (pluginOptions = {}) => (nextConfig = {}) => {
  const extension = pluginOptions.extension || /\.react\.$/

  if (!extension) {
    throw new Error('[babel-plugin-react-component] extension needs to be defined');
  }

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: extension,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@reaktivo/babel-plugin-rkx/loader',
          },
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}