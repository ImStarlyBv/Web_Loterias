export default class Loading {
    constructor() {
        console.log("Esto es de Loading class")
    }
    
    removeLoading() {
        //alert("Eliminar el loading")
        // document.querySelector(".loading-container").remove()
        if(document.querySelector(".loading-container")) document.querySelector(".loading-container").remove();
    } 
    
    // Función de emergencia
    forcedRemoveLoading() {
        alert("Esta función es solo porque el loading no desaparece, creo que hay problema con la API para cargar los datos.")
        this.removeLoading()
    }
}