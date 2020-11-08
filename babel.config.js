module.exports = {
  presets: [
    [
      '@babel/preset-env',
      // { targets: { node: 'current' } }
      {
        useBuiltIns: 'entry',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-jsx',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    // '@babel/plugin-transform-react-jsx-self '
  ],
};
