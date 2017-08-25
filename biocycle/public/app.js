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
	
		//cambia el color del ciclo fisico
	if (3<= fisico && fisico <=9){
		$("#fisico").css("color", "green");
	} else if ((0<= fisico && fisico <=3)||(9<= fisico && fisico <=14)||(20<= fisico && fisico <=23)){
		$("#fisico").css("color", "yellow");
	} else if (14<= fisico && fisico <=20){
		$("#fisico").css("color", "red");
	}
	
	//cambia el color del ciclo emocional
	if (3<= emocional && emocional <=11){
		$("#emocional").css("color", "green");
	} else if ((0<= emocional && emocional <=3)||(11<= emocional && emocional <=17)||(25<= emocional && emocional <=28)){
		$("#emocional").css("color", "yellow");
	} else if (17<= emocional && emocional <=25){
		$("#emocional").css("color", "red");
	}
	
	//cambia el color del ciclo intelectual
	if (4<= intelectual && intelectual <=12){
		$("#intelectual").css("color", "green");
	} else if ((0<= intelectual && intelectual <=4)||(12<= intelectual && intelectual <=21)||(29<= intelectual && intelectual <=33)){
		$("#intelectual").css("color", "yellow");
	} else if (21<= intelectual && intelectual <=29){
		$("#intelectual").css("color", "red");
	}
	
	
	
})
})


	
	
