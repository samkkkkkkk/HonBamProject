module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // 항상 마지막
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // ESLint 로직 관련 규칙만 설정
    // 포맷 규칙은 prettier에서 관리
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    // React 17+에서는 불필요
    'react/react-in-jsx-scope': 'off',

    // PropTypes를 쓰지 않으면 끄기(실무에서 TS 쓰거나 DTO로 검증하는 경우가 많음)
    'react/prop-types': 'off',

    // children을 props로 넘기는 패턴 허용하려면(권장 X) 아래 주석 해제
    // 'react/no-children-prop': 'off',
    // ===== 코드 스타일 =====
    quotes: ['warn', 'single', { avoidEscape: true }], // 홑따옴표 선호
    semi: ['error', 'always'], // 세미콜론 필수
    'prefer-const': 'warn', // 재할당 없는 변수는 const
    'no-var': 'error', // var 금지
    // 품질
    eqeqeq: ['warn', 'always'],
    curly: ['error', 'all'],
    'no-duplicate-imports': 'error',

    // ===== React / Hooks =====
    'react/react-in-jsx-scope': 'off', // React 17+에서 불필요
    'react/prop-types': 'off', // TS 사용 시 꺼두기
    'react/jsx-uses-react': 'off', // React 17+에서 불필요
    'react/jsx-uses-vars': 'warn',
    'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 강제
    'react-hooks/exhaustive-deps': 'warn', // 의존성 배열 검사
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
