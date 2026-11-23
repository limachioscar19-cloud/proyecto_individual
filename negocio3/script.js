'use strict';

const SITE = {
  name: 'LIMATEX',
  whatsapp: '',
  location: { lat: -16.583668, lng: -68.186915 },
  aboutImage: 'imagenes/fabricacion_personalizada.jpg',
  nav: [
    { view: 'inicio', label: 'Inicio' },
    { view: 'productos', label: 'Productos' },
    { view: 'empresa', label: 'Empresa' },
    { view: 'contacto', label: 'Contacto' }
  ],
  about: {
    title: 'Soluciones textiles para distintos sectores.',
    text: 'Limatex trabaja en la elaboración y comercialización de productos textiles mediante procesos de tejido y maquinaria. Nuestro catálogo reúne distintas líneas y presentaciones.',
    points: ['Atención por cantidad', 'Presentaciones por unidad y rollo', 'Consultas personalizadas']
  }
};

const PRODUCTS = [
  { id: 1, name: 'Guatos de carpeta', category: 'Accesorios textiles', description: 'Tiras tejidas para terminaciones y accesorios de carpeta.', unit: 'Rollo / metro', photo: 'imagenes/guato_carpeta.jpg' },
  { id: 2, name: 'Cintas textiles', category: 'Accesorios textiles', description: 'Cintas tejidas para distintos usos y acabados.', unit: 'Rollo', photo: 'imagenes/cinta_textil.jpg' },
  { id: 3, name: 'Ribetes tejidos', category: 'Accesorios textiles', description: 'Ribetes para terminaciones y confección.', unit: 'Rollo', photo: 'imagenes/ribete_tejido.webp' },
  { id: 4, name: 'Vendas de tela', category: 'Vendas y curación', description: 'Producto textil en presentación enrollada.', unit: 'Unidad / rollo', photo: 'imagenes/venda.webp' },
  { id: 5, name: 'Vendas elásticas', category: 'Vendas y curación', description: 'Tejido flexible para diferentes necesidades.', unit: 'Unidad / rollo', photo: 'imagenes/venda_elastica.webp' },
  { id: 6, name: 'Vendas de gasa', category: 'Vendas y curación', description: 'Material textil ligero en rollo.', unit: 'Unidad / rollo', photo: 'imagenes/venda_gasa.jpg' },
  { id: 7, name: 'Cintas elásticas', category: 'Cintas y bandas', description: 'Bandas textiles con elasticidad.', unit: 'Rollo / metro', photo: 'imagenes/cinta_elastica.jpg' },
  { id: 8, name: 'Bandas tejidas', category: 'Cintas y bandas', description: 'Bandas resistentes para aplicaciones textiles.', unit: 'Rollo', photo: 'imagenes/banda_textil.jpg' },
  { id: 9, name: 'Cintas decorativas', category: 'Cintas y bandas', description: 'Cintas para detalles y acabados.', unit: 'Rollo', photo: 'imagenes/cinta_decorativa.jpg' },
  { id: 10, name: 'Hilos de algodón', category: 'Hilos textiles', description: 'Hilos para trabajos y procesos textiles.', unit: 'Cono', photo: 'imagenes/hilos_algodon.jpg' },
  { id: 11, name: 'Hilos sintéticos', category: 'Hilos textiles', description: 'Hilos de fibras sintéticas en distintas presentaciones.', unit: 'Cono', photo: 'imagenes/hilo_sintetico.jpg' },
  { id: 12, name: 'Hilos industriales', category: 'Hilos textiles', description: 'Conos de hilo para procesos de fabricación.', unit: 'Cono / lote', photo: 'imagenes/hilo_industrial.webp' },
  { id: 13, name: 'Tejidos de algodón', category: 'Telas y tejidos', description: 'Tejidos textiles de algodón.', unit: 'Metro / rollo', photo: 'imagenes/tejido_algodon.jpg' },
  { id: 14, name: 'Tejidos sintéticos', category: 'Telas y tejidos', description: 'Tejidos elaborados con fibras sintéticas.', unit: 'Metro / rollo', photo: 'imagenes/tejido_sintetico.jpg' },
  { id: 15, name: 'Telas industriales', category: 'Telas y tejidos', description: 'Materiales textiles para diferentes aplicaciones.', unit: 'Rollo', photo: 'imagenes/tela_industrial.jpg' },
  { id: 16, name: 'Cordones textiles', category: 'Cordones y tejidos', description: 'Cordones fabricados mediante tejido o trenzado.', unit: 'Rollo / metro', photo: 'imagenes/cordon_textil.jpg' },
  { id: 17, name: 'Cuerdas trenzadas', category: 'Cordones y tejidos', description: 'Cordones trenzados para distintos usos.', unit: 'Rollo', photo: 'imagenes/cuerda_trenzada.webp' },
  { id: 18, name: 'Sesgos textiles', category: 'Insumos de confección', description: 'Tiras textiles para terminaciones de prendas.', unit: 'Rollo', photo: 'imagenes/sesgo_textil.jpg' },
  { id: 19, name: 'Tiras para confección', category: 'Insumos de confección', description: 'Insumos textiles para procesos de confección.', unit: 'Rollo / metro', photo: 'imagenes/tira_confeccion.jpg' },
  { id: 20, name: 'Fabricación personalizada', category: 'Pedidos personalizados', description: 'Consulta por medidas, materiales y cantidades especiales.', unit: 'Por cotización', photo: 'imagenes/fabricacion_personalizada.jpg' }
];

