export default class LotteryCard {
    constructor() {
        console.log("Esto es de LotteryCard class")
    }

    // Componente carta para las loterías que solo contienen un número
    cardOneNumber(cardInfo) {
        const card = `
        <div class="lottery cr-l flex-center " name="${cardInfo.descripcion}" id="${cardInfo.id}">
        <div class="alerta hidden">
            <h1></h1>
        </div>
        <h3 class="lottery-name"><strong>${cardInfo.descripcion}</strong></h3>
        <div class="schedule flex">
            <button class="btn tarde" name="${cardInfo.id}"><strong>Tarde</strong></button>
            <button class="btn noche" name="${cardInfo.id}"><strong>Noche</strong></button>
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
        const card = `
        <div class="lottery cr-l flex-center " name="${cardInfo.descripcion}" id="${cardInfo.id}">
        <div class="alerta hidden">
            <h1></h1>
        </div>
    
        <h3 class="lottery-name"><strong>${cardInfo.descripcion}</strong></h3>
        <div class="schedule flex">
            <button class="btn tarde" name="${cardInfo.id}"><strong>Tarde</strong></button>
            <button class="btn noche" name="${cardInfo.id}"><strong>Noche</strong></button>
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
    InnerCardUpdate(cardInfo) {

        const card =  `<div class="alerta hidden" role="alert">
        <h1></h1>
    </div>
    <h3 class="lottery-name"><strong>${cardInfo.descripcion}</strong></h3>
    <div class="schedule flex">
        <button name="${cardInfo.id}" class="btn tarde"><strong>Tarde</strong></button>
        <button name="${cardInfo.id}" class="btn noche"><strong>Noche</strong></button>
    </div>
    <div class="resultsContainer">
       
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

        return card;
    }
}