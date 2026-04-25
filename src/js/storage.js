export default class Storage {

    static get getProducts() {
        return JSON.parse(localStorage.getItem("products")) || [];
    }

    static getCategories() {
        return JSON.parse(localStorage.getItem("categories")) || []
    }

    static saveProducts(productsList) {
        localStorage.setItem("products", JSON.stringify(productsList))
    }

    static saveCategories(categoriesList) {
        localStorage.setItem("categories", JSON.stringify(categoriesList))
    }

    static getLanguage() {
        return localStorage.getItem("language") || "en"
    }

    static saveLanguage(language) {
        localStorage.setItem("language", language)
    }

    static removeProduct(deletedId) {
        const UpdatedProducts = this.getProducts.filter((product) => product.id !== deletedId)
        this.saveProducts(UpdatedProducts)
    }

}
