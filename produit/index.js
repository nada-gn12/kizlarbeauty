document.addEventListener('DOMContentLoaded', () => {
  // Éléments
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const panierIcon = document.querySelector('.fa-bag-shopping');
  const searchForm = document.querySelector('.search-box');

  // Panier stocké dans localStorage
  const STORAGE_KEY = 'ishq_cart_v1';
  let cart = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cart = raw ? JSON.parse(raw) : [];
  } catch (e) {
    cart = [];
    console.error('Erreur lecture localStorage', e);
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Erreur sauvegarde localStorage', e);
    }
  }

  function addToCart(name, price) {
    const p = parseFloat(price) || 0;
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price: p, quantity: 1 });
    }
    saveCart();
    // feedback simple
    alert(`${name} ajouté au panier (${cart.reduce((s,i)=>s+i.quantity,0)} article(s))`);
  }

  // Delegate clicks pour les boutons "Ajouter au panier"
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (btn) {
      e.preventDefault();
      const name = btn.getAttribute('data-product-name') || btn.closest('.produit, .produit2')?.querySelector('.title')?.textContent?.trim() || 'Produit';
      const priceAttr = btn.getAttribute('data-product-price') || btn.closest('.produit, .produit2')?.querySelector('.price')?.textContent?.replace(/[^0-9.,]/g,'') || '0';
      // normalize price to number (accepts "24.00" or "$24" etc.)
      const normalizedPrice = priceAttr.replace(',', '.').match(/[\d.]+/g)?.[0] || '0';
      addToCart(name, normalizedPrice);
    }
  });

  // Menu déroulant
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      menu.classList.toggle('active');
    });

    document.addEventListener('click', (ev) => {
      if (!menu.contains(ev.target) && !menuBtn.contains(ev.target)) {
        menu.classList.remove('active');
      }
    });
  }

  // Panier icône - exemple minimal
  if (panierIcon) {
  panierIcon.addEventListener('click', () => {
    window.location.href = 'panier/index.html';
  });
}

  // Recherche simple
  if (searchForm) {
    searchForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const q = document.getElementById('site-search')?.value?.trim() || '';
      if (!q) {
        alert('Veuillez saisir un terme de recherche.');
        return;
      }
      // rediriger vers la même page avec paramètre q (ou gérer la recherche)
      const url = new URL(window.location.href);
      url.searchParams.set('q', q);
      window.location.href = url.toString();
    });
  }

  // smooth scroll pour ancres
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href && href !== '#') {
        ev.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});