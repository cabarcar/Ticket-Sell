const tarjeta = document.querySelector('#tarjeta'),
	  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	  formulario = document.querySelector('#formulario-tarjeta'),
	  numeroTarjeta = document.querySelector('#tarjeta .numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	  logoMarca = document.querySelector('#logo-marca'),
	  emailOk = document.querySelector('#emailOk'),
	  firma = document.querySelector('#tarjeta .firma p'),
	  mesExpiracion = document.querySelector('#tarjeta .mes'),
	  yearExpiracion = document.querySelector('#tarjeta .year');
	  ccv = document.querySelector('#tarjeta .ccv');

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'assets/img/logos/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'assets/img/logos/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// Volteamos la tarjeta para que el usuario vea el frente.
	mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = 'Cesar Abarca';
	}

	mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});

// Multiplicacion
$("#selectBoleto").on('change', function(event){
    $("#selectBoleto").val($("#selectBoleto option:selected").val());
    multiplicar();
});
$('#selectMany').on('change', function(event) {
     $('#selectMany').val($("#selectMany option:selected").val());
	multiplicar();
});

function multiplicar() {
	var total = $("#selectBoleto option:selected").val() * $("#selectMany option:selected").val();
	$('#inputTotal').val(total);
  }

  //Validacion


  var estadoName = false;
  var estadoNumber = false;
  var estadoCCV = false;
  var estadoEmail = false;
  var estadoSelect = false;

  document.getElementById('inputEmail').addEventListener('input', function() {
    campo = event.target;
    valido = document.getElementById('emailOK');
        
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo.value)) {
      //valido.innerText = "válido";
	  valido = "valido";
	  estadoEmail = true;
	  console.log(valido);
    } else {
      //valido.innerText = "incorrecto";
	  valido = "incorrecto";
	  console.log(valido);
	  estadoEmail = false;
    }
});

document.getElementById('inputNumero').addEventListener('input', function() {
    var inputNumber = $("#inputNumero").val();
    if (inputNumber.length == 19) {
        console.log("valido");
		estadoNumber = true;
    } else {
        console.log("incorrecto");
		estadoNumber = false;
    }
});

document.getElementById('inputNombre').addEventListener('input', function() {
	var pattern = /^[a-zA-Z ]*$/;
    var inputName = $("#inputNombre").val();

    if (pattern.test(inputName) && inputName !== "") {
        console.log("Nombre válido");
		estadoName = true;
    } else {
        console.log("Nombre inválido");
		estadoName = false;
	}
});

document.getElementById('inputCCV').addEventListener('input', function() {
	var inputNumber = $("#inputCCV").val();
    if (inputNumber.length == 3) {
        console.log("valido");
		estadoCCV = true;
    } else {
        console.log("incorrecto")
		estadoCCV = false;
    }
});

$('#btn-enviar').click(function() {
	event.preventDefault();
    if ($('#selectMany, #selectConcert, #selectMes, #selectYear, #selectBoleto').val()=== '') {
        alert('Seleccione Una Opcion');
		estadoSelect = false;
    } else {
		estadoSelect = true;
    }

	if (estadoSelect == true && estadoName == true && estadoNumber == true && estadoCCV == true && estadoEmail == true){
		alert('Compra Exitosa');
	} else {
		alert('Ingrese Todos Los Datos');
	}
});









