module.exports = {
  root: true,
  extends: [
    '@react-native-community',  // React Native 기본 ESLint 규칙
    'plugin:prettier/recommended' // Prettier와 연동
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'es5',
        printWidth: 100,
        bracketSpacing: true,
        arrowParens: 'avoid'
      }
    ],
    'no-unused-vars': 'warn', // 사용하지 않는 변수 경고
    'react/react-in-jsx-scope': 'off' // React 17 이상에서는 필요 없음
  }
};
