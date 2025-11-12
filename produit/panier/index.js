// Simple et facile à comprendre
document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'ishq_cart_v1'; // même clé que dans index.js
  const itemsEl = document.getElementById('panier-items');
  const totalEl = document.getElementById('panier-total');
  const viderBtn = document.getElementById('btn-vider');
  const paiementBtn = document.getElementById('btn-paiement');

  // Lire le panier du localStorage
  function getCart(){
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch(e){ return []; }
  }

  // Sauvegarder le panier
  function saveCart(cart){
    localStorage.setItem(KEY, JSON.stringify(cart));
  }

  // Formater le prix
  function formatPrice(v){
    return '$' + Number(v).toFixed(2);
  }

  // Afficher tous les articles
  function render(){
    const cart = getCart();
    itemsEl.innerHTML = '';

    if(cart.length === 0){
      itemsEl.innerHTML = '<p class="msg">Votre panier est vide.</p>';
      totalEl.textContent = 'Total: $0.00';
      paiementBtn.disabled = true;
      viderBtn.disabled = true;
      return;
    }

    paiementBtn.disabled = false;
    viderBtn.disabled = false;

    // Afficher chaque article
    cart.forEach((p, idx) => {
      const div = document.createElement('div');
      div.className = 'article';
      div.innerHTML = `
        <div class="article-thumb">${p.name ? p.name.charAt(0) : '?'}</div>
        <div class="article-info">
          <div class="article-title">${p.name}</div>
          <div class="article-price">${formatPrice(p.price)}</div>
          <div class="article-qty">
            <button class="dec" data-idx="${idx}">−</button>
            <input class="qty" data-idx="${idx}" value="${p.quantity}" />
            <button class="inc" data-idx="${idx}">+</button>
          </div>
          <span class="article-remove" data-idx="${idx}" style="cursor:pointer">Supprimer</span>
        </div>
        <div class="article-subtotal">${formatPrice(p.price * p.quantity)}</div>
      `;
      itemsEl.appendChild(div);
    });

    // Calculer le total
    const total = cart.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    totalEl.textContent = 'Total: ' + formatPrice(total);
  }

  // Actions sur les boutons (diminuer, augmenter, supprimer)
  document.addEventListener('click', (e) => {
    const cart = getCart();

    // Bouton "-"
    if(e.target.classList.contains('dec')){
      const idx = Number(e.target.dataset.idx);
      if(cart[idx]) {
        cart[idx].quantity = Math.max(1, cart[idx].quantity - 1);
        saveCart(cart);
        render();
      }
    }

    // Bouton "+"
    if(e.target.classList.contains('inc')){
      const idx = Number(e.target.dataset.idx);
      if(cart[idx]) {
        cart[idx].quantity += 1;
        saveCart(cart);
        render();
      }
    }

    // "Supprimer"
    if(e.target.classList.contains('article-remove')){
      const idx = Number(e.target.dataset.idx);
      cart.splice(idx, 1);
      saveCart(cart);
      render();
    }
  });

  // Modifier la quantité en tapant directement
  document.addEventListener('input', (e) => {
    if(!e.target.classList.contains('qty')) return;
    const idx = Number(e.target.dataset.idx);
    let v = parseInt(e.target.value || '1', 10);
    if(isNaN(v) || v < 1) v = 1;

    const cart = getCart();
    if(cart[idx]) {
      cart[idx].quantity = v;
      saveCart(cart);
      render();
    }
  });

  // Vider le panier
  viderBtn.addEventListener('click', () => {
    if(!confirm('Êtes-vous sûr de vouloir vider le panier ?')) return;
    localStorage.setItem(KEY, JSON.stringify([]));
    render();
  });

  // Aller au paiement
  // Aller au paiement
paiementBtn.addEventListener('click', () => {
  const cart = getCart();
  if(cart.length === 0) { alert('Panier vide.'); return; }
  window.location.href = '../payment/index.html'; // ← ajuste si besoin
    });

  // Afficher le panier au chargement
  render();
});