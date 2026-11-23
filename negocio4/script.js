const K = { products: 'dh_products', cart: 'dh_cart', orders: 'dh_orders', logs: 'dh_logs', views: 'dh_views', theme: 'dh_theme' };
const WA = '59178826105';
const $ = id => document.getElementById(id);
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const money = n => 'Bs. ' + Number(n || 0).toLocaleString('es-BO');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fallback = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80';
let products = [],
    cart = read(K.cart, []),
    orders = read(K.orders, []),
    logs = read(K.logs, []),
    views = read(K.views, {}),
    user = null,
    page = 1,
    toastTimer;
const perPage = 8;
const DEFAULT_PRODUCTS = [
    {
        "id": 1,
        "name": "Sofá Nórdico",
        "category": "Sala",
        "price": 2450,
        "description": "Sofá de líneas suaves, ideal para una sala moderna y acogedora.",
        "features": [
            "Tapizado resistente",
            "Estructura reforzada",
            "Diseño contemporáneo"
        ],
        "availability": "Disponible",
        "image": "images/sofa_nordico.webp"
    },
    {
        "id": 2,
        "name": "Lámpara Aura",
        "category": "Iluminación",
        "price": 350,
        "description": "Luz cálida y diseño delicado para acompañar tus espacios.",
        "features": [
            "Luz ambiental",
            "Acabado elegante",
            "Fácil instalación"
        ],
        "availability": "Disponible",
        "image": "images/lampara_aura.webp"
    },
    {
        "id": 3,
        "name": "Espejo Roma",
        "category": "Decoración",
        "price": 480,
        "description": "Espejo decorativo que aporta amplitud y personalidad.",
        "features": [
            "Marco resistente",
            "Estilo moderno",
            "Formato decorativo"
        ],
        "availability": "Disponible",
        "image": "images/espejo_roma.jpg"
    },
    {
        "id": 4,
        "name": "Mesa Oslo",
        "category": "Comedor",
        "price": 1890,
        "description": "Mesa funcional para compartir momentos especiales.",
        "features": [
            "Superficie lavable",
            "Acabado madera",
            "Diseño estable"
        ],
        "availability": "Disponible",
        "image": "images/mesa_oslo.webp"
    },
    {
        "id": 5,
        "name": "Silla Nórdica",
        "category": "Comedor",
        "price": 420,
        "description": "Silla cómoda de inspiración escandinava.",
        "features": [
            "Asiento ergonómico",
            "Patas resistentes",
            "Fácil de combinar"
        ],
        "availability": "Disponible",
        "image": "images/silla_nordica.jpg"
    },
    {
        "id": 6,
        "name": "Cama Oslo",
        "category": "Dormitorio",
        "price": 3250,
        "description": "Un diseño sereno para convertir tu dormitorio en refugio.",
        "features": [
            "Estructura firme",
            "Estilo minimalista",
            "Acabado natural"
        ],
        "availability": "Disponible",
        "image": "images/cama_oslo.jpg"
    },
    {
        "id": 7,
        "name": "Cómoda Nativa",
        "category": "Organización",
        "price": 1350,
        "description": "Organiza tus objetos con estilo y practicidad.",
        "features": [
            "Cajones amplios",
            "Diseño compacto",
            "Fácil mantenimiento"
        ],
        "availability": "Disponible",
        "image": "images/comoda_nativa.png"
    },
    {
        "id": 8,
        "name": "Butaca Serena",
        "category": "Sala",
        "price": 1680,
        "description": "Un asiento especial para leer, descansar y disfrutar.",
        "features": [
            "Tapizado suave",
            "Respaldo cómodo",
            "Estructura sólida"
        ],
        "availability": "Disponible",
        "image": "images/butaca_serena.jpg"
    },
    {
        "id": 9,
        "name": "Estante Roble",
        "category": "Organización",
        "price": 890,
        "description": "Solución versátil para ordenar y decorar.",
        "features": [
            "Varios niveles",
            "Diseño abierto",
            "Acabado cálido"
        ],
        "availability": "Disponible",
        "image": "images/estante_roble.webp"
    },
    {
        "id": 10,
        "name": "Cuadro Botánico",
        "category": "Decoración",
        "price": 260,
        "description": "Un toque natural para tus paredes.",
        "features": [
            "Diseño botánico",
            "Fácil colocación",
            "Estilo atemporal"
        ],
        "availability": "Disponible",
        "image": "images/cuadro_botanico.jpg"
    },
    {
        "id": 11,
        "name": "Velador Lino",
        "category": "Dormitorio",
        "price": 690,
        "description": "Un complemento práctico para tu habitación.",
        "features": [
            "Tamaño compacto",
            "Superficie auxiliar",
            "Estilo cálido"
        ],
        "availability": "Disponible",
        "image": "images/velador_lino.jpg"
    },
    {
        "id": 12,
        "name": "Lámpara Arco",
        "category": "Iluminación",
        "price": 620,
        "description": "Iluminación decorativa con presencia y personalidad.",
        "features": [
            "Luz ambiental",
            "Diseño actual",
            "Base estable"
        ],
        "availability": "Disponible",
        "image": "images/lampara_arco.webp"
    }
];


