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

	

$(document).ready(function(){
	$("#submit").click(function(){

	var oneDay = 24*60*60*1000; 
	var dia1 = new Date(document.getElementById("today").value);
	var dia2 = new Date(document.getElementById("birthday").value);
	var diffDays = Math.round(Math.abs((dia1.getTime() - dia2.getTime())/(oneDay)));
	var fisico = diffDays%23;
	var emocional = diffDays%28;
	var intelectual = diffDays%33;
	console.log(dia1);
	console.log(dia2);
	console.log(diffDays);
	console.log(fisico);
	console.log(intelectual);
	console.log(emocional);

		//$("#actual").html($("#today").val());
		//$("#cumpleanos").html($("#birthday").val());
		$("#vividos").text('Dias vividos a la fecha de calculo: ' +diffDays);
		$("#fisico").text('Dias del Ciclo fisico (23): ' +fisico);
		$("#emocional").text('Dias del Ciclo Emocional (28): ' +emocional);
		$("#intelectual").text('Dias del Ciclo Intelectual (33): ' +intelectual);
		
})
})


	
	
