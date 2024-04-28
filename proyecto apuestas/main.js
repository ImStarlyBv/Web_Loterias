import ApiCallss from "./test.js";

let maria = new ApiCallss("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM");
maria.fetchingTest();
document.body.onload = ( async ()=> maria.results() );
