'use strict';

const SITE = {
  name: 'LIMATEX',
  whatsapp: '',
  location: { lat: -16.583668, lng: -68.186915 },
  heroImage: 'imagenes/logo.png',
  aboutImage: 'imagenes/fabricacion_personalizada.jpg',
  nav: [
    { href: '#inicio', label: 'Inicio' },
    { href: '#productos', label: 'Productos' },
    { href: '#empresa', label: 'Empresa' },
    { href: '#contacto', label: 'Contacto' }
  ],
  strip: ['CALIDAD EN CADA HILO', 'PRODUCCIÓN TEXTIL', 'ATENCIÓN PERSONALIZADA', 'VENTAS POR MAYOR Y MENOR'],
  about: {
    title: 'Soluciones textiles para distintos sectores.',
    text: 'Limatex trabaja en la elaboración y comercialización de productos textiles mediante procesos de tejido y maquinaria. Nuestro catálogo reúne distintas líneas y opciones de presentación.',
    points: ['Atención por cantidad', 'Presentaciones por unidad y rollo', 'Consultas personalizadas']
  }
};

const PRODUCTS = [
  { id: 1, name: 'Guatos de carpeta', category: 'Accesorios textiles', description: 'Tiras tejidas para terminaciones y accesorios de carpeta.', unit: 'Rollo / metro', shape: 'ribbon', colors: ['#c0392b', '#2c3e50', '#e0b24a'], photo: 'imagenes/guato_carpeta.jpg' },
  { id: 2, name: 'Cintas textiles', category: 'Accesorios textiles', description: 'Cintas tejidas para distintos usos y acabados.', unit: 'Rollo', shape: 'ribbon', colors: ['#287c91', '#d5a64a', '#e8e1d0'], photo: 'imagenes/cinta_textil.jpg' },
  { id: 3, name: 'Ribetes tejidos', category: 'Accesorios textiles', description: 'Ribetes para terminaciones y confección.', unit: 'Rollo', shape: 'ribbon', colors: ['#7a3b69', '#2d6a4f', '#d98e04'], photo: 'imagenes/ribete_tejido.webp' },
  { id: 4, name: 'Vendas de tela', category: 'Vendas y curación', description: 'Producto textil en presentación enrollada.', unit: 'Unidad / rollo', shape: 'bandage', colors: ['#f1ede2', '#d9d2bf'], photo: 'imagenes/venda.webp' },
  { id: 5, name: 'Vendas elásticas', category: 'Vendas y curación', description: 'Tejido flexible para diferentes necesidades.', unit: 'Unidad / rollo', shape: 'bandage', colors: ['#e8d5b5', '#b03a3a'], photo: 'imagenes/venda_elastica.webp' },
  { id: 6, name: 'Vendas de gasa', category: 'Vendas y curación', description: 'Material textil ligero en rollo.', unit: 'Unidad / rollo', shape: 'bandage', colors: ['#ffffff', '#9cc7d4'], photo: 'imagenes/venda_gasa.jpg' },
  { id: 7, name: 'Cintas elásticas', category: 'Cintas y bandas', description: 'Bandas textiles con elasticidad.', unit: 'Rollo / metro', shape: 'ribbon', colors: ['#111827', '#e5e7eb', '#d5a64a'], photo: 'imagenes/cinta_elastica.jpg' },
  { id: 8, name: 'Bandas tejidas', category: 'Cintas y bandas', description: 'Bandas resistentes para aplicaciones textiles.', unit: 'Rollo', shape: 'ribbon', colors: ['#1d4058', '#8a6d3b', '#b03a3a'], photo: 'imagenes/banda_textil.jpg' },
  { id: 9, name: 'Cintas decorativas', category: 'Cintas y bandas', description: 'Cintas para detalles y acabados.', unit: 'Rollo', shape: 'ribbon', colors: ['#c2185b', '#7b1fa2', '#f9a825'], photo: 'imagenes/cinta_decorativa.jpg' },
  { id: 10, name: 'Hilos de algodón', category: 'Hilos textiles', description: 'Hilos para trabajos y procesos textiles.', unit: 'Cono', shape: 'thread', colors: ['#f4efe1', '#c8553d', '#4b7f52'], photo: 'imagenes/hilos_algodon.jpg' },
  { id: 11, name: 'Hilos sintéticos', category: 'Hilos textiles', description: 'Hilos de fibras sintéticas en distintas presentaciones.', unit: 'Cono', shape: 'thread', colors: ['#1e88e5', '#e91e63', '#fdd835'], photo: 'imagenes/hilo_sintetico.jpg' },
  { id: 12, name: 'Hilos industriales', category: 'Hilos textiles', description: 'Conos de hilo para procesos de fabricación.', unit: 'Cono / lote', shape: 'thread', colors: ['#37474f', '#8d6e63', '#546e7a'], photo: 'imagenes/hilo_industrial.webp' },
  { id: 13, name: 'Tejidos de algodón', category: 'Telas y tejidos', description: 'Tejidos textiles de algodón.', unit: 'Metro / rollo', shape: 'fabric', colors: ['#e9dcc3', '#c9b48a'], photo: 'imagenes/tejido_algodon.jpg' },
  { id: 14, name: 'Tejidos sintéticos', category: 'Telas y tejidos', description: 'Tejidos elaborados con fibras sintéticas.', unit: 'Metro / rollo', shape: 'fabric', colors: ['#3b6ea8', '#8fb3d9'], photo: 'imagenes/tejido_sintetico.jpg' },
  { id: 15, name: 'Telas industriales', category: 'Telas y tejidos', description: 'Materiales textiles para diferentes aplicaciones.', unit: 'Rollo', shape: 'fabric', colors: ['#5d6b3a', '#9aa66b'], photo: 'imagenes/tela_industrial.jpg' },
  { id: 16, name: 'Cordones textiles', category: 'Cordones y tejidos', description: 'Cordones fabricados mediante tejido o trenzado.', unit: 'Rollo / metro', shape: 'cord', colors: ['#b03a3a', '#2c3e50'], photo: 'imagenes/cordon_textil.jpg' },
  { id: 17, name: 'Cuerdas trenzadas', category: 'Cordones y tejidos', description: 'Cordones trenzados para distintos usos.', unit: 'Rollo', shape: 'cord', colors: ['#d9b26f', '#8a6d3b'], photo: 'imagenes/cuerda_trenzada.webp' },
  { id: 18, name: 'Sesgos textiles', category: 'Insumos de confección', description: 'Tiras textiles para terminaciones de prendas.', unit: 'Rollo', shape: 'bias', colors: ['#c2185b', '#f48fb1'], photo: 'imagenes/sesgo_textil.jpg' },
  { id: 19, name: 'Tiras para confección', category: 'Insumos de confección', description: 'Insumos textiles para procesos de confección.', unit: 'Rollo / metro', shape: 'bias', colors: ['#287c91', '#9ad0dc'], photo: 'imagenes/tira_confeccion.jpg' },
  { id: 20, name: 'Fabricación personalizada', category: 'Pedidos personalizados', description: 'Consulta por medidas, materiales y cantidades especiales.', unit: 'Por cotización', shape: 'custom', colors: ['#d5a64a', '#287c91'], photo: 'imagenes/fabricacion_personalizada.jpg' }
];

