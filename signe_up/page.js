// Script unique pour signup + login (simple à comprendre)
(function(){
  const USER_KEY = 'ishq_users_v1';

  // utilitaires
  function readUsers(){ try { return JSON.parse(localStorage.getItem(USER_KEY)) || []; } catch(e){ return []; } }
  function saveUsers(u){ localStorage.setItem(USER_KEY, JSON.stringify(u)); }

  // Signup handler (s'il existe sur la page)
  const suForm = document.getElementById('signupForm');
  if (suForm) {
    suForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('su-name').value.trim();
      const email = document.getElementById('su-email').value.trim().toLowerCase();
      const pw = document.getElementById('su-password').value;
      const pw2 = document.getElementById('su-password2').value;
      const msg = document.getElementById('su-msg');

      msg.textContent = '';
      if (!name || !email || !pw) { msg.textContent = 'Veuillez remplir tous les champs.'; return; }
      if (pw.length < 6) { msg.textContent = 'Mot de passe : minimum 6 caractères.'; return; }
      if (pw !== pw2) { msg.textContent = 'Les mots de passe ne correspondent pas.'; return; }

      const users = readUsers();
      if (users.find(u => u.email === email)) { msg.textContent = 'Email déjà utilisé.'; return; }

      users.push({ name, email, password: pw });
      saveUsers(users);
      alert('Compte créé. Vous allez être redirigé vers la page de connexion.');
      window.location.href = '../signe_in/login.html';
    });
  }

  // Login handler (s'il existe sur la page)
  const liForm = document.getElementById('loginForm');
  if (liForm) {
    const liMsg = document.getElementById('li-msg');
    liForm.addEventListener('submit', function(e){
      e.preventDefault();
      liMsg.textContent = '';
      const email = document.getElementById('li-email').value.trim().toLowerCase();
      const pw = document.getElementById('li-password').value;
      if (!email || !pw) { liMsg.textContent = 'Remplissez tous les champs.'; return; }

      const users = readUsers();
      const user = users.find(u => u.email === email && u.password === pw);
      if (!user) { liMsg.textContent = 'Email ou mot de passe incorrect.'; return; }

      // Connexion réussie : on peut enregistrer un flag minimal et rediriger
      try { localStorage.setItem('ishq_current_user', JSON.stringify({ email: user.email, name: user.name })); } catch(e){}
      alert('Connexion réussie. Redirection vers la boutique.');
      window.location.href = '../produit/index.html';
    });

    // toggle afficher/masquer mot de passe si bouton présent
    const toggle = document.getElementById('toggle-pass');
    if (toggle) {
      toggle.addEventListener('click', function(){
        const pwd = document.getElementById('li-password');
        if (!pwd) return;
        pwd.type = pwd.type === 'password' ? 'text' : 'password';
        toggle.textContent = pwd.type === 'password' ? '👁' : '🙈';
      });
    }
  }
})();