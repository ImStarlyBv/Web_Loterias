
import ApiCallss from "./test.js";
import  {maria}  from "./main.js";
import { josue } from "./main.js";


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var searchBar = document.getElementById("search");

// When the user clicks on the button, open the modal
btn.onclick = async function() {
  modal.style.display = "block";
  document.getElementsByClassName("Resultados")[0].innerHTML="";
  await josue.feedModal() 

}
span.onclick = async function() {
    modal.style.display = "none";
    document.getElementById("modalResults").innerHTML="";
    document.getElementsByClassName("Resultados")[0].innerHTML="";
    await maria.results();
  }
// When the user clicks on <span> (x), close the modal


// When the user clicks anywhere outside of the modal, close it
window.onclick = async function(event) {
  clearTimeout(this.delay);
  if (event.target == modal) {
    modal.style.display = "none";
   
    document.getElementById("modalResults").innerHTML="";
    document.getElementsByClassName("Resultados")[0].innerHTML="";
    await maria.results();
  }
}
function debounce(func, delay) {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
}
searchBar.oninput = debounce(function(event) {
  let search = event.target.value;
  console.log(search); // This will log the input value after a delay
  josue.feedModal(search); // Assuming josue.feedModal is your API call function
}, 500); // Delay in milliseconds
// searchBar.oninput =  function(){
//   let search = event.target.value;
//   this.delay = setTimeout(async function(){
//     console.log(this.value);
//     josue.feedModal(search); 
//  }.bind(this), 500);
 

  
// }


export default class ModalApiCalls extends ApiCallss {

    constructor(url){

        super(url);

        

    }
    
    async feedModal(filter=""){
      let resultadoss= document.getElementById("modalResults");
      resultadoss.innerHTML = "";
      console.log(filter);
        console.log("here");
        let hora = parseInt(new Date().getHours());
        let minutes = parseInt(new Date().getMinutes());
        
        console.log(hora);
        let tipo = hora<19?  "tarde":"noche";
        let results = await this.fetchingTest();
        results = await this.resultsFiltering(results,tipo);
       
        if(filter.length>0){
          let regex = new RegExp(filter.toLocaleLowerCase()); // Crea una nueva expresión regular con el contenido de 'filter'. La 'i' hace que la búsqueda sea insensible a mayúsculas y minúsculas.
          results = await results.filter(x => {
              if(regex.test(x["descripcion"].toLocaleLowerCase())){ // Si la descripción contiene la palabra buscada
                  return true;
              }
              else {
                  return false;
              }
          });
      }

        results.forEach(x=>{ 

             if (x.descripcion.includes("Tu Fecha")||x.descripcion.includes("El Quemaito")||x.descripcion.includes("Repartidera Megachance")) {
              document.getElementById("modalResults").innerHTML+= `
              <div class="container container-fluid" name ="${x.descripcion}" id="${x.id}">
                <div class="alerta hidden">
                  <h1></h1>
                </div>
                <div class="horas d-flex flex-md-row flex-column justify-content-around">
                  <!-- Add your buttons here -->
                </div>
                <div class="resultsContainer">
                  <h6 class="display-6">${x.descripcion}</h6>
                  <div class="numHolder">
                    <ul class="d-flex p-2 flex-md-row flex-column justify-content-around flex-wrap numChild">
                      <li class="p-2">${x.num1}</li>
                      <!-- Add more list items here -->
                    </ul>
                  </div>
                </div>
              </div>`;
              

            }
            else {
              document.getElementById("modalResults").innerHTML+= `
              <div class="container container-fluid" name ="${x.descripcion}" id="${x.id}">
                <div class="alerta hidden">
                  <h1></h1>
                </div>
                <div class="horas d-flex flex-md-row flex-column justify-content-around">
                  <!-- Add your buttons here -->
                </div>
                <div class="resultsContainer">
                  <h6 class="display-6">${x.descripcion}</h6>
                  <div class="numHolder">
                    <ul class="d-flex p-2 flex-md-row flex-column justify-content-around flex-wrap numChild">
                      <li class="p-2">${x.num1}</li>
                      <li class="p-2">${x.num2}</li>
                      <li class="p-2">${x.num3}</li>
                    </ul>
                  </div>
                </div>
              </div>`;
              
          }
            let jhour = new Date(x["created_at"]).getHours();
            let jminutes = new Date(x["created_at"]).getMinutes();
            let id = document.getElementById(x.id);
            if( hora<jhour&&minutes<jminutes){
              console.log("here");
              console.log( id.childNodes[1].classList)
              id.childNodes[1].classList.remove("hidden");
              console.log( id.childNodes[1].classList)
              id.childNodes[1].innerHTML=  `Aun no salen los numeros de loteria, esta viendo los resultados de ayer` 
              console.log(id.childNodes[1].innerHTML);
     
           }
         
         
         
         } )
         Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde());
    Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche());
    Array.from(document.getElementsByClassName("check")).forEach(x => x.onclick = () => this.StartScreen());
  

    }
    
    // StartScreen(){
    //     if(event.target.checked){
    //         console.log(event.target.checked);
    //     var input = document.getElementById(event.target.name).getAttribute('name');
    //     let loterias = localStorage.getItem("loterias");
    //     if(!loterias||loterias=="undefined") loterias = [];
    //     else  loterias = JSON.parse(loterias);
    //     if (loterias.length ==4) loterias.shift();
    //     loterias.push(input);
    //     window.localStorage.setItem("loterias",JSON.stringify(loterias)); 
    //     console.log(localStorage.getItem("loterias"));
        
    // }
    // else {

    //     console.log(event.target.checked);
    //         var input = document.getElementById(event.target.name).getAttribute('name');
    //         let loterias = localStorage.getItem("loterias");
    //         if(loterias){
    //          loterias = JSON.parse(loterias);
    //          let index = loterias.indexOf(input);
    //         loterias.splice(index,1);
    //         window.localStorage.setItem("loterias",JSON.stringify(loterias)); }  
    //         console.log(localStorage.getItem("loterias"));



    
    // }

    
    
    
    
    
    
    // }
}