const CATEGORIES = [...new Set(PRODUCTS.map(product => product.category))];

const DEMO_USERS = {
  cliente: { password: 'cliente123', role: 'Cliente' },
  empleado: { password: 'empleado123', role: 'Empleado' },
  gerente: { password: 'gerente123', role: 'Gerente' }
};

const STATUSES = ['Pendiente', 'En proceso', 'Listo', 'Entregado', 'Cancelado'];

const KEYS = {
  cart: 'limatexCart',
  orders: 'limatexOrders',
  logs: 'limatexLogs',
  prices: 'limatexPrices',
  theme: 'limatexTheme',
  user: 'limatexUser'
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

const state = {
  cart: load(KEYS.cart, []),
  orders: load(KEYS.orders, []),
  logs: load(KEYS.logs, []),
  prices: load(KEYS.prices, {}),
  user: null,
  category: 'all',
  quoteCategory: '',
  lightbox: { list: [], index: 0, scale: 1 }
};

try {
  state.user = JSON.parse(sessionStorage.getItem(KEYS.user));
} catch {}

function safe(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('show'), 2600);
}

function log(action) {
  state.logs.unshift({ action, user: state.user?.username || 'Visitante', date: new Date().toLocaleString('es-BO') });
  state.logs = state.logs.slice(0, 120);
  save(KEYS.logs, state.logs);
}

function svgUri(svg) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

function cylinder(x, y, w, h, fill, top) {
  const ry = Math.round(w * 0.14);
  return `<g>
    <rect x="${x}" y="${y + ry}" width="${w}" height="${h - ry * 2}" fill="${fill}"/>
    <ellipse cx="${x + w / 2}" cy="${y + h - ry}" rx="${w / 2}" ry="${ry}" fill="${fill}"/>
    <rect x="${x}" y="${y + ry}" width="${w}" height="${h - ry * 2}" fill="url(#wv)"/>
    <rect x="${x}" y="${y + ry}" width="${w}" height="${h - ry * 2}" fill="url(#sh)"/>
    <ellipse cx="${x + w / 2}" cy="${y + ry}" rx="${w / 2}" ry="${ry}" fill="${top || fill}"/>
    <ellipse cx="${x + w / 2}" cy="${y + ry}" rx="${w / 2}" ry="${ry}" fill="#fff" opacity=".28"/>
    <ellipse cx="${x + w / 2}" cy="${y + ry}" rx="${w * 0.15}" ry="${ry * 0.55}" fill="#1b2631" opacity=".55"/>
  </g>`;
}

const SHAPES = {
  ribbon: c => [[50, 170, 0], [150, 190, 1], [250, 160, 2]].map(([x, h, i]) =>
    cylinder(x, 240 - h, 100, h, c[i % c.length]) +
    `<rect x="${x}" y="${240 - h * 0.55}" width="100" height="12" fill="${c[(i + 1) % c.length]}" opacity=".9"/>`
  ).join(''),

  bandage: c => [[60, 130], [215, 130]].map(([x, y], i) =>
    cylinder(x, y - 40, 120, 160, c[0], c[0]) +
    `<rect x="${x}" y="${y + 20}" width="120" height="16" fill="${c[1]}" opacity=".85"/>` +
    `<rect x="${x + 88}" y="${y - 6}" width="28" height="14" rx="3" fill="#aab4bd"/>`
  ).join(''),

  thread: c => [90, 200, 310].map((cx, i) => {
    const color = c[i % c.length];
    const lines = Array.from({ length: 8 }, (_, k) => {
      const y = 70 + k * 20;
      const half = 18 + (28 * (y - 60)) / 170;
      return `<line x1="${cx - half}" y1="${y}" x2="${cx + half}" y2="${y}" stroke="#fff" opacity=".28" stroke-width="2"/>`;
    }).join('');
    return `<g>
      <ellipse cx="${cx}" cy="232" rx="48" ry="9" fill="${color}"/>
      <polygon points="${cx - 18},60 ${cx + 18},60 ${cx + 48},232 ${cx - 48},232" fill="${color}"/>
      <polygon points="${cx - 18},60 ${cx + 18},60 ${cx + 48},232 ${cx - 48},232" fill="url(#sh)"/>
      ${lines}
      <rect x="${cx - 10}" y="38" width="20" height="24" fill="#e8e1d0"/>
      <ellipse cx="${cx}" cy="60" rx="18" ry="5" fill="#fff" opacity=".3"/>
    </g>`;
  }).join(''),

  fabric: c =>
    [[40, 174, 200, c[0]], [52, 138, 176, c[1]], [64, 102, 152, c[0]]].map(([x, y, w, fill]) =>
      `<rect x="${x}" y="${y}" width="${w}" height="38" rx="7" fill="${fill}"/>
       <rect x="${x}" y="${y}" width="${w}" height="38" rx="7" fill="url(#wv)"/>
       <rect x="${x}" y="${y + 30}" width="${w}" height="8" rx="4" fill="#000" opacity=".12"/>`
    ).join('') + cylinder(270, 60, 96, 170, c[1], c[0]),

  cord: c => [[120, c[0]], [275, c[1]]].map(([cx, color]) =>
    [66, 50, 34, 18].map(r =>
      `<circle cx="${cx}" cy="148" r="${r}" fill="none" stroke="${color}" stroke-width="15"/>
       <circle cx="${cx}" cy="148" r="${r}" fill="none" stroke="#fff" stroke-width="15" stroke-dasharray="3 9" opacity=".3"/>`
    ).join('')
  ).join(''),

  bias: c => `
    <rect x="150" y="204" width="190" height="24" rx="4" fill="${c[0]}"/>
    <line x1="150" y1="216" x2="340" y2="216" stroke="#fff" stroke-width="2" stroke-dasharray="7 6" opacity=".7"/>
    <circle cx="150" cy="150" r="74" fill="${c[0]}"/>
    <circle cx="150" cy="150" r="52" fill="${c[1]}"/>
    <circle cx="150" cy="150" r="52" fill="url(#wv)"/>
    <circle cx="150" cy="150" r="26" fill="#f2f2ed"/>
    <circle cx="300" cy="108" r="46" fill="${c[1]}"/>
    <circle cx="300" cy="108" r="30" fill="${c[0]}"/>
    <circle cx="300" cy="108" r="13" fill="#f2f2ed"/>`,

  custom: c => `
    <rect x="30" y="214" width="340" height="34" rx="4" fill="#f6d776"/>
    ${Array.from({ length: 34 }, (_, k) => `<line x1="${40 + k * 10}" y1="214" x2="${40 + k * 10}" y2="${k % 5 === 0 ? 232 : 224}" stroke="#7a5d10" stroke-width="1.5"/>`).join('')}
    <rect x="130" y="50" width="76" height="14" rx="4" fill="#8a6d3b"/>
    <rect x="130" y="176" width="76" height="14" rx="4" fill="#8a6d3b"/>
    <rect x="138" y="62" width="60" height="116" fill="${c[0]}"/>
    <rect x="138" y="62" width="60" height="116" fill="url(#wv)"/>
    <rect x="138" y="62" width="60" height="116" fill="url(#sh)"/>
    <line x1="270" y1="70" x2="340" y2="190" stroke="#aab4bd" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="270" cy="74" rx="4" ry="9" fill="none" stroke="#aab4bd" stroke-width="2" transform="rotate(-30 270 74)"/>
    <circle cx="70" cy="130" r="40" fill="${c[1]}"/><circle cx="70" cy="130" r="18" fill="#f2f2ed"/>`
};

