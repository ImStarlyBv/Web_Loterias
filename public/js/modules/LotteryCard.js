export default class LotteryCard {
    constructor() {
        console.log("Esto es de LotteryCard class");
        this.randomNumber = 0;
    }
    
    // Componente carta para las loterías que solo contienen un número
    cardOneNumber(cardInfo, alertText="") {
        const card = `
        <div class="lottery cr-l flex-center " name="${cardInfo.descripcion}" id="${this.randomNumber}">
        <div class="alerta hidden">
            <h1></h1>
        </div>
        <h3 class="lottery-name"><strong>${cardInfo.descripcion}</strong></h3>
        <div class="schedule flex">
            <button class="btn tarde" name="${this.randomNumber}"><strong>Tarde</strong></button>
            <button class="btn noche" name="${this.randomNumber}"><strong>Noche</strong></button>
        </div>
        <div class="numbers flex-center">
            <div class="number flex-center cr-max">
                <p><strong>${cardInfo.num1}</strong></p>
            </div>
            </div>
        </div>
        `

        return card
    }

    // Componente carta para las loterías que contienen tres números
    cardThreeNumbers(cardInfo,alertText="") {
        let actualDate = new Date().getDate();
        let cardDate = new Date(cardInfo["created_at"]);
        cardDate = cardDate.getDate();
       
        
            if (actualDate!= cardDate) alertText = "Estas viendo los resultados de ayer"
            let hidden = alertText===""? "hidden":"";
        
        this.randomNumber = Math.floor(Math.random() * 1000) + 1;
        let alerta = this.alert(this.randomNumber,alertText,hidden);
       
        const card = `
    <div class="lottery cr-l flex-center ${this.randomNumber} fade-in" name="${cardInfo.descripcion}" id="${this.randomNumber}">
            ${alerta}
        
        <h3 class="lottery-name" id="h3${this.randomNumber}">
            <strong>${cardInfo.descripcion}</strong>
        </h3>
        <div class="schedule flex">
            <button class="btn tarde" id="${this.randomNumber}">
                <strong>Tarde</strong>
            </button>
            <button class="btn noche" id="${this.randomNumber}">
                <strong>Noche</strong>
            </button>
        </div>
        <div class="numbers flex-center">
            <div class="number flex-center cr-max">
                <p><strong>${cardInfo.num1}</strong></p>
            </div>
            <div class="number flex-center cr-max">
                <p><strong>${cardInfo.num2}</strong></p>
            </div>
            <div class="number flex-center cr-max">
                <p><strong>${cardInfo.num3}</strong></p>
            </div>
        </div>
    </div>
`;

        return card
    }
   alert(id,text,hidden) {

    return `   <div id="cont${id}" class="danger alert ${hidden}  fade-in">
    <div  class="content">
      <div class="icon">
        <svg height="50" viewBox="0 0 512 512" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M449.07,399.08,278.64,82.58c-12.08-22.44-44.26-22.44-56.35,0L51.87,399.08A32,32,0,0,0,80,446.25H420.89A32,32,0,0,0,449.07,399.08Zm-198.6-1.83a20,20,0,1,1,20-20A20,20,0,0,1,250.47,397.25ZM272.19,196.1l-5.74,122a16,16,0,0,1-32,0l-5.74-121.95v0a21.73,21.73,0,0,1,21.5-22.69h.21a21.74,21.74,0,0,1,21.73,22.7Z"/></svg>
    </div>
      <p id="alert${id}" >${text}</p>
    </div>
    <button class="close">
     <svg height="18px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="18px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="#69727D" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/></svg>
    </button>
  </div>` ;

   }
   
 

}