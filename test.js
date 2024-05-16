
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

 async results(loterias = ["Loto Real", "Loteria Nacional",  "King Lottery", "Leidsa","Quiniela LoteDom","La primera","la suerte", "New York", "Florida","Quiniela Pale","Quiniela Loteka","La Suerte","Quiniela Pale"] ){
//["Loto Real", "Lotería Nacional", "Loteria Nacional","King Lottery", "King Lottery", "Leidsa","Quiniela LoteDom","La primera"]
   let resultadoss = document.getElementsByClassName("Resultados")[0];
   resultadoss.innerHTML ="";
    
   // if(!loterias||loterias=="undefined") loterias = ['Loteria Nacional 8:50 PM',"Loto Real 12:55 PM",'Quiniela Pale Leidsa 8:55 PM / Dom 3:00 PM',"Quiniela Loteka 7:55 PM"];
   // else loterias = JSON.parse(loterias);
   let hora = parseInt(new Date().getHours());
   let date = parseInt(new Date().getDate());
   let minutes = parseInt(new Date().getMinutes());
   
   
   let tipo = hora<18?  "tarde":"noche";
  
    let results = await this.fetchingTest();
   console.log(results);
    results = this.resultsFilter(results,tipo,loterias);
    console.log(results);
    


    results.forEach(x=>{ 

 
      document.getElementsByClassName("Resultados")[0].innerHTML += `
      <div class="container container-fluid" name="${x.descripcion}" id="${x.id}">
        <div class="alerta hidden alert alert-danger" role="alert">
          <h1></h1>
        </div>
        <div class="horas d-flex justify-content-center flex-wrap">
          <button name="${x.id}" class="tarde btn btn-default display-3 ">Tarde</button>
          <button name="${x.id}" class="noche btn btn-default display-3">Noche</button>
        </div>
        <div class="resultsContainer">
          <h6 class="" >${x.descripcion}</h6>
          <div class="numHolder">
            <ul class= "d-flex  flex-md-row  justify-content-around flex-wrap" >
              <li class="p-4 ">${x.num1}</li>
              <li class="p-4">${x.num2}</li>
              <li class="p-4">${x.num3}</li>
            </ul>
          </div>
        </div>
      </div>`;

    

      
      let jhour = new Date(x["created_at"]).getHours();
      let jminutes = new Date(x["created_at"]).getMinutes();
      let jdate = new Date(x["created_at"]).getDate();
      let id = document.getElementById(x.id);
      console.log("here you go"+ minutes + "waos" + jminutes);
    
      
      if(date!==jdate){
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
  
    
 }


resultsFilter(results,tipo, loterias ){

   // let alerta = document.getElementsByClassName("alerta")[0];
   // let hidden = Array.from(alerta.classList).includes("hidden");
   
console.log(results);
   


   let filteredDescriptions = new Set(); // Usamos un Set para almacenar descripciones únicas
 
   return results.filter((x) => {
     let pear = false;
     let created = new Date(x["created_at"]);
     let hours = parseInt(created.getHours());
     let date = parseInt(created.getDate());
     let cDate = parseInt(this.currentDate.getDate());
     let cHours = parseInt(this.currentDate.getHours());
 
     if (cHours < hours) {
       cDate--;
     }
 
     loterias.forEach((y) => {
       let descriptionn = x.descripcion.split(" ").slice(0, 2).join(" ");
       if (!filteredDescriptions.has(x.descripcion)) {
         // Verificamos si la descripción ya está en el Set
         if(tipo=="tarde"){
         if (y.includes(descriptionn) && hours < 18 && date == cDate) {
           console.log("filtered " + x.descripcion);
           filteredDescriptions.add(x.descripcion); // Agregamos la descripción al Set
           pear = true;
         }
      }
      if(tipo=="noche"){
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
resultsFiltering(results,tipo ){

   // let alerta = document.getElementsByClassName("alerta")[0];
   // let hidden = Array.from(alerta.classList).includes("hidden");
   

   

   let filteredDescriptions = new Set();

return results.filter(x=> {
   let pear = false;
   let dateChanged = false;
   let created = new Date(x["created_at"]);
         // let hours = parseInt(created.getHours());
         let date = parseInt(created.getDate());
         let hours = parseInt(created.getHours());
       
         let minutes = parseInt(created.getMinutes());
         let cDate = parseInt(this.currentDate.getDate());
         let cHours = parseInt(this.currentDate.getHours());
         let cMinutes =  parseInt(this.currentDate.getMinutes());
        
         if(cHours<hours) {
            
            
            cDate--;}

            if(!filteredDescriptions.has(x.descripcion)){

               if (date == cDate) {
                  console.log("filtered " + x.descripcion);
                  filteredDescriptions.add(x.descripcion); // Agregamos la descripción al Set
                  pear = true;
                }

            } 
      
            return pear;
    
   
   


 }  );







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
      if(date!==jdate){
         
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
      if(hora<jhora){
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

