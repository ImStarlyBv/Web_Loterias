console.log("By: New UI")

// Abrir modal de todas las loterias de forma automatica durante el desarrollo
const btnShowAllLotteries = document.querySelector(".btn-show-all-lotteries")
//btnShowAllLotteries.click()

// Mostrar todas las loterias en modal

/* btn.onclick = async function() {
  modal.style.display = "block";
  document.getElementsByClassName("Resultados")[0].innerHTML="";
  await josue.feedModal() 

}
*/

const API_URL = "https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM"
const CURRENT_DATE = new Date();


btnShowAllLotteries.addEventListener("click", async () => {
    //document.getElementsByClassName("Resultados")[0].innerHTML = "";
    await feedModal()
})

async function feedModal(filter = "") {

    console.log("Funcion feedModal")
    let resultadoss = document.querySelector(".modal-body");
    resultadoss.innerHTML = "";
    console.log(filter);
    console.log("here");
    let hora = parseInt(new Date().getHours());
    let minutes = parseInt(new Date().getMinutes());

    console.log(hora);
    let tipo = hora < 19 ? "tarde" : "noche";
    let results = await fetchingTest();
    results = await resultsFiltering(results, tipo);

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
            document.querySelector(".modal-body").innerHTML += `
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
            document.querySelector(".modal-body").innerHTML += `
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

async function fetchingTest() {
    let p = await fetch(`${API_URL}`);
    let newJson = await p.json()
    newJson.forEach(element => {

    });
    return newJson;

}

function resultsFiltering(results, tipo) {

    // let alerta = document.getElementsByClassName("alerta")[0];
    // let hidden = Array.from(alerta.classList).includes("hidden");




    let filteredDescriptions = new Set();

    return results.filter(x => {
        let pear = false;
        let dateChanged = false;
        let created = new Date(x["created_at"]);
        // let hours = parseInt(created.getHours());
        let date = parseInt(created.getDate());
        let hours = parseInt(created.getHours());

        let minutes = parseInt(created.getMinutes());
        let cDate = parseInt(CURRENT_DATE.getDate());
        let cHours = parseInt(CURRENT_DATE.getHours());
        let cMinutes = parseInt(CURRENT_DATE.getMinutes());

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














// Resultados principales (loterias mas populares)

async function results(loterias = ["Loto Real", "Loteria Nacional", "King Lottery", "Leidsa", "Quiniela LoteDom", "La primera", "la suerte", "New York", "Florida", "Quiniela Pale", "Quiniela Loteka", "La Suerte", "Quiniela Pale"]) {
    //["Loto Real", "Lotería Nacional", "Loteria Nacional","King Lottery", "King Lottery", "Leidsa","Quiniela LoteDom","La primera"]
    let resultadoss = document.getElementsByClassName("Resultados")[0];
    resultadoss.innerHTML = "";

    // if(!loterias||loterias=="undefined") loterias = ['Loteria Nacional 8:50 PM',"Loto Real 12:55 PM",'Quiniela Pale Leidsa 8:55 PM / Dom 3:00 PM',"Quiniela Loteka 7:55 PM"];
    // else loterias = JSON.parse(loterias);
    let hora = parseInt(new Date().getHours());
    let date = parseInt(new Date().getDate());
    let minutes = parseInt(new Date().getMinutes());


    let tipo = hora < 18 ? "tarde" : "noche";

    let results = await fetchingTest();
    console.log(results);
    results = resultsFilter(results, tipo, loterias);
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
            removerLoadding()
            //console.log(id.childNodes[1].innerHTML);

        }



    })
    Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => tarde());
    Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => noche());


}

