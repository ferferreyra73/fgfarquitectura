// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Project filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  '.project-card, .service-card, .team-card, .step, .about-text, .contact-info'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Contact form — envía por email (Formspree) Y abre WhatsApp
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre   = document.getElementById('nombre').value.trim();
  const email    = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const servicio = document.getElementById('servicio').value.trim();
  const mensaje  = document.getElementById('mensaje').value.trim();

  // 1. Enviar al correo vía Formspree
  const fd = new FormData();
  fd.append('nombre', nombre);
  fd.append('email', email);
  fd.append('telefono', telefono);
  fd.append('servicio', servicio);
  fd.append('mensaje', mensaje);
  fd.append('_replyto', email);
  fetch('https://formspree.io/f/xredaypb', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: fd
  });

  // 2. Abrir WhatsApp con el mensaje
  const texto =
    `Hola Fernando, te escribo desde tu web FGF Arquitectura.\n\n` +
    `*Nombre:* ${nombre}\n` +
    `*Email:* ${email}\n` +
    (telefono ? `*Teléfono:* ${telefono}\n` : '') +
    (servicio ? `*Proyecto:* ${servicio}\n` : '') +
    `\n*Consulta:*\n${mensaje}`;

  window.open('https://wa.me/5493516113457?text=' + encodeURIComponent(texto), '_blank');

  this.reset();
  const success = document.getElementById('formSuccess');
  success.classList.remove('hidden');
  setTimeout(() => success.classList.add('hidden'), 6000);
});

