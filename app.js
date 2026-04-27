const PRODUCTS = [
  { id: 1, name: 'Mercurial Vapor Elite', brand: 'Nike', terrain: 'FG', level: 'Pro', size: [39,40,41,42,43,44], price: 249, oldPrice: 299, rating: 4.9, stock: 7, img: '1.jpg', desc: 'Explosivité maximale pour attaquants ultra rapides.' },
  { id: 2, name: 'Predator Accuracy+', brand: 'Adidas', terrain: 'AG', level: 'Pro', size: [40,41,42,43,44,45], price: 219, oldPrice: 269, rating: 4.8, stock: 12, img: '2.jpg', desc: 'Contrôle ultime et précision chirurgicale.' },
  { id: 3, name: 'Future Ultimate', brand: 'Puma', terrain: 'FG', level: 'Intermédiaire', size: [39,40,41,42,43], price: 199, oldPrice: 239, rating: 4.6, stock: 9, img: '3.jpg', desc: 'Agilité et maintien pour créateurs de jeu.' },
  { id: 4, name: 'Tiempo Legend X', brand: 'Nike', terrain: 'SG', level: 'Pro', size: [40,41,42,43,44], price: 229, oldPrice: 279, rating: 4.7, stock: 5, img: '4.jpg', desc: 'Confort premium et toucher précis.' },
  { id: 5, name: 'Copa Pure 2', brand: 'Adidas', terrain: 'FG', level: 'Débutant', size: [39,40,41,42,43], price: 139, oldPrice: 179, rating: 4.5, stock: 15, img: '5.jpg', desc: 'Confort immédiat et stabilité.' },
  { id: 6, name: 'Ultra Match IN', brand: 'Puma', terrain: 'IN', level: 'Intermédiaire', size: [39,40,41,42,43], price: 119, oldPrice: 149, rating: 4.4, stock: 20, img: '7.jpg', desc: 'Vitesse en futsal et réactivité instantanée.' },
  { id: 7, name: 'Phantom GX Elite', brand: 'Nike', terrain: 'AG', level: 'Pro', size: [40,41,42,43,44], price: 239, oldPrice: 289, rating: 4.8, stock: 6, img: '8.jpg', desc: 'Adhérence texturée pour dribbles incisifs.' }
];

const state = {
  cart: JSON.parse(localStorage.getItem('footkicks_cart') || '[]'),
  favs: JSON.parse(localStorage.getItem('footkicks_favs') || '[]'),
  compare: JSON.parse(localStorage.getItem('footkicks_compare') || '[]'),
  selectedSize: null,
};

const eur = (v) => `${v.toFixed(2)} €`;
const byId = (id) => PRODUCTS.find(p => p.id === Number(id));
const save = () => {
  localStorage.setItem('footkicks_cart', JSON.stringify(state.cart));
  localStorage.setItem('footkicks_favs', JSON.stringify(state.favs));
  localStorage.setItem('footkicks_compare', JSON.stringify(state.compare));
  updateCounters();
};

function updateCounters() {
  const c = state.cart.reduce((a,i) => a + i.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = c);
}

function addToCart(id, qty = 1, size = null) {
  const existing = state.cart.find(i => i.id === id && i.size === size);
  if (existing) existing.qty += qty;
  else state.cart.push({ id, qty, size });
  save();
  openDrawer('Produit ajouté au panier ✅');
}

function toggleFav(id) {
  state.favs = state.favs.includes(id) ? state.favs.filter(x => x !== id) : [...state.favs, id];
  save();
  renderFavs();
}

function toggleCompare(id) {
  state.compare = state.compare.includes(id) ? state.compare.filter(x => x !== id) : [...state.compare, id].slice(0, 3);
  save();
  renderCompare();
}

function productCard(p) {
  return `<article class="card product-card fade">
    <img src="${p.img}" alt="${p.name}">
    <span class="pill">${p.terrain} • ${p.level}</span>
    <h3>${p.name}</h3>
    <p class="muted">${p.brand}</p>
    <div class="price"><strong>${eur(p.price)}</strong><span class="old">${eur(p.oldPrice)}</span></div>
    <div class="rating">★ ${p.rating} <span class="muted">(${p.stock} en stock)</span></div>
    <div style="display:flex; gap:.4rem; flex-wrap:wrap;">
      <button class="btn" onclick="addToCart(${p.id})">Ajouter</button>
      <button class="icon-btn" onclick="toggleFav(${p.id})">❤</button>
      <button class="icon-btn" onclick="toggleCompare(${p.id})">⇄</button>
      <a class="btn secondary" href="product.html?id=${p.id}">Détails</a>
    </div>
  </article>`;
}