const CATEGORIES = [...new Set(PRODUCTS.map(product => product.category))];
const VIEWS = ['inicio', 'productos', 'empresa', 'contacto', 'panel'];
const STATUSES = ['Pendiente', 'En proceso', 'Listo', 'Entregado', 'Cancelado'];

const DEMO_USERS = {
  cliente: { password: 'cliente123', role: 'Cliente' },
  empleado: { password: 'empleado123', role: 'Empleado' },
  gerente: { password: 'gerente123', role: 'Gerente' }
};

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
  pages: { products: 0, cart: 0, panel: 0 },
  tab: '',
  lightbox: { list: [], index: 0, scale: 1 },
  step: 1,
  quoteCategory: ''
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
  toast.timer = setTimeout(() => el.classList.remove('show'), 2800);
}

function log(action) {
  state.logs.unshift({ action, user: state.user?.username || 'Visitante', date: new Date().toLocaleString('es-BO') });
  state.logs = state.logs.slice(0, 150);
  save(KEYS.logs, state.logs);
}

function cssVar(el, name) {
  return parseFloat(getComputedStyle(el).getPropertyValue(name)) || 0;
}

function priceOf(product) {
  return state.prices[product.id] || { price: '', promo: '' };
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
  nav: () => SITE.nav.map(item => `<a href="#${item.view}" data-go="${item.view}">${item.label}</a>`).join('') +
    '<div class="nav-tools"><button type="button" class="icon-btn" data-action="theme" aria-label="Cambiar tema">◐</button></div>',

  hero: () => `
    <p class="kicker"><i></i> FABRICACIÓN TEXTIL</p>
    <h1 id="heroTitle">Tejemos calidad.<br><em>Construimos confianza.</em></h1>
    <p>Productos textiles versátiles, fabricación especializada y soluciones adaptadas a cada necesidad.</p>
    <div class="hero-buttons">
      <button type="button" class="btn primary" data-go="productos">Explorar catálogo ↗</button>
      <button type="button" class="btn outline" data-go="contacto">Solicitar cotización</button>
    </div>
    <div class="hero-stats">
      <div><strong>${CATEGORIES.length}</strong><span>categorías</span></div>
      <div><strong>${PRODUCTS.length}</strong><span>productos textiles</span></div>
      <div><strong>100%</strong><span>atención personalizada</span></div>
    </div>`,

  about: () => `
    <div class="about__image"><img src="${SITE.aboutImage}" alt="Taller de fabricación textil de Limatex" loading="lazy"></div>
    <div class="about-copy">
      <p class="kicker">QUIÉNES SOMOS</p>
      <h2 id="aboutTitle">${SITE.about.title}</h2>
      <p>${SITE.about.text}</p>
      <div class="about-points">${SITE.about.points.map(point => `<span>✓ ${point}</span>`).join('')}</div>
      <div><button type="button" class="btn primary" data-go="contacto">Hablar con Limatex</button></div>
    </div>`,

  location: () => `
    <div class="location-card__copy">
      <p class="kicker">ENCUÉNTRANOS</p>
      <h3>Visita Limatex</h3>
      <p>Coordenadas: ${SITE.location.lat}, ${SITE.location.lng}</p>
      <a class="btn outline small" href="${mapUrl()}" target="_blank" rel="noopener">Abrir en Maps ↗</a>
    </div>
    <iframe title="Ubicación de Limatex en el mapa" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${SITE.location.lat},${SITE.location.lng}&z=16&output=embed"></iframe>`,

  footer: () => `<span>Fabricación textil · Calidad en cada hilo</span><span>© ${new Date().getFullYear()} LIMATEX</span>`
};

function hydrate() {
  $$('[data-hydrate]').forEach(node => {
    const render = HYDRATORS[node.dataset.hydrate];
    if (render) node.innerHTML = render();
  });
  $('#locLink').href = mapUrl();
  $$('.about__image img').forEach(img => img.addEventListener('error', () => img.remove(), { once: true }));
  $('#categoryFilter').innerHTML = '<option value="all">Todas las categorías</option>' + CATEGORIES.map(category => `<option>${safe(category)}</option>`).join('');
  $('#qCategory').innerHTML = '<option value="">Elige una categoría</option>' + CATEGORIES.map(category => `<option>${safe(category)}</option>`).join('');
  renderProducts();
  renderQuoteProducts();
  renderPresentations();
  updateCart();
  updateAccountUI();
  document.body.dataset.hydrated = 'true';
}

