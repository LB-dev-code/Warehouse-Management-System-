"use strict";

var _productView = _interopRequireDefault(require("./productView.js"));
var _categoryView = _interopRequireDefault(require("./categoryView.js"));
var _i18n = _interopRequireDefault(require("./i18n.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
document.addEventListener("DOMContentLoaded", function () {
  var productView = new _productView["default"]();
  var categoryView = new _categoryView["default"]();
  _i18n["default"].applyStaticTranslations();
  categoryView.setupApp();
  productView.setupApp();
  document.querySelector("#languageToggle").addEventListener("click", function () {
    _i18n["default"].toggleLanguage();
  });
  document.addEventListener("inventory:language-changed", function () {
    _i18n["default"].applyStaticTranslations();
    categoryView.setupApp();
    productView.sortBySelect(productView.sortSelect.value);
    productView.updateQuantityControls();
  });
});
