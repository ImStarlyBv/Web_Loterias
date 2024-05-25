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
        const carlos = new Fetch("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM");
    
        let alerta = event.target.parentNode.parentNode.childNodes[0]; 
        console.log(alerta);
        console.log(alerta.classList);
        // let hidden = Array.from(alerta.classList).includes("hidden");
        let targetName = event.target.innerText;
    //  if (!hidden) alerta.classList.add("hidden");
        
     let id =  document.getElementById(event.target.name)
     try {
     let results = await carlos.fetchingTest();
      let created = new Date(results[0]["created_at"]);
      results = carlos.resultsFilter(results,"tarde",[id.getAttribute('name').split(" ").slice(0,2).join(" ")]);
      console.log(results[0]);
     // console.log(id.getAttribute('name'));
     
     id.setAttribute('name',results[0].descripcion);
     id.setAttribute('id',results[0].id);
     
     
     
     
     
     id.innerHTML = this.LotteryCard.InnerCardUpdate(results[0]);
    
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
           if(date!==jdate){
              
              id.childNodes[1].classList.remove("hidden");
              id.childNodes[1].innerHTML= `Aun no salen los numeros de ${targetName}, esta viendo los resultados de ayer` 
     
           }
     }
     catch (e){
        // alerta.classList.remove("hidden");
        // alerta.innerHTML= (`Esta loteria no tiene numeros en la ${targetName}` )
        
        
        }
     
     }
    
     async noche(){
      const carlos = new Fetch("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM");
        console.log();
        let alerta = event.target.parentNode.parentNode.childNodes[0];
        // let hidden = Array.from(alerta.classList).includes("hidden");
        let targetName = event.target.innerText;
    //  if (!hidden) alerta.classList.add("hidden");
        
        let id =  document.getElementById(event.target.name)
        try{
        let results = await carlos.fetchingTest();
          
         results = carlos.resultsFilter(results,"noche",[id.getAttribute('name').split(" ").slice(0,2).join(" ")]);
         console.log(results);
        
         id.setAttribute('name',results[0].descripcion);
     id.setAttribute('id',results[0].id);
        // console.log(id.getAttribute('name'));
        id.innerHTML = this.LotteryCard.InnerCardUpdate(results[0]);
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
        //    alerta.classList.remove("hidden");
        //    alerta.innerHTML= (`Esta loteria no tiene numeros en la ${targetName}` )
           
           
           }
           
     
        }
}