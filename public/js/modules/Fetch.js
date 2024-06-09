import Loading from "./Loading.js"
import LotteryCard from "./LotteryCard.js"
import LoteriesNotification from "./LoteriesNotification.js"

export default class Fetch {
    constructor(uiControls) {
        console.log("Esto es de Fetch class")

        this.API_URL = "https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM";
        this.File = '/js/modules/data.json';

        console.log("File = " + this.File)

        this.uiControls = uiControls
        this.loading = new Loading()
        this.lotteryCard = new LotteryCard()
        this.loteriesNotification = new LoteriesNotification()
        this.CURRENT_DATE = new Date() 
    }

     getResults() {

        let  resultados =this.fetchingTest();
        return resultados;

    }

    async fetchingTest(FileUrl=this.File) {
        // ahora puedes pasarle como parametro de donde quieres sacar los datos
        // tiene por defecto data.json , este json es escrito con node js 
        // llamando la api de sorteosrd
        console.log(FileUrl);
        let p = await fetch(`${FileUrl}`);
        let newJson = await p.json()
        return await newJson;
       
    }

    async feedModalWithAlllotteries(filter) {
        console.log("Funcion feedModal")
        console.log(filter);
        console.log("here");
        let hora = parseInt(new Date().getHours());
        let minutes = parseInt(new Date().getMinutes());

        console.log(hora);
        let tipo = hora < 19 ? "tarde" : "noche";
        let results = await this.fetchingTest(this.File);
        results = await this.resultsFiltering(results, tipo);

        if (filter) {
            this.uiControls.modalBody.innerHTML = ""

            if (filter.length > 0) {
                let regex = new RegExp(filter.toLocaleLowerCase()); // Crea una nueva expresión regular con el contenido de 'filter'. La 'i' hace que la búsqueda sea insensible a mayúsculas y minúsculas.
                results = await results.filter(x => {

                    // Si la descripción contiene la palabra buscada
                    if (regex.test(x["descripcion"].toLocaleLowerCase())) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }

            // Sin resultados // results es un array de objetos
            //alert(results)
            //alert(JSON.stringify(results))
            //alert(results.length)
            if (results.length === 0) {
                this.uiControls.modalBody.innerHTML = `
                    <h2 style="color: var(--red);">
                        No se encontraron resultados sobre "${filter}"
                    </h2>
                `
            }
        }

        results.forEach(x => {
            if (x.descripcion.includes("Tu Fecha") ||
                x.descripcion.includes("El Quemaito")
                || x.descripcion.includes("Repartidera Megachance")) {

                this.uiControls.modalBody.innerHTML += this.lotteryCard.cardOneNumber(x)
            }
            else {
                this.uiControls.modalBody.innerHTML += this.lotteryCard.cardThreeNumbers(x)
            }

            let jhour = new Date(x["created_at"]).getHours();
            let jminutes = new Date(x["created_at"]).getMinutes();
            let id = document.getElementById(x.id);
            if (hora < jhour && minutes < jminutes) {
                console.log("here");
                /*console.log(id.childNodes[1].classList)
                id.childNodes[1].classList.remove("hidden");
                console.log(id.childNodes[1].classList)
                id.childNodes[1].innerHTML = `<div class="alert flex cr-s">
                <p>Estas viendo los resultados de ayer. <br> Aun no salen los numeros del día de hoy.</p>
                <img src="imgs/alert.svg" class="icon" alt="Icono de alerta">
                </div>`
                console.log(id.childNodes[1].innerHTML);*/
            }
        })

        Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.uiControls.tarde("modal-body"));
        Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.uiControls.noche("modal-body"));
    }

