// CL Automotriz — WhatsApp links, inventario con filtros y formulario "Vende tu auto".

// Número de WhatsApp (formato internacional, solo dígitos).
const WHATSAPP_NUMBER = '5216622602904';

// Inventario destacado (datos de muestra — reemplazar con el inventario real).
// grupo: 'Sedán' | 'SUV' | 'Pickup'. foto: ruta a la imagen (ej. 'assets/autos/corolla.jpg');
// si se deja vacía se muestra el espacio con el texto de `fotoAlt`.
const AUTOS = [
  { tipo: 'SEDÁN', grupo: 'Sedán', nombre: 'Toyota Corolla LE', anio: '2019', km: '78,450 km', trans: 'Automática', precio: '$289,000', foto: '', fotoAlt: 'Foto Corolla 2019' },
  { tipo: 'SEDÁN', grupo: 'Sedán', nombre: 'Nissan Versa Sense', anio: '2020', km: '62,300 km', trans: 'Automática', precio: '$239,000', foto: '', fotoAlt: 'Foto Versa 2020' },
  { tipo: 'SUV', grupo: 'SUV', nombre: 'Chevrolet Trax LT', anio: '2018', km: '91,000 km', trans: 'Automática', precio: '$255,000', foto: '', fotoAlt: 'Foto Trax 2018' },
  { tipo: 'SUV', grupo: 'SUV', nombre: 'Mazda CX-5 Grand Touring', anio: '2019', km: '84,700 km', trans: 'Automática', precio: '$389,000', foto: '', fotoAlt: 'Foto CX-5 2019' },
  { tipo: 'PICKUP', grupo: 'Pickup', nombre: 'Ford Ranger XL', anio: '2019', km: '112,400 km', trans: 'Manual', precio: '$379,000', foto: '', fotoAlt: 'Foto Ranger 2019' },
  { tipo: 'SEDÁN', grupo: 'Sedán', nombre: 'Volkswagen Jetta Trendline', anio: '2018', km: '96,800 km', trans: 'Manual', precio: '$215,000', foto: '', fotoAlt: 'Foto Jetta 2018' }
];

const MENSAJES = {
  general: 'Hola CL Automotriz, vi su página y quiero información sobre sus autos seminuevos.',
  credito: 'Hola CL Automotriz, quiero información sobre el financiamiento para un auto seminuevo.'
};

function wa(msg) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function carCard(auto) {
  const card = el('article', 'car');

  const media = el('div', 'car__media');
  if (auto.foto) {
    const img = el('img', 'photo');
    img.src = auto.foto;
    img.alt = auto.nombre + ' ' + auto.anio;
    img.loading = 'lazy';
    media.append(img);
  } else {
    const slot = el('div', 'photo-slot');
    slot.append(el('span', null, auto.fotoAlt));
    media.append(slot);
  }
  media.append(el('span', 'car__type', auto.tipo));

  const body = el('div', 'car__body');
  body.append(el('h3', 'car__name', auto.nombre));

  const specs = el('ul', 'car__specs');
  [auto.anio, auto.km, auto.trans].forEach(s => specs.append(el('li', null, s)));
  body.append(specs);

  const price = el('div', 'car__price');
  price.append(el('strong', null, auto.precio), el('span', null, 'MXN'));
  body.append(price);

  const cta = el('a', 'car__cta btn-red', 'Me interesa');
  cta.href = wa('Hola CL Automotriz, me interesa el ' + auto.nombre + ' ' + auto.anio + ' de ' + auto.precio + '. ¿Sigue disponible?');
  cta.target = '_blank';
  cta.rel = 'noopener';
  body.append(cta);

  card.append(media, body);
  return card;
}

function renderAutos(filtro) {
  const cont = document.getElementById('cars');
  cont.replaceChildren(...AUTOS
    .filter(a => filtro === 'Todos' || a.grupo === filtro)
    .map(carCard));
}

document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = wa(MENSAJES[a.dataset.wa] || MENSAJES.general);
});

const filtros = document.querySelectorAll('.filter');
filtros.forEach(btn => {
  btn.addEventListener('click', () => {
    filtros.forEach(b => {
      const activo = b === btn;
      b.classList.toggle('is-active', activo);
      b.setAttribute('aria-pressed', String(activo));
    });
    renderAutos(btn.dataset.filtro);
  });
});
renderAutos('Todos');

document.getElementById('sell-form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const v = k => String(f.get(k) || '').trim();
  const msg = 'Hola CL Automotriz, quiero vender mi auto.\n' +
    'Nombre: ' + v('nombre') + '\n' +
    'Teléfono: ' + v('telefono') + '\n' +
    'Auto: ' + v('marca') + ' ' + v('modelo') + ' ' + v('anio') + '\n' +
    'Kilometraje: ' + v('km');
  window.open(wa(msg), '_blank', 'noopener');
});
