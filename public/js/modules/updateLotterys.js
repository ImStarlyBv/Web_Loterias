import { log } from 'console';
import Fetch from './Fetch.js';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log("Welcome newbie!");

    ws.on('message', function incoming(message) {
        console.log('received message', message);
        ws.send('Echo: ' + message);
    });
});

const fetchingInstance = new Fetch();

async function updateJson() {
    try {
        const data = await fetchingInstance.fetchingTest("https://sorteosrd.com/api/sorteosrd-results/b3cEnQTK2uU6aLu4PHhDwZUKiTcbQgyM");
        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.log('Error writing file', err);
            } else {
                console.log('Successfully wrote file');
                // Broadcast message to all connected clients
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send('Json updated!');
                        console.log("well done nigga");
                    }
                    console.log("is out");
                });
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Update JSON every 10 minutes (600000 milliseconds)
setInterval(updateJson, 20000);
