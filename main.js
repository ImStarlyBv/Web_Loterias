import ApiCallss from "./test.js";
import ModalApiCalls from "./modal.js";
export let josue = new ModalApiCalls("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM");
export  let maria = new ApiCallss("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM");

maria.fetchingTest();
document.body.onload = ( async ()=> maria.results() );

console.log("aqui");