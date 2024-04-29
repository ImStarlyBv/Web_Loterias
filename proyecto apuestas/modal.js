
import ApiCallss from "./test.js";
import  {maria}  from "./main.js";

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  document.getElementsByClassName("Resultados")[0].innerHTML="";
}
span.onclick = async function() {
    modal.style.display = "none";
    document.getElementsByClassName("Resultados")[0].innerHTML="";
    await maria.results();
  }
// When the user clicks on <span> (x), close the modal


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

export default class ModalApiCalls extends ApiCallss {

    constructor(url){

        super(url);

        

    }
    
    async feedModal(){
        console.log("here");
        let hora = parseInt(new Date().getHours());
        let minutes = parseInt(new Date().getMinutes());
        
        console.log(hora);
        let tipo = hora<20&&minutes<55?  "tarde":"noche";
        let results = await this.fetchingTest();
        results = await this.resultsFiltering(results,tipo);

        results.forEach(x=>{ 

 
      
            document.getElementById("modalResults").innerHTML+= `<div class="container" name ="${x.descripcion}" id="${x.id}">  <div class="alerta hidden"><h1></h1></div>  <div class="horas"><button name="${x.id}" class="tarde">Tarde</button><button name="${x.id}" class="noche">Noche</button> <input class="check" type="checkbox" name="${x.id}"></div> <div class="resultsContainer"><h1>${x.descripcion}</h1> <div class="numHolder"><ul><li>${x.num1}</li><li>${x.num2}</li><li>${x.num3}</li></ul></div> </div>  </div>`
            
            let id = document.getElementById(x.id);
            if(tipo=="tarde" && hora<15&&minutes<55){
               id.childNodes[1].classList.remove("hidden");
               id.childNodes[1].innerHTML= `Aun no salen los numeros de loteria, esta viendo los resultados de ayer` 
      
            }
            else if(tipo=="noche" && hora<20&&minutes<55){
               id.childNodes[1].classList.remove("hidden");
               id.childNodes[1].innerHTML= `Aun no salen los numeros de esta loteria, esta viendo los resultados de ayer` 
      
            }
         
         
         } )
         Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde());
    Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche());
    Array.from(document.getElementsByClassName("check")).forEach(x => x.onclick = () => this.StartScreen());
  

    }
    
    StartScreen(){
        if(event.target.checked){
            console.log(event.target.checked);
        var input = document.getElementById(event.target.name).getAttribute('name');
        let loterias = localStorage.getItem("loterias");
        if(!loterias||loterias=="undefined") loterias = [];
        else  loterias = JSON.parse(loterias);
        if (loterias.length ==4) loterias.shift();
        loterias.push(input);
        window.localStorage.setItem("loterias",JSON.stringify(loterias)); 
        console.log(localStorage.getItem("loterias"));
        
    }
    else {

        console.log(event.target.checked);
            var input = document.getElementById(event.target.name).getAttribute('name');
            let loterias = localStorage.getItem("loterias");
            if(loterias){
             loterias = JSON.parse(loterias);
             let index = loterias.indexOf(input);
            loterias.splice(index,1);
            window.localStorage.setItem("loterias",JSON.stringify(loterias)); }  
            console.log(localStorage.getItem("loterias"));



    
    }

    
    
    
    
    
    
    }
}