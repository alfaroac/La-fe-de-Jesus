(function(){
    var existe = localStorage.getItem("lafe");
    // localStorage.setItem('lafe', JSON.stringify(lafe));
    if (existe === null) {            
      // lafe = JSON.parse(localStorage.getItem("lafe"));
    }else{
        console.log("Existe datos");
    }
})();

var lecc;
function listar(arg) {
  var lafe = JSON.parse(localStorage.getItem("lafe"));
  for (var i = 0; i < lafe.length; i++) {
    if (lafe[i].id==arg) {
      lecc = lafe[i];
    }
  }
  $(".titulo_leccion").html(lecc.titulo);
  var html = '';
  html += '<ol>';
  for (var i = 0; i < lecc.preguntas.length; i++) {
    html += '<li>';
    html += '<label for="textinput-'+i+'">'+lecc.preguntas[i].pregunta+':</label>';
    html += '<div align="right"><a href="#">'+lecc.preguntas[i].vers.titulo+'</a></div>';
    html += '<p>'+lecc.preguntas[i].vers.cuerpo+'</p>';
    html += '<input class="rpts1" name="textinput-'+i+'" id="textinput-'+i+'" placeholder="Ingrese respuesta" value="'+lecc.preguntas[i].rpta+'" type="text">';
    html += '<p class="rpts2 info" style="display:none"><strong>Respuesta:</strong>'+lecc.preguntas[i].rpta+'</p>';
    html += '</li>';
  }
  html += '</ol>';
  html += '<h4 class="center">¿QUÉ DEBO HACER?</h4>';
  html += '<p align="center"><a class="ui-btn ui-corner-all ui-icon-mail ui-btn-icon-right ui-btn-icon-notext" onclick="mostrar_compromiso();"></a></p>';
  html += '<div class="compromiso">';
  for (var i = 0; i < lecc.compromisos.length; i++) {
    html += '<p align="right"><a href="#vers'+i+'" data-transition="flip" data-rel="popup">'+lecc.compromisos[i].versiculo+'</a></p>';
    html += '<div data-role="popup" id="vers'+i+'" class="ui-content" style="max-width:280px">';
    html += '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a>';
    html += '<p>'+lecc.compromisos[i].content+'</p>';
    html += '</div>';
    html += '<label for="checkbox-'+i+'">'+lecc.compromisos[i].pregunta+'</label>';
    if (lecc.compromisos[i].acepta) {
      html += '<input name="checkbox-'+i+'" id="checkbox-'+i+'" type="checkbox" value="'+lecc.compromisos[i].pregunta+'" checked>';
    }else{
      html += '<input name="checkbox-'+i+'" id="checkbox-'+i+'" type="checkbox" value="'+lecc.compromisos[i].pregunta+'">';
    }
  }
  html += '<p align="center"><a class="ui-btn ui-corner-all ui-shadow ui-icon-eye ui-btn-icon-right ui-btn-icon-notext" onclick="mostrar_respuestas()"></a></p>';
  html += '</div>';
  html += '<footer data-role="footer" data-position="fixed">';
  html += '<h4>By-HappySoft dedicated for Roxi</h4>';
  html += '</footer>';
  $(".principal").html(html);
  $(".compromiso").hide();
}
function mostrar_compromiso() {
  $(".compromiso").show();
}
function mostrar_respuestas() {
  $(".rpts2").show();
  $(".rpts1").hide();
}

function guardar() {
  // console.log(lecc);
  for (var i = 0; i < lecc.preguntas.length; i++) {
    // console.log($("#textinput-"+i).val());
    lecc.preguntas[i].rpta = $("#textinput-"+i).val();
  }
  for (var i = 0; i < lecc.compromisos.length; i++) {
    // if ($('#checkbox-'+i+'').is(':checked')) {};
    lecc.compromisos[i].acepta = $('#checkbox-'+i).is(':checked');
  }
  var lafe = JSON.parse(localStorage.getItem("lafe"));
  for (var i = 0; i < lafe.length; i++) {
    if (lafe[i].id==lecc.id) {
      lafe[i]=lecc;
    }
  }
  localStorage.setItem('lafe', JSON.stringify(lafe));
}

function limpiar() {
    localStorage.clear();
}