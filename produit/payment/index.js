// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('payment-form');
  const btn = document.getElementById('pay-btn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  const toastClose = document.getElementById('toast-close');

  function luhnCheck(num){
    const digits = num.replace(/\s+/g,'').split('').reverse().map(d=>parseInt(d,10));
    if(digits.some(isNaN)) return false;
    const sum = digits.reduce((acc,d,i)=>{
      if(i % 2 === 1){
        d = d * 2;
        if(d > 9) d -= 9;
      }
      return acc + d;
    },0);
    return sum % 10 === 0;
  }

  function showToast(message){
    toastMsg.textContent = message;
    toast.hidden = false;
  }

  toastClose?.addEventListener('click', ()=>{ toast.hidden = true; });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const number = document.getElementById('card-number').value.trim();
    const exp = document.getElementById('card-exp').value.trim();
    const cvc = document.getElementById('card-cvc').value.trim();
    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('card-name').value.trim();

    // Basic validation
    if(!email || !name || !number || !exp || !cvc){
      showToast('Veuillez remplir tous les champs.');
      return;
    }

    if(!luhnCheck(number)){
      showToast('Numéro de carte invalide.');
      return;
    }

    // expiry MM/YY
    const m = exp.split('/').map(s=>parseInt(s,10));
    if(m.length !== 2 || isNaN(m[0]) || isNaN(m[1]) || m[0] < 1 || m[0] > 12){
      showToast('Date d\'expiration invalide.');
      return;
    }
    const now = new Date();
    const year = 2000 + (m[1] < 100 ? m[1] : m[1]);
    const expDate = new Date(year, m[0]);
    if(expDate <= now){
      showToast('Carte expirée.');
      return;
    }

    if(!/^\d{3,4}$/.test(cvc)){
      showToast('CVC invalide.');
      return;
    }

    // Simulate processing
    btn.disabled = true;
    btn.textContent = 'Traitement...';
    try{
      await new Promise(r => setTimeout(r, 1400)); // simulate network
      const tx = 'TX' + Math.random().toString(36).slice(2,10).toUpperCase();
      showToast('Paiement réussi — Réf: ' + tx);
      // reset form optional
      form.reset();
    }catch(err){
      showToast('Erreur de paiement, réessayez.');
    }finally{
      btn.disabled = false;
      btn.textContent = 'Payer maintenant — $78.00';
    }
  });
});