function showView(name) {
  if (!VIEWS.includes(name)) name = 'inicio';
  if (name === 'panel' && !state.user) name = 'inicio';
  $$('.view').forEach(view => view.classList.toggle('is-active', view.dataset.view === name));
  $$('#nav a').forEach(link => link.classList.toggle('is-active', link.dataset.go === name));
  document.body.dataset.view = name;
  if (location.hash !== '#' + name) history.replaceState(null, '', '#' + name);
  closeMenu();
  if (name === 'productos') renderProducts();
  if (name === 'panel') renderPanel();
}

function closeMenu() {
  $('#nav').classList.remove('open');
  $('#menuBtn').setAttribute('aria-expanded', 'false');
}

function fillPage(listEl, items, perPage, key, ids, render, emptyHTML) {
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  state.pages[key] = Math.min(state.pages[key] || 0, pages - 1);
  const start = state.pages[key] * perPage;
  listEl.innerHTML = items.length ? items.slice(start, start + perPage).map(render).join('') : emptyHTML;
  $(ids.label).textContent = `${state.pages[key] + 1} / ${pages}`;
  $(ids.prev).disabled = state.pages[key] === 0;
  $(ids.next).disabled = state.pages[key] >= pages - 1;
}

function rowsPerPage(listEl, rowHeight, gap = 8) {
  listEl.innerHTML = '';
  return Math.max(1, Math.floor((listEl.clientHeight + gap) / (rowHeight + gap)));
}

