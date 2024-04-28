
export default class ApiCallss {

#url; 
currentDate = new Date();
constructor(url){

this.#url = url


} 

get url() {

    return this.#url;

}

set url (url) {

this.#url = url;


}


async fetchingTest() {
   let p = await fetch(`${this.#url}`);
   let newJson = await p.json()
   newJson.forEach(element => {
    
   });
   return newJson;

}

 async results(date="", loterias = ['Loteria Nacional 8:50 PM',"Loto Real 12:55 PM",'Quiniela Pale Leidsa 8:55 PM / Dom 3:00 PM',"Quiniela Loteka 7:55 PM"] ){
    
   let hora = parseInt(new Date().getHours());
   let minutes = parseInt(new Date().getMinutes());
   
   console.log(hora);
   let tipo = hora<20&&minutes<55?  "tarde":"noche";
   console.log(tipo);
    let results = await this.fetchingTest();
   console.log(results);
    results = this.resultsFilter(results,tipo,loterias);
    console.log(results);
    


    results.forEach(x=>{ 

 
      
      document.getElementsByClassName("Resultados")[0].innerHTML+= `<div class="container" name ="${x.descripcion}" id="${x.id}">  <div class="alerta hidden"><h1></h1></div>  <div class="horas"><button name="${x.id}" class="tarde">Tarde</button><button name="${x.id}" class="noche">Noche</button></div> <div class="resultsContainer"><h1>${x.descripcion}</h1> <div class="numHolder"><ul><li>${x.num1}</li><li>${x.num2}</li><li>${x.num3}</li></ul></div> </div>  </div>`
      
      let id = document.getElementById(x.id);
      if(hora<15&&minutes<55){
         id.childNodes[1].classList.remove("hidden");
         id.childNodes[1].innerHTML= `Aun no salen los numeros de loteria, esta viendo los resultados de ayer` 

      }
      else if(hora<20&&minutes<55){
         id.childNodes[1].classList.remove("hidden");
         id.childNodes[1].innerHTML= `Aun no salen los numeros de esta loteria, esta viendo los resultados de ayer` 

      }
   
   
   } )
    Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde());
    Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche());
  
    
 }


resultsFilter(results,tipo, loterias ){

   // let alerta = document.getElementsByClassName("alerta")[0];
   // let hidden = Array.from(alerta.classList).includes("hidden");
   
console.log(results);
   

   if (tipo ==="tarde") {

return results.filter(x=> {
   let pear;
   let dateChanged = false;
   let created = new Date(x["created_at"])
         let hours = parseInt(created.getHours());
         let date = parseInt(created.getDate());
         let cDate = parseInt(this.currentDate.getDate());
         let cHours = parseInt(this.currentDate.getHours());
         let cMinutes =  parseInt(this.currentDate.getMinutes());
        
         if(cHours<15&&cMinutes<55) {
            
            
            cDate--;}
   loterias.forEach(y=>{
      
      let hours = new Date(x["created_at"])
      hours = parseInt(hours.getHours());
      if(y.includes(x.descripcion.split(" ").slice(0,2).join(" ")) && hours<16 && date==cDate )  pear = true;
     

   })
   return pear;
   


 }  );
}

else if(tipo==="noche") {
   return results.filter(x=> {
      let pear;
      let dateChanged = false;
      loterias.forEach(y=>{
         
         let created = new Date(x["created_at"])
         let hours = parseInt(created.getHours());
         let date = parseInt(created.getDate());
         let cDate = parseInt(this.currentDate.getDate());
         let cHours = parseInt(this.currentDate.getHours());
         let cMinutes =  parseInt(this.currentDate.getMinutes());
         if(cHours<=19&& cMinutes<55) {
            dateChanged=true;
            cDate--;
         }
         
         if(y.includes(x.descripcion.split(" ").slice(0,2).join(" ")) && hours>16 && date==cDate )  pear = true;
         // if (dateChanged&&pear) {

         //    alerta.classList.remove("hidden");
         //    alerta.innerHTML= (`Aun no salen los numeros la ${x.descripcion}, esta viendo los de ayer ` )
                     
         // }

   
      })
      return pear;
      
   
   
    }  );


}




}

async tarde(){
   let alerta = event.target.parentNode.parentNode.childNodes[1];
   let hidden = Array.from(alerta.classList).includes("hidden");
   let targetName = event.target.innerText;
if (!hidden) alerta.classList.add("hidden");
   
let id =  document.getElementById(event.target.name)
try {
let results = await this.fetchingTest();

 results = this.resultsFilter(results,"tarde",[id.getAttribute('name').split(" ").slice(0,2).join(" ")]);
 console.log(results);
// console.log(id.getAttribute('name'));

id.setAttribute('name',results[0].descripcion);
id.setAttribute('id',results[0].id);





id.innerHTML = ` <div class="alerta hidden"><h1></h1></div> <div class="horas"><button name="${results[0].id}" class="tarde">Tarde</button><button name="${results[0].id}" class="noche">Noche</button></div> <div class="resultsContainer"><h1>${results[0].descripcion}</h1> <div class="numHolder"><ul><li>${results[0].num1}</li><li>${results[0].num2}</li><li>${results[0].num3}</li></ul></div> </div>  `;
Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde());
 Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche());
 let hora = parseInt(new Date().getHours());
   let minutes = parseInt(new Date().getMinutes());
   
   
      if(hora<15&&minutes<55){
         id.childNodes[1].classList.remove("hidden");
         id.childNodes[1].innerHTML= `Aun no salen los numeros de ${targetName}, esta viendo los resultados de ayer` 

      }
}
catch (e){
   alerta.classList.remove("hidden");
   alerta.innerHTML= (`Esta loteria no tiene numeros en la ${targetName}` )
   
   
   }

}

async noche(){
   console.log();
   let alerta = event.target.parentNode.parentNode.childNodes[1];
   let hidden = Array.from(alerta.classList).includes("hidden");
   let targetName = event.target.innerText;
if (!hidden) alerta.classList.add("hidden");
   
   let id =  document.getElementById(event.target.name)
   try{
   let results = await this.fetchingTest();
     
    results = this.resultsFilter(results,"noche",[id.getAttribute('name').split(" ").slice(0,2).join(" ")]);
    console.log(results);
   
    id.setAttribute('name',results[0].descripcion);
id.setAttribute('id',results[0].id);
   // console.log(id.getAttribute('name'));
   id.innerHTML = `  <div class="alerta hidden"><h1></h1></div> <div class="horas"><button name="${results[0].id}" class="tarde">Tarde</button><button name="${results[0].id}" class="noche">Noche</button></div> <div class="resultsContainer"><h1>${results[0].descripcion}</h1> <div class="numHolder"><ul><li>${results[0].num1}</li><li>${results[0].num2}</li><li>${results[0].num3}</li></ul></div> </div> `;
Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde());
 Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche());
 let hora = parseInt(new Date().getHours());
   let minutes = parseInt(new Date().getMinutes());
   
   
      if(hora<20&&minutes<55){
         id.childNodes[1].classList.remove("hidden");
         id.childNodes[1].innerHTML= `Aun no salen los numeros de ${targetName}, esta viendo los resultados de ayer` 

      }
    }
    catch (e){
      alerta.classList.remove("hidden");
      alerta.innerHTML= (`Esta loteria no tiene numeros en la ${targetName}` )
      
      
      }
      

   }


}
//{results[0]