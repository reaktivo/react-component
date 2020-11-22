const babelPlugin = require("./babel-plugin");

module.exports = require("babel-loader").custom(babel => {
  return {
    config(cfg) {
      if (cfg.hasFilesystemConfig()) {
        return cfg.options;
      }

      return {
        ...cfg.options,
        plugins: [
          ...(cfg.options.plugins || []),
          babelPlugin,
        ],
      };
    },
    result(result) {
      return {
        ...result,
        code: result.code,
      };
    },
  };
});