import Fetch from "./modules/Fetch.js"
//import Loading from "./modules/Loading.js"
import UiControls from "./modules/UiControls.js"
import Suscribe from "./modules/Suscribe.js"
import SearchLottery from "./modules/SearchLottery.js"

const uiControls = new UiControls()
const fetch = new Fetch( uiControls)
//const loading = new Loading()
const suscribe = new Suscribe()
const searchLottery = new SearchLottery(fetch)



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


    console.log(uiControls.selectNewlyAddedItem("#inp-search"))
    // uiControls.selectNewlyAddedItem("#inp-search").
    //     addEventListener("input", searchLottery.debounce((function (e) {
    //         let search = e.target.value;
    //         console.log(search); // This will log the input value after a delay
    //         //josue.feedModal(search); // Assuming josue.feedModal is your API call function
    //         fetch.feedModalWithAlllotteries(search)
    //     }, 500)));
    //     console.log(12)


    uiControls.showElement(uiControls.$(".search-lottery"))

    uiControls.selectNewlyAddedItem("#inp-search").
        addEventListener("input", (e) => {
            // console.log(e)

            // let searching = e.target.value
            // console.log(searching)

            // fetch.feedModalWithAlllotteries(searching)

            searchLottery.search(e.target.value)
        })
})

uiControls.btnSuscribe.addEventListener("click", (e) => {
    e.preventDefault()
    uiControls.modalLabel.textContent = "Suscribete"
    suscribe.start(uiControls.modalBody)

    //uiControls.removeElement(uiControls.$(".search-lottery"))
    uiControls.hideElement(uiControls.$(".search-lottery"))
})



// Obtener todas las loterias para seleccionar las deseadas a notificar
//fetch.getAllLotteriesForNotification()