    // Resultados principales (loterias mas populares)
    async mainResults(loterias = ["Loto Real", "Loteria Nacional", "King Lottery", "Leidsa",
        "Quiniela LoteDom", "La primera", "la suerte", "New York", "Florida", "Quiniela Pale",
        "Quiniela Loteka", "La Suerte", "Quiniela Pale"]) {
        //["Loto Real", "Lotería Nacional", "Loteria Nacional","King Lottery", "King Lottery", "Leidsa","Quiniela LoteDom","La primera"]
        this.uiControls.$(".Resultados").innerHTML = "";

        // if(!loterias||loterias=="undefined") loterias = ['Loteria Nacional 8:50 PM',"Loto Real 12:55 PM",'Quiniela Pale Leidsa 8:55 PM / Dom 3:00 PM',"Quiniela Loteka 7:55 PM"];
        // else loterias = JSON.parse(loterias);
        let hora = parseInt(new Date().getHours());
        let date = parseInt(new Date().getDate());
        

        let tipo = hora < 18 ? "tarde" : "noche";

        let results = await this.fetchingTest();
        results = await this.resultsFilter(results, tipo, loterias);
        console.log(results);
        let tracker = [] ;
        this.uiControls.modalBody.innerHTML = "";
        results.forEach(x => {
          
            if(!tracker.includes(x.descripcion)){
                console.log(tracker);
            document.getElementsByClassName("Resultados")[0].innerHTML += this.lotteryCard.cardThreeNumbers(x);
            tracker.push(x.descripcion);
            let jdate = new Date(x["created_at"]).getDate();
           
           
`1`
    
        }
            
          
        })

        // Quitar loading del principio cuando cargan los resultados principales
        this.loading.removeLoading();
        Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = (event) =>  this.uiControls.tarde("Resultados"));
Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = (event) => this.uiControls.noche("Resultados"));
    }

    async resultsFilter(results, tipo, loterias) {
        // let alerta = document.getElementsByClassName("alerta")[0];
        // let hidden = Array.from(alerta.classList).includes("hidden");

        console.log(results);

        let filteredDescriptions = new Set(); // Usamos un Set para almacenar descripciones únicas

        return results.filter((x) => {
            let pear = false;
            let created = new Date(x["created_at"]);
            let hours = parseInt(created.getHours());
            let date = parseInt(created.getDate());
            let cDate = parseInt(this.CURRENT_DATE.getDate());
            let cHours = parseInt(this.CURRENT_DATE.getHours());

            if (cHours < hours) {
                cDate--;
            }

            loterias.forEach((y) => {
                let descriptionn = x.descripcion.split(" ").slice(0, 2).join(" ");

                if (!filteredDescriptions.has(x.descripcion)) {
                    // Verificamos si la descripción ya está en el Set
                    if (tipo == "tarde") {
                        if (y.includes(descriptionn) && hours < 18 && date == cDate) {
                            console.log("filtered " + x.descripcion);
                            filteredDescriptions.add(x.descripcion); // Agregamos la descripción al Set
                            pear = true;
                        }
                    }
                    if (tipo == "noche") {
                        if (y.includes(descriptionn) && hours > 17 && date == cDate) {
                            console.log("filtered " + x.descripcion);
                            filteredDescriptions.add(x.descripcion); // Agregamos la descripción al Set
                            pear = true;
                        }
                    }
                }
            });

            return pear;
        });
    }

    resultsFiltering(results, tipo) {
        let filteredDescriptions = new Set();

        return results.filter(x => {
            let pear = false;
            let dateChanged = false;
            let created = new Date(x["created_at"]);
            // let hours = parseInt(created.getHours());
            let date = parseInt(created.getDate());
            let hours = parseInt(created.getHours());

            let minutes = parseInt(created.getMinutes());
            let cDate = parseInt(this.CURRENT_DATE.getDate());
            let cHours = parseInt(this.CURRENT_DATE.getHours());
            let cMinutes = parseInt(this.CURRENT_DATE.getMinutes());

            if (cHours < hours) {
                cDate--;
            }

            if (!filteredDescriptions.has(x.descripcion)) {
                if (date == cDate) {
                    console.log("filtered " + x.descripcion);
                    filteredDescriptions.add(x.descripcion); // Agregamos la descripción al Set
                    pear = true;
                }
            }
            return pear;
        });
    }

    /**
     * Introducir en el array "allLoteries" de la clase "LoteriesNotification" todas las loterias
     * sin repeticiones.
     * 
     * La función está en desarrollo, por eso todos los comentarios a continuación
     */

    async getAllLotteriesForNotification() {
        const allLoteries = await fetch(`${this.API_URL}`);
        let newJson = await allLoteries.json()
        //return newJson

        console.log("\n\n\n\n\nTrabajando para notificaciones\n\n\n\n\n")

        // Inicio de array para notificaciones
        //console.log(`Inicio de array = ${typeof(this.loteriesNotification.allLoteries)}`)
        console.log(`Inicio de array = ${this.loteriesNotification.allLoteries}`)
        console.log(`Total de articulos = ${this.loteriesNotification.allLoteries.length}\n\n\n`)

        /* Se recorre la variable "newJson" con el metodo "map", dando como resultado de cada
        * iteración un objeto llamado "lottery"
        */
        
        newJson.map((lottery, i) => {
            /* Desde aki sin objeto
            //console.log(lottery.descripcion)
            //if (lottery.descripcion.includes("Anguila")) {
                //console.log(lottery)
                console.log(lottery.descripcion)
                //console.log(`id = ${lottery.id}`)
                console.log(`\t\tcreated_at = ${lottery.created_at}`)
                console.log(`\t\tupdated_at = ${lottery.updated_at}\n\n\n`)

                // Agregando elementos al array para notificaciones
                //this.loteriesNotification.allLoteries.push(lottery.id)
                if (!this.loteriesNotification.allLoteries.includes(lottery.descripcion)) {
                    this.loteriesNotification.allLoteries.push(lottery.descripcion)
                }
            //}
            //console.log(`i = ${i}`)
            Hasta aki sin objeto */

            // Se pasa como objeto para el array de notificaciones para poder tener acceso al id y usarlo en el checkbox

            //console.log(lottery.descripcion)
            //if (lottery.descripcion.includes("Anguila")) {
            //console.log(lottery)
            console.log(lottery.descripcion)
            //console.log(`id = ${lottery.id}`)
            console.log(`\t\tcreated_at = ${lottery.created_at}`)
            console.log(`\t\tupdated_at = ${lottery.updated_at}\n\n\n`)

            // Agregando elementos al array para notificaciones

            //this.loteriesNotification.allLoteries.push(lottery.id)
            if (!this.loteriesNotification.allLoteries.includes(lottery.descripcion)) {
                this.loteriesNotification.allLoteries.push(
                    {
                        descripcion: lottery.descripcion,
                        id: lottery.id,
                    }
                )
            }
            //}
            //console.log(`i = ${i}`)
        })

        // Fin de array para notificaciones
        console.log(`Inicio de array = ${this.loteriesNotification.allLoteries}`)

        // Todas las loterias sin repetir
        console.log(`Total de articulos = ${this.loteriesNotification.allLoteries.length}`)
    }
}