// Fecha automática
document.getElementById('fecha').valueAsDate = new Date();

// PRECIOS DE INSTALACIÓN ACOMETIDA
const PRECIOS_ACOMETIDA = {
  sopContador: 450,
  cajaRH: 550,
  cajaRegistro: 150, // Q 150.00
  puestoTierra: 150   // Q 150.00
};

// PRECIOS DE INSTALACIÓN DOMICILIAR
const PRECIOS_DOMICILIAR = {
  lamparaInt: 150,
  interruptorSimple: 75,
  interruptorDoble: 125,
  interruptor3Way: 150,
  tomacorriente: 95,
  instBreaker: 75,
  tableroDistribucion: 550, // Q 550.00
  cambioTablero: 1250,
  tuberiaMetro: 15,
  cableMetro: 15,
  duchaElectrica: 250,
  lamparas: 85
};

// Escuchar eventos
const elementosCalculo = document.querySelectorAll('.calc-trigger');
elementosCalculo.forEach(elemento => {
  elemento.addEventListener('input', calcularCotizacion);
  elemento.addEventListener('change', calcularCotizacion);
});

function calcularCotizacion() {
  const chkAcometida = document.getElementById('chkAcometida').checked;
  const chkDomiciliaria = document.getElementById('chkDomiciliaria').checked;

  const sectionAcometida = document.getElementById('sectionAcometida');
  const sectionDomiciliaria = document.getElementById('sectionDomiciliaria');

  sectionAcometida.style.display = chkAcometida ? 'block' : 'none';
  sectionDomiciliaria.style.display = chkDomiciliaria ? 'block' : 'none';

  let subtotal = 0;

  // 1. CÁLCULO ACOMETIDA
  if (chkAcometida) {
    if (document.getElementById('chkSopContador').checked) subtotal += PRECIOS_ACOMETIDA.sopContador;
    if (document.getElementById('chkCajaRH').checked) subtotal += PRECIOS_ACOMETIDA.cajaRH;
    if (document.getElementById('chkCajaRegistro').checked) subtotal += PRECIOS_ACOMETIDA.cajaRegistro;
    if (document.getElementById('chkPuestoTierra').checked) subtotal += PRECIOS_ACOMETIDA.puestoTierra;
    
    // Suma libre de cableado en Quetzales
    const montoCableado = parseFloat(document.getElementById('montoCableadoAcometida').value) || 0;
    subtotal += montoCableado;
  }

  // 2. CÁLCULO DOMICILIAR
  if (chkDomiciliaria) {
    const cantLamparaInt = parseInt(document.getElementById('cantLamparaInt').value) || 0;
    const cantSwSimple = parseInt(document.getElementById('cantSwSimple').value) || 0;
    const cantSwDoble = parseInt(document.getElementById('cantSwDoble').value) || 0;
    const cantSw3Way = parseInt(document.getElementById('cantSw3Way').value) || 0;
    const cantTomas = parseInt(document.getElementById('cantTomas').value) || 0;
    const cantBreakers = parseInt(document.getElementById('cantBreakers').value) || 0;
    const chkTablero = document.getElementById('chkTableroDistribucion').checked;
    const chkCambioTablero = document.getElementById('chkCambioTablero').checked;
    const cantTuberia = parseInt(document.getElementById('cantTuberia').value) || 0;
    const cantCableMetro = parseInt(document.getElementById('cantCableMetro').value) || 0;
    const cantDuchas = parseInt(document.getElementById('cantDuchas').value) || 0;
    const cantLamparas = parseInt(document.getElementById('cantLamparas').value) || 0;

    subtotal += cantLamparaInt * PRECIOS_DOMICILIAR.lamparaInt;
    subtotal += cantSwSimple * PRECIOS_DOMICILIAR.interruptorSimple;
    subtotal += cantSwDoble * PRECIOS_DOMICILIAR.interruptorDoble;
    subtotal += cantSw3Way * PRECIOS_DOMICILIAR.interruptor3Way;
    subtotal += cantTomas * PRECIOS_DOMICILIAR.tomacorriente;
    subtotal += cantBreakers * PRECIOS_DOMICILIAR.instBreaker;

    if (chkTablero) subtotal += PRECIOS_DOMICILIAR.tableroDistribucion;
    if (chkCambioTablero) subtotal += PRECIOS_DOMICILIAR.cambioTablero;

    subtotal += cantTuberia * PRECIOS_DOMICILIAR.tuberiaMetro;
    subtotal += cantCableMetro * PRECIOS_DOMICILIAR.cableMetro;
    subtotal += cantDuchas * PRECIOS_DOMICILIAR.duchaElectrica;
    subtotal += cantLamparas * PRECIOS_DOMICILIAR.lamparas;
  }

  // Mano de Obra
  const precioManoObra = parseFloat(document.getElementById('inputManoObra').value) || 0;
  subtotal += precioManoObra;

  // Descuento General por Porcentaje
  const porcentajeDescuento = parseFloat(document.getElementById('inputDescuento').value) || 0;
  const montoDescuento = subtotal * (porcentajeDescuento / 100);

  let totalFinal = subtotal - montoDescuento;
  if (totalFinal < 0) totalFinal = 0;

  // Renderizar
  document.getElementById('lblSubtotal').innerText = subtotal.toFixed(2);
  document.getElementById('lblTotalFinal').innerText = totalFinal.toFixed(2);
}

// Inicializar
calcularCotizacion();