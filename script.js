const contadorElemento = document.getElementById('contador');
const boton = document.getElementById('btn-like');
const botonReiniciar = document.getElementById('btn-reset');
const tbody = document.getElementById('tabla-registros');

let contador = 0;

const formatearHora = (fecha) => {
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  const segundos = String(fecha.getSeconds()).padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
};

boton.addEventListener('click', () => {
  contador += 1;
  contadorElemento.textContent = contador;
  contadorElemento.classList.toggle('counter-box--alternate', Math.floor(contador / 10) % 2 === 1);

  const fechaActual = new Date();
  const row = document.createElement('tr');

  const celdaNumero = document.createElement('td');
  celdaNumero.textContent = contador;

  const celdaHora = document.createElement('td');
  celdaHora.textContent = formatearHora(fechaActual);

  row.appendChild(celdaNumero);
  row.appendChild(celdaHora);
  tbody.prepend(row);
});

botonReiniciar.addEventListener('click', () => {
  contador = 0;
  contadorElemento.textContent = contador;
  contadorElemento.classList.remove('counter-box--alternate');
  tbody.replaceChildren();
});
