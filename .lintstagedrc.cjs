/**
 * @link https://www.npmjs.com/package/lint-staged
 */
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix --quiet'],
  '*.{css,less,styl,scss,sass}': ['stylelint --fix --quiet'],
  '*.{md,ya?ml,json,html}': ['prettier --write']
}
