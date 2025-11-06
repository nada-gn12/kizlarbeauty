
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    const panier = document.querySelector('.fa-bag-shopping');
    const searchForm = document.querySelector('.search-box');

    // Toggle menu (vérifie existence)
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        // Fermer le menu si on clique en dehors
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
                menu.classList.remove('active');
            }
        });
    }

    // Gestion du panier (exemple)
    if (panier) {
        panier.addEventListener('click', () => {
            alert('Panier en construction...');
        });
    }

    // Recherche (exemple)
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = document.getElementById('site-search')?.value || '';
            if (searchTerm.trim()) {
                alert(`Recherche en cours pour: ${searchTerm}`);
            }
        });
    }

    // Smooth scroll pour ancres (sécurité)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
