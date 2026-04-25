import ProductView from "./productView.js";
import CategoryView from "./categoryView.js";
import i18n from "./i18n.js";


document.addEventListener("DOMContentLoaded", ()=>{
    const productView = new ProductView()
    const categoryView = new CategoryView()

    i18n.applyStaticTranslations()
    categoryView.setupApp()
    productView.setupApp()

    document.querySelector("#languageToggle").addEventListener("click", () => {
        i18n.toggleLanguage()
    })

    document.addEventListener("inventory:language-changed", () => {
        i18n.applyStaticTranslations()
        categoryView.setupApp()
        productView.sortBySelect(productView.sortSelect.value)
        productView.updateQuantityControls()
    })
})

