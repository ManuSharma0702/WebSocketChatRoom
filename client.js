const socket = new WebSocket("ws:localhost:8080")



socket.onopen = (message) => {
    console.log("CONNECTION ESTABLISHED");
    const chatbox = document.getElementById('chat');
    console.log(chatbox);
    if (chatbox){
        chatbox.innerHTML = message.data + "\n";
    }
    console.log("CHAT: " + message.data);
}

socket.onmessage = (message) => {
    const chatbox = document.getElementById('chat');
    console.log(chatbox);
    if (chatbox){
        chatbox.innerHTML = message.data + "\n";
    }
    console.log("CHAT: " + message.data);
}

socket.onerror = (error) => {
    console.error("ERROR OCCURRED" + error);
}

socket.onclose = () => {
    console.log("CONNECTION CLOSED");
}

const btn = document.getElementById('send')

console.log(btn)

if (btn){
    btn.addEventListener("click", sendmessage);
}


function sendmessage(){
    const message = document.getElementById("message").value.trim();
    console.log(message)    
    if (message){
        socket.send(message);
    }
    document.getElementById("message").value = ""
}