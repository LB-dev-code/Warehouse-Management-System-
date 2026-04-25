import Storage from "./storage.js";

export default class CategoryView {
    constructor() {
        // variables
        this.ctgTitleInput = document.querySelector("#categoryTitle")
        this.ctgDescInput = document.querySelector("#categoryDescription")
        this.ctgCacelBtn = document.querySelector("#categoryCanelBtn")
        this.ctgAddBtn = document.querySelector("#categoryAddNewBtn")
        this.ctgSelect = document.querySelector("#categoriesSelect")
        this.categoriesList = document.querySelector("#categoriesList")
        // event listeners
        this.ctgAddBtn.addEventListener("click", () => {
            this.addNewCategory()
        })
        this.ctgCacelBtn.addEventListener("click", () => {
            this.resetCategoryInputs()
        })
        this.ctgTitleInput.addEventListener("input", () => {
            this.ctgTitleInput.setCustomValidity("")
        })
    }

    setupApp() {
        this.instantCtgUpdate(Storage.getCategories())
    }

    resetCategoryInputs() {
        this.ctgTitleInput.value = ""
        this.ctgDescInput.value = ""
        this.ctgTitleInput.setCustomValidity("")
    }

    persistCategories(categories) {
        Storage.saveCategories(categories)
        this.instantCtgUpdate(categories)
    }

    validateCategoryForm() {
        const normalizedTitle = this.ctgTitleInput.value.trim()

        if (!normalizedTitle) {
            this.ctgTitleInput.setCustomValidity("Category title is required.")
            this.ctgTitleInput.reportValidity()
            return false
        }

        if (normalizedTitle.length < 2) {
            this.ctgTitleInput.setCustomValidity("Category title must be at least 2 characters long.")
            this.ctgTitleInput.reportValidity()
            return false
        }

        this.ctgTitleInput.setCustomValidity("")
        return true
    }

    addNewCategory() {
        if (!this.validateCategoryForm()) {
            return
        }

        const normalizedTitle = this.ctgTitleInput.value.trim()
        const normalizedDescription = this.ctgDescInput.value.trim()

        // save category to local storage
        const savedCategories = Storage.getCategories();
        const existedItem = savedCategories.find((c) => c.title === normalizedTitle);

        if (existedItem) {
            existedItem.title = normalizedTitle;
            existedItem.description = normalizedDescription;
            existedItem.updatedAt = new Date().toISOString();
            this.persistCategories(savedCategories)
            this.resetCategoryInputs()
            alert("this category name has been added before so we will update the category description!")
        } else {
            const newCategory = {
                id: new Date().getTime(),
                title: normalizedTitle,
                description: normalizedDescription,
                createdAt: new Date().toISOString(),
            }

            savedCategories.push(newCategory);
            this.persistCategories(savedCategories)
            this.resetCategoryInputs()
        }
    }

    instantCtgUpdate(categories) {
        const ctgListTitles = categories.map(obj => obj.title.trim())
        // create option for each category
        this.ctgSelect.innerHTML = ` <option selected value="none">- select category -</option>  `
        ctgListTitles.forEach(option => {
            const newOption = document.createElement("option")
            newOption.value = option;
            newOption.textContent = option;
            // append new created option to select tg
            this.ctgSelect.append(newOption)
        });
        this.renderCategoriesList(categories)
    }

    renderCategoriesList(categories) {
        const categoriesFragment = document.createDocumentFragment()

        if (!categories.length) {
            const emptyItem = document.createElement("li")
            emptyItem.className = "rounded-2xl border border-dashed border-[#394247] px-4 py-4 text-sm text-stone-400 text-center"
            emptyItem.textContent = "No categories have been added yet."
            categoriesFragment.append(emptyItem)
        }

        categories.forEach((category) => {
            const categoryItem = document.createElement("li")
            const titleBlock = document.createElement("div")
            const descriptionBlock = document.createElement("p")
            const categoryTitle = document.createElement("p")
            const categoryMeta = document.createElement("p")

            categoryItem.className = "flex items-start justify-between gap-4 rounded-2xl border border-[#394247] px-4 py-3 text-stone-100"
            titleBlock.className = "w-2/5"
            descriptionBlock.className = "w-3/5 text-right text-sm text-stone-300"
            categoryTitle.className = "font-semibold"
            categoryMeta.className = "mt-1 text-xs uppercase tracking-[0.16em] text-stone-400"

            categoryTitle.textContent = category.title
            categoryMeta.textContent = category.updatedAt ? "Updated" : "Saved"
            descriptionBlock.textContent = category.description || "No description"

            titleBlock.append(categoryTitle, categoryMeta)
            categoryItem.append(titleBlock, descriptionBlock)
            categoriesFragment.append(categoryItem)
        })

        this.categoriesList.replaceChildren(categoriesFragment)
    }

}
