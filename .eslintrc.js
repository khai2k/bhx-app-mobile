module.exports = {
    extends: ['@ken/eslint-config-javascript-standard-reactnative'],
    rules: {
        'import/no-extraneous-dependencies': 'off',
        'template-curly-spacing': [2, 'never'],
        'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
        'arrow-parens': ['error', 'always'],
        'react-native/no-inline-styles': 0
    },
    settings: {
        'import/resolver': {
            'babel-module': {}
        }
    }
};
