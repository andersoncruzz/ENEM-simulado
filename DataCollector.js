var debug = true;
var timer;
var currentScreen = "";
var idClass = "";
//var ip = "localhost"; 
//var idAluno = "8";
console.log("DATA COLLECTOR FIRST");
var ip = localStorage.getItem('ip');
var idAluno = localStorage.getItem('idAluno');
var answerlist = localStorage.getItem('answerlist');

answerlist = answerlist.split(",");

console.log("answerlist: " + answerlist);
/*var answerlist = ["0","0","0","0","0","0"];
var multioption = {
    status: false,
    id: "Q1-hard",
    len: "1",
    question: ["Q1-hard","Q2-hard","Q3-hard"]
} */

onload =  function(e){

	var html = document.querySelectorAll("html");
    currentScreen = e.target.baseURI.split("/").slice(-1)[0];
	for (var i=0;  i < html.length; i++) {
		html[i].addEventListener("click", listenClick);
	}

    timer = setInterval(overflowTimer, 2000);
}

function overflowTimer(){
   // idTela = getCookie("screen");
    var timestamp = new Date().getTime();

    if (currentScreen == "questionario.html" && idClass == "item" || currentScreen == "questionario.html#" && idClass == "item") {
        idClass = "Q:1:E:1-1";
    }

    if (currentScreen == "questionario.html" && idClass == "" || currentScreen == "questionario.html#" && idClass == "") {
        idClass = localStorage.getItem("idClass");
    }


    if (idClass == "D:1:H:1-1 close" || idClass == "C:1:H:1-1 close") idClass = "Q:1:H:1-1";
    else if (idClass == "D:2:H:1-1 close" || idClass == "C:2:H:1-1 close") idClass = "Q:2:H:1-1";
    else if (idClass == "D:3:H:1-1 close" || idClass == "C:3:H:1-1 close") idClass = "Q:3:H:1-1";
    else if (idClass == "D:4:H:1-1 close" || idClass == "C:4:H:1-1 close") idClass = "Q:4:H:1-1";
    else if (idClass == "D:5:H:1-1 close" || idClass == "C:5:H:1-1 close") idClass = "Q:5:H:1-1";
    else if (idClass == "D:6:H:1-1 close" || idClass == "C:6:H:1-1 close") idClass = "Q:6:H:1-1";
    else if (idClass == "D:7:H:1-1 close" || idClass == "C:7:H:1-1 close") idClass = "Q:7:H:1-1";
    else if (idClass == "D:8:H:1-2 close" || idClass == "C:8:H:1-2 close") idClass = "Q:8:H:1-2";
    else if (idClass == "D:9:H:1-2 close" || idClass == "C:9:H:1-2 close") idClass = "Q:9:H:1-2";
    else if (idClass == "D:10:H:1-2 close" || idClass == "C:10:H:1-2 close") idClass = "Q:10:H:1-2";
    else if (idClass == "D:1:E:1-1 close" || idClass == "C:1:E:1-1 close") idClass = "Q:1:E:1-1";
    else if (idClass == "D:2:E:1-1 close" || idClass == "C:2:E:1-1 close") idClass = "Q:2:E:1-1";
    else if (idClass == "D:3:E:1-1 close" || idClass == "C:3:E:1-1 close") idClass = "Q:3:E:1-1";
    else if (idClass == "D:4:E:1-1 close" || idClass == "C:4:E:1-1 close") idClass = "Q:4:E:1-1";
    else if (idClass == "D:5:E:1-1 close" || idClass == "C:5:E:1-1 close") idClass = "Q:5:E:1-1";
    else if (idClass == "D:6:E:1-1 close" || idClass == "C:6:E:1-1 close") idClass = "Q:6:E:1-1";
    else if (idClass == "D:7:E:1-1 close" || idClass == "C:7:E:1-1 close") idClass = "Q:7:E:1-1";
    else if (idClass == "D:8:E:1-2 close" || idClass == "C:8:E:1-2 close") idClass = "Q:8:E:1-2";
    else if (idClass == "D:9:E:1-2 close" || idClass == "C:9:E:1-2 close") idClass = "Q:9:E:1-2";
    else if (idClass == "D:10:E:1-2 close" || idClass == "C:10:E:1-2 close") idClass = "Q:10:E:1-2";

//localStorage.setItem ("classIdSection", "1-4,1-4,1-3,1-2,1-1,1-3,1-1,1-3,1-1,1-1");
    localStorage.setItem("idClass",idClass);

    if(debug) {
       /* console.log("-------after two seconds----------");
        console.log("DataCollector timestamp: "+timestamp);
        console.log("Tela Atual: "+currentScreen);*/
    }

    $.post("http://"+ window.location.host +":5000/storage/1",
        {
            idUser: idAluno,
            timeStamp: timestamp,
            tipo: null,
            tela: currentScreen,
            tag: null,
            x: null,
            y: null,
            classId: idClass
        },
        function(data, status){
            console.log("PLAYER------Data: " + data + "\nStatus: " + status);

        });
}