function productArt(product) {
  const defs = `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6f4ee"/><stop offset="1" stop-color="#dfe7e6"/></linearGradient>
    <linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".35" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
    <pattern id="wv" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 3H6M3 0V6" stroke="#000" stroke-width=".8" opacity=".14"/></pattern>
  </defs>`;
  const body = (SHAPES[product.shape] || SHAPES.ribbon)(product.colors);
  return svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="800" height="600">${defs}<rect width="400" height="300" fill="url(#bg)"/><ellipse cx="200" cy="248" rx="160" ry="13" fill="#000" opacity=".1"/>${body}</svg>`);
}

function productImage(product) {
  return product.photo || productArt(product);
}

function priceOf(product) {
  return state.prices[product.id] || { price: '', promo: '' };
}

function priceLabel(product) {
  const price = priceOf(product).price;
  return price ? `<span class="price">Bs ${safe(price)}</span>` : '<span>Precio por cotización</span>';
}

function unitsOf(product) {
  const units = product.unit.split('/').map(unit => unit.trim()).filter(unit => unit !== 'Por cotización').map(unit => unit.charAt(0).toUpperCase() + unit.slice(1));
  return [...new Set([...units, 'Por mayor', 'Personalizado'])];
}

function whatsappUrl(message) {
  const base = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
}

function sendWhatsApp(message) {
  window.open(whatsappUrl(message), '_blank', 'noopener');
}

function mapUrl() {
  const { lat, lng } = SITE.location;
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

const HYDRATORS = {
  nav: () => SITE.nav.map((item, index) => `<a href="${item.href}" class="${index === 0 ? 'is-active' : ''}">${item.label}</a>`).join(''),

  hero: () => `
    <span class="eyebrow"><i></i> FABRICACIÓN Y SOLUCIONES TEXTILES</span>
    <h1 id="heroTitle">Tejemos calidad.<br><em>Construimos confianza.</em></h1>
    <p>Productos textiles versátiles, fabricación especializada y soluciones adaptadas a cada necesidad.</p>
    <div class="hero__buttons">
      <a class="button button--solid" href="#productos">Explorar catálogo ↗</a>
      <a class="button button--ghost" href="#contacto">Solicitar cotización</a>
    </div>
    <div class="hero__stats">
      <div><strong>${CATEGORIES.length}</strong><span>categorías</span></div>
      <div><strong>${PRODUCTS.length}</strong><span>productos textiles</span></div>
      <div><strong>100%</strong><span>atención personalizada</span></div>
    </div>`,

  strip: () => SITE.strip.map(text => `<span>${text}</span>`).join(''),

  categories: () => CATEGORIES.map((category, index) => `
    <button class="category-card" data-category="${safe(category)}">
      <span class="category-card__number">${String(index + 1).padStart(2, '0')}</span>
      <strong>${safe(category)}</strong>
      <span>${PRODUCTS.filter(product => product.category === category).length} productos ↗</span>
    </button>`).join(''),

  about: () => `
    <div class="about__image"><img src="${SITE.aboutImage}" alt="Proceso de tejido textil" loading="lazy"></div>
    <div>
      <span class="eyebrow">QUIÉNES SOMOS</span>
      <h2 id="aboutTitle">${SITE.about.title}</h2>
      <p>${SITE.about.text}</p>
      <div class="about-points">${SITE.about.points.map(point => `<span>✓ ${point}</span>`).join('')}</div>
      <a class="button button--solid" href="#contacto">Hablar con Limatex</a>
    </div>`,

  location: () => `
    <div class="location-card__copy">
      <span class="eyebrow">ENCUÉNTRANOS</span>
      <h3>Visita Limatex</h3>
      <p>Coordenadas: ${SITE.location.lat}, ${SITE.location.lng}</p>
      <a class="button button--outline" href="${mapUrl()}" target="_blank" rel="noopener">Abrir en Maps ↗</a>
    </div>
    <iframe title="Ubicación de Limatex en el mapa" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${SITE.location.lat},${SITE.location.lng}&z=16&output=embed"></iframe>`,

  footer: () => `
    <a class="brand" href="#inicio"><span class="brand__mark">L</span><span>LIMATEX<small>INDUSTRIA TEXTIL</small></span></a>
    <span>Soluciones textiles · Calidad en cada hilo</span>
    <span>© ${new Date().getFullYear()} LIMATEX</span>`
};

