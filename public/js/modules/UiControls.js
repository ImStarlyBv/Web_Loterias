import Fetch from "./Fetch.js"
import LotteryCard from "./LotteryCard.js"
export default class UiControls {
    constructor() {
        console.log("Esto es de UiControls class")
        this.carlos = new Fetch();
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
     tarde(childContainer){

        let parser = new DOMParser();
        console.log(event.currentTarget.id); 
        let id = event.currentTarget.id;


        // // Guarda una referencia del evento
       
      
       
      
        let ramdomId = this.randomNumber = Math.floor(Math.random() * 1000) + 1;
        let $resultados = this.$(`.${childContainer}`); 
        let childNodesArray =  $resultados.children;
        let indice;
        console.log(childNodesArray);
        console.log(childNodesArray[1].id);
      
        // // Utiliza la referencia guardada
        console.log(id);
        let chosenChild = Array.from(childNodesArray).filter((x,b,c) => {

            if(x.id === id){
                indice= b;
                return x;

            }


        });
      
        // console.log(chosenChild);
        let nameToFilter = chosenChild[0].children[1].innerText;
        console.log(nameToFilter);
        this.carlos.getResults()
        .then(results => {
            console.log(results);
            return this.carlos.resultsFilter(results, "tarde", [nameToFilter]);
        })
        .then(filteredResults => {
            console.log(filteredResults);
            return this.LotteryCard.cardThreeNumbers(filteredResults[0]);

        })
        .then(newChild => {
            // Use chosenChild as needed
            newChild = parser.parseFromString(newChild, 'text/html');
            console.log(newChild.body);
            $resultados.replaceChild(newChild.body.firstChild, childNodesArray[indice]);
            Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => this.tarde(childContainer));
            Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => this.noche(childContainer));
        })
        .catch(error => {
            console.error(`Error personalizado:\n${error}`);
            alert("esta loteria no tiene numeros en la tarde")
        });
        
       
     
     }
    //will redo this
    noche(childContainer) {

        let parser = new DOMParser();
        console.log(event.currentTarget.id); 
        let id = event.currentTarget.id;


        // // Guarda una referencia del evento
       
      
       
      
        let ramdomId = this.randomNumber = Math.floor(Math.random() * 1000) + 1;
        let $resultados = this.$(`.${childContainer}`); 
        console.log();
        let childNodesArray =  $resultados.children;
        let indice;
        // // Utiliza la referencia guardada
        console.log(id);
        let chosenChild = Array.from(childNodesArray).filter((x,b,c) => {
            console.log(x.id +"nigga" + id );
            
            if(x.id === id){
                
                indice= b;
                return x;

            }


        });
      
        console.log(chosenChild);
        let nameToFilter = chosenChild[0].children[1].innerText;
        console.log(nameToFilter);
        this.carlos.getResults()
        .then(results => {
            console.log(results);
            return this.carlos.resultsFilter(results, "noche", [nameToFilter]);
        })
        .then(filteredResults => {
            console.log(filteredResults);
            return this.LotteryCard.cardThreeNumbers(filteredResults[0]);

        })
        .then(newChild => {
            // Use chosenChild as needed
            newChild = parser.parseFromString(newChild, 'text/html');
            $resultados.replaceChild(newChild.body.firstChild, childNodesArray[indice]);
            Array.from(document.getElementsByClassName("tarde")).forEach(x => x.onclick = () => setTimeout(this.tarde(childContainer)));
            Array.from(document.getElementsByClassName("noche")).forEach(x => x.onclick = () => setTimeout(this.noche(childContainer)));
        })
        .catch(error => {
            console.error(`Error personalizado:\n${error}`);
            alert("esta loteria no tiene numeros en la noche")
        });
    
       
      }
      
    
}