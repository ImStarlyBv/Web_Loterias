export default class Loading {
    constructor() {
        console.log("Esto es de Loading class")
    }

    createLoading() {
        //const loadingHTML = `
        //<div class="loading-container flex-center">
            //<div class="loading cr-max"></div>
        //</div>
        //`
        //document.querySelector("body").innerHTML += loadingHTML

        const loadingContainer = document.createElement("div")
        loadingContainer.setAttribute("class", "loading-container flex-center")

        const loadingSpinner = document.createElement("div")
        loadingSpinner.setAttribute("class", "loading cr-max")

        loadingContainer.appendChild(loadingSpinner)
        document.querySelector("body").appendChild(loadingContainer)
    }

    removeLoading() {
        //alert("Eliminar el loading")
        // document.querySelector(".loading-container").remove()
        if (document.querySelector(".loading-container")) document.querySelector(".loading-container").remove();

    }

    // Función de emergencia
    forcedRemoveLoading() {
        alert("Esta función es solo porque el loading no desaparece, creo que hay problema con la API para cargar los datos.")
        this.removeLoading()
    }
}