function renderHomeProducts() {
  const target = document.querySelector('[data-home-products]');
  if (!target) return;
  target.innerHTML = PRODUCTS.slice(0,4).map(productCard).join('');
}

function renderShop() {
  const grid = document.querySelector('[data-shop-grid]');
  if (!grid) return;
  const q = document.querySelector('[data-filter-search]')?.value?.toLowerCase() || '';
  const brand = document.querySelector('[data-filter-brand]')?.value || '';
  const terrain = document.querySelector('[data-filter-terrain]')?.value || '';
  const level = document.querySelector('[data-filter-level]')?.value || '';
  const max = Number(document.querySelector('[data-filter-price]')?.value || 999);
  const sort = document.querySelector('[data-filter-sort]')?.value || 'pop';

  let list = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) &&
    (!brand || p.brand === brand) &&
    (!terrain || p.terrain === terrain) &&
    (!level || p.level === level) &&
    p.price <= max
  );

  if (sort === 'low') list.sort((a,b)=>a.price-b.price);
  if (sort === 'high') list.sort((a,b)=>b.price-a.price);
  if (sort === 'new') list.sort((a,b)=>b.id-a.id);
  if (sort === 'pop') list.sort((a,b)=>b.rating-a.rating);

  grid.innerHTML = list.map(productCard).join('') || '<p>Aucun produit trouvé.</p>';
  reveal();
}

function renderProductPage() {
  const holder = document.querySelector('[data-product-page]');
  if (!holder) return;
  const id = new URLSearchParams(location.search).get('id') || '1';
  const p = byId(id);
  if (!p) return;

  holder.innerHTML = `<div class="gallery">
      <img id="mainImage" class="card" src="${p.img}" alt="${p.name}">
      <div class="thumbs">
        ${[p.img,'2.jpg','3.jpg','4.jpg'].map((img,i)=>`<img class="${i===0?'active':''}" src="${img}" onclick="swapImg(this,'${img}')" alt="vue ${i+1}">`).join('')}
      </div>
    </div>
    <div class="card">
      <span class="badge">Stock limité: ${p.stock}</span>
      <h1 style="margin:.7rem 0;">${p.name}</h1>
      <p class="muted">${p.brand} • Terrain ${p.terrain} • Niveau ${p.level}</p>
      <div class="price" style="margin:.7rem 0;"><strong style="font-size:1.6rem">${eur(p.price)}</strong> <span class="old">${eur(p.oldPrice)}</span></div>
      <p class="rating">★ ${p.rating} (248 avis vérifiés)</p>
      <h3 style="margin-top:1rem;">Choisis ta pointure</h3>
      <div class="size-grid">${p.size.map(s => `<button onclick="selectSize(this,${s})">${s}</button>`).join('')}</div>
      <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.8rem;">
        <button class="btn primary" onclick="addProductConfigured(${p.id})">Ajouter au panier</button>
        <button class="btn secondary" onclick="buyNow(${p.id})">Acheter maintenant</button>
      </div>
      <hr style="border-color:rgba(255,255,255,.1);margin:1rem 0;">
      <p>${p.desc}</p>
      <ul style="margin:1rem 0 0 1rem;color:#d4d4d4;display:grid;gap:.3rem;">
        <li>Grip optimisé toutes vitesses</li><li>Châssis léger haute performance</li><li>Retour 30 jours sans risque</li><li>Livraison 24/48h</li>
      </ul>
    </div>`;

  const rec = document.querySelector('[data-similar]');
  if (rec) rec.innerHTML = PRODUCTS.filter(x => x.id !== p.id).slice(0,3).map(productCard).join('');
  reveal();
}

function renderCart() {
  const target = document.querySelector('[data-cart-list]');
  if (!target) return;
  if (!state.cart.length) { target.innerHTML = '<p>Ton panier est vide. Active le mode machine à gagner ⚡</p>'; recalcTotals(); return; }
  target.innerHTML = state.cart.map(item => {
    const p = byId(item.id);
    if (!p) return '';
    return `<div class="line"><div><strong>${p.name}</strong><p class="muted">${p.brand} • ${item.size || 'Taille à choisir'}</p></div>
      <div class="qty"><button onclick="qtyChange(${p.id},-1,'${item.size||''}')">-</button><span>${item.qty}</span><button onclick="qtyChange(${p.id},1,'${item.size||''}')">+</button></div>
      <strong>${eur(p.price * item.qty)}</strong></div>`;
  }).join('');
  recalcTotals();
}

