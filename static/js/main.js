import Fetch from "./modules/Fetch.js"
//import Loading from "./modules/Loading.js"
import UiControls from "./modules/UiControls.js"
import Suscribe from "./modules/Suscribe.js"

const fetch = new Fetch("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM")
//const loading = new Loading()
const uiControls = new UiControls()
const suscribe = new Suscribe()



// Eliminar el loading forzado
//loading.forcedRemoveLoading()
//loading.removeLoading()
//fetch.loading.removeLoading()


// Cargar datos de las loterias mas populares
fetch.mainResults()

// Agregar acciones a la UI
uiControls.btnShowAllLotteries.addEventListener("click", (e) => {
    e.preventDefault()
    uiControls.modalLabel.textContent = "Todas las loterías"
    uiControls.modalBody.innerHTML = ""
    fetch.feedModalWithAlllotteries()
})

uiControls.btnSuscribe.addEventListener("click", (e) => {
    e.preventDefault()    
    uiControls.modalLabel.textContent = "Suscribete"
    suscribe.start(uiControls.modalBody)
    
    uiControls.removeElement(uiControls.$(".search-lottery"))
})