function hydrate() {
  $$('[data-hydrate]').forEach(node => {
    const render = HYDRATORS[node.dataset.hydrate];
    if (render) node.innerHTML = render();
  });

  const hero = $('#heroImage');
  hero.addEventListener('error', () => hero.remove(), { once: true });
  hero.src = SITE.heroImage;
  $$('.about__image img').forEach(img => img.addEventListener('error', () => img.remove(), { once: true }));

  renderCategoryChips();
  renderProducts();
  renderQuoteCategories();
  renderQuoteProducts();
  renderPresentations();
  updateCart();
  updateAccountUI();
  document.body.dataset.hydrated = 'true';
}

function filteredProducts() {
  const term = $('#productSearch').value.trim().toLowerCase();
  const sort = $('#sortFilter').value;
  const list = PRODUCTS.filter(product =>
    (state.category === 'all' || product.category === state.category) &&
    `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term)
  );
  if (sort === 'az') list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  if (sort === 'za') list.sort((a, b) => b.name.localeCompare(a.name, 'es'));
  return list;
}

function renderCategoryChips() {
  const chip = (value, label, count) =>
    `<button type="button" class="chip ${state.category === value ? 'is-active' : ''}" data-chip="${safe(value)}" aria-pressed="${state.category === value}">${safe(label)}<small>${count}</small></button>`;
  $('#categoryChips').innerHTML =
    chip('all', 'Todas', PRODUCTS.length) +
    CATEGORIES.map(category => chip(category, category, PRODUCTS.filter(product => product.category === category).length)).join('');
}

function productCard(product) {
  const promo = priceOf(product).promo;
  return `
    <article class="product-card">
      <button type="button" class="product-card__image" data-zoom="${product.id}" aria-label="Ampliar imagen de ${safe(product.name)}">
        <img src="${productImage(product)}" alt="${safe(product.name)}" loading="lazy">
        ${promo ? `<span class="promo-badge">${safe(promo)}</span>` : ''}
        <span class="product-card__zoom">⤢ Ampliar</span>
      </button>
      <div class="product-card__body">
        <span class="product-card__category">${safe(product.category)}</span>
        <h3>${safe(product.name)}</h3>
        <p>${safe(product.description)}</p>
        <div class="product-card__foot">
          <div><span>${safe(product.unit)}</span><br>${priceLabel(product)}</div>
          <button type="button" class="button button--solid button--small" data-add="${product.id}">Agregar +</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const list = filteredProducts();
  $('#productTotal').textContent = list.length;
  $('#productGrid').innerHTML = list.length
    ? list.map(productCard).join('')
    : '<div class="empty-state">No encontramos productos con esa búsqueda.</div>';
}

function setCategory(category) {
  state.category = category;
  renderCategoryChips();
  renderProducts();
}

function renderQuoteCategories() {
  $('#quoteCategories').innerHTML = CATEGORIES.map(category =>
    `<button type="button" class="chip ${state.quoteCategory === category ? 'is-active' : ''}" data-quote-category="${safe(category)}" aria-pressed="${state.quoteCategory === category}">${safe(category)}</button>`
  ).join('');
}

function renderQuoteProducts() {
  const holder = $('#quoteProducts');
  if (!state.quoteCategory) {
    holder.innerHTML = '<p class="picker__hint">Elige una categoría para ver sus productos.</p>';
    return;
  }
  const selected = $('#quoteForm input[name="product"]:checked')?.value;
  holder.innerHTML = PRODUCTS.filter(product => product.category === state.quoteCategory).map(product => `
    <label class="picker__option">
      <input type="radio" name="product" value="${product.id}" ${String(product.id) === selected ? 'checked' : ''}>
      <img src="${productImage(product)}" alt="">
      <span>${safe(product.name)}</span>
    </label>`).join('');
}

function selectedProduct() {
  const id = $('#quoteForm input[name="product"]:checked')?.value;
  return PRODUCTS.find(product => String(product.id) === id) || null;
}

function renderPresentations() {
  const product = selectedProduct();
  const select = $('#qPresentation');
  const current = select.value;
  const units = product ? unitsOf(product) : ['Unidad', 'Rollo', 'Por mayor', 'Personalizado'];
  select.innerHTML = units.map(unit => `<option ${unit === current ? 'selected' : ''}>${safe(unit)}</option>`).join('');
  updateQuoteSummary();
}

function updateQuoteSummary() {
  const form = $('#quoteForm');
  const product = selectedProduct();
  const quantity = form.elements.quantity.value || '0';
  const presentation = form.elements.presentation.value;
  if (!product) {
    $('#quoteSummary').innerHTML = 'Resumen: aún no elegiste un producto.';
    return;
  }
  const info = priceOf(product);
  const price = info.price ? `Precio referencial: <b>Bs ${safe(info.price)}</b>` : 'Precio: <b>se cotiza según cantidad</b>';
  $('#quoteSummary').innerHTML = `Resumen: <b>${safe(product.name)}</b> · ${safe(quantity)} ${safe(presentation)}<br>${price}${info.promo ? ` · Promoción: <b>${safe(info.promo)}</b>` : ''}`;
}

function updateCart() {
  save(KEYS.cart, state.cart);
  $('#cartCount').textContent = state.cart.reduce((total, item) => total + item.qty, 0);
}

function addToCart(id) {
  const product = PRODUCTS.find(item => item.id === Number(id));
  if (!product) return;
  const found = state.cart.find(item => item.id === product.id);
  if (found) found.qty++;
  else state.cart.push({ id: product.id, name: product.name, qty: 1 });
  updateCart();
  log('Agregó ' + product.name + ' a la solicitud');
  toast(product.name + ' agregado a tu solicitud');
}

function renderCart() {
  $('#cartItems').innerHTML = state.cart.length
    ? state.cart.map(item => `
        <div class="cart-line">
          <span>${safe(item.name)}</span>
          <span class="cart-line__qty">
            <button type="button" data-cart-minus="${item.id}" aria-label="Quitar uno">−</button>
            <b>${item.qty}</b>
            <button type="button" data-cart-plus="${item.id}" aria-label="Agregar uno">+</button>
            <button type="button" class="text-link" data-remove="${item.id}">Quitar</button>
          </span>
        </div>`).join('')
    : '<div class="empty-state">Todavía no agregaste productos.</div>';
  const total = state.cart.reduce((sum, item) => sum + item.qty, 0);
  $('#cartSummary').textContent = `${total} ${total === 1 ? 'unidad' : 'unidades'} en total`;
}

function changeQty(id, delta) {
  const item = state.cart.find(entry => entry.id === Number(id));
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) state.cart = state.cart.filter(entry => entry !== item);
  updateCart();
  renderCart();
}

