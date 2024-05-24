export default class Loading {
    constructor() {
        console.log("Esto es de Loading class")
    }

    removeLoading() {
        //alert("Eliminar el loading")
        document.querySelector(".loading-container").remove()
    }
    
    forcedRemoveLoading() {
        alert("La linea de arriba no debe estar, es solo que el loading no desaparece poruqe creo que hay problema con la api para cargar los datos.")
        this.removeLoading()
    }
}