// ─────────────────────────────────────────────────────────────────────────────
// GALERÍAS DE PROYECTOS
// Para agregar/cambiar imágenes en cualquier proyecto:
//   1. Copiá el archivo a la carpeta  img/CARPETA-DEL-PROYECTO/
//   2. Agregá una línea:  { type: 'img', src: 'img/CARPETA/nombre.jpg', caption: 'Texto pie de foto' },
//   3. Para reemplazar la portada del card, editá el <img src="..."> en index.html
//   4. El PRIMER elemento de cada galería es la primera foto que se ve al abrir
// ─────────────────────────────────────────────────────────────────────────────
// Gallery modal
const galleries = {

  // ── A-498 · Armenia 498 · Córdoba ─────────────────────────────────────────
  // Carpeta: img/A-498/   |   Portada: index.html → data-gallery="A498"
  A498: [
    { type: 'img',   src: 'img/A-498/render-03.jpg',    caption: 'Armenia 498 — Fachada principal · Hormigón visto y ladrillo · Alta Gracia, 2026' },
    { type: 'video', src: 'video/A-498/secuencia-01.mp4', caption: 'Armenia 498 — Secuencia animada · Recorrido del conjunto · Alta Gracia, 2026' },
    { type: 'img',   src: 'img/A-498/maqueta-01.jpg',   caption: 'Armenia 498 — Maqueta de estudio · Conjunto modular de 6 unidades · Alta Gracia, 2026' },
    { type: 'img',   src: 'img/A-498/lamina-diseno.jpg', caption: 'Armenia 498 — Lámina conceptual · Planta, Sección, Axonométrico y Materialidad · Alta Gracia, 2026' },
    { type: 'img',   src: 'img/A-498/obra-03.jpg',      caption: 'Armenia 498 — Losa de fundación · Armadura en ejecución · Alta Gracia, 2026' },
    { type: 'img',   src: 'img/A-498/obra-04.jpg',      caption: 'Armenia 498 — Inicio de obra · Fundaciones y replanteo · Alta Gracia, 2026' },
    { type: 'video', src: 'video/A-498/anim-01.mp4',    caption: 'Armenia 498 — Animación · Recorrido exterior 01' },
    { type: 'video', src: 'video/A-498/anim-02.mp4',    caption: 'Armenia 498 — Animación · Recorrido exterior 02' },
    { type: 'video', src: 'video/A-498/anim-03.mp4',    caption: 'Armenia 498 — Animación · Recorrido exterior 03' },
    { type: 'video', src: 'video/A-498/seq-7.mp4',      caption: 'Armenia 498 — Secuencia · Vista del conjunto' },
  ],
  // ── SALDANA · Causana · Córdoba ───────────────────────────────────────────
  // Carpeta: img/saldana/
  // Para agregar renders:  render-01.jpg, render-02.jpg ...
  // Para agregar fotos de obra: obra-01.jpg, obra-02.jpg ...
  // Nota: ext-galeria-01.jpg pertenece a La Arbolada → guardada en img/_pendiente/arbolada/
  SALDANA: [
    // ── RENDERS ──
    { type: 'img',   src: 'img/saldana/render-01.jpg',       caption: 'Causana — Fachada principal · Acceso peatonal y vehicular · Barrio Causana, Córdoba' },
    { type: 'img',   src: 'img/saldana/render-02.jpg',       caption: 'Causana — Vista lateral · Cochera y galería al atardecer' },
    { type: 'img',   src: 'img/saldana/render-03.jpg',       caption: 'Causana — Vista posterior · Piscina, pérgola y jardín al atardecer' },
    // ── FOTOS EXISTENTES ──
    { type: 'img',   src: 'img/saldana/ext-01.jpg',          caption: 'Causana — Vista exterior · Barrio Causana, Córdoba' },
    { type: 'img',   src: 'img/saldana/ext-03.jpg',          caption: 'Causana — Exterior lateral izquierdo' },
    { type: 'img',   src: 'img/saldana/ext-04.jpg',          caption: 'Causana — Perspectiva posterior' },
    { type: 'img',   src: 'img/saldana/ext-05.jpg',          caption: 'Causana — Fachada acceso vehicular' },
    { type: 'img',   src: 'img/saldana/ext-06.jpg',          caption: 'Causana — Vista acceso peatonal y jardín' },
    // ── LÁMINA / PLANOS ──
    { type: 'img',   src: 'img/saldana/lamina-diseno.jpg',   caption: 'Causana — Lámina · Planta, Sección, Axonométrico y Evolución Volumétrica · Materiales y Techo Plano' },
    { type: 'img',   src: 'img/saldana/plano-municipal.jpg', caption: 'Causana — Plano Municipal · MUNICIPAL CAUSANA · Remodelación 250 m²' },
  ],
  // ── TOURING · N-90 Casa Touring · Alta Gracia ────────────────────────────
  // Carpeta: img/touring/
  TOURING: [
    // ── VIDEOS ──
    { type: 'video', src: 'video/touring/vizmaker-03.mp4', caption: 'N-90 Casa Touring — Visualización animada · Recorrido interior' },
    // ── MAQUETA ──
    { type: 'img', src: 'img/touring/maqueta-01.jpg', caption: 'N-90 Casa Touring — Maqueta · Piscina, deck y cochera · Alta Gracia' },
    // ── RENDERS EXTERIORES ──
    { type: 'img', src: 'img/touring/render-ext-04.jpg', caption: 'N-90 Casa Touring — Vista posterior · Piscina y deck · Alta Gracia' },
    { type: 'img', src: 'img/touring/render-ext-05.jpg', caption: 'N-90 Casa Touring — Acceso vehicular · Cochera cubierta · Alta Gracia' },
    { type: 'img', src: 'img/touring/render-ext-01.jpg', caption: 'N-90 Casa Touring — Vista nocturna · Piscina iluminada' },
    { type: 'img', src: 'img/touring/render-ext-02.jpg', caption: 'N-90 Casa Touring — Vista posterior · Entorno nevado' },
    { type: 'img', src: 'img/touring/render-ext-03.jpg', caption: 'N-90 Casa Touring — Fachada principal · Cochera con nieve' },
    // ── INTERIORES ──
    { type: 'img', src: 'img/touring/final-01.jpg',      caption: 'N-90 Casa Touring — Estar-comedor con vista a piscina · Alta Gracia' },
    { type: 'img', src: 'img/touring/int-new-01.jpg',    caption: 'N-90 Casa Touring — Escritorio · Biblioteca y home office · Alta Gracia' },
    { type: 'img', src: 'img/touring/int-new-02.jpg',    caption: 'N-90 Casa Touring — Escritorio nocturno · Iluminación artificial · Alta Gracia' },
    { type: 'img', src: 'img/touring/int-new-03.jpg',    caption: 'N-90 Casa Touring — Comedor · Diseño de interiores · Alta Gracia' },
    { type: 'img', src: 'img/touring/render-new-01.jpg', caption: 'N-90 Casa Touring — Comedor · Diseño de interiores · Alta Gracia' },
    { type: 'img', src: 'img/touring/render-new-02.jpg', caption: 'N-90 Casa Touring — Estudio · Home office integrado · Alta Gracia' },
    { type: 'img', src: 'img/touring/render-new-03.jpg', caption: 'N-90 Casa Touring — Cocina integrada · Mesada continua · Alta Gracia' },
    // ── OBRA ──
    { type: 'img', src: 'img/touring/obra-new-01.jpg', caption: 'N-90 Casa Touring — Avance de obra · Vista general fachada posterior · Alta Gracia' },
    { type: 'img', src: 'img/touring/obra-new-02.jpg', caption: 'N-90 Casa Touring — Avance de obra · Cochera metálica · Estructura cubierta' },
    { type: 'img', src: 'img/touring/obra-new-03.jpg', caption: 'N-90 Casa Touring — Avance de obra · Fachada principal · Encofrado y andamios' },
    { type: 'img', src: 'img/touring/obra-new-04.jpg', caption: 'N-90 Casa Touring — Avance de obra · Colocación de carpintería · Alta Gracia' },
    { type: 'img', src: 'img/touring/obra-new-05.jpg', caption: 'N-90 Casa Touring — Avance de obra · Interior planta baja · Terminaciones' },
    { type: 'img', src: 'img/touring/terminaciones-01.jpg', caption: 'N-90 Casa Touring — Terminaciones · Ducha con revestimiento travertino · Alta Gracia' },
    { type: 'img', src: 'img/touring/terminaciones-02.jpg', caption: 'N-90 Casa Touring — Terminaciones · Baño con vanitory y espejo · Alta Gracia' },
    { type: 'img', src: 'img/touring/terminaciones-03.jpg', caption: 'N-90 Casa Touring — Terminaciones · Cocina completa con mesada de granito · Alta Gracia' },
    { type: 'img', src: 'img/touring/terminaciones-04.jpg', caption: 'N-90 Casa Touring — Terminaciones · Baño en suite · Mesada travertino y griferías Roca' },
    { type: 'img', src: 'img/touring/terminaciones-05.jpg', caption: 'N-90 Casa Touring — Terminaciones · Vanitory con mesada travertino · Alta Gracia' },
    // ── PLANO ──
    { type: 'img', src: 'img/touring/lamina-diseno.jpg',  caption: 'N-90 Casa Touring — Lámina · Planta, Sección, Evolución de Forma y Materiales' },
    { type: 'img', src: 'img/touring/plano-touring.jpg', caption: 'N-90 Casa Touring — Planta actualizada · Alta Gracia, Barrio Touring' },
  ],
  // ── LAZARO · Housing MM-448 · Alta Gracia ────────────────────────────────
  // Carpeta: img/lazaro/   |   Portada: post-01.jpg
  // Para agregar más posts del mosaico: post-02.jpg, post-03.jpg ...
  // Para agregar más fotos de obra:     obra-09.jpg, obra-10.jpg ...
  LAZARO: [
    { type: 'img', src: 'img/lazaro/post-01.jpg',       caption: 'Housing MM-448 — Obra en curso 2025 · 10 dúplex · Alta Gracia · FGFARQUITECTURA' },
    { type: 'img', src: 'img/lazaro/render-01.jpg',     caption: 'Housing MM-448 — Vista fachada principal · Complejo Residencial 448, Alta Gracia' },
    { type: 'img', src: 'img/lazaro/render-02.jpg',     caption: 'Housing MM-448 — Interior pasaje y cocheras · Conjunto residencial' },
    { type: 'img', src: 'img/lazaro/obra-04.jpg',       caption: 'Housing MM-448 — Fachada principal · Avance de obra' },
    { type: 'img', src: 'img/lazaro/obra-05.jpg',       caption: 'Housing MM-448 — Vista exterior · Dúplex en construcción' },
    { type: 'img', src: 'img/lazaro/obra-06.jpg',       caption: 'Housing MM-448 — Proceso constructivo · Alta Gracia' },
    { type: 'img', src: 'img/lazaro/obra-07.jpg',       caption: 'Housing MM-448 — Detalle de terminaciones' },
    { type: 'img', src: 'img/lazaro/obra-08.jpg',       caption: 'Housing MM-448 — Avance general de obra' },
    { type: 'img', src: 'img/lazaro/obra-01.jpg',       caption: 'Housing MM-448 — Instalaciones de gas en ejecución' },
    { type: 'img', src: 'img/lazaro/obra-02.jpg',       caption: 'Housing MM-448 — Detalle instalaciones' },
    { type: 'img', src: 'img/lazaro/obra-03.jpg',       caption: 'Housing MM-448 — Avance de obra' },
    { type: 'img', src: 'img/lazaro/obra-nueva-01.jpg', caption: 'Housing MM-448 — Fachada en terminaciones · Número 448 · Alta Gracia' },
    { type: 'img', src: 'img/lazaro/lamina-diseno.jpg',  caption: 'Housing MM-448 — Lámina · Planta Nivel, Corte B-B, Axonométrico y Evolución Volumétrica · Materiales' },
    { type: 'img', src: 'img/lazaro/plano-cortes.jpg',  caption: 'Housing MM-448 — Corte A-A y B-B · Plano Municipal 1:100' },
    { type: 'img', src: 'img/lazaro/plano-plantas.jpg', caption: 'Housing MM-448 — Plantas Nivel 1, 2, 3 y Techos · 1:100' },
    { type: 'img', src: 'img/lazaro/plano-web.jpg',     caption: 'Housing MM-448 — Plano Municipal completo' },
  ],
  // ── COSTAAZUL · G-154 Vivienda en Ladera · V. Carlos Paz ─────────────────
  // Carpeta: img/costaazul/
  COSTAAZUL: [
    // ── RENDERS ──
    { type: 'img', src: 'img/costaazul/render-01.jpg', caption: 'G-154 Vivienda en Ladera — Vista posterior · Piscina y deck · Barrio Costa Azul, Villa Carlos Paz' },
    { type: 'img', src: 'img/costaazul/maqueta-01.jpg', caption: 'G-154 Vivienda en Ladera — Maqueta · Barrio Costa Azul, Villa Carlos Paz' },
    { type: 'img', src: 'img/costaazul/render-02.jpg', caption: 'G-154 Vivienda en Ladera — Vista nocturna posterior · Iluminación exterior' },
    { type: 'img', src: 'img/costaazul/render-03.jpg', caption: 'G-154 Vivienda en Ladera — Fachada principal · Acceso vehicular' },
    { type: 'img', src: 'img/costaazul/render-04.jpg', caption: 'G-154 Vivienda en Ladera — Fachada principal nocturna' },
    { type: 'img', src: 'img/costaazul/render-05.jpg', caption: 'G-154 Vivienda en Ladera — Fachada principal · Entorno nevado' },
    { type: 'img', src: 'img/costaazul/render-06.jpg', caption: 'G-154 Vivienda en Ladera — Vista posterior · Invierno con nieve' },
    // ── LÁMINA / PLANOS ──
    { type: 'img', src: 'img/costaazul/lamina-diseno.jpg', caption: 'G-154 Vivienda en Ladera — Lámina · Planta, Sección y Evolución de Forma · Materiales' },
    { type: 'img', src: 'img/costaazul/plano-pb.jpg',      caption: 'G-154 Vivienda en Ladera — Planta Baja' },
    { type: 'img', src: 'img/costaazul/plano-p1.jpg',      caption: 'G-154 Vivienda en Ladera — Planta -1 (semisótano)' },
    { type: 'img', src: 'img/costaazul/plano-p2.jpg',      caption: 'G-154 Vivienda en Ladera — Planta -2' },
  ],
  // ── OMARBDU · Casa Los Cerros 59 · V. Carlos Paz ────────────────────────
  // Carpeta: img/omarbdu/
  // ── OMARBDU · Casa Los Cerros 59 · V. Carlos Paz ────────────────────────
  // Carpeta: img/omarbdu/
  // Para agregar renders propios del proyecto: ext-render-01.jpg, ext-render-02.jpg ...
  OMARBDU: [
    { type: 'video', src: 'video/omarbdu/vizmaker-01.mp4', caption: 'Casa Los Cerros 59 — Visualización animada · Recorrido del proyecto' },
    { type: 'img', src: 'img/omarbdu/ext-dia-05.jpg',   caption: 'Casa Los Cerros 59 — Fachada principal · Villa Carlos Paz, 2017' },
    { type: 'img', src: 'img/omarbdu/int-05.jpg',       caption: 'Casa Los Cerros 59 — Cocina y comedor · Vista panorámica · Mármol verde y nogal' },
    { type: 'img', src: 'img/omarbdu/int-04.jpg',       caption: 'Casa Los Cerros 59 — Biblioteca y sala de estar · Diseño de interiores' },
    { type: 'img', src: 'img/omarbdu/lamina-diseno.jpg', caption: 'Casa Los Cerros 59 — Lámina · Planta Baja, Planta Alta, Sección y Evolución de Forma · Materiales' },
    { type: 'img', src: 'img/omarbdu/plano-pb.jpg',     caption: 'Casa Los Cerros 59 — Planta Baja · Proyecto Municipal' },
    { type: 'img', src: 'img/omarbdu/plano-pa.jpg',     caption: 'Casa Los Cerros 59 — Planta Alta · Proyecto Municipal' },
    { type: 'img', src: 'img/omarbdu/conforme-obra.jpg', caption: 'Casa Los Cerros 59 — Plano Conforme a Obra · 2017' },
  ],
  // ── G133 · Casa en la Montaña · V. Carlos Paz ───────────────────────────
  // Carpeta: img/g133/
  G133: [
    // ── INTERIORES ──
    { type: 'img', src: 'img/g133/int-fam-01.jpg', caption: 'G-133 Casa en la Montaña — Estar · Chimenea y biblioteca · Villa Carlos Paz' },
    { type: 'img', src: 'img/g133/int-fam-02.jpg', caption: 'G-133 Casa en la Montaña — Cocina · Isla central y comedor integrado · Villa Carlos Paz' },
    { type: 'img', src: 'img/g133/int-fam-03.jpg', caption: 'G-133 Casa en la Montaña — Comedor · Cocina abierta y living · Villa Carlos Paz' },
    // ── EXTERIORES ──
    { type: 'img', src: 'img/g133/ext-01.jpg',         caption: 'G-133 Casa en la Montaña — Fachada principal · Barrio La Cuesta, Villa Carlos Paz' },
    { type: 'img', src: 'img/g133/ext-02.jpg',         caption: 'G-133 Casa en la Montaña — Piscina lap y patio lateral' },
    { type: 'img', src: 'img/g133/ext-03.jpg',         caption: 'G-133 Casa en la Montaña — Vista exterior posterior' },
    { type: 'img', src: 'img/g133/ext-04.jpg',         caption: 'G-133 Casa en la Montaña — Fachada lateral' },
    { type: 'img', src: 'img/g133/ext-00.jpg',         caption: 'G-133 Casa en la Montaña — Vista aérea general' },
    { type: 'img', src: 'img/g133/ext-06.jpg',         caption: 'G-133 Casa en la Montaña — Perspectiva calle' },
    { type: 'img', src: 'img/g133/obra-01.jpg',        caption: 'G-133 Casa en la Montaña — Avance de obra · Estructura' },
    { type: 'img', src: 'img/g133/obra-02.jpg',        caption: 'G-133 Casa en la Montaña — Proceso constructivo' },
    { type: 'img', src: 'img/g133/obra-03.jpg',        caption: 'G-133 Casa en la Montaña — Mampostería y terminaciones' },
    { type: 'img', src: 'img/g133/obra-04.jpg',        caption: 'G-133 Casa en la Montaña — Detalle constructivo' },
    { type: 'img', src: 'img/g133/obra-05.jpg',        caption: 'G-133 Casa en la Montaña — Dirección de obra' },
    { type: 'img', src: 'img/g133/obra-06.jpg',        caption: 'G-133 Casa en la Montaña — Instalaciones en ejecución' },
    { type: 'img', src: 'img/g133/plano-subsuelo.jpg', caption: 'G-133 · Planta Sub Suelo — Arquitectura Ejecutiva 1:100' },
    { type: 'img', src: 'img/g133/plano-pb.jpg',       caption: 'G-133 · Planta Baja — Arquitectura Ejecutiva 1:100' },
    { type: 'img', src: 'img/g133/plano-pa.jpg',       caption: 'G-133 · Planta Alta — Arquitectura Ejecutiva 1:100' },
    { type: 'img', src: 'img/g133/lamina-diseno.jpg',  caption: 'G-133 Casa en la Montaña — Lámina · Planta, Sección, Axonométrico y Evolución de Forma · Materiales' },
  ],
  // ── L1336 · Casa L-1336 · Córdoba ───────────────────────────────────────
  // Carpeta: img/l1336/
  L1336: [
    { type: 'img', src: 'img/l1336/frente-01.jpg',    caption: 'Casa L-1336 — Vista exterior fachada principal · Córdoba' },
    { type: 'img', src: 'img/l1336/frente-02.jpg',    caption: 'Casa L-1336 — Fachada con acceso vehicular' },
    { type: 'img', src: 'img/l1336/frente-04.jpg',    caption: 'Casa L-1336 — Alternativa fachada sin reja' },
    { type: 'img', src: 'img/l1336/frente-03.jpg',    caption: 'Casa L-1336 — Vista frontal completa · Opción 02' },
    { type: 'img', src: 'img/l1336/fondo-01.jpg',     caption: 'Casa L-1336 — Patio posterior con piscina y quincho' },
    { type: 'img', src: 'img/l1336/fondo-02.jpg',     caption: 'Casa L-1336 — Vista posterior y jardín' },
    { type: 'img', src: 'img/l1336/axo-01.jpg',       caption: 'Casa L-1336 — Vista axonométrica general' },
    { type: 'img', src: 'img/l1336/axo-02.jpg',       caption: 'Casa L-1336 — Axonométrica posterior' },
    { type: 'img', src: 'img/l1336/plano-arq-p1.jpg', caption: 'Casa L-1336 — Plano Municipal Arquitectura · Calle Lepri' },
    { type: 'img', src: 'img/l1336/plano-op02-p1.jpg', caption: 'Casa L-1336 — Alternativa Op-02 · Plano Municipal' },
  ],
  // ── FRPADREHIJO · F-22 Casa La Cuesta Colorada · La Calera ──────────────
  // Carpeta: img/fr-padre-hijo/
  FRPADREHIJO: [
    { type: 'img', src: 'img/fr-padre-hijo/render-01.jpg',   caption: 'F-22 Casa La Cuesta Colorada — Fachada principal · Vista atardecer · La Calera' },
    { type: 'img', src: 'img/fr-padre-hijo/render-02.jpg',   caption: 'F-22 Casa La Cuesta Colorada — Vista posterior · Piscina y jardín' },
    { type: 'img', src: 'img/fr-padre-hijo/lamina-diseno.jpg', caption: 'F-22 Casa La Cuesta Colorada — Lámina · Plantas, Sección, Axonométrico y Evolución de Forma · Materiales' },
    { type: 'img', src: 'img/fr-padre-hijo/plano-pb.jpg',   caption: 'F-22 Casa La Cuesta Colorada — Planta Baja · 520 m²' },
    { type: 'img', src: 'img/fr-padre-hijo/plano-pa.jpg',   caption: 'F-22 Casa La Cuesta Colorada — Planta Alta' },
    { type: 'img', src: 'img/fr-padre-hijo/plano-ss.jpg',   caption: 'F-22 Casa La Cuesta Colorada — Planta Subsuelo' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-01.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Inicio estructura · 2008' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-02.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Mampostería en ejecución · 2009' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-03.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Avance exterior · Sep 2009' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-04.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Vista panorámica del conjunto' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-05.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Fachada casi terminada · Nov 2009' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-06.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Terminaciones exteriores · 2010' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-07.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Detalle interior en ejecución' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-08.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Ambientes interiores finales' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-09.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Espacios de alta terminación' },
    { type: 'img', src: 'img/fr-padre-hijo/obra-10.jpg',    caption: 'F-22 Casa La Cuesta Colorada — Detalle de materiales nobles' },
  ],
  // ── FRIZOLO · R5-486 Casa Frizolo · Córdoba ─────────────────────────────
  // Carpeta: img/frizolo/
  FRIZOLO: [
    { type: 'img', src: 'img/frizolo/maqueta-01.jpg',  caption: 'R5-486 — Maqueta · Volúmenes y terrazas · Córdoba' },
    { type: 'img', src: 'img/frizolo/lamina-diseno.jpg', caption: 'R5-486 — Lámina · Planta, Sección, Axonométrico y Evolución Volumétrica · Materiales' },
    { type: 'img', src: 'img/frizolo/ext-04.jpg',             caption: 'R5-486 — Vista aérea · Conjunto con jardín · Córdoba' },
    { type: 'img', src: 'img/frizolo/ext-05.jpg',             caption: 'R5-486 Casa Frizolo — Perspectiva exterior · Córdoba' },
    { type: 'img', src: 'img/frizolo/plano-pb.jpg',           caption: 'R5-486 Casa Frizolo — Planta Baja · 250 m²' },
    { type: 'img', src: 'img/frizolo/plano-pa.jpg',           caption: 'R5-486 Casa Frizolo — Planta Alta' },
    { type: 'img', src: 'img/frizolo/fachada-principal.jpg',  caption: 'R5-486 Casa Frizolo — Fachada Principal · Plano Municipal' },
    { type: 'img', src: 'img/frizolo/fachada-laterales.jpg',  caption: 'R5-486 Casa Frizolo — Fachadas Laterales · Plano Municipal' },
    { type: 'img', src: 'img/frizolo/obra-01.jpg',            caption: 'R5-486 Casa Frizolo — Mampostería en ejecución · Córdoba' },
    { type: 'img', src: 'img/frizolo/obra-02.jpg',            caption: 'R5-486 Casa Frizolo — Avance de obra' },
    { type: 'img', src: 'img/frizolo/obra-03.jpg',            caption: 'R5-486 Casa Frizolo — Estructura' },
    { type: 'img', src: 'img/frizolo/obra-04.jpg',            caption: 'R5-486 Casa Frizolo — Proceso constructivo' },
  ],
  // ── HIRVONNEN · H-2003 · Córdoba ────────────────────────────────────────
  // Carpeta: img/hirvonnen/
  HIRVONNEN: [
    { type: 'img', src: 'img/hirvonnen/ext-05.jpg',    caption: 'H-2003 Casa Esquina — Vista exterior fachada principal · Córdoba' },
    { type: 'img', src: 'img/hirvonnen/ext-06.jpg',    caption: 'H-2003 Casa Esquina — Perspectiva general del conjunto' },
    { type: 'img', src: 'img/hirvonnen/lamina-01.jpg', caption: 'H-2003 Casa Esquina — Lámina constructiva · Axonométrica explodida · Sistemas y estructura' },
    { type: 'img', src: 'img/hirvonnen/lamina-02.jpg', caption: 'H-2003 Casa Esquina — Lámina · Planta General, Corte, Axonométrico y Evolución de Forma · Materiales' },
    { type: 'img', src: 'img/hirvonnen/plano-00.jpg',  caption: 'H-2003 Casa Esquina — Plano Municipal · Planta General' },
    { type: 'img', src: 'img/hirvonnen/plano-01.jpg',  caption: 'H-2003 Casa Esquina — Plano Municipal · Cortes y Elevaciones' },
    { type: 'img', src: 'img/hirvonnen/plano-02.jpg',  caption: 'H-2003 Casa Esquina — Plano Municipal · Detalles Constructivos' },
  ],
  // ── JA036 · J-036 Dúplex Moyano · Alta Gracia ───────────────────────────
  // Carpeta: img/ja036/
  JA036: [
    { type: 'img', src: 'img/ja036/post-07.jpg', caption: 'J-036 · Ficha del proyecto — 3 Dúplex · Alta Gracia, Córdoba' },
    { type: 'img', src: 'img/ja036/post-08.jpg', caption: 'J-036 · Vista aérea del conjunto terminado · Alta Gracia' },
    { type: 'img', src: 'img/ja036/post-09.jpg', caption: 'J-036 · Perspectiva aérea · Terraza, pileta y deck' },
    { type: 'img', src: 'img/ja036/post-04.jpg', caption: 'J-036 · Vista exterior · Dúplex 2 · Alta Gracia' },
    { type: 'img', src: 'img/ja036/post-05.jpg', caption: 'J-036 · Fachada y accesos · Dúplex en pendiente' },
    { type: 'img', src: 'img/ja036/post-06.jpg', caption: 'J-036 · Volumetría · Revestimiento en madera y hormigón' },
    { type: 'img', src: 'img/ja036/post-01.jpg', caption: 'J-036 · Vista del conjunto · Barrio privado' },
    { type: 'img', src: 'img/ja036/post-02.jpg', caption: 'J-036 · Perspectiva exterior · Jardín y circulaciones' },
    { type: 'img', src: 'img/ja036/post-03.jpg', caption: 'J-036 · Detalle de fachada · Materiales nobles' },
    { type: 'img', src: 'img/ja036/plano-00.jpg', caption: 'J-036 — Documentación BIM · Nelson Moyano · Alta Gracia' },
  ],
  // ── GUILLE · N-3000 Casa Nazjle · La Bolsa ──────────────────────────────
  // Carpeta: img/guille/
  // Para agregar renders: ext-01.jpg, ext-02.jpg ... (copiar a esta carpeta)
  // Nota: las ext-01..03 anteriores eran de MM-448 → guardadas en img/_pendiente/mm448-guille/
  //        las ext-04..05 anteriores eran de Moyano → guardadas en img/_pendiente/moyano-guille/
  GUILLE: [
    // ── RENDERS ──
    { type: 'img', src: 'img/guille/render-01.jpg', caption: 'N-3000 Casa Nazjle — Fachada nocturna · Cochera iluminada · La Bolsa, Córdoba' },
    { type: 'img', src: 'img/guille/render-02.jpg', caption: 'N-3000 Casa Nazjle — Vista posterior · Piscina y deck · La Bolsa, Córdoba' },
    { type: 'img', src: 'img/guille/render-03.jpg', caption: 'N-3000 Casa Nazjle — Fachada principal · Acceso vehicular · Día' },
    { type: 'img', src: 'img/guille/render-04.jpg', caption: 'N-3000 Casa Nazjle — Vista aérea nocturna · Piscina iluminada' },
    { type: 'img', src: 'img/guille/render-05.jpg', caption: 'N-3000 Casa Nazjle — Fachada nocturna · Iluminación LED y luna' },
    { type: 'img', src: 'img/guille/render-06.jpg', caption: 'N-3000 Casa Nazjle — Vista aérea posterior · Piscina y jardín' },
    // ── LÁMINA / MAQUETA ──
    { type: 'img', src: 'img/guille/lamina-diseno.jpg', caption: 'N-3000 Casa Nazjle — Lámina · Planta, Cortes, Axonométrica explodida y Materiales' },
    { type: 'img', src: 'img/guille/maqueta-01.jpg',    caption: 'N-3000 Casa Nazjle — Maqueta · La Bolsa, Córdoba' },
    // ── FOTOS DE OBRA ──
    { type: 'img', src: 'img/guille/obra-01.jpg',  caption: 'N-3000 Casa Nazjle — Avance de obra · La Bolsa, Córdoba, 2015' },
    { type: 'img', src: 'img/guille/obra-02.jpg',  caption: 'N-3000 Casa Nazjle — Estructura en ejecución · 2015' },
    { type: 'img', src: 'img/guille/obra-03.jpg',  caption: 'N-3000 Casa Nazjle — Proceso constructivo · 2015' },
    { type: 'img', src: 'img/guille/obra-04.jpg',  caption: 'N-3000 Casa Nazjle — Avance exterior · 2015' },
    { type: 'img', src: 'img/guille/obra-05.jpg',  caption: 'N-3000 Casa Nazjle — Terminaciones · 2015' },
    // ── PLANOS ──
    { type: 'img', src: 'img/guille/plano-00.jpg', caption: 'N-3000 Casa Nazjle — Plano Municipal · La Bolsa, Córdoba' },
  ],
  // ── LOSAROMAS · Casa Los Aromas · Valle Escondido ───────────────────────
  // Carpeta: img/los-aromas/
  // ── LOSAROMAS · Casa Los Aromas · Valle Escondido ───────────────────────
  // Carpeta: img/los-aromas/
  // Para agregar renders del proyecto: render-01.jpg, render-02.jpg ...
  // Nota: render-01/02 anteriores eran de F-22 Casa Cuesta Colorada → guardadas en img/_pendiente/cuesta-colorada/
  LOSAROMAS: [
    // ── RENDERS ──
    { type: 'img', src: 'img/los-aromas/render-00.jpg',     caption: 'Casa Los Aromas — Vista exterior · Valle Escondido, Barrio Los Aromas' },
    { type: 'img', src: 'img/los-aromas/maqueta-01.jpg',    caption: 'Casa Los Aromas — Maqueta · Valle Escondido, Barrio Los Aromas' },
    { type: 'img', src: 'img/los-aromas/lamina-diseno.jpg', caption: 'Casa Los Aromas — Lámina · Planta, Sección Longitudinal, Axonometría y Diagramas de Volumetría · Materiales' },
    // ── PLANOS ──
    { type: 'img', src: 'img/los-aromas/plano-pb.jpg',      caption: 'Casa Los Aromas — Planta Baja · 150 m²' },
    { type: 'img', src: 'img/los-aromas/plano-pa.jpg',      caption: 'Casa Los Aromas — Planta Alta' },
    { type: 'img', src: 'img/los-aromas/plano-fachada.jpg', caption: 'Casa Los Aromas — Fachada Principal · Plano Municipal' },
    // ── FOTOS DE OBRA ──
    { type: 'img', src: 'img/los-aromas/obra-01.jpg',       caption: 'Casa Los Aromas — Inicio de obra · Oct 2008' },
    { type: 'img', src: 'img/los-aromas/obra-02.jpg',       caption: 'Casa Los Aromas — Mampostería en ejecución · Nov 2008' },
    { type: 'img', src: 'img/los-aromas/obra-03.jpg',       caption: 'Casa Los Aromas — Avance de obra · Ene 2009' },
    { type: 'img', src: 'img/los-aromas/obra-04.jpg',       caption: 'Casa Los Aromas — Avance exterior · Ago 2009' },
    { type: 'img', src: 'img/los-aromas/obra-05.jpg',       caption: 'Casa Los Aromas — Terminaciones interiores · Feb 2010' },
  ],
  // ── BIM · Documentación técnica ─────────────────────────────────────────
  // Carpeta: img/bim/ y img/lazaro/ (planos)
  // ── TRAYECTORIA EN OBRA ──────────────────────────────────────────────────
  ERCILIA1: [
    { type: 'img', src: 'img/trayectoria/ercilia1/portada.jpg',  caption: 'Ercilia I — Fachada terminada · Bedoya 120, Alta Córdoba · 2003' },
    { type: 'img', src: 'img/trayectoria/ercilia1/proc-01.jpg',  caption: 'Ercilia I — Inicio de obra · Excavación y fundaciones' },
    { type: 'img', src: 'img/trayectoria/ercilia1/proc-02.jpg',  caption: 'Ercilia I — Estructura en ejecución' },
    { type: 'img', src: 'img/trayectoria/ercilia1/proc-03.jpg',  caption: 'Ercilia I — Losa y columnas' },
    { type: 'img', src: 'img/trayectoria/ercilia1/proc-04.jpg',  caption: 'Ercilia I — Avance de estructura' },
    { type: 'img', src: 'img/trayectoria/ercilia1/proc-05.jpg',  caption: 'Ercilia I — Mampostería e instalaciones' },
    { type: 'img', src: 'img/trayectoria/ercilia1/proc-06.jpg',  caption: 'Ercilia I — Terminaciones interiores' },
    { type: 'img', src: 'img/trayectoria/ercilia1/proc-07.jpg',  caption: 'Ercilia I — Interior terminado' },
    { type: 'img', src: 'img/trayectoria/ercilia1/proc-08.jpg',  caption: 'Ercilia I — Obra terminada' },
  ],

  ERCILIA2: [
    { type: 'img', src: 'img/trayectoria/ercilia2/portada.jpg',  caption: 'Ercilia II — Fachada terminada · Bedoya 118, Alta Córdoba · 2007' },
    { type: 'img', src: 'img/trayectoria/ercilia2/proc-01.jpg',  caption: 'Ercilia II — Inicio de obra · Subsuelo y fundaciones' },
    { type: 'img', src: 'img/trayectoria/ercilia2/proc-02.jpg',  caption: 'Ercilia II — Estructura en ejecución' },
    { type: 'img', src: 'img/trayectoria/ercilia2/proc-03.jpg',  caption: 'Ercilia II — Avance de estructura' },
    { type: 'img', src: 'img/trayectoria/ercilia2/proc-04.jpg',  caption: 'Ercilia II — Colado de losa con cuadrilla' },
    { type: 'img', src: 'img/trayectoria/ercilia2/proc-05.jpg',  caption: 'Ercilia II — Mampostería e instalaciones' },
    { type: 'img', src: 'img/trayectoria/ercilia2/proc-06.jpg',  caption: 'Ercilia II — Terminaciones' },
    { type: 'img', src: 'img/trayectoria/ercilia2/proc-07.jpg',  caption: 'Ercilia II — Interior terminado' },
    { type: 'img', src: 'img/trayectoria/ercilia2/proc-08.jpg',  caption: 'Ercilia II — Obra terminada' },
  ],

  IRIS2: [
    { type: 'img', src: 'img/trayectoria/iris2/portada.jpg',    caption: 'Iris II — Edificio terminado · Corrientes 430, Córdoba · 2006' },
    { type: 'img', src: 'img/trayectoria/iris2/proc-01.jpg',    caption: 'Iris II — Excavación de pozos y pilotes' },
    { type: 'img', src: 'img/trayectoria/iris2/proc-02.jpg',    caption: 'Iris II — Colado de fundaciones' },
    { type: 'img', src: 'img/trayectoria/iris2/proc-03.jpg',    caption: 'Iris II — Colado de losa · Cuadrilla en obra' },
    { type: 'img', src: 'img/trayectoria/iris2/proc-04.jpg',    caption: 'Iris II — Estructura avanzada' },
    { type: 'img', src: 'img/trayectoria/iris2/proc-05.jpg',    caption: 'Iris II — Mampostería e instalaciones' },
    { type: 'img', src: 'img/trayectoria/iris2/proc-06.jpg',    caption: 'Iris II — Terminaciones exteriores' },
    { type: 'img', src: 'img/trayectoria/iris2/proc-07.jpg',    caption: 'Iris II — Fachada casi terminada' },
    { type: 'img', src: 'img/trayectoria/iris2/proc-08.jpg',    caption: 'Iris II — Obra entregada · 2006' },
  ],

  BIM: [
    { type: 'img', src: 'img/bim/plano-inst-109-p1.png', caption: 'INST-109 · Axonométrica red de agua fría y caliente — Armenia 498' },
    { type: 'img', src: 'img/bim/plano-inst-106-p1.png', caption: 'INST-106 · Detalles instalaciones sanitarias — Armenia 498' },
    { type: 'img', src: 'img/lazaro/plano-cortes.jpg',   caption: 'MM-448 · Corte A-A y B-B 1:100 — Housing Lázaro, Alta Gracia' },
    { type: 'img', src: 'img/lazaro/plano-plantas.jpg',  caption: 'MM-448 · Plantas Nivel 1, 2, 3 y Techos — Housing Lázaro, Alta Gracia' },
    { type: 'img', src: 'img/lazaro/plano-web.jpg',      caption: 'MM-448 · Plano Municipal completo — Housing Lázaro, Alta Gracia' },
  ]
};

const modal     = document.getElementById('galleryModal');
const modalImg  = document.getElementById('galleryImg');
const caption   = document.getElementById('galleryCaption');
const thumbsEl  = document.getElementById('galleryThumbs');
let currentGallery = [], currentIndex = 0;

function openGallery(key, index = 0) {
  currentGallery = galleries[key] || [];
  if (!currentGallery.length) return;
  thumbsEl.innerHTML = currentGallery.map((item, i) => {
    const thumb = item.type === 'video'
      ? `<div class="thumb-video ${i === index ? 'active' : ''}" data-i="${i}">▶</div>`
      : `<img src="${item.src}" class="${i === index ? 'active' : ''}" data-i="${i}" alt="" />`;
    return thumb;
  }).join('');
  thumbsEl.querySelectorAll('[data-i]').forEach(t =>
    t.addEventListener('click', () => showSlide(+t.dataset.i))
  );
  showSlide(index);
  modal.style.display = ''; // limpiar cualquier inline style residual
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function showSlide(index) {
  currentIndex = (index + currentGallery.length) % currentGallery.length;
  const item = currentGallery[currentIndex];
  const stage = document.querySelector('.gallery-stage');

  // Detener video anterior si existe
  const oldVideo = stage.querySelector('video');
  if (oldVideo) oldVideo.pause();

  stage.style.opacity = 0;
  setTimeout(() => {
    if (item.type === 'video') {
      stage.innerHTML = `<video controls autoplay src="${item.src}" style="max-width:100%;max-height:100%;"></video>`;
    } else {
      stage.innerHTML = `<img id="galleryImg" src="${item.src}" alt="" />`;
    }
    caption.textContent = item.caption;
    stage.style.opacity = 1;
  }, 150);

  thumbsEl.querySelectorAll('[data-i]').forEach((t, i) =>
    t.classList.toggle('active', i === currentIndex)
  );
}

function closeGallery() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

document.getElementById('galleryClose').addEventListener('click', closeGallery);
document.getElementById('galleryPrev').addEventListener('click', () => showSlide(currentIndex - 1));
document.getElementById('galleryNext').addEventListener('click', () => showSlide(currentIndex + 1));
document.addEventListener('keydown', e => {
  if (modal.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
  if (e.key === 'ArrowLeft')  showSlide(currentIndex - 1);
  if (e.key === 'Escape')     closeGallery();
});
modal.addEventListener('click', e => { if (e.target === modal) closeGallery(); });

document.querySelectorAll('.gallery-trigger').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const index = el.dataset.index ? +el.dataset.index : 0;
    openGallery(el.dataset.gallery, index);
  });
});

// Click en cualquier parte de la project-card abre la galería
document.querySelectorAll('.project-card[data-gallery]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return; // dejar que los links funcionen normal
    openGallery(card.dataset.gallery, 0);
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--black)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => scrollSpy.observe(s));