function qtyChange(id, delta, size = '') {
  const line = state.cart.find(i => i.id === id && (i.size || '') === size);
  if (!line) return;
  line.qty += delta;
  if (line.qty <= 0) state.cart = state.cart.filter(i => !(i.id === id && (i.size || '') === size));
  save();
  renderCart();
}

function recalcTotals() {
  const subtotal = state.cart.reduce((acc, it) => acc + byId(it.id).price * it.qty, 0);
  const shipping = subtotal >= 120 ? 0 : 7.9;
  const total = subtotal + shipping;
  const nodes = {
    sub: document.querySelector('[data-subtotal]'), ship: document.querySelector('[data-shipping]'), total: document.querySelector('[data-total]'),
    bar: document.querySelector('[data-freebar]'), left: document.querySelector('[data-leftfree]')
  };
  if (nodes.sub) nodes.sub.textContent = eur(subtotal);
  if (nodes.ship) nodes.ship.textContent = shipping === 0 ? 'Offerte' : eur(shipping);
  if (nodes.total) nodes.total.textContent = eur(total);
  if (nodes.bar) nodes.bar.style.width = `${Math.min((subtotal / 120) * 100, 100)}%`;
  if (nodes.left) nodes.left.textContent = subtotal >= 120 ? '🎉 Livraison offerte débloquée !' : `Ajoute ${eur(120 - subtotal)} pour la livraison offerte`;
}

function renderFavs() {
  const target = document.querySelector('[data-favs]');
  if (!target) return;
  const list = PRODUCTS.filter(p => state.favs.includes(p.id));
  target.innerHTML = list.length ? list.map(productCard).join('') : '<p>Aucun favori pour le moment.</p>';
}

function renderCompare() {
  const target = document.querySelector('[data-compare]');
  if (!target) return;
  const list = PRODUCTS.filter(p => state.compare.includes(p.id));
  if (!list.length) { target.innerHTML = '<p>Ajoute jusqu’à 3 modèles à comparer.</p>'; return; }
  target.innerHTML = `<table style="width:100%;border-collapse:collapse;">
    <tr><th>Modèle</th>${list.map(p=>`<th>${p.name}</th>`).join('')}</tr>
    <tr><td>Prix</td>${list.map(p=>`<td>${eur(p.price)}</td>`).join('')}</tr>
    <tr><td>Terrain</td>${list.map(p=>`<td>${p.terrain}</td>`).join('')}</tr>
    <tr><td>Niveau</td>${list.map(p=>`<td>${p.level}</td>`).join('')}</tr>
    <tr><td>Note</td>${list.map(p=>`<td>${p.rating} ★</td>`).join('')}</tr>
  </table>`;
}

function selectSize(btn, size) {
  document.querySelectorAll('.size-grid button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.selectedSize = size;
}

function addProductConfigured(id) {
  addToCart(id, 1, state.selectedSize);
}
function buyNow(id) {
  addToCart(id, 1, state.selectedSize);
  location.href = 'checkout.html';
}
function swapImg(el, src) {
  document.getElementById('mainImage').src = src;
  document.querySelectorAll('.thumbs img').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
}

function openDrawer(text) {
  const d = document.querySelector('[data-drawer]');
  if (!d) return;
  d.classList.add('open');
  d.querySelector('[data-drawer-msg]').textContent = text;
  d.querySelector('[data-drawer-cart]').innerHTML = state.cart.slice(-3).map(i => {
    const p = byId(i.id); return `<div class="line"><span>${p.name}</span><strong>x${i.qty}</strong></div>`;
  }).join('');
  setTimeout(() => d.classList.remove('open'), 2600);
}

function startTimer() {
  const t = document.querySelector('[data-timer]');
  if (!t) return;
  let s = 3600 * 9 + 32;
  setInterval(() => {
    s -= 1;
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    t.textContent = `${h}:${m}:${sec}`;
    if (s <= 0) s = 3600 * 7 + 12;
  }, 1000);
}

function setupCheckout() {
  const form = document.querySelector('[data-checkout-form]');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderNo = 'FK-' + Math.floor(Math.random() * 900000 + 100000);
    localStorage.setItem('footkicks_order', JSON.stringify({ id: orderNo, date: new Date().toISOString(), total: state.cart.reduce((a,i)=>a + byId(i.id).price * i.qty, 0)}));
    state.cart = []; save();
    location.href = 'confirmation.html';
  });
}

