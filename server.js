const {v4:  uuidv4} = require('uuid');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const history = [];

const clients = new Map();

wss.on('connection', function connection(ws) {

    // Giving client id
    const clientId = uuidv4();  
    ws.clientId = clientId;

    //Adding clients 
    clients.set(clientId, ws);  

    //Output
    console.log(`Client ${clientId} connected`);
    msg_for_new_client = history.join("<br>");
    ws.send(msg_for_new_client);

    //Sending msg to a single client

    // ws.on('message', function incoming(message) {
    //     console.log("MESSAGE FROM CLIENT: " + message);
    // });
    ws.on('message', function incoming(message) {

        message = clientId.toString()+ ': ' + message;

        history.push(message);

        // //send to a single client
        // ws.send(history.toString());
        msg = history.join("<br>");
        // Broadcast msg to all clients
        clients.forEach((client) => {
            client.send(msg);
        });
    
        console.log("CURRENT CHAT: " + history);
    });

    ws.on('close', function() {
        //removing client
        clients.delete(clientId);

        console.log("CONNECTION CLOSED")
    });
});