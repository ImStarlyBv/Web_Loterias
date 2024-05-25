
import Fetch from "./Fetch.js";


export default class SwitchHours   {
    constructor() {

        
       

    }

async tarde(){
    const carlos = new Fetch("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM");

    let alerta = event.target.parentNode.parentNode.childNodes[1];
    let hidden = Array.from(alerta.classList).includes("hidden");
    let targetName = event.target.innerText;
 if (!hidden) alerta.classList.add("hidden");
    
 let id =  document.getElementById(event.target.name)
//  try {
 let results = await carlos.fetchingTest();
 
  results = carlos.resultsFilter(results,"tarde",[id.getAttribute('name').split(" ").slice(0,2).join(" ")]);
  console.log(results);
 // console.log(id.getAttribute('name'));
 
 id.setAttribute('name',results[0].descripcion);
 id.setAttribute('id',results[0].id);
 
 
 
 
 
 id.innerHTML = ` 
 <div class="alerta hidden" role="alert">
     <h1></h1>
 </div>
 <h3 class="lottery-name"><strong>${results[0].descripcion}</strong></h3>
 <div class="schedule flex">
     <button name="${results[0].id}" class="btn tarde"><strong>Tarde</strong></button>
     <button name="${results[0].id}" class="btn noche"><strong>Noche</strong></button>
 </div>
 <div class="resultsContainer">
    
     <div class="numbers flex-center">
         <div class="number flex-center cr-max">
             <p><strong>${results[0].num1}</strong></p>
         </div>
         <div class="number flex-center cr-max">
             <p><strong>${results[0].num2}</strong></p>
         </div>
         <div class="number flex-center cr-max">
             <p><strong>${results[0].num3}</strong></p>
         </div>
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
//  }
//  catch (e){
//     alerta.classList.remove("hidden");
//     alerta.innerHTML= (`Esta loteria no tiene numeros en la ${targetName}` )
    
    
//     }
 
 }

 async noche(){
  const carlos = new Fetch("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM");
    console.log();
    let alerta = event.target.parentNode.parentNode.childNodes[1];
    let hidden = Array.from(alerta.classList).includes("hidden");
    let targetName = event.target.innerText;
 if (!hidden) alerta.classList.add("hidden");
    
    let id =  document.getElementById(event.target.name)
    try{
    let results = await carlos.fetchingTest();
      
     results = carlos.resultsFilter(results,"noche",[id.getAttribute('name').split(" ").slice(0,2).join(" ")]);
     console.log(results);
    
     id.setAttribute('name',results[0].descripcion);
 id.setAttribute('id',results[0].id);
    // console.log(id.getAttribute('name'));
    id.innerHTML = ` 
    <div class="alerta hidden" role="alert">
        <h1></h1>
    </div>
    <h3 class="lottery-name"><strong>${results[0].descripcion}</strong></h3>
    <div class="schedule flex">
        <button name="${results[0].id}" class="btn tarde"><strong>Tarde</strong></button>
        <button name="${results[0].id}" class="btn noche"><strong>Noche</strong></button>
    </div>
    <div class="resultsContainer">
        
        <div class="numbers flex-center">
            <div class="number flex-center cr-max">
                <p><strong>${results[0].num1}</strong></p>
            </div>
            <div class="number flex-center cr-max">
                <p><strong>${results[0].num2}</strong></p>
            </div>
            <div class="number flex-center cr-max">
                <p><strong>${results[0].num3}</strong></p>
            </div>
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