function log(action, detail = '') { logs.unshift({ time: new Date().toLocaleString('es-BO'), user: user ?.name || 'Visitante', role: user ?.role || 'Visitante', action, detail });
    logs = logs.slice(0, 1500);
    save(K.logs, logs) }

function toast(s) { $('toast').textContent = s;
    $('toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('toast').classList.remove('show'), 2500) }

function enter(role, name) { user = { role, name };
    $('access').classList.add('hidden');
    $('app').classList.remove('hidden');
    $('clientNav').classList.toggle('hidden', role !== 'cliente');
    $('managerNav').classList.toggle('hidden', role !== 'gerente');
    $('userName').textContent = name;
    $('roleName').textContent = role === 'gerente' ? 'Gerencia' : 'Cuenta cliente';
    $('avatar').textContent = name[0].toUpperCase();
    log('Inicio de sesión', 'Acceso como ' + role);
    go(role === 'gerente' ? 'dashboard' : 'home') }

function go(v) { if (!user) return; let manager = ['dashboard', 'manageProducts', 'manageOrders', 'activity'].includes(v); if (manager && user.role !== 'gerente' || !manager && user.role !== 'cliente') return;
    document.querySelectorAll('.view').forEach(x => x.classList.toggle('active', x.id === 'v-' + v));
    document.querySelectorAll('.nav').forEach(x => x.classList.toggle('active', x.dataset.view === v)); let titles = { home: 'Bienvenido a tu hogar', catalog: 'Catálogo de productos', cart: 'Mi carrito', orders: 'Mis pedidos', about: 'Conoce DecoHogar', dashboard: 'Panel de gerencia', manageProducts: 'Administrar productos', manageOrders: 'Gestión de pedidos', activity: 'Bitácora de eventos' };
    $('title').textContent = titles[v];
    $('sidebar').classList.remove('open');
    log('Cambio de vista', titles[v]); if (v === 'catalog') renderCatalog(); if (v === 'cart') renderCart(); if (v === 'orders') renderMyOrders(); if (v === 'dashboard') renderDashboard(); if (v === 'manageProducts') renderManagerProducts(); if (v === 'manageOrders') renderManagerOrders(); if (v === 'activity') renderLogs() }

function card(p) { return `<article class="flip" data-card="${p.id}" tabindex="0"><div class="flip-inner"><div class="front"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'"><div class="front-info"><small class="cat">${esc(p.category)}</small><h3>${esc(p.name)}</h3><b class="price">${money(p.price)}</b><div class="flip-actions"><small>Descubre más</small><button data-flip="${p.id}">Ver detalles ↗</button></div></div></div><div class="back"><div><small class="cat">${esc(p.category)}</small><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><ul>${(p.features||[]).slice(0,3).map(x=>'<li>'+esc(x)+'</li>').join('')}</ul></div><div><small class="available">● ${esc(p.availability||'Disponible')}</small><p><b>${money(p.price)}</b></p><button class="primary" data-add="${p.id}">Agregar al carrito +</button></div></div></div></article>` }

function renderCatalog() { let term = $('search').value.toLowerCase().trim(),
        cat = $('category').value,
        list = products.filter(p => (cat === 'Todas' || p.category === cat) && (`${p.name} ${p.description} ${p.category}`).toLowerCase().includes(term)),
        pages = Math.max(1, Math.ceil(list.length / perPage));
    page = Math.min(page, pages);
    $('products').innerHTML = list.slice((page - 1) * perPage, page * perPage).map(card).join('') || '<p class="empty">No se encontraron productos.</p>';
    $('resultCount').textContent = list.length + ' productos encontrados';
    $('pageLabel').textContent = `Página ${page} de ${pages}`;
    $('pages').innerHTML = Array.from({ length: pages }, (_, i) => `<button class="page ${page===i+1?'active':''}" data-page="${i+1}">${i+1}</button>`).join('') }

function flip(id) { let el = document.querySelector(`[data-card="${id}"]`); if (el) el.classList.toggle('turned'); let p = products.find(x => x.id === +id);
    views[id] = (views[id] || 0) + 1;
    save(K.views, views);
    log('Producto girado / detalles visualizados', p ?.name || id) }

function details(id) { let p = products.find(x => x.id === +id); if (!p) return;
    views[id] = (views[id] || 0) + 1;
    save(K.views, views);
    log('Producto visualizado', p.name);
    $('detail').innerHTML = `<div class="detail"><img src="${esc(p.image)}" alt="${esc(p.name)}" onerror="this.src='${fallback}'"><div><small class="cat">${esc(p.category)}</small><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p><ul>${(p.features||[]).map(x=>'<li>'+esc(x)+'</li>').join('')}</ul><p class="available">● ${esc(p.availability||'Disponible')}</p><h3>${money(p.price)}</h3><button class="primary" data-add="${p.id}">Agregar al carrito</button></div></div>`;
    $('productModal').classList.remove('hidden') }

function add(id) { let p = products.find(x => x.id === +id); if (!p) return; let item = cart.find(x => x.id === p.id);
    item ? item.qty++ : cart.push({ id: p.id, qty: 1 });
    save(K.cart, cart);
    badge();
    log('Producto agregado al carrito', p.name);
    toast('Producto agregado al carrito') };

function badge() { $('cartCount').textContent = cart.reduce((s, x) => s + x.qty, 0) }

function items() { return cart.map(x => { let p = products.find(y => y.id === x.id); return p ? {...p, qty: x.qty } : null }).filter(Boolean) }

function total() { return items().reduce((s, p) => s + p.price * p.qty, 0) }

function renderCart() { let a = items();
    $('itemCount').textContent = a.reduce((s, p) => s + p.qty, 0) + ' artículos';
    $('cartRows').innerHTML = a.length ? a.map(p => `<div class="cart-row"><img src="${esc(p.image)}" alt="${esc(p.name)}" onerror="this.src='${fallback}'"><div><h4>${esc(p.name)}</h4><small>${money(p.price)} por unidad</small><div class="qty"><button data-qty="-1" data-id="${p.id}">−</button><span>${p.qty}</span><button data-qty="1" data-id="${p.id}">+</button></div></div><div class="cart-end">${money(p.price*p.qty)}<br><button class="remove" data-remove="${p.id}">Eliminar</button></div></div>`).join('') : '<p class="empty">Tu carrito está vacío. Explora el catálogo para elegir tus muebles.</p>';
    $('subtotal').textContent = money(total());
    $('total').textContent = money(total());
    badge() }

function qty(id, d) { let x = cart.find(y => y.id === +id); if (!x) return;
    x.qty += d; if (x.qty < 1) cart = cart.filter(y => y.id !== +id);
    save(K.cart, cart);
    renderCart();
    log('Cantidad modificada', 'Producto ' + id) }

function remove(id) { let p = products.find(x => x.id === +id);
    cart = cart.filter(x => x.id !== +id);
    save(K.cart, cart);
    renderCart();
    log('Producto eliminado del carrito', p ?.name || id) }

function renderMyOrders() { let a = orders;
    $('orderCount').textContent = a.length + ' pedidos';
    $('myOrders').innerHTML = a.length ? a.slice().reverse().map(o => `<div class="order"><div><b>Pedido #${esc(o.id)}</b><small>${new Date(o.date).toLocaleString('es-BO')} · ${o.items.map(x=>esc(x.name)+' ×'+x.qty).join(', ')}</small></div><div><b>${money(o.total)}</b><br><span class="status ${o.status}">${esc(o.status)}</span></div></div>`).join('') : '<p class="empty">Todavía no tienes pedidos registrados.</p>' }

function openCheckout() { if (!cart.length) { toast('Tu carrito está vacío'); return }
    $('checkoutTotal').textContent = money(total());
    $('checkoutForm').reset();
    document.querySelectorAll('#checkoutForm label').forEach(x => x.classList.remove('valid', 'invalid'));
    $('checkoutModal').classList.remove('hidden');
    log('Inicio del formulario', 'Checkout abierto') }

function validate(input) { let label = input.closest('label'),
        ok = input.checkValidity(),
        msg = label.querySelector('small');
    label.classList.toggle('valid', ok);
    label.classList.toggle('invalid', !ok); if (msg) msg.textContent = ok ? '✓ Correcto' : (input.validity.valueMissing ? '❌ Campo obligatorio' : input.validity.typeMismatch ? '❌ Correo no válido' : input.validity.tooShort ? '❌ Es demasiado corto' : '❌ Revisa el dato');
    log('Campo validado', input.name + ': ' + (ok ? 'válido' : 'inválido')); return ok }

function submitOrder(e) { e.preventDefault(); let inputs = [...$('checkoutForm').querySelectorAll('input')]; if (!inputs.map(validate).every(Boolean)) { toast('Revisa los campos marcados'); return } let d = Object.fromEntries(new FormData(e.currentTarget)),
        a = items(),
        o = { id: String(Date.now()).slice(-8), date: new Date().toISOString(), ...d, items: a.map(p => ({ id: p.id, name: p.name, qty: p.qty, price: p.price })), total: total(), status: 'Pendiente' };
    orders.push(o);
    save(K.orders, orders);
    log('Pedido confirmado', 'Pedido #' + o.id + ' · ' + money(o.total)); let lines = a.map(p => `• ${p.name} x${p.qty} — ${money(p.price*p.qty)}`).join('\n'); let msg = `¡Hola, DecoHogar! Quiero realizar este pedido:\n\nCliente: ${o.name}\nTeléfono: ${o.phone}\nCorreo: ${o.email}\n\nProductos:\n${lines}\n\nTotal: ${money(o.total)}\nDirección: ${o.address}\nPedido: ${o.id}`;
    cart = [];
    save(K.cart, cart);
    badge();
    $('checkoutModal').classList.add('hidden');
    go('orders');
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    toast('Pedido registrado. Abriendo WhatsApp') }

function renderDashboard() { $('mProducts').textContent = products.length;
    $('mOrders').textContent = orders.length;
    $('mClients').textContent = new Set(orders.map(o => o.email)).size;
    $('mEvents').textContent = logs.length;
    $('today').textContent = new Date().toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' });
    $('popular').innerHTML = products.slice().sort((a, b) => (views[b.id] || 0) - (views[a.id] || 0)).slice(0, 5).map(p => `<div class="rank"><img src="${esc(p.image)}" onerror="this.src='${fallback}'"><span>${esc(p.name)}<small>${esc(p.category)}</small></span><b>${views[p.id]||0}</b></div>`).join('');
    $('recent').innerHTML = logs.slice(0, 7).map(eventHTML).join('') || '<p class="empty">Sin actividad todavía.</p>' }

function eventHTML(l) { return `<div class="event">● <span>${esc(l.action)}<small>${esc(l.detail)} · ${esc(l.time)}</small></span></div>` }

function renderManagerProducts() { $('productCount').textContent = products.length + ' productos';
    $('managerProducts').innerHTML = products.map(p => `<tr><td><img class="thumb" src="${esc(p.image)}" onerror="this.src='${fallback}'">${esc(p.name)}</td><td>${esc(p.category)}</td><td>${money(p.price)}</td><td>${views[p.id]||0}</td><td><button class="delete" data-delete="${p.id}">Eliminar</button></td></tr>`).join('') }

function renderManagerOrders() { $('managerOrderCount').textContent = orders.length + ' pedidos';
    $('managerOrders').innerHTML = orders.length ? orders.slice().reverse().map(o => `<tr><td>#${esc(o.id)}</td><td>${esc(o.name)}<small>${esc(o.phone)} · ${esc(o.email)}</small></td><td>${new Date(o.date).toLocaleDateString('es-BO')}</td><td>${money(o.total)}</td><td><span class="status ${o.status}">${esc(o.status)}</span></td><td><select data-status="${esc(o.id)}"><option ${o.status==='Pendiente'?'selected':''}>Pendiente</option><option ${o.status==='Confirmado'?'selected':''}>Confirmado</option><option ${o.status==='En preparación'?'selected':''}>En preparación</option><option ${o.status==='Entregado'?'selected':''}>Entregado</option><option ${o.status==='Cancelado'?'selected':''}>Cancelado</option></select></td></tr>`).join('') : '<tr><td colspan="6">No hay pedidos.</td></tr>' }

function renderLogs() { let q = $('logSearch').value.toLowerCase(),
        a = logs.filter(l => [l.time, l.user, l.action, l.detail].join(' ').toLowerCase().includes(q));
    $('logCount').textContent = a.length + ' eventos registrados';
    $('logs').innerHTML = a.slice(0, 300).map(l => `<tr><td>${esc(l.time)}</td><td>${esc(l.user)}<small>${esc(l.role)}</small></td><td>${esc(l.action)}</td><td>${esc(l.detail)}</td></tr>`).join('') }

function addProduct(e) { e.preventDefault(); let d = Object.fromEntries(new FormData(e.currentTarget)); let p = { id: Date.now(), name: d.name, category: d.category, price: +d.price, image: d.image || 'images/producto-nuevo.jpg', description: d.description, features: (d.features || '').split(',').map(x => x.trim()).filter(Boolean), availability: 'Disponible' };
    products.push(p);
    save(K.products, products);
    log('Producto creado', p.name);
    e.currentTarget.reset();
    $('newProductModal').classList.add('hidden');
    renderManagerProducts();
    toast('Producto agregado') }

function delProduct(id) { let p = products.find(x => x.id === +id);
    products = products.filter(x => x.id !== +id);
    cart = cart.filter(x => x.id !== +id);
    save(K.products, products);
    save(K.cart, cart);
    badge();
    log('Producto eliminado del catálogo', p ?.name || id);
    renderManagerProducts();
    toast('Producto eliminado') }

function exportLogs() { let rows = [
            ['Fecha', 'Usuario', 'Rol', 'Evento', 'Detalle'], ...logs.map(l => [l.time, l.user, l.role, l.action, l.detail])
        ],
        csv = rows.map(r => r.map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(',')).join('\n'),
        url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })),
        a = document.createElement('a');
    a.href = url;
    a.download = 'bitacora-decohogar.csv';
    a.click();
    URL.revokeObjectURL(url);
    log('Bitácora exportada', 'CSV') }

