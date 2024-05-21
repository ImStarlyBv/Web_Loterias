import UiControls from "./UiControls.js"
import Loading from "./Loading.js"

export default class Fetch {
    constructor(API_URL) {
        console.log("Esto es de Fetch class")

        this.API_URL = API_URL


        this.uiControls = new UiControls()
        this.loading = new Loading()

        this.CURRENT_DATE = new Date()
    }

    async fetchingTest() {
        let p = await fetch(`${this.API_URL}`);
        let newJson = await p.json()
        return newJson;
    }

    async feedModalWithAlllotteries(filter = "") {
        //this.uiControls.modalBody.innerHTML = "";

        this.uiControls.searchContainer.innerHTML = `<div class="search-lottery">
        <form>
            <label for="inp-search">Buscar loterias</label>
            <input type="text" id="inp-search" class="cr-s" placeholder="Nombre de loterias">
        </form>
        </div>`

        console.log("Funcion feedModal")
        console.log(filter);
        console.log("here");
        let hora = parseInt(new Date().getHours());
        let minutes = parseInt(new Date().getMinutes());

        console.log(hora);
        let tipo = hora < 19 ? "tarde" : "noche";
        let results = await this.fetchingTest();
        results = await this.resultsFiltering(results, tipo);

        if (filter.length > 0) {
            let regex = new RegExp(filter.toLocaleLowerCase()); // Crea una nueva expresión regular con el contenido de 'filter'. La 'i' hace que la búsqueda sea insensible a mayúsculas y minúsculas.
            results = await results.filter(x => {
                if (regex.test(x["descripcion"].toLocaleLowerCase())) { // Si la descripción contiene la palabra buscada
                    return true;
                }
                else {
                    return false;
                }
            });
        }

        results.forEach(x => {
            if (x.descripcion.includes("Tu Fecha") || x.descripcion.includes("El Quemaito") || x.descripcion.includes("Repartidera Megachance")) {
                this.uiControls.modalBody.innerHTML += `
                <div class="lottery cr-l flex-center "name ="${x.descripcion}" id="${x.id}">
                <div class="alerta hidden">
                    <h1></h1>
                  </div>
                            <h3 class="lottery-name"><strong>${x.descripcion}</strong></h3>
                            <div class="schedule flex">
                                <button class="btn tarde" name="${results[0].id}"><strong>Tarde</strong></button>
                                <button class="btn noche" name="${results[0].id}"><strong>Noche</strong></button>
                            </div>
                            <div class="numbers flex-center">
                                <div class="number flex-center cr-max">
                                    <p><strong>${x.num1}</strong></p>
                                </div>
                            </div>
                        </div>`;
            }
            else {
                this.uiControls.modalBody.innerHTML += `
                <div class="lottery cr-l flex-center "name ="${x.descripcion}" id="${x.id}">
                <div class="alerta hidden">
                    <h1></h1>
                  </div>
                  
                            <h3 class="lottery-name"><strong>${x.descripcion}</strong></h3>
                            <div class="schedule flex">
                                <button class="btn tarde" name="${results[0].id}"><strong>Tarde</strong></button>
                                <button class="btn noche" name="${results[0].id}"><strong>Noche</strong></button>
                            </div>
                            <div class="numbers flex-center">
                                <div class="number flex-center cr-max">
                                    <p><strong>${x.num1}</strong></p>
                                </div>
                                <div class="number flex-center cr-max">
                                    <p><strong>${x.num2}</strong></p>
                                </div>
                                <div class="number flex-center cr-max">
                                    <p><strong>${x.num3}</strong></p>
                                </div>
                            </div>
                        </div>`;
            }

            let jhour = new Date(x["created_at"]).getHours();
            let jminutes = new Date(x["created_at"]).getMinutes();
            let id = document.getElementById(x.id);
            if (hora < jhour && minutes < jminutes) {
                console.log("here");
                console.log(id.childNodes[1].classList)
                id.childNodes[1].classList.remove("hidden");
                console.log(id.childNodes[1].classList)
                id.childNodes[1].innerHTML = `<div class="alert flex cr-s">
                <p>Estas viendo los resultados de ayer. <br> Aun no salen los numeros del día de hoy.</p>
                <img src="imgs/alert.svg" class="icon" alt="Icono de alerta">
                </div>`
                console.log(id.childNodes[1].innerHTML);
            }
        })

        Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => tarde());
        Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => noche());
    }

    // Resultados principales (loterias mas populares)
    async mainResults(loterias = ["Loto Real", "Loteria Nacional", "King Lottery", "Leidsa", "Quiniela LoteDom", "La primera", "la suerte", "New York", "Florida",
        "Quiniela Pale", "Quiniela Loteka", "La Suerte", "Quiniela Pale"]) {
        //["Loto Real", "Lotería Nacional", "Loteria Nacional","King Lottery", "King Lottery", "Leidsa","Quiniela LoteDom","La primera"]
        //let resultadoss = document.getElementsByClassName("Resultados")[0];
        this.uiControls.$(".Resultados").innerHTML = "";

        // if(!loterias||loterias=="undefined") loterias = ['Loteria Nacional 8:50 PM',"Loto Real 12:55 PM",'Quiniela Pale Leidsa 8:55 PM / Dom 3:00 PM',"Quiniela Loteka 7:55 PM"];
        // else loterias = JSON.parse(loterias);
        let hora = parseInt(new Date().getHours());
        let date = parseInt(new Date().getDate());
        let minutes = parseInt(new Date().getMinutes());

        let tipo = hora < 18 ? "tarde" : "noche";

        let results = await this.fetchingTest();
        console.log(results);
        results = this.resultsFilter(results, tipo, loterias);
        console.log(results);

        results.forEach(x => {
            document.getElementsByClassName("Resultados")[0].innerHTML += `
            <div class="lottery cr-l flex-center "name ="${x.descripcion}" id="${x.id}">
            <div class="alerta hidden">
                <h1></h1>
              </div>
              
                        <h3 class="lottery-name"><strong>${x.descripcion}</strong></h3>
                        <div class="schedule flex">
                            <button class="btn tarde" name="${results[0].id}"><strong>Tarde</strong></button>
                            <button class="btn noche" name="${results[0].id}"><strong>Noche</strong></button>
                        </div>
                        <div class="numbers flex-center">
                            <div class="number flex-center cr-max">
                                <p><strong>${x.num1}</strong></p>
                            </div>
                            <div class="number flex-center cr-max">
                                <p><strong>${x.num2}</strong></p>
                            </div>
                            <div class="number flex-center cr-max">
                                <p><strong>${x.num3}</strong></p>
                            </div>
                        </div>
                    </div>`;

            let jhour = new Date(x["created_at"]).getHours();
            let jminutes = new Date(x["created_at"]).getMinutes();
            let jdate = new Date(x["created_at"]).getDate();
            let id = document.getElementById(x.id);
            console.log("here you go" + minutes + "waos" + jminutes);

            if (date !== jdate) {
                console.log("here");
                console.log(id.childNodes[1].classList)
                id.childNodes[1].classList.remove("hidden");
                console.log(id.childNodes[1].classList)
                id.childNodes[1].innerHTML = `<div class="alert flex cr-s">
                <p>Estas viendo los resultados de ayer. <br> Aun no salen los numeros del día de hoy.</p>
                <img src="imgs/alert.svg" class="icon" alt="Icono de alerta">
            </div>`
                //console.log(id.childNodes[1].innerHTML);

                // removerloading()
                // alert("Todo listo - alerte puesta poruqe al parecer no cargan los datos de la api y nunca se elimina el loading")

            }
        })
        this.loading.removeLoading()
        Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => tarde());
        Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => noche());
    }

    resultsFilter(results, tipo, loterias) {
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
}