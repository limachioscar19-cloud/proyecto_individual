'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const KEYS = {
  requests: 'arkon_requests_v3',
  logs: 'arkon_logs_v3',
  users: 'arkon_users_v3',
  theme: 'arkon_theme_v3',
  contrast: 'arkon_contrast_v3',
  session: 'arkon_session_v3'
};

const MANAGER = { user: 'gerente', pass: 'ArkonDemo26' };
let loginMode = 'client';
let currentLogPage = 1;
const LOG_PAGE_SIZE = 12;

const SERVICES = [
  {
    cat: 'diseño',
    tag: 'DISEÑO',
    title: 'Diseño arquitectónico',
    text: 'Desarrollo conceptual y funcional de espacios: distribución, iluminación y criterios de diseño para tu proyecto.',
    includes: ['Programa arquitectónico', 'Distribución de ambientes', 'Materialidad e imagen'],
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80'
  },
  {
    cat: 'diseño',
    tag: 'ESTRUCTURAS',
    title: 'Ingeniería estructural',
    text: 'Asistencia técnica para estudiar el comportamiento estructural y documentar una solución segura y coherente.',
    includes: ['Criterios de estructuración', 'Coordinación con arquitectura', 'Revisión técnica'],
    img: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80'
  },
  {
    cat: 'obra',
    tag: 'MEDICIÓN',
    title: 'Cómputos métricos',
    text: 'Cuantificación ordenada de volúmenes, materiales y partidas para entender el alcance real de una obra.',
    includes: ['Revisión de planos', 'Desglose de partidas', 'Planilla de cantidades'],
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80'
  },
  {
    cat: 'gestión',
    tag: 'COSTOS',
    title: 'Presupuestos y costos',
    text: 'Organización económica del proyecto con estimaciones transparentes y supuestos claramente identificados.',
    includes: ['Estructura de partidas', 'Análisis de precios', 'Resumen económico'],
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80'
  },
  {
    cat: 'obra',
    tag: 'SUPERVISIÓN',
    title: 'Supervisión técnica',
    text: 'Seguimiento de avances, revisión de documentación y control de calidad durante la ejecución de la obra.',
    includes: ['Seguimiento de hitos', 'Registro de observaciones', 'Informes de avance'],
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80'
  },
  {
    cat: 'gestión',
    tag: 'ASESORÍA',
    title: 'Consultoría técnica',
    text: 'Orientación profesional para evaluar alternativas, aclarar dudas y tomar decisiones informadas.',
    includes: ['Levantamiento de necesidades', 'Evaluación de alternativas', 'Hoja de ruta'],
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80'
  }
];

function read(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(text = '') {
  return String(text).replace(/[&<>"']/g, char => ({
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
  setTimeout(() => el.classList.remove('show'), 2600);
}

function log(action, detail = '') {
  const logs = read(KEYS.logs);
  logs.unshift({ id: Date.now(), action, detail, at: new Date().toLocaleString('es-BO') });
  write(KEYS.logs, logs);
  renderLogs();
}

function downloadFile(content, name, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

function closeMenu() {
  $('#nav').classList.remove('open');
  $('#menuBtn').setAttribute('aria-expanded', 'false');
}

function showSection(id, options = {}) {
  const target = document.getElementById(id) || document.getElementById('inicio');
  if (!target || !target.classList.contains('site-section')) return;
  document.body.classList.remove('panel-mode');
  $('#panel').hidden = true;
  $$('.site-section').forEach(section => {
    const active = section === target;
    section.classList.toggle('active-section', active);
    section.setAttribute('aria-hidden', String(!active));
    if (!active) section.scrollTop = 0;
  });
  $$('#nav a').forEach(link => {
    const active = link.getAttribute('href') === `#${target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  closeMenu();
  if (options.updateHash !== false && location.hash !== `#${target.id}`) {
    history.replaceState(null, '', `#${target.id}`);
  }
  target.scrollTop = 0;
}

function setupNavigation() {
  $('#menuBtn').addEventListener('click', () => {
    const open = $('#nav').classList.toggle('open');
    $('#menuBtn').setAttribute('aria-expanded', String(open));
  });

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target || !target.classList.contains('site-section')) return;
      event.preventDefault();
      showSection(id);
    });
  });

  const initial = location.hash.slice(1);
  showSection(initial && document.getElementById(initial) ? initial : 'inicio', { updateHash: false });
  window.addEventListener('hashchange', () => showSection(location.hash.slice(1), { updateHash: false }));
}

