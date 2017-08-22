var ws = new WebSocket("ws://localhost:3000/ws");

ws.onopen = function (event) {
    console.info("Web socket is open!", event);
    ws.send("Hello, server! How's it going?"); 
};

ws.onmessage = function (event) {
    console.info("Received ws message from the server.");
    var message = event.data;
    console.log(message);
}

ws.onclose = function () {
    console.warn("Web socket is closing:", ws);
}