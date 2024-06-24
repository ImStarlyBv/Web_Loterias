export default class LotteryCard {
    constructor() {
        console.log("Esto es de LotteryCard class");
        this.randomNumber = 0;
    }
    
    // Componente carta para las loterías que solo contienen un número
    cardOneNumber(cardInfo) {
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
    cardThreeNumbers(cardInfo) {
        this.randomNumber = Math.floor(Math.random() * 1000) + 1;
       
        const card = `
        <div class="lottery cr-l flex-center ${this.randomNumber}" name="${cardInfo.descripcion}" id="${this.randomNumber}">
        <div class="alerta hidden">
            <h1></h1>
        </div>
    
        <h3 class="lottery-name" id="h3${this.randomNumber}"><strong>${cardInfo.descripcion}</strong></h3>
        <div class="schedule flex">
            <button class="btn tarde" id="${this.randomNumber}"><strong>Tarde</strong></button>
            <button class="btn noche" id="${this.randomNumber}"><strong>Noche</strong></button>
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
        `
        return card
    }
    //this about to be  deprecated 
   oldCardAlert(fecha){

    const alert = `<div class="alert flex cr-s">
    <p>Estas viendo los resultados de ayer. <br> Aun no salen los numeros de ${fecha}.</p>
    <img src="imgs/alert.svg" class="icon" alt="Icono de alerta">
</div>`;
return alert

   }
 

}