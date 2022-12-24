const POLTRONAS = 240;

let reservadas = [];

function mostrarPalco() {
  let ocupadas = [];

  if (localStorage.getItem('teatroOcupadas')) {
    ocupadas = localStorage.getItem('teatroOcupadas').split(';');
  }

  const divPalco = document.querySelector('#divPalco');

  for (let i = 1; i <= POLTRONAS; i++) {
    const figure = document.createElement('figure');
    const imgStatus = document.createElement('img');

    if(ocupadas.indexOf(i.toString()) >= 0) {
      imgStatus.src = 'img/ocupada.jpg';
    } else {
      imgStatus.src = 'img/disponivel.jpg';
    }
    imgStatus.classList.add('poltrona');

    const figureCap = document.createElement('figcaption');

    let zeros = "";

    if (i < 10) {
      zeros = '00';
    } else if (i < 100) {
      zeros = '0';
    }

    const num = document.createTextNode('[' + zeros + i + ']');

    figureCap.appendChild(num);
    figure.appendChild(imgStatus);
    figure.appendChild(figureCap);

    if (i % 24 === 12) {
      figure.style.marginRight = '60px';
    }

    divPalco.appendChild(figure);

    if (i % 24 === 0) {
      const br = document.createElement('br');
      divPalco.appendChild(br);
    }
  }
}
mostrarPalco();


function reservarPoltrona(){
  const inPoltrona =  document.querySelector("#inPoltrona");
  const poltrona  = Number(inPoltrona.value);

  if(poltrona <= 0 || isNaN(poltrona) || poltrona > POLTRONAS){
    alert("Informe um número de poltrona válida");
    inPoltrona.focus();
    return;
  }

  let ocupadas = [];


  if(localStorage.getItem("teatroOcupadas")){
    ocupadas = localStorage.getItem("teatroOcupadas").split(";");
  }

  if(ocupadas.indexOf(poltrona.toString()) >= 0){
    alert("Poltrona " + poltrona + " já está ocupada...");
    return;
  }

  inPoltrona.value;
  inPoltrona.focus();

  const divPalco = document.querySelector("#divPalco");
  const imgPoltrona = divPalco.getElementsByTagName("img")[poltrona - 1];


  imgPoltrona.src = "img/reservada.jpg";

  reservadas.push(poltrona);

  inPoltrona.value;
  inPoltrona.focus();
}

const btReservar = document.querySelector("#btReservar");
btReservar.addEventListener("click", reservarPoltrona);

const inPoltrona = document.querySelector("#inPoltrona");
inPoltrona.addEventListener("keypress", function (tecla){
  if(tecla.keyCode === 13){
    reservarPoltrona();
  }
}) 



function confirmarReserva(){
  if(reservadas.length === 0 ){
    alert("Não há poltronas reservadas");
    inPoltrona.focus();
    return;
  }

  const divPalco = document.querySelector("#divPalco");
  
  let ocupadas = "";

  if(localStorage.getItem("teatroOcupadas")){
    ocupadas = localStorage.getItem("teatroOcupadas") + ";";
  }

  for(let i = 0; i < reservadas.length; i++){
    ocupadas += reservadas[i] + ";";

    let imgPoltrona = divPalco.getElementsByTagName("img")[reservadas[i] - 1]
    imgPoltrona.src = "img/ocupada.jpg";
  }

  reservadas = [];

  localStorage.setItem("teatroOcupadas", ocupadas.substr(0, ocupadas.length - 1));
}

const btConfirmar = document.querySelector("#btConfirmar");
btConfirmar.addEventListener("click", confirmarReserva)

const btLimpar = document.querySelector("#btLimpar");
btLimpar.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
})
