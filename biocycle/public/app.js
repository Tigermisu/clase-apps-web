var ws = new WebSocket("ws://localhost:3000/ws");

ws.onopen = function (event) {
	console.info("Web socket is open!", event);
};

ws.onmessage = function (event) {
	console.info("Received ws message from the server.");
	var message = event.data;
	console.log(message);

	try {
		var json = JSON.parse(message),
			diffDays = json.diffDays,
			fisico = json.fisico,
			emocional = json.emocional,
			intelectual = json.intelectual;


		$("#vividos").text('Dias vividos a la fecha de calculo: ' + diffDays);
		$("#fisico").text('Dias del Ciclo fisico (23): ' + fisico);
		$("#emocional").text('Dias del Ciclo Emocional (28): ' + emocional);
		$("#intelectual").text('Dias del Ciclo Intelectual (33): ' + intelectual);
	
		//cambia el color del ciclo fisico
		if (3 <= fisico && fisico <= 9) {
			$("#fisico").css("color", "green");
		} else if ((0 <= fisico && fisico <= 3) || (9 <= fisico && fisico <= 14) || (20 <= fisico && fisico <= 23)) {
			$("#fisico").css("color", "#f1c40f");
		} else if (14 <= fisico && fisico <= 20) {
			$("#fisico").css("color", "red");
		}
	
		//cambia el color del ciclo emocional
		if (3 <= emocional && emocional <= 11) {
			$("#emocional").css("color", "green");
		} else if ((0 <= emocional && emocional <= 3) || (11 <= emocional && emocional <= 17) || (25 <= emocional && emocional <= 28)) {
			$("#emocional").css("color", "#f1c40f");
		} else if (17 <= emocional && emocional <= 25) {
			$("#emocional").css("color", "red");
		}
	
		//cambia el color del ciclo intelectual
		if (4 <= intelectual && intelectual <= 12) {
			$("#intelectual").css("color", "green");
		} else if ((0 <= intelectual && intelectual <= 4) || (12 <= intelectual && intelectual <= 21) || (29 <= intelectual && intelectual <= 33)) {
			$("#intelectual").css("color", "#f1c40f");
		} else if (21 <= intelectual && intelectual <= 29) {
			$("#intelectual").css("color", "red");
		}
	} catch(e) {
		console.warn("Failed to parse message from json", e);
	}	
}

ws.onclose = function () {
	console.warn("Web socket is closing:", ws);
}

$(document).ready(function () {
	var today = new Date(),
		month = today.getMonth() + 1;
	month = month < 10 ? "0" + month: month;
	today = today.getFullYear() + "-" + month + "-" + today.getDate();
	$('#today').val(today);

	$("#submit").click(function () {
		var dia1 = new Date(document.getElementById("today").value);
		var dia2 = new Date(document.getElementById("birthday").value);

		ws.send(JSON.stringify({nacimiento: dia2, actual: dia1}));

	});
});