import Fetch from "./Fetch.js"
import LotteryCard from "./LotteryCard.js"
export default class UiControls {
    constructor() {
        console.log("Esto es de UiControls class")

        /**
         * Función para evitar repetir código al momento de seleccionar un elemento de DOM.
         * @param {HTMLElement} selector - Elemento a seleccionar por su atributo class, id o etiqueta HTML
         * @returns Elemento seleccionado
         */
        this.$ = (selector) => {
            // Selecciona todos los elementos que coinciden con el selector
            const elements = document.querySelectorAll(selector)

            // Si se selecciona un solo elemento, devolver ese elemento
            // Si se seleccionan múltiples elementos, devolver una NodeList
            return elements.length === 1 ? elements[0] : elements
        }

        this.btnShowAllLotteries = this.$(".btn-show-all-lotteries")
        this.modalBody = this.$(".modal-body")
        this.searchContainer = this.$(".search-container")
        //this.searchLottery = this.$(".search-lottery")
        this.modalLabel = this.$("#exampleModalToggleLabel")

        this.btnSuscribe = this.$(".btn-suscribe")
        this.LotteryCard = new LotteryCard();
    }

    /**
     * Función para seleccionar un elemento de DOM recién agregado.
     * @param {HTMLElement} element - Elemento a seleccionar por su atributo class, id o etiqueta HTML
     * @returns Elemento seleccionado
     */
    selectNewlyAddedItem(element) {
        const elements = document.querySelectorAll(element)
        return elements.length === 1 ? elements[0] : elements
    }

    removeElement(element) {
        //console.log(element.length)
        if (element.length === 0) {
            return
        }
        element.remove()
    }

    hideElement(element) {
        //console.log(element.length)
        // if (element.length === 0) {
        //     return
        // }
        element.classList.add("hidden")
    }

    showElement(element) {
        //console.log(element.length)
        // if (element.length === 0) {
        //     return
        // }
        element.classList.remove("hidden")
    }
    async tarde(){
        const carlos = new Fetch();
        let ramdomId = this.randomNumber = Math.floor(Math.random() * 1000) + 1;
        // let alerta = event.target.parentNode.parentNode.childNodes[0]; 
    
        // let hidden = Array.from(alerta.classList).includes("hidden");
        // let targetName = event.target.innerText;
    //  if (!hidden) alerta.classList.add("hidden");
    let targeted = event.target.name;   
    console.log(targeted); 
    let $id = $(`#${targeted}`);
    console.log($id);
    //  try {
     let results = await carlos.fetchingTest();
      let created = new Date(results[0]["created_at"]);
           let name = $(`#h3${targeted}`).text();
           console.log(name);
           let nameToFilter = name.split(" ").slice(0, 2).join(" ");
           console.log(nameToFilter);
            results = await carlos.resultsFilter(results, "tarde", [nameToFilter]);
      console.log(results[0]);
     // console.log(id.getAttribute('name'));
     
     $id.attr('name', results[0]["descripcion"]);
     $id.attr('id', ramdomId);
     $id.html(this.LotteryCard.InnerCardUpdate(results[0], ramdomId));
    
     Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde());
      Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche());
      let hora = parseInt(new Date().getHours());
        let minutes = parseInt(new Date().getMinutes());
        let jhora = parseInt(new Date(results[0]["created_at"]).getHours());
        let jminutes = parseInt(new Date(results[0]["created_at"]).getHours());
        
        console.log(jminutes);
        console.log(jhora);
        let date = parseInt(created.getDate());
        let jdate = new Date(results[0]["created_at"]).getDate();
        //    if(date!==jdate){
              
        //       id.childNodes[1].classList.remove("hidden");
        //       id.childNodes[1].innerHTML= `Aun no salen los numeros de ${targetName}, esta viendo los resultados de ayer` 
     
        //    }
    //  }
    //  catch (e){
    //     // alerta.classList.remove("hidden");
    //     // alerta.innerHTML= (`Esta loteria no tiene numeros en la ${targetName}` )
        
        
    //     }
     
     }
    //will redo this
     async noche(){
       
        const carlos = new Fetch();
        console.log('noche function called');
        
        // Reference the parent node
        let alerta = event.target.parentNode.parentNode.childNodes[0];
        let randomId = this.randomNumber = Math.floor(Math.random() * 1000) + 1;
        let  targeted = event.target.name;
        console.log(targeted);
        let $id = $(`#${targeted}`);
    
        if (!$id) {
            console.error('Element with id not found');
            return;
        }
    
        try {
            // Fetch the results
            await new Promise(resolve => setTimeout(resolve, 100));
            console.log('Fetching results...');
            let results = await carlos.fetchingTest();
            await new Promise(resolve => setTimeout(resolve, 100));
            // Filter the results
            console.log('Filtering results...');
            let name = $(`#h3${targeted}`).text();
            
            let nameToFilter = name.split(" ").slice(0, 2).join(" ");
            results = await carlos.resultsFilter(results, "noche", [nameToFilter]);
            
            console.log('Results:', results);
            await new Promise(resolve => setTimeout(resolve, 100));
    
            // Update attributes and innerHTML
            $id.attr('name', results[0]["descripcion"]);
            $id.attr('id', randomId);
            $id.html(this.LotteryCard.InnerCardUpdate(results[0], randomId));
    
            // Add event listeners
            console.log('Adding event listeners...');
            Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde());
            Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche());
            
            // Check time and update UI
            let hora = parseInt(new Date().getHours());
            let jhora = parseInt(new Date(results[0]["created_at"]).getHours());
    
            // if(hora < jhora){
            //     id.childNodes[1].classList.remove("hidden");
            //     id.childNodes[1].innerHTML = `Aun no salen los numeros de ${targetName}, esta viendo los resultados de ayer`; 
            // }
        } catch (e) {
            console.error('Error:', e);
            // alerta.classList.remove("hidden");
            // alerta.innerHTML = `Esta loteria no tiene numeros en la ${targetName}`;
        }
    }
    
}