const VALIDATORS = {
  name: value => {
    const text = value.trim();
    if (text.length < 3) return 'Escribe tu nombre (mínimo 3 letras).';
    if (!/^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u.test(text)) return 'Solo letras, espacios, apóstrofes o guiones.';
    return '';
  },
  phone: value => {
    const digits = value.replace(/[\s\-()]/g, '');
    if (!digits) return 'Escribe tu teléfono.';
    if (!/^\+?\d{7,15}$/.test(digits)) return 'Teléfono no válido (7 a 15 dígitos).';
    return '';
  },
  product: value => (value ? '' : 'Elige una categoría y marca un producto.'),
  quantity: value => {
    const number = Number(value);
    if (!Number.isInteger(number) || number < 1) return 'La cantidad debe ser un número entero mayor a 0.';
    if (number > 99999) return 'La cantidad máxima es 99999.';
    return '';
  }
};

function validateQuote(data) {
  const errors = {};
  Object.keys(VALIDATORS).forEach(field => {
    const message = VALIDATORS[field](String(data[field] ?? ''));
    if (message) errors[field] = message;
  });
  if (String(data.details ?? '').length > 500) errors.details = 'Máximo 500 caracteres.';
  return errors;
}

function showErrors(errors) {
  $$('.field-error').forEach(el => {
    const message = errors[el.dataset.errorFor] || '';
    el.textContent = message;
    const field = $('#quoteForm').elements[el.dataset.errorFor];
    if (field && field.setAttribute) {
      field.classList.toggle('is-invalid', Boolean(message));
      field.setAttribute('aria-invalid', String(Boolean(message)));
    }
  });
}

