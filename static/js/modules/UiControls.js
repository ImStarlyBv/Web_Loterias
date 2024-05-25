export default class UiControls {
    constructor() {
        console.log("Esto es de UiControls class")

        /**
         * Función para evitar repetir código al momento de seleccionar un elemento de DOM.
         * @param {HTMLElement} selector - Elemento a seleccionar por su atributo class, id o etiqueta HTML
         * @returns Elemento seleccionado
         */
        this.$ = (selector) => {
            // Selecciona todos los elementos que coinciden con el selector
            const elements = document.querySelectorAll(selector)

            // Si se selecciona un solo elemento, devolver ese elemento
            // Si se seleccionan múltiples elementos, devolver una NodeList
            return elements.length === 1 ? elements[0] : elements
        }

        this.btnShowAllLotteries = this.$(".btn-show-all-lotteries")
        this.modalBody = this.$(".modal-body")
        this.searchContainer = this.$(".search-container")
        //this.searchLottery = this.$(".search-lottery")
        this.modalLabel = this.$("#exampleModalToggleLabel")

        this.btnSuscribe = this.$(".btn-suscribe")
    }

    /**
     * Función para seleccionar un elemento de DOM recién agregado.
     * @param {HTMLElement} element - Elemento a seleccionar por su atributo class, id o etiqueta HTML
     * @returns Elemento seleccionado
     */
    selectNewlyAddedItem(element) {
        const elements = document.querySelectorAll(element)
        return elements.length === 1 ? elements[0] : elements
    }

    removeElement(element) {
        //console.log(element.length)
        if (element.length === 0) {
            return
        }
        element.remove()
    }

    hideElement(element) {
        //console.log(element.length)
        // if (element.length === 0) {
        //     return
        // }
        element.classList.add("hidden")
    }

    showElement(element) {
        //console.log(element.length)
        // if (element.length === 0) {
        //     return
        // }
        element.classList.remove("hidden")
    }
}