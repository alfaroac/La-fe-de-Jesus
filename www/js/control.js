var lecc;
function listar(arg) {
  // console.log(arg);
  var lafe = JSON.parse(localStorage.getItem("lafe"));
  for (var i = 0; i < lafe.length; i++) {
    if (lafe[i].id==arg) {
      lecc = lafe[i];
    }
  }
  $(".titulo_leccion").html(lecc.titulo);
  var html = '';
  html += '<h2 align="center">'+lecc.titulo+'</h2>';
  html += '<ol>';
  for (var i = 0; i < lecc.preguntas.length; i++) {
    html += '<li>';
    html += '<label for="textinput-'+i+'">'+lecc.preguntas[i].pregunta+':</label>';
    html += '<div align="right"><a href="#">'+lecc.preguntas[i].versiculo+'</a></div>';
    html += '<textarea class="input-r" rows="3" style="display:none" id="textarea-'+i+'" placeholder="Ingrese versículo">'+lecc.preguntas[i].contenido+'</textarea>';
    html += '<p class="contenido">'+lecc.preguntas[i].contenido+'</p>';
    html += '<input class="input-r" style="display:none" name="textinput-'+i+'" id="textinput-'+i+'" placeholder="Ingrese respuesta" value="'+lecc.preguntas[i].respuesta+'" type="text">';
    html += '<p class="rpts info"><strong>Respuesta: </strong>'+lecc.preguntas[i].respuesta+'</p>';
    html += '</li>';
  }
  html += '</ol>';
  html += '<h4 align="center">¿QUÉ DEBO HACER?</h4>';
  html += '<p align="center"><a class="ui-btn ui-corner-all ui-icon-mail ui-btn-icon-right ui-btn-icon-notext" onclick="mostrar_compromiso();"></a></p>';
  html += '<div id="compromiso">';
  for (var i = 0; i < lecc.compromisos.length; i++) {
    html += '<p align="right"><a href="#vers'+i+'" data-transition="flip" data-rel="popup">'+lecc.compromisos[i].versiculo+'</a></p>';
    html += '<textarea class="input-r" rows="3" style="display:none" id="textarea-c-'+i+'" placeholder="Ingrese versículo">'+lecc.compromisos[i].contenido+'</textarea>';
    html += '<div data-role="popup" id="vers'+i+'" class="ui-content" style="max-width:280px">';
    html += '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>';
    html += '<p>'+lecc.compromisos[i].contenido+'</p>';
    html += '</div>';
    html += '<label for="checkbox-'+i+'">'+lecc.compromisos[i].pregunta+'</label>';
    if (lecc.compromisos[i].acepta) {
      html += '<input name="checkbox-'+i+'" id="checkbox-'+i+'" type="checkbox" checked>';
    }else{
      html += '<input name="checkbox-'+i+'" id="checkbox-'+i+'" type="checkbox">';
    }
  }
  html += '</div>';
  $(".principal").html(html);
  $("#compromiso").hide();
}

function mostrar_compromiso() {
  $("#compromiso").show();
}
function mostrar_respuestas() {
  $(".rpts").show();
  $(".contenido").show();
  $(".input-r").hide();
}
function ingresar_respuestas() {
  $(".rpts").hide();
  $(".contenido").hide();
  $(".input-r").show();
}

function guardar() {
  // console.log(lecc);
  for (var i = 0; i < lecc.preguntas.length; i++) {
    // console.log($("#textinput-"+i).val());
    lecc.preguntas[i].respuesta = $("#textinput-"+i).val();
    lecc.preguntas[i].contenido = $("#textarea-"+i).val();
  }
  for (var i = 0; i < lecc.compromisos.length; i++) {
    // if ($('#checkbox-'+i+'').is(':checked')) {};
    lecc.compromisos[i].acepta = $('#checkbox-'+i).is(':checked');
    lecc.compromisos[i].contenido = $('#textarea-c-'+i).val();
  }
  var lafe = JSON.parse(localStorage.getItem("lafe"));
  for (var i = 0; i < lafe.length; i++) {
    if (lafe[i].id==lecc.id) {
      lafe[i]=lecc;
    }
  }
  localStorage.setItem('lafe', JSON.stringify(lafe));
  listar(lecc.id);
}

function limpiar() {
    localStorage.clear();
}

function cargar_datos(){
  localStorage.setItem('lafe', JSON.stringify(lafe));
  console.log("Datos cargados");  
}