function setupQuoteForm() {
  const form = $('#quoteForm');

  form.elements.name.addEventListener('input', event => {
    event.target.value = event.target.value.replace(/[^\p{L}\p{M} '\-]/gu, '').replace(/\s{2,}/g, ' ');
  });

  form.elements.phone.addEventListener('input', event => {
    event.target.value = event.target.value.replace(/[^0-9+()\- ]/g, '');
  });

  form.elements.details.addEventListener('input', event => {
    $('#detailsCount').textContent = `${event.target.value.length} / 500`;
  });

  form.addEventListener('input', updateQuoteSummary);
  form.addEventListener('change', event => {
    if (event.target.name === 'product') renderPresentations();
    updateQuoteSummary();
  });

  $('#quoteCategories').addEventListener('click', event => {
    const button = event.target.closest('[data-quote-category]');
    if (!button) return;
    state.quoteCategory = button.dataset.quoteCategory;
    renderQuoteCategories();
    renderQuoteProducts();
    renderPresentations();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const errors = validateQuote(data);
    showErrors(errors);
    const first = Object.keys(errors)[0];
    if (first) {
      const target = first === 'product' ? $('#quoteCategories button') : form.elements[first];
      target?.focus();
      toast('Revisa los datos marcados en el formulario');
      return;
    }
    submitQuote(data);
    form.reset();
    state.quoteCategory = '';
    $('#detailsCount').textContent = '0 / 500';
    renderQuoteCategories();
    renderQuoteProducts();
    renderPresentations();
  });
}

function submitQuote(data) {
  const product = PRODUCTS.find(item => String(item.id) === data.product);
  const info = priceOf(product);
  const order = {
    id: Date.now(),
    user: state.user?.username || 'Visitante',
    name: data.name.trim().replace(/\s+/g, ' '),
    phone: data.phone.trim(),
    product: product.name,
    presentation: data.presentation,
    quantity: Number(data.quantity),
    details: data.details.trim(),
    price: info.price,
    status: 'Pendiente',
    date: new Date().toLocaleString('es-BO')
  };
  state.orders.unshift(order);
  save(KEYS.orders, state.orders);
  log('Registró solicitud de ' + order.product);
  sendWhatsApp(
    `Hola, soy ${order.name}. Quiero solicitar una cotización en Limatex.\n` +
    `Producto: ${order.product}\nPresentación: ${order.presentation}\nCantidad: ${order.quantity}\n` +
    `Teléfono: ${order.phone}\nDetalles: ${order.details || 'Sin detalles'}`
  );
  toast('Solicitud registrada. Se abrió WhatsApp para enviarla.');
}

function openLightbox(id) {
  const list = filteredProducts().map(product => ({ src: productImage(product), caption: product.name, id: product.id }));
  const index = Math.max(0, list.findIndex(item => item.id === Number(id)));
  state.lightbox = { list, index, scale: 1 };
  showLightboxImage();
  const box = $('#lightbox');
  box.classList.add('is-open');
  box.setAttribute('aria-hidden', 'false');
  $('#lightboxClose').focus();
}

function closeLightbox() {
  const box = $('#lightbox');
  box.classList.remove('is-open');
  box.setAttribute('aria-hidden', 'true');
}

function showLightboxImage() {
  const { list, index } = state.lightbox;
  const item = list[index];
  if (!item) return;
  const img = $('#lightboxImage');
  img.src = item.src;
  img.alt = item.caption;
  $('#lightboxCaption').textContent = `${item.caption} (${index + 1}/${list.length})`;
  setZoom(1);
}

function setZoom(scale) {
  const clamped = Math.min(4, Math.max(1, Math.round(scale * 100) / 100));
  state.lightbox.scale = clamped;
  const img = $('#lightboxImage');
  const stage = $('#lightboxStage');
  img.style.width = '';
  img.style.maxWidth = '';
  img.style.maxHeight = '';
  if (clamped > 1) {
    const base = img.getBoundingClientRect().width;
    img.style.maxWidth = 'none';
    img.style.maxHeight = 'none';
    img.style.width = `${Math.round(base * clamped)}px`;
  }
  stage.classList.toggle('is-zoomed', clamped > 1);
  $('#zoomLevel').textContent = `${Math.round(clamped * 100)}%`;
}

function stepLightbox(delta) {
  const { list } = state.lightbox;
  if (!list.length) return;
  state.lightbox.index = (state.lightbox.index + delta + list.length) % list.length;
  showLightboxImage();
}

function setupLightbox() {
  $('#lightboxClose').addEventListener('click', closeLightbox);
  $('#lightboxPrev').addEventListener('click', () => stepLightbox(-1));
  $('#lightboxNext').addEventListener('click', () => stepLightbox(1));
  $('#zoomIn').addEventListener('click', () => setZoom(state.lightbox.scale + 0.5));
  $('#zoomOut').addEventListener('click', () => setZoom(state.lightbox.scale - 0.5));

  $('#lightboxImage').addEventListener('click', () => setZoom(state.lightbox.scale > 1 ? 1 : 2.5));

  $('#lightboxStage').addEventListener('click', event => {
    if (event.target.id === 'lightboxStage') closeLightbox();
  });

  $('#lightboxStage').addEventListener('wheel', event => {
    event.preventDefault();
    setZoom(state.lightbox.scale + (event.deltaY < 0 ? 0.25 : -0.25));
  }, { passive: false });
}

function updateAccountUI() {
  $('#loginOpen').textContent = state.user ? 'Mi panel' : 'Ingresar';
}

function openModal(id) {
  const modal = $('#' + id);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  modal.dataset.opener = document.activeElement?.id || '';
  $('input, button.button', modal)?.focus();
}

function closeModal(id) {
  const modal = $('#' + id);
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  $('#' + modal.dataset.opener)?.focus();
}

function trapFocus(event) {
  const modal = $('.modal.is-open');
  if (!modal || event.key !== 'Tab') return;
  const items = $$('button, input, select, a[href]', modal).filter(el => !el.disabled && el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function login(username, password) {
  const user = DEMO_USERS[username.toLowerCase()];
  if (!user || user.password !== password) return false;
  state.user = { username: username.toLowerCase(), role: user.role };
  sessionStorage.setItem(KEYS.user, JSON.stringify(state.user));
  log('Inició sesión como ' + user.role);
  return true;
}

function logout() {
  log('Cerró sesión');
  state.user = null;
  sessionStorage.removeItem(KEYS.user);
  hidePanel();
  updateAccountUI();
  toast('Sesión cerrada');
}

function showPanel() {
  document.body.classList.add('panel-mode');
  $('#panel').hidden = false;
  $('#cartOpen').hidden = true;
  $('#roleTitle').textContent = 'Hola, ' + state.user.role;
  $('#roleSubtitle').textContent = 'Sesión iniciada como ' + state.user.username;
  const tabs = state.user.role === 'Gerente'
    ? ['Resumen', 'Pedidos', 'Precios', 'Bitácora']
    : state.user.role === 'Empleado' ? ['Pedidos', 'Bitácora'] : ['Mis solicitudes'];
  $('#roleTabs').innerHTML = tabs.map(tab => `<button type="button" role="tab" class="role-tab" data-role-tab="${tab}">${tab}</button>`).join('');
  renderRoleTab(tabs[0]);
  window.scrollTo(0, 0);
}

function hidePanel() {
  document.body.classList.remove('panel-mode');
  $('#panel').hidden = true;
  $('#cartOpen').hidden = false;
}

function ordersTable(rows, canEdit, canDelete) {
  if (!rows.length) return '<div class="empty-state">Todavía no hay solicitudes.</div>';
  return `<table class="data-table"><thead><tr><th>Fecha</th><th>Cliente</th><th>Solicitud</th><th>Estado</th>${canEdit ? '<th>Actualizar</th>' : ''}${canDelete ? '<th></th>' : ''}</tr></thead><tbody>${rows.map(order => `
    <tr>
      <td>${safe(order.date)}</td>
      <td>${safe(order.name)}<br><small>${safe(order.phone)}</small></td>
      <td>${safe(order.product)} · ${safe(order.quantity)} ${safe(order.presentation)}${order.details ? `<br><small>${safe(order.details)}</small>` : ''}</td>
      <td>${safe(order.status)}</td>
      ${canEdit ? `<td><select class="status-select" data-status="${order.id}" aria-label="Estado del pedido">${STATUSES.map(status => `<option ${order.status === status ? 'selected' : ''}>${status}</option>`).join('')}</select></td>` : ''}
      ${canDelete ? `<td><button type="button" class="button button--danger button--small" data-delete-order="${order.id}">Eliminar</button></td>` : ''}
    </tr>`).join('')}</tbody></table>`;
}

function logLines(rows) {
  return rows.length
    ? rows.map(item => `<p class="log-line">${safe(item.date)} · <b>${safe(item.user)}</b> — ${safe(item.action)}</p>`).join('')
    : '<div class="empty-state">Sin actividad registrada.</div>';
}

function renderRoleTab(tab) {
  $$('.role-tab').forEach(button => {
    const active = button.dataset.roleTab === tab;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });
  const content = $('#roleContent');
  const role = state.user.role;

  if (tab === 'Resumen') {
    content.innerHTML = `
      <div class="dashboard-grid">
        <div class="metric"><span>Solicitudes registradas</span><strong>${state.orders.length}</strong></div>
        <div class="metric"><span>Pendientes</span><strong>${state.orders.filter(order => order.status === 'Pendiente').length}</strong></div>
        <div class="metric"><span>Productos del catálogo</span><strong>${PRODUCTS.length}</strong></div>
        <div class="metric"><span>Con precio definido</span><strong>${PRODUCTS.filter(product => priceOf(product).price).length}</strong></div>
      </div>
      <div class="data-panel"><h3>Actividad reciente</h3>${logLines(state.logs.slice(0, 6))}</div>`;
  } else if (tab === 'Pedidos' || tab === 'Mis solicitudes') {
    const rows = tab === 'Mis solicitudes' ? state.orders.filter(order => order.user === state.user.username) : state.orders;
    const tools = role !== 'Cliente'
      ? `<div class="data-panel__tools"><button type="button" class="button button--outline button--small" id="exportOrders">Exportar CSV ↓</button>${role === 'Gerente' ? '<button type="button" class="button button--danger button--small" id="clearOrders">Borrar todos</button>' : ''}</div>`
      : '';
    content.innerHTML = `<div class="data-panel"><h3>${tab}</h3>${tools}${ordersTable(rows, role !== 'Cliente', role === 'Gerente')}</div>`;
  } else if (tab === 'Precios') {
    content.innerHTML = `<div class="data-panel"><h3>Precios y promociones</h3>
      <p class="log-line">Los precios están vacíos hasta que los definas aquí. Mientras estén vacíos, el catálogo muestra "Precio por cotización".</p>
      <table class="data-table"><thead><tr><th>Producto</th><th>Presentación</th><th>Precio (Bs)</th><th>Promoción</th></tr></thead><tbody>${PRODUCTS.map(product => `
        <tr>
          <td>${safe(product.name)}</td>
          <td>${safe(product.unit)}</td>
          <td><input class="price-input" inputmode="decimal" maxlength="9" data-price="${product.id}" value="${safe(priceOf(product).price)}" aria-label="Precio de ${safe(product.name)}"></td>
          <td><input class="price-input" maxlength="24" data-promo="${product.id}" value="${safe(priceOf(product).promo)}" aria-label="Promoción de ${safe(product.name)}" placeholder="Ej. -10%"></td>
        </tr>`).join('')}</tbody></table></div>`;
  } else {
    content.innerHTML = `<div class="data-panel"><h3>Bitácora de actividades</h3>${logLines(state.logs)}</div>`;
  }
}

function exportOrders() {
  if (!state.orders.length) {
    toast('No hay solicitudes para exportar');
    return;
  }
  const columns = ['id', 'date', 'name', 'phone', 'product', 'presentation', 'quantity', 'details', 'price', 'status'];
  const csv = [
    columns.join(';'),
    ...state.orders.map(order => columns.map(col => '"' + String(order[col] ?? '').replace(/"/g, '""') + '"').join(';'))
  ].join('\n');
  const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'limatex-solicitudes.csv';
  link.click();
  URL.revokeObjectURL(url);
  log('Exportó solicitudes a CSV');
}

function savePrice(id, field, value) {
  const current = state.prices[id] || { price: '', promo: '' };
  current[field] = field === 'price' ? value.replace(/[^0-9.,]/g, '') : value.trim();
  state.prices[id] = current;
  save(KEYS.prices, state.prices);
  log('Actualizó ' + (field === 'price' ? 'precio' : 'promoción') + ' del producto ' + id);
  renderProducts();
  renderQuoteProducts();
  updateQuoteSummary();
  toast('Cambio guardado');
}

function setupAccount() {
  $('#loginOpen').addEventListener('click', () => {
    if (state.user) showPanel();
    else openModal('loginModal');
  });

  $('#loginForm').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = String(data.get('username')).trim();
    const password = String(data.get('password'));
    if (!username || !password) {
      $('#loginError').textContent = 'Completa usuario y contraseña.';
      return;
    }
    if (!login(username, password)) {
      $('#loginError').textContent = 'Usuario o contraseña incorrectos.';
      return;
    }
    event.currentTarget.reset();
    $('#loginError').textContent = '';
    closeModal('loginModal');
    updateAccountUI();
    showPanel();
    toast('Bienvenido a Limatex');
  });

  $('#logoutButton').addEventListener('click', logout);

  $('#roleContent').addEventListener('change', event => {
    const { target } = event;
    if (target.dataset.status) {
      const order = state.orders.find(item => item.id === Number(target.dataset.status));
      if (!order) return;
      order.status = target.value;
      save(KEYS.orders, state.orders);
      log(`Actualizó pedido ${order.id} a ${order.status}`);
      toast('Estado actualizado');
    } else if (target.dataset.price) {
      savePrice(target.dataset.price, 'price', target.value);
    } else if (target.dataset.promo) {
      savePrice(target.dataset.promo, 'promo', target.value);
    }
  });

  $('#roleContent').addEventListener('click', event => {
    const del = event.target.closest('[data-delete-order]');
    if (del && confirm('¿Eliminar esta solicitud?')) {
      state.orders = state.orders.filter(order => order.id !== Number(del.dataset.deleteOrder));
      save(KEYS.orders, state.orders);
      log('Eliminó una solicitud');
      renderRoleTab('Pedidos');
      return;
    }
    if (event.target.id === 'exportOrders') exportOrders();
    if (event.target.id === 'clearOrders' && confirm('Se borrarán todas las solicitudes guardadas. ¿Continuar?')) {
      state.orders = [];
      save(KEYS.orders, state.orders);
      log('Borró todas las solicitudes');
      renderRoleTab('Pedidos');
    }
  });

  $('#roleTabs').addEventListener('click', event => {
    const tab = event.target.closest('[data-role-tab]');
    if (tab) renderRoleTab(tab.dataset.roleTab);
  });
}

function setupCatalog() {
  $('#productSearch').addEventListener('input', renderProducts);
  $('#sortFilter').addEventListener('change', renderProducts);

  $('#categoryChips').addEventListener('click', event => {
    const chip = event.target.closest('[data-chip]');
    if (chip) setCategory(chip.dataset.chip);
  });

  $('#homeCategories').addEventListener('click', event => {
    const card = event.target.closest('[data-category]');
    if (!card) return;
    setCategory(card.dataset.category);
    $('#productos').scrollIntoView({ behavior: 'smooth' });
  });

  $('#productGrid').addEventListener('click', event => {
    const add = event.target.closest('[data-add]');
    if (add) {
      addToCart(add.dataset.add);
      return;
    }
    const zoom = event.target.closest('[data-zoom]');
    if (zoom) openLightbox(zoom.dataset.zoom);
  });

  $('#productGrid').addEventListener('error', event => {
    const img = event.target;
    if (img.tagName !== 'IMG') return;
    const product = PRODUCTS.find(item => item.name === img.alt);
    if (product && img.src !== productArt(product)) img.src = productArt(product);
  }, true);
}

function setupCart() {
  $('#cartOpen').addEventListener('click', () => {
    renderCart();
    openModal('cartModal');
  });

  $('#cartItems').addEventListener('click', event => {
    const plus = event.target.closest('[data-cart-plus]');
    const minus = event.target.closest('[data-cart-minus]');
    const remove = event.target.closest('[data-remove]');
    if (plus) changeQty(plus.dataset.cartPlus, 1);
    if (minus) changeQty(minus.dataset.cartMinus, -1);
    if (remove) {
      state.cart = state.cart.filter(item => item.id !== Number(remove.dataset.remove));
      updateCart();
      renderCart();
    }
  });

  $('#sendCart').addEventListener('click', () => {
    if (!state.cart.length) {
      toast('Agrega productos primero');
      return;
    }
    sendWhatsApp('Hola, quiero consultar por estos productos de Limatex:\n' + state.cart.map(item => `- ${item.name}: ${item.qty}`).join('\n'));
    log('Envió selección del catálogo por WhatsApp');
  });
}

function setupShell() {
  document.body.classList.toggle('dark', localStorage.getItem(KEYS.theme) === 'dark');

  $('#themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem(KEYS.theme, document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  $('#menuToggle').addEventListener('click', () => {
    const open = $('#mainNav').classList.toggle('is-open');
    $('#menuToggle').setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link) {
      const hash = link.getAttribute('href');
      if (hash && hash.length > 1) {
        const id = hash.slice(1);
        if (['inicio', 'productos', 'empresa', 'contacto', 'panel'].includes(id)) {
          event.preventDefault();
          history.pushState(null, '', hash);
          showSection(id);
        }
      }
    }
    const close = event.target.closest('[data-close]');
    if (close) closeModal(close.dataset.close);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeLightbox();
      $$('.modal.is-open').forEach(modal => closeModal(modal.id));
    }
    if ($('#lightbox').classList.contains('is-open')) {
      if (event.key === 'ArrowLeft') stepLightbox(-1);
      if (event.key === 'ArrowRight') stepLightbox(1);
      if (event.key === '+' || event.key === '=') setZoom(state.lightbox.scale + 0.5);
      if (event.key === '-') setZoom(state.lightbox.scale - 0.5);
    }
    trapFocus(event);
  });

  // Navegación por hash sin scroll de ventana
  window.addEventListener('hashchange', () => {
    if (location.hash) showSection(location.hash.slice(1));
  });
  showSection(location.hash ? location.hash.slice(1) : 'inicio');
}

function runSmokeTests() {
  const form = $('#quoteForm');
  const checks = [
    ['Catálogo con productos únicos', new Set(PRODUCTS.map(product => product.id)).size === PRODUCTS.length],
    ['Todos los productos tienen categoría e imagen', PRODUCTS.every(product => product.category && productImage(product))],
    ['Página hidratada', document.body.dataset.hydrated === 'true'],
    ['Ningún bloque de hidratación vacío', $$('[data-hydrate]').every(node => node.innerHTML.trim().length > 0)],
    ['Tarjetas renderizadas', $$('.product-card').length === filteredProducts().length],
    ['Selector de pedidos por categoría', $$('#quoteCategories .chip').length === CATEGORIES.length],
    ['Validación rechaza datos incorrectos', Object.keys(validateQuote({ name: '12', phone: 'abc', product: '', quantity: '0', details: '' })).length === 4],
    ['Validación acepta datos correctos', Object.keys(validateQuote({ name: 'Ana Pérez', phone: '70012345', product: '1', quantity: '5', details: '' })).length === 0],
    ['Formulario con etiquetas', $$('#quoteForm label').length > 0 && Boolean(form)],
    ['LocalStorage disponible', (() => { try { localStorage.setItem('t', '1'); localStorage.removeItem('t'); return true; } catch { return false; } })()],
    ['Manifest enlazado', Boolean($('link[rel="manifest"]'))],
    ['Service Worker soportado', 'serviceWorker' in navigator],
    ['Ubicación configurada', SITE.location.lat === -16.583668 && SITE.location.lng === -68.186915],
    ['Landmarks semánticos', Boolean($('header') && $('main') && $('footer') && $('nav'))]
  ];
  const rows = checks.map(([name, ok]) => ({ prueba: name, resultado: ok ? 'OK' : 'FALLA' }));
  console.table(rows);
  const failed = rows.filter(row => row.resultado === 'FALLA').length;
  toast(failed ? `Smoke test: ${failed} prueba(s) fallaron` : `Smoke test: ${rows.length} pruebas correctas`);
  return rows;
}

function setupServiceWorker() {
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    });
  }
}


function showSection(sectionId) {
  const id = (sectionId || 'inicio').replace('#', '');
  const valid = ['inicio', 'productos', 'empresa', 'contacto', 'panel'];
  const targetId = valid.includes(id) ? id : 'inicio';
  const target = document.getElementById(targetId);
  if (!target) return;

  if (targetId !== 'panel' && document.body.classList.contains('panel-mode')) {
    document.body.classList.remove('panel-mode');
  }

  $('.site-section, .panel').forEach(el => {
    el.classList.remove('is-active');
    el.hidden = true;
  });

  target.hidden = false;
  target.classList.add('is-active');
  target.scrollTop = 0;

  $('#mainNav a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('is-active', href === `#${targetId}`);
  });

  const mainNav = $('#mainNav');
  if (mainNav) mainNav.classList.remove('is-open');
  const menuToggle = $('#menuToggle');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

function init() {
  hydrate();
  setupShell();
  setupCatalog();
  setupCart();
  setupQuoteForm();
  setupLightbox();
  setupAccount();
  setupServiceWorker();
  if (state.user) showPanel();
  if (location.hash === '#test' || location.search.includes('test')) runSmokeTests();
}

document.addEventListener('DOMContentLoaded', init);