function applyAppearance() {
  document.body.classList.toggle('dark', localStorage.getItem(KEYS.theme) === 'dark');
  document.body.classList.toggle('contrast', localStorage.getItem(KEYS.contrast) === '1');
}

function setupAppearance() {
  applyAppearance();

  $('#themeBtn').addEventListener('click', () => {
    const next = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem(KEYS.theme, next);
    applyAppearance();
    log('Cambio de apariencia', next === 'dark' ? 'Modo oscuro' : 'Modo claro');
  });

  $('#contrastBtn').addEventListener('click', () => {
    localStorage.setItem(KEYS.contrast, document.body.classList.contains('contrast') ? '0' : '1');
    applyAppearance();
    toast('Preferencia de contraste actualizada');
    log('Accesibilidad', 'Cambio de alto contraste');
  });
}

function renderServices() {
  $('#serviceGrid').innerHTML = SERVICES.map((service, index) => `
    <article class="service-card" data-category="${service.cat}" tabindex="0" role="button" aria-pressed="false" aria-label="${service.title}. Toca para ver la descripción">
      <div class="card-inner">
        <div class="card-face card-front">
          <img src="${service.img}" alt="" loading="lazy" referrerpolicy="no-referrer">
          <div class="card-text">
            <span class="tag">0${index + 1} / ${service.tag}</span>
            <h3>${service.title}</h3>
            <span class="hint">Toca para ver más ↻</span>
          </div>
        </div>
        <div class="card-face card-back">
          <span class="tag">${service.tag}</span>
          <h3>${service.title}</h3>
          <p>${service.text}</p>
          <ul>${service.includes.map(item => `<li>${item}</li>`).join('')}</ul>
          <span class="hint">Toca para volver ↻</span>
        </div>
      </div>
    </article>
  `).join('');

  $('#serviceSelect').innerHTML = '<option value="">Seleccionar</option>' +
    SERVICES.map(service => `<option>${service.title}</option>`).join('') +
    '<option>Otro</option>';
}

function flipCard(card) {
  const flipped = card.classList.toggle('flipped');
  card.setAttribute('aria-pressed', String(flipped));
}

function filterServices() {
  const query = $('#serviceSearch').value.toLocaleLowerCase('es');
  const filter = $('#serviceFilter').value;
  let visible = 0;

  $$('.service-card').forEach(card => {
    const match = card.textContent.toLocaleLowerCase('es').includes(query) && (filter === 'all' || card.dataset.category === filter);
    card.hidden = !match;
    if (match) visible++;
  });

  $('#serviceEmpty').hidden = visible > 0;
}

function setupServices() {
  renderServices();
  const grid = $('#serviceGrid');

  grid.addEventListener('click', event => {
    const card = event.target.closest('.service-card');
    if (card) flipCard(card);
  });

  grid.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = event.target.closest('.service-card');
    if (!card) return;
    event.preventDefault();
    flipCard(card);
  });

  grid.addEventListener('error', event => {
    if (event.target.tagName === 'IMG') event.target.remove();
  }, true);

  $('#serviceSearch').addEventListener('input', filterServices);
  $('#serviceFilter').addEventListener('change', filterServices);
}

function currentSession() {
  return read(KEYS.session, null);
}

function updateLoginButton() {
  $('#loginOpen').firstChild.textContent = currentSession() ? 'Mi panel ' : 'Ingresar ';
}

