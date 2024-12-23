import antfu from '@antfu/eslint-config';

// 更多自定义配置可查阅仓库：https://github.com/antfu/eslint-config
export default antfu(
  {
    // 使用外部格式化程序格式化 css、html、markdown 等文件
    formatters: true,
    // 启用样式规则
    stylistic: {
      // 缩进级别
      indent: 2,
      // 引号风格 'single' | 'double'
      quotes: 'single',
      // 是否启用分号
      semi: true,
    },
    // 忽略文件
    ignores: ['**/*.md', '**/default-component.json', '**/reset.css'],
  },
  {
    // 对所有文件都生效的规则
    rules: {
      // vue
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/attributes-order': 'off',
      // ts
      'ts/no-use-before-define': 'off',
      'ts/consistent-type-imports': 'off',
      // node
      'node/prefer-global/process': 'off',
      // style
      'style/comma-dangle': 'off',
      'style/semi': ['error'],
      'style/member-delimiter-style': 'off',
      'style/eol-last': 'off',
      'style/brace-style': ['error', '1tbs'],
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-imports': 'off',
      'max-len': ['warn', {
        code: 100, // 设置最大行长度
        ignoreStrings: true,
        ignoreComments: true
      }],
      // regexp
      'regexp/no-unused-capturing-group': 'off',
      // other
      'no-console': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'off',
      'symbol-description': 'off',
      'antfu/if-newline': 'off',
      'new-cap': 'off',
      'unused-imports/no-unused-vars': 'off',
      'no-empty': 'off',
      'no-eval': 'off'
    },
  },
);
