// updateLotterys.js
import { log } from 'console';
import Fetch from './Fetch.js';
import fs from 'fs';

const fetchingInstance = new Fetch();

//escribe un json que sera de donde la interfaz de usuario haga el fetch para asi
//la pagina cargue mas rapido , debe actualizarse para que cargue cada 10 minutos
fs.writeFile('data.json',  JSON.stringify(await fetchingInstance.fetchingTest("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM"), null,2), (err) => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});