function renderOrder() {
  const t = document.querySelector('[data-order]');
  if (!t) return;
  const order = JSON.parse(localStorage.getItem('footkicks_order') || '{}');
  t.textContent = order.id || 'FK-000000';
}

function setupGuideQuiz() {
  const form = document.querySelector('[data-guide-quiz]');
  const result = document.querySelector('[data-guide-result]');
  if (!form || !result) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const poste = form.querySelector('[name=poste]').value;
    const terrain = form.querySelector('[name=terrain]').value;
    const vitesse = form.querySelector('[name=vitesse]').value;
    let rec = 'Predator Accuracy+';
    if (poste === 'Attaquant' && vitesse === 'Oui') rec = 'Mercurial Vapor Elite';
    if (poste === 'Défenseur') rec = 'Tiempo Legend X';
    if (terrain === 'Futsal') rec = 'Ultra Match IN';
    result.innerHTML = `<div class="card"><h3>Ta paire idéale: ${rec}</h3><p class="muted">Basé sur ton profil ${poste} / ${terrain} / vitesse ${vitesse}.</p><a href="boutique.html" class="btn primary" style="display:inline-block;margin-top:.8rem;">Voir les modèles</a></div>`;
  });
}

function setupKickbot() {
  const panel = document.querySelector('[data-kickbot]');
  const btn = document.querySelector('[data-kickbot-btn]');
  if (!panel || !btn) return;
  btn.onclick = () => panel.classList.toggle('open');
  const chat = panel.querySelector('.chat');
  panel.querySelectorAll('[data-kick-reply]').forEach(b => b.onclick = () => {
    const q = b.textContent;
    chat.insertAdjacentHTML('beforeend', `<div class="msg user">${q}</div>`);
    chat.insertAdjacentHTML('beforeend', `<div class="msg bot">KICKBOT écrit...</div>`);
    chat.scrollTop = chat.scrollHeight;
    setTimeout(() => {
      chat.lastElementChild.textContent = botReply(q);
      chat.scrollTop = chat.scrollHeight;
    }, 550);
  });
}

function botReply(q) {
  if (q.includes('FG')) return 'FG = terrain naturel sec. AG = synthétique. SG = gras/pluie. IN = futsal indoor.';
  if (q.includes('pointure')) return 'Prends ta taille habituelle, +0.5 si pied large. Je recommande de tester en fin de journée.';
  if (q.includes('livraison')) return 'Livraison 24/48h, offerte dès 120€. Retour 30 jours, échange gratuit.';
  return 'Pour attaquant rapide: Mercurial. Pour contrôle: Predator. Pour confort: Tiempo.';
}

function reveal() {
  const io = new IntersectionObserver((entries) => entries.forEach(e => e.target.classList.toggle('show', e.isIntersecting)), { threshold: .12 });
  document.querySelectorAll('.fade').forEach(el => io.observe(el));
}

function initSearch() {
  const i = document.querySelector('[data-global-search]');
  if (!i) return;
  i.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      location.href = `boutique.html?q=${encodeURIComponent(i.value)}`;
    }
  });
}

window.addToCart = addToCart;
window.toggleFav = toggleFav;
window.toggleCompare = toggleCompare;
window.qtyChange = qtyChange;
window.selectSize = selectSize;
window.addProductConfigured = addProductConfigured;
window.buyNow = buyNow;
window.swapImg = swapImg;

document.addEventListener('DOMContentLoaded', () => {
  updateCounters();
  renderHomeProducts();
  renderShop();
  renderProductPage();
  renderCart();
  renderFavs();
  renderCompare();
  recalcTotals();
  renderOrder();
  startTimer();
  setupCheckout();
  setupGuideQuiz();
  setupKickbot();
  initSearch();
  reveal();

  document.querySelectorAll('[data-filter]').forEach(el => el.addEventListener('input', renderShop));

  const prefill = new URLSearchParams(location.search).get('q');
  if (prefill && document.querySelector('[data-filter-search]')) {
    document.querySelector('[data-filter-search]').value = prefill;
    renderShop();
  }
});