async function tarde() {
    let alerta = event.target.parentNode.parentNode.childNodes[1];
    let hidden = Array.from(alerta.classList).includes("hidden");
    let targetName = event.target.innerText;
    if (!hidden) alerta.classList.add("hidden");

    let id = document.getElementById(event.target.name)
    try {
        let results = await this.fetchingTest();

        results = this.resultsFilter(results, "tarde", [id.getAttribute('name').split(" ").slice(0, 2).join(" ")]);
        console.log(results);
        // console.log(id.getAttribute('name'));

        id.setAttribute('name', results[0].descripcion);
        id.setAttribute('id', results[0].id);





        id.innerHTML = ` 
 <div class="alerta hidden alert alert-danger" role="alert">
   <h1></h1>
 </div>
 <div class="horas d-flex flex-md-row flex-column justify-content-center flex-wrap">
   <button name="${results[0].id}" class="tarde btn btn-default display-6">Tarde</button>
   <button name="${results[0].id}" class="noche btn btn-default display-6">Noche</button>
 </div>
 <div class="resultsContainer">
   <h6 class="display-6">${results[0].descripcion}</h6>
   <div class="numHolder">
     <ul class="d-flex p-2 flex-md-row flex-column justify-content-around flex-wrap">
       <li class="p-4 ">${results[0].num1}</li>
       <li class="p-4 ">${results[0].num2}</li>
       <li class="p-4 ">${results[0].num3}</li>
     </ul>
   </div>
 </div>
 
  `;
        Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde());
        Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche());
        
        let hora = parseInt(new Date().getHours());
        let minutes = parseInt(new Date().getMinutes());
        let jhora = parseInt(new Date(results[0]["created_at"]).getHours());
        let jminutes = parseInt(new Date(results[0]["created_at"]).getHours());

        console.log(jminutes);
        console.log(jhora);
        let date = parseInt(created.getDate());
        let jdate = new Date(x["created_at"]).getDate();
        if (date !== jdate) {

            id.childNodes[1].classList.remove("hidden");
            id.childNodes[1].innerHTML = `Aun no salen los numeros de ${targetName}, esta viendo los resultados de ayer`

        }
    }
    catch (e) {
        alerta.classList.remove("hidden");
        alerta.innerHTML = (`Esta loteria no tiene numeros en la ${targetName}`)


    }

}

async function noche() {
    console.log();
    let alerta = event.target.parentNode.parentNode.childNodes[1];
    let hidden = Array.from(alerta.classList).includes("hidden");
    let targetName = event.target.innerText;
    if (!hidden) alerta.classList.add("hidden");

    let id = document.getElementById(event.target.name)
    try {
        let results = await this.fetchingTest();

        results = this.resultsFilter(results, "noche", [id.getAttribute('name').split(" ").slice(0, 2).join(" ")]);
        console.log(results);

        id.setAttribute('name', results[0].descripcion);
        id.setAttribute('id', results[0].id);
        // console.log(id.getAttribute('name'));
        id.innerHTML = ` 
    <div class="alerta hidden alert alert-danger" role="alert">
    <h1></h1>
  </div>
  <div class="horas d-flex flex-md-row flex-column justify-content-center ">
    <button name="${results[0].id}" class="tarde btn btn-default ">Tarde</button>
    <button name="${results[0].id}" class="noche btn btn-default ">Noche</button>
  </div>
  <div class="resultsContainer">
    <h6 class="display-6">${results[0].descripcion}</h6>
    <div class="numHolder">
      <ul class="d-flex p-2 flex-md-row  justify-content-around flex-wrap">
        <li class="p-4">${results[0].num1}</li>
        <li class="p-4">${results[0].num2}</li>
        <li class="p-4">${results[0].num3}</li>
      </ul>
    </div>
  </div> 
     `;
        Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde());
        Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche());
        let hora = parseInt(new Date().getHours());
        let minutes = parseInt(new Date().getMinutes());
        let jhora = parseInt(new Date(results[0]["created_at"]).getHours());
        let jminutes = parseInt(new Date(results[0]["created_at"]).getHours());
        console.log(jminutes);
        console.log(jhora);
        if (hora < jhora) {
            id.childNodes[1].classList.remove("hidden");
            id.childNodes[1].innerHTML = `Aun no salen los numeros de ${targetName}, esta viendo los resultados de ayer`

        }
    }
    catch (e) {
        alerta.classList.remove("hidden");
        alerta.innerHTML = (`Esta loteria no tiene numeros en la ${targetName}`)


    }


}

function resultsFilter(results, tipo, loterias) {

    // let alerta = document.getElementsByClassName("alerta")[0];
    // let hidden = Array.from(alerta.classList).includes("hidden");

    console.log(results);



    let filteredDescriptions = new Set(); // Usamos un Set para almacenar descripciones únicas

    return results.filter((x) => {
        let pear = false;
        let created = new Date(x["created_at"]);
        let hours = parseInt(created.getHours());
        let date = parseInt(created.getDate());
        let cDate = parseInt(CURRENT_DATE.getDate());
        let cHours = parseInt(CURRENT_DATE.getHours());

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

function removerLoadding() {
    //alert("Eliminar el loadding")
    document.querySelector(".loadding-container").remove()
}


// Mostrar resultados de las mas populares al inicio
document.body.onload = (async () => results());