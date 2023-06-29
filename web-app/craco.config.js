module.exports = {
  webpack: {
    configure(webpackConfig) {
      webpackConfig.module.rules.forEach((rule) => {
        (rule.oneOf || []).forEach((oneOf) => {
          if (oneOf.type === 'asset/resource') {
            oneOf.exclude.push(/\.wasm$/);
          }
        });
      });

      webpackConfig.experiments = webpackConfig.experiments || {};
      webpackConfig.experiments.asyncWebAssembly = true;

      return webpackConfig;
    },
  },
};