function openLogin() {
  const modal = $('#loginModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  setLoginMode(loginMode);
  $('#loginUser').focus();
}

function closeLogin() {
  const modal = $('#loginModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function selectedRole() {
  return loginMode;
}

function setLoginMode(role) {
  loginMode = role === 'manager' ? 'manager' : 'client';
  $$('[data-role]').forEach(button => {
    const active = button.dataset.role === loginMode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $('#loginTitle').textContent = loginMode === 'manager' ? 'Acceso de gerencia.' : 'Bienvenido.';
  $('#loginHint').textContent = loginMode === 'manager'
    ? `Cuenta demostrativa: ${MANAGER.user} · Contraseña: ${MANAGER.pass}`
    : 'Ingresa con tu usuario y contraseña. Si aún no tienes cuenta, se creará un perfil local.';
  $('#loginFeedback').textContent = '';
  $('#loginUser').autocomplete = 'username';
}

function showPanel() {
  document.body.classList.add('panel-mode');
  $('#panel').hidden = false;
  renderDashboard();
  window.scrollTo(0, 0);
}

function hidePanel() {
  document.body.classList.remove('panel-mode');
  $('#panel').hidden = true;
  const active = $('.site-section.active-section') || $('#inicio');
  showSection(active.id, { updateHash: false });
}

function handleLogin(event) {
  event.preventDefault();
  const role = selectedRole();
  const user = $('#loginUser').value.trim();
  const pass = $('#loginPass').value;
  const feedback = $('#loginFeedback');

  if (!user || pass.length < 4) {
    feedback.textContent = 'Completa los campos. La contraseña debe tener al menos 4 caracteres.';
    return;
  }

  if (role === 'manager') {
    if (user.toLowerCase() !== MANAGER.user || pass !== MANAGER.pass) {
      feedback.textContent = 'Credenciales de demostración incorrectas.';
      return;
    }
    write(KEYS.session, { role: 'manager', name: 'Gerencia ARKON', user: MANAGER.user });
    log('Inicio de sesión', 'Gerente');
  } else {
    const users = read(KEYS.users, []);
    let found = users.find(item => item.user.toLowerCase() === user.toLowerCase());

    if (found && found.pass !== pass) {
      feedback.textContent = 'La contraseña no coincide con el perfil local.';
      return;
    }

    if (!found) {
      found = { user, pass, name: user };
      users.push(found);
      write(KEYS.users, users);
      log('Registro de cliente', user);
    }

    write(KEYS.session, { role: 'client', name: found.name, user: found.user });
    log('Inicio de sesión', 'Cliente: ' + found.user);
  }

  feedback.textContent = '';
  event.target.reset();
  closeLogin();
  updateLoginButton();
  showPanel();
}

function handleLogout() {
  const session = currentSession();
  if (session) log('Cierre de sesión', session.name);
  localStorage.removeItem(KEYS.session);
  updateLoginButton();
  hidePanel();
  window.scrollTo(0, 0);
  toast('Sesión cerrada');
}

function setupLogin() {
  $('#loginOpen').addEventListener('click', () => {
    closeMenu();
    if (currentSession()) showPanel();
    else openLogin();
  });

  $('#loginClose').addEventListener('click', closeLogin);
  $('#loginModal').addEventListener('click', event => {
    if (event.target.hasAttribute('data-close')) closeLogin();
  });

  $$('[data-role]').forEach(button => button.addEventListener('click', () => setLoginMode(button.dataset.role)));
  setLoginMode('client');
  $('#loginForm').addEventListener('submit', handleLogin);
  $('#logoutBtn').addEventListener('click', handleLogout);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLogin();
  });

  updateLoginButton();
}

function setupContactForm() {
  const form = $('#contactForm');
  const nameField = form.elements.name;
  const phoneField = form.elements.phone;
  const messageField = form.elements.message;
  const emailField = form.elements.email;

  const mark = (field, valid) => {
    field.classList.toggle('field-valid', valid);
    field.classList.toggle('field-invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
  };
  const validateName = () => {
    const value = nameField.value.trim();
    const valid = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u.test(value) && value.length >= 3;
    nameField.setCustomValidity(valid ? '' : 'Escribe un nombre válido, usando letras, espacios o guiones.');
    mark(nameField, valid); return valid;
  };
  const validateEmail = () => {
    emailField.setCustomValidity('');
    const valid = emailField.value.trim() !== '' && !emailField.validity.typeMismatch && emailField.validity.valid;
    emailField.setCustomValidity(valid ? '' : 'Introduce un correo electrónico válido.');
    mark(emailField, valid); return valid;
  };
  const validatePhone = () => {
    const value = phoneField.value.trim();
    const digits = value.replace(/\D/g, '');
    const valid = !value || (/^[+0-9()\- ]{7,20}$/.test(value) && digits.length >= 7 && digits.length <= 15);
    phoneField.setCustomValidity(valid ? '' : 'Revisa el número; utiliza entre 7 y 15 dígitos.');
    mark(phoneField, valid); return valid;
  };
  const validateService = () => {
    const valid = Boolean(form.elements.service.value);
    form.elements.service.setCustomValidity(valid ? '' : 'Selecciona un servicio.');
    mark(form.elements.service, valid); return valid;
  };
  const validateMessage = () => {
    const length = messageField.value.trim().length;
    const valid = length >= 20 && length <= 1200;
    messageField.setCustomValidity(valid ? '' : 'Describe tu proyecto con al menos 20 caracteres.');
    mark(messageField, valid); return valid;
  };
  nameField.addEventListener('input', validateName);
  nameField.addEventListener('blur', validateName);
  emailField.addEventListener('input', validateEmail);
  emailField.addEventListener('blur', validateEmail);
  phoneField.addEventListener('input', validatePhone);
  phoneField.addEventListener('blur', validatePhone);
  form.elements.service.addEventListener('change', validateService);
  form.elements.service.addEventListener('blur', validateService);
  messageField.addEventListener('input', validateMessage);
  messageField.addEventListener('blur', validateMessage);

  form.addEventListener('submit', event => {
    event.preventDefault();
    const checks = [validateName(), validateEmail(), validatePhone(), validateService(), validateMessage()];
    if (checks.some(valid => !valid)) {
      $('#formFeedback').textContent = 'Revisa los campos marcados antes de continuar.';
      form.querySelector('.field-invalid')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const session = currentSession();
    const item = {
      id: 'AR-' + Date.now().toString().slice(-8),
      name: data.name.trim().replace(/\s+/g, ' '),
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      service: data.service,
      message: data.message.trim(),
      owner: session?.user || data.email.trim().toLowerCase(),
      status: 'Pendiente',
      created: new Date().toLocaleString('es-BO')
    };

    const requests = read(KEYS.requests);
    requests.unshift(item);
    write(KEYS.requests, requests);
    log('Nueva consulta', `${item.name} · ${item.service}`);
    const whatsappText = [
      'Hola, ARKON INGENIERÍA. Quisiera realizar una consulta:',
      '', `Nombre: ${item.name}`, `Correo: ${item.email}`,
      `Teléfono: ${item.phone || 'No indicado'}`, `Servicio: ${item.service}`,
      `Detalle: ${item.message}`, `Código de consulta: ${item.id}`
    ].join('\n');
    const whatsappUrl = `https://wa.me/59178826105?text=${encodeURIComponent(whatsappText)}`;
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!whatsappWindow) window.location.href = whatsappUrl;
    form.reset();
    [nameField, emailField, phoneField, form.elements.service, messageField].forEach(field => {
      field.classList.remove('field-valid', 'field-invalid');
      field.removeAttribute('aria-invalid');
      field.setCustomValidity('');
    });
    $('#formFeedback').textContent = 'Consulta guardada en este dispositivo. Completa el envío pulsando Enviar en WhatsApp.';
    toast('Consulta registrada');
  });
}

function requestCard(request, manager = false) {
  const options = ['Pendiente', 'En proceso', 'Finalizada']
    .map(status => `<option ${request.status === status ? 'selected' : ''}>${status}</option>`)
    .join('');

  const actions = manager ? `
    <div class="request-actions">
      <select aria-label="Estado de ${escapeHTML(request.id)}" data-status="${escapeHTML(request.id)}">${options}</select>
      <button data-delete="${escapeHTML(request.id)}">Eliminar</button>
    </div>` : '';

  return `
    <article class="request-card">
      <div>
        <h4>${escapeHTML(request.service)} <span class="status">${escapeHTML(request.status)}</span></h4>
        <div class="request-meta">
          <span>${escapeHTML(request.id)}</span>
          <span>${escapeHTML(request.created)}</span>
          <span>${escapeHTML(request.name)}</span>
          <span>${escapeHTML(request.email)}</span>
        </div>
        <p>${escapeHTML(request.message)}</p>
        ${request.phone ? `<p>Teléfono: ${escapeHTML(request.phone)}</p>` : ''}
      </div>
      ${actions}
    </article>`;
}

function renderRequests() {
  const session = currentSession();
  if (!session) return;

  const all = read(KEYS.requests);
  const mine = all.filter(request => request.owner === session.user);
  const query = $('#requestSearch').value.toLowerCase();
  const status = $('#statusFilter').value;
  const filtered = all.filter(request =>
    (status === 'all' || request.status === status) &&
    [request.name, request.email, request.service, request.id].join(' ').toLowerCase().includes(query)
  );

  $('#clientTotal').textContent = `${mine.length} registro${mine.length === 1 ? '' : 's'}`;
  $('#clientRequests').innerHTML = mine.length
    ? mine.map(request => requestCard(request)).join('')
    : '<p class="empty">Todavía no tienes consultas registradas en este navegador.</p>';

  $('#managerRequests').innerHTML = filtered.length
    ? filtered.map(request => requestCard(request, true)).join('')
    : '<p class="empty">No hay consultas que coincidan con la búsqueda.</p>';

  $('#statTotal').textContent = all.length;
  $('#statPending').textContent = all.filter(request => request.status === 'Pendiente').length;
  $('#statProgress').textContent = all.filter(request => request.status === 'En proceso').length;
  $('#statDone').textContent = all.filter(request => request.status === 'Finalizada').length;

  const isManager = session.role === 'manager';
  $('#clientPanel').hidden = isManager;
  $('#managerPanel').hidden = !isManager;
  $('#dashboardTitle').textContent = isManager ? 'Panel de gerencia' : 'Mi espacio';
  $('#userName').textContent = session.name;
  $('#userRole').textContent = isManager ? 'GERENTE' : 'CLIENTE';
  $('#userInitial').textContent = session.name.charAt(0).toUpperCase();
}

function renderLogs() {
  const logs = read(KEYS.logs);
  const totalPages = Math.max(1, Math.ceil(logs.length / LOG_PAGE_SIZE));
  currentLogPage = Math.min(Math.max(1, currentLogPage), totalPages);
  const start = (currentLogPage - 1) * LOG_PAGE_SIZE;
  const pageItems = logs.slice(start, start + LOG_PAGE_SIZE);

  $('#activityLog').innerHTML = pageItems.length
    ? pageItems.map(item => `
        <div class="log-item">
          <span><b>${escapeHTML(item.action)}</b> — ${escapeHTML(item.detail)}</span>
          <span>${escapeHTML(item.at)}</span>
        </div>`).join('')
    : '<p class="empty">Aún no hay actividad registrada.</p>';

  const pagination = $('#logPagination');
  if (!pagination) return;
  pagination.innerHTML = logs.length > LOG_PAGE_SIZE ? `
    <button type="button" data-log-page="${currentLogPage - 1}" ${currentLogPage === 1 ? 'disabled' : ''}>← Anterior</button>
    <span>Página ${currentLogPage} de ${totalPages} · ${logs.length} registros</span>
    <button type="button" data-log-page="${currentLogPage + 1}" ${currentLogPage === totalPages ? 'disabled' : ''}>Siguiente →</button>
  ` : (logs.length ? `<span>${logs.length} registro${logs.length === 1 ? '' : 's'}</span>` : '');
}

function renderDashboard() {
  renderRequests();
  renderLogs();
}

function setupDashboard() {
  $$('[data-leave-panel]').forEach(link => link.addEventListener('click', hidePanel));

  $('#managerRequests').addEventListener('change', event => {
    const id = event.target.dataset.status;
    if (!id) return;
    const requests = read(KEYS.requests);
    const request = requests.find(item => item.id === id);
    if (!request) return;
    request.status = event.target.value;
    write(KEYS.requests, requests);
    log('Actualización de consulta', `${id} → ${request.status}`);
    renderRequests();
    toast('Estado actualizado');
  });

  $('#managerRequests').addEventListener('click', event => {
    const id = event.target.dataset.delete;
    if (!id || !confirm('¿Eliminar esta consulta?')) return;
    write(KEYS.requests, read(KEYS.requests).filter(item => item.id !== id));
    log('Eliminación de consulta', id);
    renderRequests();
    toast('Consulta eliminada');
  });

  $('#logPagination').addEventListener('click', event => {
    const button = event.target.closest('[data-log-page]');
    if (!button || button.disabled) return;
    currentLogPage = Number(button.dataset.logPage);
    renderLogs();
  });

  $('#requestSearch').addEventListener('input', renderRequests);
  $('#statusFilter').addEventListener('change', renderRequests);

  $('#exportBtn').addEventListener('click', () => {
    const rows = read(KEYS.requests);
    if (!rows.length) {
      toast('No hay consultas para exportar');
      return;
    }
    const columns = ['id', 'name', 'email', 'phone', 'service', 'message', 'status', 'created'];
    const csv = [
      columns.join(';'),
      ...rows.map(row => columns.map(col => '"' + String(row[col] ?? '').replace(/"/g, '""') + '"').join(';'))
    ].join('\n');
    downloadFile('\ufeff' + csv, 'arkon-consultas.csv', 'text/csv;charset=utf-8');
    log('Exportación', 'Consultas exportadas a CSV');
  });

  $('#clearDataBtn').addEventListener('click', () => {
    if (!confirm('Esto eliminará todas las consultas y bitácoras guardadas en este navegador. ¿Continuar?')) return;
    write(KEYS.requests, []);
    write(KEYS.logs, []);
    currentLogPage = 1;
    renderDashboard();
    toast('Datos locales eliminados');
  });
}

function setupServiceWorker() {
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }
}

setupNavigation();
setupAppearance();
setupServices();
setupLogin();
setupContactForm();
setupDashboard();
setupServiceWorker();
renderLogs();
$('#year').textContent = new Date().getFullYear();