function filteredProducts() {
  const term = $('#productSearch').value.trim().toLowerCase();
  const category = $('#categoryFilter').value;
  const sort = $('#sortFilter').value;
  const list = PRODUCTS.filter(product =>
    (category === 'all' || product.category === category) &&
    `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term)
  );
  if (sort === 'az') list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  if (sort === 'za') list.sort((a, b) => b.name.localeCompare(a.name, 'es'));
  return list;
}

function productCard(product) {
  const info = priceOf(product);
  return `
    <article class="product-card">
      <div class="pc__media">
        <button type="button" class="pc__zoom" data-zoom="${product.id}" aria-label="Ampliar imagen de ${safe(product.name)}">
          <img src="${product.photo}" alt="${safe(product.name)}" loading="lazy">
        </button>
        ${info.promo ? `<span class="promo-badge">${safe(info.promo)}</span>` : ''}
        <span class="pc__hint">⤢ Ampliar</span>
        <button type="button" class="pc__add" data-add="${product.id}" aria-label="Agregar ${safe(product.name)} a la solicitud">+</button>
      </div>
      <div class="pc__body">
        <span class="pc__cat">${safe(product.category)}</span>
        <h3>${safe(product.name)}</h3>
        <span class="pc__meta">${safe(product.unit)} · ${info.price ? `<span class="price">Bs ${safe(info.price)}</span>` : 'Por cotización'}</span>
      </div>
    </article>`;
}

function renderProducts() {
  const list = filteredProducts();
  $('#productTotal').textContent = list.length;
  const grid = $('#productGrid');
  if (!grid.clientWidth || !grid.clientHeight) {
    grid.innerHTML = '';
    if (document.body.dataset.view !== 'productos') return;
  }
  const gap = parseFloat(getComputedStyle(grid).columnGap) || 12;
  const cardW = cssVar(document.documentElement, '--card-w');
  const cardH = cssVar(document.documentElement, '--card-h');
  grid.innerHTML = '';
  const cols = Math.max(1, Math.floor((grid.clientWidth + gap) / (cardW + gap)));
  const rows = Math.max(1, Math.floor((grid.clientHeight + gap) / (cardH + gap)));
  grid.style.setProperty('--cols', cols);
  grid.style.setProperty('--rows', rows);
  fillPage(grid, list, cols * rows, 'products', { label: '#prodLabel', prev: '#prodPrev', next: '#prodNext' }, productCard, '<p class="empty">No encontramos productos con esa búsqueda.</p>');
}

function setupCatalog() {
  const reset = () => {
    state.pages.products = 0;
    renderProducts();
  };
  $('#productSearch').addEventListener('input', reset);
  $('#categoryFilter').addEventListener('change', reset);
  $('#sortFilter').addEventListener('change', reset);
  $('#prodPrev').addEventListener('click', () => {
    state.pages.products = Math.max(0, state.pages.products - 1);
    renderProducts();
  });
  $('#prodNext').addEventListener('click', () => {
    state.pages.products += 1;
    renderProducts();
  });
  $('#productGrid').addEventListener('click', event => {
    const add = event.target.closest('[data-add]');
    if (add) return addToCart(add.dataset.add);
    const zoom = event.target.closest('[data-zoom]');
    if (zoom) openLightbox(zoom.dataset.zoom);
  });
  $('#productGrid').addEventListener('error', event => {
    if (event.target.tagName === 'IMG') event.target.style.visibility = 'hidden';
  }, true);
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
  const list = $('#cartItems');
  const perPage = rowsPerPage(list, 50, 0);
  fillPage(list, state.cart, perPage, 'cart', { label: '#cartLabel', prev: '#cartPrev', next: '#cartNext' }, item => `
    <div class="cart-line">
      <span>${safe(item.name)}</span>
      <span class="cart-line__qty">
        <button type="button" data-cart-minus="${item.id}" aria-label="Quitar uno">−</button>
        <b>${item.qty}</b>
        <button type="button" data-cart-plus="${item.id}" aria-label="Agregar uno">+</button>
        <button type="button" class="text-btn" data-remove="${item.id}">Quitar</button>
      </span>
    </div>`, '<p class="empty">Todavía no agregaste productos.</p>');
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

function setupCart() {
  $('#cartOpen').addEventListener('click', () => {
    openModal('cartModal');
    renderCart();
  });
  $('#cartPrev').addEventListener('click', () => {
    state.pages.cart = Math.max(0, state.pages.cart - 1);
    renderCart();
  });
  $('#cartNext').addEventListener('click', () => {
    state.pages.cart += 1;
    renderCart();
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
    if (!state.cart.length) return toast('Agrega productos primero');
    sendWhatsApp('Hola, quiero consultar por estos productos de Limatex:\n' + state.cart.map(item => `- ${item.name}: ${item.qty}`).join('\n'));
    log('Envió selección del catálogo por WhatsApp');
  });
}

const RULES = {
  name: value => {
    const text = value.trim();
    if (text.length < 3) return { ok: false, msg: 'Escribe al menos 3 letras.' };
    if (!/^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u.test(text)) return { ok: false, msg: 'Solo letras y espacios.' };
    return { ok: true };
  },
  phone: value => {
    const digits = value.replace(/[\s\-()]/g, '');
    if (!digits) return { ok: false, msg: 'Escribe tu teléfono.' };
    if (!/^\+?\d{7,15}$/.test(digits)) return { ok: false, msg: 'Teléfono no válido (7 a 15 dígitos).' };
    return { ok: true };
  },
  category: value => (value ? { ok: true } : { ok: false, msg: 'Elige una categoría.' }),
  quantity: value => {
    const number = Number(value);
    if (!value || !Number.isInteger(number) || number < 1) return { ok: false, msg: 'Debe ser un entero mayor a 0.' };
    if (number > 99999) return { ok: false, msg: 'Máximo 99999.' };
    return { ok: true };
  },
  user: value => (/^[a-z0-9_.]{3,20}$/i.test(value.trim()) ? { ok: true } : { ok: false, msg: '3 a 20 caracteres: letras, números, _ o .' }),
  pass: value => (value.length >= 6 ? { ok: true } : { ok: false, msg: 'Mínimo 6 caracteres.' })
};

function applyResult(field, control, result) {
  field.classList.remove('is-valid', 'is-invalid');
  const msg = $('.field__msg', field);
  if (msg) msg.textContent = '';
  if (control) control.removeAttribute('aria-invalid');
  if (result.ok) {
    field.classList.add('is-valid');
    return true;
  }
  field.classList.add('is-invalid');
  if (msg) msg.textContent = result.msg;
  if (control) control.setAttribute('aria-invalid', 'true');
  return false;
}

function validateField(control) {
  const rule = RULES[control.dataset.rule];
  const field = control.closest('.field');
  if (!rule || !field) return true;
  return applyResult(field, control, rule(control.value));
}

function validateProduct() {
  const field = $('#productField');
  const chosen = selectedProduct();
  return applyResult(field, null, chosen ? { ok: true } : { ok: false, msg: 'Elige un producto de la categoría.' });
}

function bindValidation(form) {
  form.addEventListener('input', event => {
    const control = event.target;
    if (!control.dataset?.rule) return;
    if (control.dataset.rule === 'name') control.value = control.value.replace(/[^\p{L}\p{M} '\-]/gu, '').replace(/\s{2,}/g, ' ');
    if (control.dataset.rule === 'phone') control.value = control.value.replace(/[^0-9+()\- ]/g, '');
    validateField(control);
  });
  form.addEventListener('change', event => {
    if (event.target.dataset?.rule) validateField(event.target);
  });
  form.addEventListener('focusout', event => {
    if (event.target.dataset?.rule) validateField(event.target);
  });
}

function selectedProduct() {
  const id = $('#quoteForm input[name="product"]:checked')?.value;
  return PRODUCTS.find(product => String(product.id) === id) || null;
}

function renderQuoteProducts() {
  const holder = $('#quoteProducts');
  if (!state.quoteCategory) {
    holder.innerHTML = '<p class="picker__hint">Elige una categoría para ver sus productos.</p>';
    return;
  }
  const selected = selectedProduct()?.id;
  holder.innerHTML = PRODUCTS.filter(product => product.category === state.quoteCategory).map(product => `
    <label class="picker__option">
      <input type="radio" name="product" value="${product.id}" ${product.id === selected ? 'checked' : ''}>
      <img src="${product.photo}" alt="">
      <span>${safe(product.name)}</span>
    </label>`).join('');
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
  if (!product) {
    $('#quoteSummary').innerHTML = 'Resumen: aún no elegiste un producto.';
    return;
  }
  const info = priceOf(product);
  const price = info.price ? `Precio referencial: <b>Bs ${safe(info.price)}</b>` : 'Precio: <b>se cotiza según cantidad</b>';
  $('#quoteSummary').innerHTML = `Resumen: <b>${safe(product.name)}</b> · ${safe(form.elements.quantity.value || '0')} ${safe(form.elements.presentation.value)}<br>${price}${info.promo ? ` · Promoción: <b>${safe(info.promo)}</b>` : ''}`;
}

function setStep(number) {
  state.step = number;
  $$('.step').forEach(step => step.classList.toggle('is-active', Number(step.dataset.step) === number));
  $$('#steps li').forEach((li, index) => {
    li.classList.toggle('is-active', index + 1 === number);
    li.classList.toggle('is-done', index + 1 < number);
    if (index + 1 === number) li.setAttribute('aria-current', 'step');
    else li.removeAttribute('aria-current');
  });
  $('#stepBack').hidden = number === 1;
  $('#stepNext').hidden = number === 3;
  $('#stepSend').hidden = number !== 3;
  if (number === 3) updateQuoteSummary();
  const first = $(`.step[data-step="${number}"] input:not([type="radio"]), .step[data-step="${number}"] select, .step[data-step="${number}"] textarea`);
  if (first && document.body.dataset.view === 'contacto') first.focus({ preventScroll: true });
}

function validateStep(number) {
  const container = $(`.step[data-step="${number}"]`);
  let firstInvalid = null;
  $$('[data-rule]', container).forEach(control => {
    if (!validateField(control) && !firstInvalid) firstInvalid = control;
  });
  if (number === 2 && !validateProduct() && !firstInvalid) firstInvalid = $('#quoteProducts input') || $('#qCategory');
  if (firstInvalid) firstInvalid.focus({ preventScroll: true });
  return !firstInvalid;
}

function setupQuoteForm() {
  const form = $('#quoteForm');
  bindValidation(form);

  $('#qCategory').addEventListener('change', event => {
    state.quoteCategory = event.target.value;
    renderQuoteProducts();
    renderPresentations();
    const field = $('#productField');
    field.classList.remove('is-valid', 'is-invalid');
    $('.field__msg', field).textContent = '';
  });

  form.addEventListener('change', event => {
    if (event.target.name === 'product') {
      renderPresentations();
      validateProduct();
    }
    if (event.target.name === 'presentation') updateQuoteSummary();
  });

  form.addEventListener('input', updateQuoteSummary);

  $('#stepNext').addEventListener('click', () => {
    if (validateStep(state.step)) setStep(state.step + 1);
  });

  $('#stepBack').addEventListener('click', () => setStep(Math.max(1, state.step - 1)));

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (state.step < 3) {
      if (validateStep(state.step)) setStep(state.step + 1);
      return;
    }
    for (const number of [1, 2]) {
      if (!validateStep(number)) {
        setStep(number);
        validateStep(number);
        toast('Revisa los datos marcados en rojo');
        return;
      }
    }
    submitQuote(Object.fromEntries(new FormData(form).entries()));
    form.reset();
    $$('.field', form).forEach(field => {
      field.classList.remove('is-valid', 'is-invalid');
      const msg = $('.field__msg', field);
      if (msg) msg.textContent = '';
    });
    state.quoteCategory = '';
    renderQuoteProducts();
    renderPresentations();
    setStep(1);
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
  const list = filteredProducts().map(product => ({ src: product.photo, caption: product.name, id: product.id }));
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
  const stage = $('#lightboxStage');
  $('#lightboxClose').addEventListener('click', closeLightbox);
  $('#lightboxPrev').addEventListener('click', () => stepLightbox(-1));
  $('#lightboxNext').addEventListener('click', () => stepLightbox(1));
  $('#zoomIn').addEventListener('click', () => setZoom(state.lightbox.scale + 0.5));
  $('#zoomOut').addEventListener('click', () => setZoom(state.lightbox.scale - 0.5));

  let drag = null;
  let moved = false;
  stage.addEventListener('pointerdown', event => {
    if (state.lightbox.scale <= 1) return;
    drag = { x: event.clientX, y: event.clientY, left: stage.scrollLeft, top: stage.scrollTop };
    moved = false;
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', event => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    stage.scrollLeft = drag.left - dx;
    stage.scrollTop = drag.top - dy;
  });
  stage.addEventListener('pointerup', () => {
    drag = null;
  });

  $('#lightboxImage').addEventListener('click', () => {
    if (moved) {
      moved = false;
      return;
    }
    setZoom(state.lightbox.scale > 1 ? 1 : 2.5);
  });

  stage.addEventListener('click', event => {
    if (event.target === stage && state.lightbox.scale === 1) closeLightbox();
  });

  stage.addEventListener('wheel', event => {
    event.preventDefault();
    setZoom(state.lightbox.scale + (event.deltaY < 0 ? 0.25 : -0.25));
  }, { passive: false });
}

function updateAccountUI() {
  $('#loginOpen').textContent = state.user ? 'Mi panel' : 'Ingresar';
}

function openModal(id) {
  const modal = $('#' + id);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modal.dataset.opener = document.activeElement?.id || '';
  const target = $('input, select, button.btn', modal);
  if (target) target.focus();
}

function closeModal(id) {
  const modal = $('#' + id);
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  const opener = modal.dataset.opener && document.getElementById(modal.dataset.opener);
  if (opener) opener.focus();
}

function trapFocus(event) {
  const modal = $('.modal.open');
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
  state.tab = '';
  sessionStorage.removeItem(KEYS.user);
  updateAccountUI();
  showView('inicio');
  toast('Sesión cerrada');
}

function setupAccount() {
  const form = $('#loginForm');
  bindValidation(form);

  $('#loginOpen').addEventListener('click', () => {
    if (state.user) return showView('panel');
    $('#loginError').textContent = '';
    openModal('loginModal');
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const error = $('#loginError');
    let valid = true;
    $$('[data-rule]', form).forEach(control => {
      if (!validateField(control)) valid = false;
    });
    if (!valid) {
      error.textContent = 'Revisa los campos marcados en rojo.';
      return;
    }
    const data = new FormData(form);
    if (!login(String(data.get('username')).trim(), String(data.get('password')))) {
      error.textContent = 'Usuario o contraseña incorrectos.';
      return;
    }
    form.reset();
    $$('.field', form).forEach(field => field.classList.remove('is-valid', 'is-invalid'));
    error.textContent = '';
    closeModal('loginModal');
    updateAccountUI();
    state.tab = '';
    showView('panel');
    toast('Bienvenido a Limatex');
  });

  $('#logoutButton').addEventListener('click', logout);
}

function statusClass(status) {
  return { 'En proceso': 's-proceso', Listo: 's-listo', Entregado: 's-entregado', Cancelado: 's-cancelado' }[status] || '';
}

function statusChip(status) {
  return `<span class="status ${statusClass(status)}">${safe(status)}</span>`;
}

function tabsFor(role) {
  if (role === 'Gerente') return ['Resumen', 'Pedidos', 'Precios', 'Bitácora'];
  if (role === 'Empleado') return ['Pedidos', 'Bitácora'];
  return ['Mis solicitudes'];
}

function renderPanel() {
  if (!state.user) return;
  const role = state.user.role;
  const tabs = tabsFor(role);
  if (!tabs.includes(state.tab)) {
    state.tab = tabs[0];
    state.pages.panel = 0;
  }
  $('#roleTitle').textContent = role === 'Gerente' ? 'Panel de gerencia' : role === 'Empleado' ? 'Panel de empleado' : 'Mi espacio';
  $('#userName').textContent = state.user.username;
  $('#userRole').textContent = role.toUpperCase();
  $('#userInitial').textContent = state.user.username.charAt(0).toUpperCase();
  $('#roleTabs').innerHTML = tabs.map(tab => `<button type="button" role="tab" class="${tab === state.tab ? 'is-active' : ''}" aria-selected="${tab === state.tab}" data-role-tab="${tab}">${tab}</button>`).join('');
  renderTab();
}

function panelList(rowHtml = '') {
  return `<div class="list-wrap"><div class="list" id="panelList"></div><div class="pager"><button type="button" id="panelPrev" aria-label="Página anterior">‹</button><span id="panelLabel">1 / 1</span><button type="button" id="panelNext" aria-label="Página siguiente">›</button></div></div>`;
}

function orderRow(order) {
  return `<button type="button" class="row" data-order="${order.id}">
    <span class="row__main"><b>${safe(order.product)} · ${safe(order.quantity)} ${safe(order.presentation)}</b><small>${safe(order.name)} · ${safe(order.date)}</small></span>
    ${statusChip(order.status)}
  </button>`;
}

function renderTab() {
  const body = $('#roleContent');
  const role = state.user.role;
  const tab = state.tab;
  const ids = { label: '#panelLabel', prev: '#panelPrev', next: '#panelNext' };

  if (tab === 'Resumen') {
    const count = status => state.orders.filter(order => order.status === status).length;
    body.innerHTML = `
      <div class="metrics">
        <div class="metric"><span>Solicitudes registradas</span><strong>${state.orders.length}</strong></div>
        <div class="metric"><span>Pendientes</span><strong>${count('Pendiente')}</strong></div>
        <div class="metric"><span>Productos del catálogo</span><strong>${PRODUCTS.length}</strong></div>
        <div class="metric"><span>Con precio definido</span><strong>${PRODUCTS.filter(product => priceOf(product).price).length}</strong></div>
      </div>
      <div class="tools-pair">
      <div class="tools-row">
        <div><b>Exportar solicitudes</b><small>Descarga todas las solicitudes en CSV.</small></div>
        <button type="button" class="btn outline small" id="exportOrders">Exportar CSV ↓</button>
      </div>
      <div class="tools-row">
        <div><b>Datos locales</b><small>Las solicitudes viven en este navegador.</small></div>
        <button type="button" class="btn danger small" id="clearOrders">Borrar solicitudes</button>
      </div>
      </div>`;
    return;
  }

  body.innerHTML = panelList();
  const list = $('#panelList');

  if (tab === 'Pedidos' || tab === 'Mis solicitudes') {
    const rows = tab === 'Mis solicitudes' ? state.orders.filter(order => order.user === state.user.username) : state.orders;
    fillPage(list, rows, rowsPerPage(list, cssVar(document.documentElement, '--row')), 'panel', ids, orderRow, '<p class="empty">Todavía no hay solicitudes.</p>');
    return;
  }

  if (tab === 'Precios') {
    const rowHeight = cssVar(document.documentElement, '--row-price');
    fillPage(list, PRODUCTS, rowsPerPage(list, rowHeight), 'panel', ids, product => `
      <div class="row row--price">
        <span class="row__main"><b>${safe(product.name)}</b><small>${safe(product.unit)}</small></span>
        <label>Precio Bs<input inputmode="decimal" maxlength="9" data-price="${product.id}" value="${safe(priceOf(product).price)}" aria-label="Precio de ${safe(product.name)}"></label>
        <label>Promoción<input maxlength="24" data-promo="${product.id}" value="${safe(priceOf(product).promo)}" aria-label="Promoción de ${safe(product.name)}" placeholder="Ej. -10%"></label>
      </div>`, '');
    return;
  }

  fillPage(list, state.logs, rowsPerPage(list, 38), 'panel', ids, item => `<div class="log-row"><span><b>${safe(item.user)}</b> — ${safe(item.action)}</span><span>${safe(item.date)}</span></div>`, '<p class="empty">Sin actividad registrada.</p>');
}

function openOrder(id) {
  const order = state.orders.find(item => item.id === Number(id));
  if (!order || !state.user) return;
  const role = state.user.role;
  $('#detailContent').innerHTML = `
    <div class="detail-top"><h2 id="detailTitle">${safe(order.product)}</h2>${statusChip(order.status)}</div>
    <div class="detail-grid">
      <span><small>Fecha</small>${safe(order.date)}</span>
      <span><small>Cantidad</small>${safe(order.quantity)} ${safe(order.presentation)}</span>
      <span><small>Cliente</small>${safe(order.name)}</span>
      <span><small>Teléfono</small>${safe(order.phone)}</span>
      ${order.price ? `<span><small>Precio referencial</small>Bs ${safe(order.price)}</span>` : ''}
    </div>
    <p class="detail-msg">${safe(order.details || 'Sin detalles adicionales.')}</p>
    ${role !== 'Cliente' ? `<div class="detail-actions">
      <select id="detailStatus" data-detail-status="${order.id}" aria-label="Estado del pedido">${STATUSES.map(status => `<option ${order.status === status ? 'selected' : ''}>${status}</option>`).join('')}</select>
      ${role === 'Gerente' ? `<button type="button" class="btn danger small" data-detail-delete="${order.id}">Eliminar</button>` : ''}
    </div>` : ''}`;
  openModal('detailModal');
}

function exportOrders() {
  if (!state.orders.length) return toast('No hay solicitudes para exportar');
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
  updateQuoteSummary();
  toast('Cambio guardado');
}

function setupPanel() {
  $('#roleTabs').addEventListener('click', event => {
    const tab = event.target.closest('[data-role-tab]');
    if (!tab) return;
    state.tab = tab.dataset.roleTab;
    state.pages.panel = 0;
    renderPanel();
  });

  $('#roleContent').addEventListener('click', event => {
    const order = event.target.closest('[data-order]');
    if (order) return openOrder(order.dataset.order);
    if (event.target.closest('#panelPrev')) {
      state.pages.panel = Math.max(0, state.pages.panel - 1);
      return renderTab();
    }
    if (event.target.closest('#panelNext')) {
      state.pages.panel += 1;
      return renderTab();
    }
    if (event.target.id === 'exportOrders') return exportOrders();
    if (event.target.id === 'clearOrders' && confirm('Se borrarán todas las solicitudes guardadas. ¿Continuar?')) {
      state.orders = [];
      save(KEYS.orders, state.orders);
      log('Borró todas las solicitudes');
      renderTab();
    }
  });

  $('#roleContent').addEventListener('change', event => {
    const { target } = event;
    if (target.dataset.price) savePrice(target.dataset.price, 'price', target.value);
    else if (target.dataset.promo) savePrice(target.dataset.promo, 'promo', target.value);
  });

  $('#detailContent').addEventListener('change', event => {
    const id = event.target.dataset.detailStatus;
    if (!id) return;
    const order = state.orders.find(item => item.id === Number(id));
    if (!order) return;
    order.status = event.target.value;
    save(KEYS.orders, state.orders);
    log(`Actualizó pedido ${order.id} a ${order.status}`);
    openOrder(id);
    renderTab();
    toast('Estado actualizado');
  });

  $('#detailContent').addEventListener('click', event => {
    const id = event.target.dataset.detailDelete;
    if (!id || !confirm('¿Eliminar esta solicitud?')) return;
    state.orders = state.orders.filter(order => order.id !== Number(id));
    save(KEYS.orders, state.orders);
    log('Eliminó una solicitud');
    closeModal('detailModal');
    renderTab();
  });
}

function setupShell() {
  document.body.classList.toggle('dark', localStorage.getItem(KEYS.theme) === 'dark');

  document.addEventListener('click', event => {
    const go = event.target.closest('[data-go]');
    if (go) {
      event.preventDefault();
      showView(go.dataset.go);
      return;
    }
    if (event.target.closest('[data-action="theme"]')) {
      document.body.classList.toggle('dark');
      localStorage.setItem(KEYS.theme, document.body.classList.contains('dark') ? 'dark' : 'light');
      return;
    }
    const close = event.target.closest('[data-close]');
    if (close) closeModal(close.dataset.close);
  });

  $('#menuBtn').addEventListener('click', () => {
    const open = $('#nav').classList.toggle('open');
    $('#menuBtn').setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeLightbox();
      $$('.modal.open').forEach(modal => closeModal(modal.id));
      closeMenu();
    }
    if ($('#lightbox').classList.contains('is-open')) {
      if (event.key === 'ArrowLeft') stepLightbox(-1);
      if (event.key === 'ArrowRight') stepLightbox(1);
      if (event.key === '+' || event.key === '=') setZoom(state.lightbox.scale + 0.5);
      if (event.key === '-') setZoom(state.lightbox.scale - 0.5);
    }
    trapFocus(event);
  });

  window.addEventListener('hashchange', () => showView(location.hash.slice(1)));

  let timer;
  new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const view = document.body.dataset.view;
      if (view === 'productos') renderProducts();
      if (view === 'panel' && state.user && state.tab !== 'Resumen') renderTab();
      if ($('#cartModal').classList.contains('open')) renderCart();
    }, 120);
  }).observe($('main'));
}

function runSmokeTests() {
  const checks = [
    ['Catálogo con productos únicos', new Set(PRODUCTS.map(product => product.id)).size === PRODUCTS.length],
    ['Cada producto tiene su foto', PRODUCTS.every(product => product.photo && new Set(PRODUCTS.map(item => item.photo)).size === PRODUCTS.length)],
    ['Página hidratada', document.body.dataset.hydrated === 'true'],
    ['Ningún bloque de hidratación vacío', $$('[data-hydrate]').every(node => node.innerHTML.trim().length > 0)],
    ['Validación rechaza datos incorrectos', !RULES.name('12').ok && !RULES.phone('abc').ok && !RULES.quantity('0').ok],
    ['Validación acepta datos correctos', RULES.name('Ana Pérez').ok && RULES.phone('70012345').ok && RULES.quantity('5').ok],
    ['LocalStorage disponible', (() => { try { localStorage.setItem('t', '1'); localStorage.removeItem('t'); return true; } catch { return false; } })()],
    ['Manifest enlazado', Boolean($('link[rel="manifest"]'))],
    ['Service Worker soportado', 'serviceWorker' in navigator],
    ['Ubicación configurada', SITE.location.lat === -16.583668 && SITE.location.lng === -68.186915],
    ['Landmarks semánticos', Boolean($('header') && $('main') && $('nav'))]
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

function init() {
  hydrate();
  setupShell();
  setupCatalog();
  setupCart();
  setupQuoteForm();
  setupLightbox();
  setupAccount();
  setupPanel();
  setupServiceWorker();
  showView(state.user && location.hash === '#panel' ? 'panel' : location.hash.slice(1) || 'inicio');
  if (location.search.includes('test') || location.hash === '#test') runSmokeTests();
}

document.addEventListener('DOMContentLoaded', init);