function theme() { document.body.classList.toggle('dark'); let v = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem(K.theme, v);
    $('theme').textContent = v === 'dark' ? '☀ Modo claro' : '☾ Modo oscuro';
    log('Cambio de modo claro/oscuro', v) }

function online() { let on = navigator.onLine;
    $('connection').textContent = on ? '● Conectado' : '● Sin conexión';
    $('online').textContent = on ? '● Online' : '● Offline' }
async function init() { let d = DEFAULT_PRODUCTS; try { let r = await fetch('productos.json'); d = await r.json() } catch (e) { /* abierto sin servidor: se usan los productos incluidos en script.js */ }
    products = read(K.products, d); if (!products.length) products = d;
    badge(); if (localStorage.getItem(K.theme) === 'dark') theme();
    online(); if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(console.warn); }
document.addEventListener('click', e => { let n = e.target.closest('[data-view]'); if (n) { go(n.dataset.view); return } let g = e.target.closest('[data-go]'); if (g) { go(g.dataset.go); return } let c = e.target.closest('[data-cat]'); if (c) { $('category').value = c.dataset.cat;
        page = 1;
        go('catalog');
        renderCatalog();
        log('Filtro utilizado', c.dataset.cat); return } let f = e.target.closest('[data-flip]'); if (f) { e.stopPropagation();
        flip(f.dataset.flip); return } let a = e.target.closest('[data-add]'); if (a) { e.stopPropagation();
        add(a.dataset.add); return } let cardEl = e.target.closest('[data-card]'); if (cardEl && !e.target.closest('button')) { flip(cardEl.dataset.card); return } let pg = e.target.closest('[data-page]'); if (pg) { page = +pg.dataset.page;
        renderCatalog(); return } let q = e.target.closest('[data-qty]'); if (q) { qty(q.dataset.id, +q.dataset.qty); return } let rm = e.target.closest('[data-remove]'); if (rm) { remove(rm.dataset.remove); return } let d = e.target.closest('[data-delete]'); if (d) { delProduct(d.dataset.delete); return } let cl = e.target.closest('[data-close]'); if (cl) $(cl.dataset.close).classList.add('hidden') });