var escolha;
window.confirm = function(al, $){
    return function(msg) {
        al.call(window,msg);
        $(window).trigger("confirmacao");
    };
}(window.confirm, window.jQuery);


$(window).on("confirmacao", function(e) {
    console.log("escolhi: "+escolha);
});


function listenClick(e){
    clearInterval(timer);
    timer = setInterval(overflowTimer, 2000);
    currentScreen = e.target.baseURI.split("/").slice(-1)[0];
    
    if (e.target.className == "modal fade"){
        idClass = "Q" + idClass.substring(1, idClass.length); 
    } else if (e.target.className == "clickbody"){
        idClass = idClass;
    }
     else {
        idClass = e.target.className;
    }
    
    //localStorage.setItem ("classIdSection", "1-4,1-4,1-3,1-2,1-1,1-3,1-1,1-3,1-1,1-1");
    //console.log("IDCLASS: " + idClass);

    //PARTE DA RESPOSTA
    if (e.target.defaultValue != undefined) {
        console.log("target class: " + e.target.className[2]);
        console.log("answlist before:" + answerlist);
        aux = e.target.className;
        aux = aux.split(":");
        console.log("--------");
        console.log(aux);
        i = parseInt(aux[1]);
        if (aux[2] == "H")
            answerlist[i-1] = e.target.defaultValue;
        else
            answerlist[i-1+10] = e.target.defaultValue;
        console.log("answlist after:" + answerlist);

        aux_answerlist = "";
        for (var i=0; i<answerlist.length; i++) {
            if (i==0) aux_answerlist = answerlist[i];
            else aux_answerlist = aux_answerlist + "," + answerlist[i];
        }
        localStorage.setItem ("answerlist", aux_answerlist);

/*        i = parseInt(e.target.className[2])
        console.log(i);
        iterador = i-1;
        answerlist[iterador] = e.target.defaultValue;
        console.log(answerlist);*/
    }



    //idTela = getCookie("screen");
    var timestamp = new Date().getTime();
    /*var tag = e.target.localName;
    if (e.target.localName == "input") {
       // console.log("INPUT");
        tag = e.target.localName + "-" + e.target.defaultValue;
        //console.log("INPUT: " + tag);
    }*/

    /*if(debug) {
       console.log("-----------------");
        console.log(e);
        console.log("tela:" + currentScreen);
        console.log("x: " + e.screenX + " y: " + e.screenY);
        console.log(e.type);
        console.log("target id: " + e.target.id);
        console.log("target class: " + e.target.className);
        console.log("selected option:", e.target.defaultValue);
        console.log(e.target.localName);
      //  console.log(tag);
        console.log(e.timeStamp);
        console.log(e.which);
        console.log("DataCollector timestamp: "+timestamp); 
    }*/

    localStorage.setItem("idClass",idClass);

    $.post("http://"+ window.location.host +":5000/storage/1",
    {
      idUser: idAluno,
      timeStamp: timestamp,
      tipo: e.type,
      tela: currentScreen,
      tag: e.target.localName,
      x:e.screenX,
      y:e.screenY,
      classId: idClass
    },
    function(data, status){
        console.log("currentScreen: " + currentScreen);
        });
}

function listemMouseOver(e){
	console.log(e.target);
}

function listemMouseOut(e){
	console.log(e.target);
}
