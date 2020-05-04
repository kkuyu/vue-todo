module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2015,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ["standard", "plugin:vue/essential"],
  plugins: ["vue"],
  rules: {
    "no-new": 0,
    "semi": 0,
	"quotes": 0,
	"space-before-blocks": 0,
	"space-before-function-paren": 0,
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
};
