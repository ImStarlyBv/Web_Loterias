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
        this.mainLotterys = ["Loto Real", "Loteria Nacional", "King Lottery", "Leidsa",
            "Quiniela LoteDom", "La primera", "la suerte", "New York", "Florida", "Quiniela Pale",
            "Quiniela Loteka", "La Suerte", "Quiniela Pale"];

            this.firstLoading = true
    }

    getResults() {

        let resultados = this.fetchingTest();
        return resultados;

    }

    async fetchingTest(FileUrl = this.File) {
        // ahora puedes pasarle como parametro de donde quieres sacar los datos
        // tiene por defecto data.json , este json es escrito con node js 
        // llamando la api de sorteosrd
        console.log(FileUrl);
        let p = await fetch(`${FileUrl}`);
        let newJson = await p.json()
        return await newJson;

    }

    async feedModalWithAlllotteries(filter) {
        // Limpiar el contenido actual del modal
      
    
        let hora = new Date().getHours();
        let tipo = "modal";
        let results = await this.fetchingTest(this.File);
        results = await this.resultsFiltering(results, tipo);
    
        if (filter) {
            if (filter.length > 0) {
                let regex = new RegExp(filter.toLocaleLowerCase()); // Crea una nueva expresión regular con el contenido de 'filter'. La 'i' hace que la búsqueda sea insensible a mayúsculas y minúsculas.
                results = await results.filter(x => {

                    // Si la descripción contiene la palabra buscada

                    return regex.test(x["descripcion"].toLocaleLowerCase()) ? true : false;

                });
            }

          
            if (results.length === 0) {
                this.uiControls.modalBody.innerHTML = `
                    <h2 style="color: var(--red);">
                        No se encontraron resultados sobre "${filter}"
                    </h2>
                `;
                return;
            }
        }
    
        let newDiv = document.createElement("div");
    
        let filteredDescriptions = [];
        results.forEach(x => {
            if (x.descripcion.includes("Tu Fecha") ||
                x.descripcion.includes("El Quemaito")
                || x.descripcion.includes("Repartidera Megachance")) {

                this.uiControls.modalBody.innerHTML += this.lotteryCard.cardOneNumber(x)
            }
            else {
                this.uiControls.modalBody.innerHTML += this.lotteryCard.cardThreeNumbers(x)
            }



        })

        Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.uiControls.tarde("modal-body"));
        Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.uiControls.noche("modal-body"));
      }
    


    // Resultados principales (loterias mas populares)
    async mainResults(loterias = this.mainLotterys) {
        // Limpiar el contenido actual de Resultados
        let hora = new Date().getHours();
        let newDiv = document.createElement("div");
        let tipo = hora < 18 ? "tarde" : "noche";
        let results = await this.fetchingTest();
        results = await this.resultsFilter(results, tipo, loterias);
        results.forEach(x => {

            // Set its innerHTML to the result of cardThreeNumbers
            newDiv.innerHTML += this.lotteryCard.cardThreeNumbers(x);
            // Append the new div to the temporary div

        })
        document.getElementsByClassName("Resultados")[0].innerHTML = newDiv.innerHTML;

        // Quitar loading del principio cuando cargan los resultados principales
        if (this.firstLoading) {
            this.loading.removeLoading();
            this.firstLoading = false
        }
        // Asignar eventos a los elementos con clase "tarde" y "noche"
        Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = (event) => this.uiControls.tarde("Resultados"));
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
                    let isTarde = (tipo == "tarde" && hours < 18);
                    let isNoche = (tipo == "noche" && hours > 17);
                    

                    if ((isTarde || isNoche ) && y.includes(descriptionn) && date == cDate) {
                        console.log("filtered " + x.descripcion);
                        filteredDescriptions.add(x.descripcion); // Agregamos la descripción al Set
                        pear = true;
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
            let created = new Date(x["created_at"]);

            let date = parseInt(created.getDate());
            let hours = parseInt(created.getHours());
            let cDate = parseInt(this.CURRENT_DATE.getDate());
            let cHours = parseInt(this.CURRENT_DATE.getHours());

            if (cHours < hours) {
                cDate--;
            }

            if (!filteredDescriptions.has(x.descripcion)) {
                if (date == cDate) {
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
            
            //}
            //console.log(`i = ${i}`)
        }})

        // Fin de array para notificaciones
        console.log(`Inicio de array = ${this.loteriesNotification.allLoteries}`)

        // Todas las loterias sin repetir
        console.log(`Total de articulos = ${this.loteriesNotification.allLoteries.length}`)
    }
}