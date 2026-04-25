/* ============================================
   MARENO LABEL — theme.js
============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Header scroll shadow ---- */
  const hdr = document.getElementById('siteHeader');
  if (hdr) {
    window.addEventListener('scroll', () => {
      hdr.classList.toggle('scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  /* ---- Cart drawer ---- */
  const cartOverlay  = document.getElementById('cartOverlay');
  const cartDrawer   = document.getElementById('cartDrawer');
  const cartToggle   = document.getElementById('cartToggle');
  const cartClose    = document.getElementById('cartClose');
  const cartContinue = document.getElementById('cartContinue');

  function openCart() {
    if (!cartOverlay || !cartDrawer) return;
    cartOverlay.classList.add('show');
    cartDrawer.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (!cartOverlay || !cartDrawer) return;
    cartOverlay.classList.remove('show');
    cartDrawer.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (cartToggle)   cartToggle.addEventListener('click', openCart);
  if (cartOverlay)  cartOverlay.addEventListener('click', closeCart);
  if (cartClose)    cartClose.addEventListener('click', closeCart);
  if (cartContinue) cartContinue.addEventListener('click', closeCart);

  /* ---- Cart quantity ---- */
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('qty-btn')) return;
    const ctrl = e.target.closest('.qty-ctrl');
    if (!ctrl) return;
    const val   = ctrl.querySelector('.qty-val');
    const delta = e.target.textContent.trim() === '+' ? 1 : -1;
    let n = parseInt(val.textContent) + delta;
    if (n < 1) n = 1;
    val.textContent = n;
  });

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobMenu   = document.getElementById('mobMenu');
  const mobClose  = document.getElementById('mobClose');

  function openMobMenu() {
    if (!mobMenu || !hamburger) return;
    hamburger.classList.add('open');
    mobMenu.classList.add('open');
    mobMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobMenu() {
    if (!mobMenu || !hamburger) return;
    hamburger.classList.remove('open');
    mobMenu.classList.remove('open');
    mobMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobMenu);
  if (mobClose)  mobClose.addEventListener('click', closeMobMenu);
  if (mobMenu)   mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobMenu));

  /* ---- Scroll reveal ---- */
  const revEls = document.querySelectorAll('.reveal');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revEls.forEach((el) => {
    const parent = el.parentElement;
    const staggerParents = ['products-grid','cats-grid','bundles-grid','benefits-grid','steps'];
    if (staggerParents.some(c => parent && parent.classList.contains(c))) {
      const idx = Array.from(parent.children).indexOf(el);
      el.style.transitionDelay = (idx * 0.1) + 's';
    }
    revObs.observe(el);
  });

  /* ---- Quick add to cart ---- */
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('quick-add')) return;
    const btn  = e.target;
    const orig = btn.textContent;
    btn.textContent = 'Added';
    btn.style.background = 'var(--green)';
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = parseInt(countEl.textContent || '0') + 1;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
    }, 1800);
  });

  /* ---- Newsletter form ---- */
  const nlForm = document.getElementById('nlForm');
  const nlBtn  = document.getElementById('nlBtn');
  if (nlForm && nlBtn) {
    nlForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (!input || !input.value) return;
      nlBtn.textContent = 'Subscribed';
      nlBtn.style.background  = 'var(--green)';
      nlBtn.style.borderColor = 'var(--green)';
      input.value    = '';
      input.disabled = true;
      nlBtn.disabled = true;
    });
  }

});