$('clientEnter').onclick = () => enter('cliente', 'Cliente');
$('managerEnter').onclick = () => $('pinModal').classList.remove('hidden');
$('pinForm').onsubmit = e => { e.preventDefault(); if ($('pin').value === '1234') { $('pinModal').classList.add('hidden');
        enter('gerente', 'Gerente') } else $('pinError').textContent = 'PIN incorrecto. Intenta nuevamente.' };
$('logout').onclick = () => { log('Cierre de sesión', user ?.role || '');
    user = null;
    $('app').classList.add('hidden');
    $('access').classList.remove('hidden') };
$('hamb').onclick = () => $('sidebar').classList.toggle('open');
$('theme').onclick = theme;
$('search').oninput = () => { page = 1;
    renderCatalog();
    log('Búsqueda realizada', $('search').value) };
$('category').onchange = () => { page = 1;
    renderCatalog();
    log('Filtro utilizado', $('category').value) };
$('checkoutOpen').onclick = openCheckout;
$('checkoutForm').onsubmit = submitOrder;
$('checkoutForm').querySelectorAll('input').forEach(x => x.onblur = () => validate(x));
$('addProductOpen').onclick = () => $('newProductModal').classList.remove('hidden');
$('newProductForm').onsubmit = addProduct;
$('managerOrders').onchange = e => { if (e.target.matches('[data-status]')) { let o = orders.find(x => x.id === e.target.dataset.status),
            old = o.status;
        o.status = e.target.value;
        save(K.orders, orders);
        log('Estado del pedido actualizado', `#${o.id}: ${old} → ${o.status}`);
        renderManagerOrders() } };
$('export').onclick = exportLogs;
$('logSearch').oninput = renderLogs;
['productModal', 'checkoutModal', 'newProductModal', 'pinModal'].forEach(id => $(id).addEventListener('click', e => { if (e.target.id === id) $(id).classList.add('hidden') }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.overlay').forEach(x => x.classList.add('hidden')) });
// jQuery se usa para una interacción de navegación y efecto de foco.
if (window.jQuery) jQuery(document).on('click', '.nav', function() { jQuery('.nav').removeClass('nav-used');
    jQuery(this).addClass('nav-used') });
window.addEventListener('online', online);
window.addEventListener('offline', online);
init();