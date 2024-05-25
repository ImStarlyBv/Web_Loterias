import Fetch from "./modules/Fetch.js"
import UiControls from "./modules/UiControls.js"

const uiControls = new UiControls()

const fetch = new Fetch("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM")

const form = uiControls.$(".select-lotteries form")

// Obtener todas las loterias existentes para seleccionar las deseadas a notificar
await fetch.getAllLotteriesForNotification()

// Crear las mini card para seleccionar las loterias deseadas a notificar
function createCheckbox() {
    fetch.loteriesNotification.allLoteries.forEach(lottery => {
        //console.log(lottery)
        const newMiniCard = document.createElement("div")
        newMiniCard.classList = "mini-card flex-center cr-xs"

        const newLabel = document.createElement("label")
        newLabel.innerHTML = lottery.descripcion


        const newCheckbox = document.createElement("input")
        newCheckbox.type = "checkbox"
        newCheckbox.id = `lottery-${lottery.id}`

        newLabel.appendChild(newCheckbox)
        newMiniCard.append(newCheckbox, newLabel)
        form.appendChild(newMiniCard)
    })
    //console.log(fetch.loteriesNotification.allLoteries[0])
}

// setTimeout(() => {
//     createCheckbox()
// }, 3000);

createCheckbox() 
