module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@context': './src/context',
            '@assets': './src/assets',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
