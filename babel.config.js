module.exports = {
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
      loose: true
    }]
  ],
  plugins: [

  ],
  env: {
    production: {
      plugins: [
        ['transform-react-remove-prop-types', { removeImport: true }]
      ]
    }
  }
}
