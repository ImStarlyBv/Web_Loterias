// updateLotterys.js
import { log } from 'console';
import Fetch from './Fetch.js';
import fs from 'fs';

const fetchingInstance = new Fetch();


// Convert the object to a JSON string



// Write the JSON string to a file
fs.writeFile('data.json',  JSON.stringify(await fetchingInstance.fetchingTest(), null,2), (err) => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});
