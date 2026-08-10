(function () {
  var base = document.querySelector('script[src*="load-header-footer.js"]');
  base = base ? base.getAttribute('src').replace(/\/[^/]+$/, '') : 'includes';
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');
  var LOADER_MAX_MS = 1200;

  function hidePageLoader() {
    var el = document.getElementById('page-loader');
    if (el) el.classList.add('loaded');
  }

  function scheduleHidePageLoader() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hidePageLoader, { once: true });
    } else {
      hidePageLoader();
    }
    setTimeout(hidePageLoader, LOADER_MAX_MS);
  }

  /* Page loader: brief splash — hide on DOM ready, not full window.load */
  (function initPageLoader() {
    if (document.getElementById('page-loader')) {
      scheduleHidePageLoader();
      return;
    }
    if (document.readyState === 'complete') return;

    var logoPath = 'Assests/Logo.png';
    if (base && base !== 'includes') {
      var root = base.replace(/\/includes\/?$/, '');
      logoPath = (root ? root + '/' : '') + 'Assests/Logo.png';
    }
    if (!document.getElementById('page-loader-styles')) {
      var styleEl = document.createElement('style');
      styleEl.id = 'page-loader-styles';
      styleEl.textContent = [
        '@keyframes page-loader-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.03); } }',
        '@keyframes page-loader-bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-8px); } }',
        '#page-loader { position: fixed; inset: 0; z-index: 99999; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; transition: opacity 0.25s ease, visibility 0.25s ease; }',
        '#page-loader.loaded { opacity: 0; visibility: hidden; pointer-events: none; }',
        '#page-loader .page-loader-logo { width: 120px; height: auto; max-height: 120px; object-fit: contain; animation: page-loader-pulse 1.5s ease-in-out infinite; }',
        '#page-loader .page-loader-name { font-family: system-ui, sans-serif; font-size: 1rem; font-weight: 600; color: #0f3d91; letter-spacing: 0.02em; }',
        '#page-loader .page-loader-dots { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 0.5rem; }',
        '#page-loader .page-loader-dot { width: 8px; height: 8px; border-radius: 50%; background: #0f3d91; animation: page-loader-bounce 1.4s ease-in-out infinite both; }',
        '#page-loader .page-loader-dot:nth-child(1) { animation-delay: 0s; }',
        '#page-loader .page-loader-dot:nth-child(2) { animation-delay: 0.2s; }',
        '#page-loader .page-loader-dot:nth-child(3) { animation-delay: 0.4s; }'
      ].join('\n');
      document.head.appendChild(styleEl);
    }
    var loaderEl = document.createElement('div');
    loaderEl.id = 'page-loader';
    loaderEl.setAttribute('role', 'status');
    loaderEl.setAttribute('aria-label', 'Loading');
    loaderEl.innerHTML = '<img src="' + logoPath + '" alt="" class="page-loader-logo" width="120" height="120" decoding="async" /><span class="page-loader-name">Sri Takshashila Gurukul</span><div class="page-loader-dots" aria-hidden="true"><span class="page-loader-dot"></span><span class="page-loader-dot"></span><span class="page-loader-dot"></span></div>';
    document.body.appendChild(loaderEl);
    scheduleHidePageLoader();
  })();

  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal:not(.show)');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('show'); });
      return;
    }
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    els.forEach(function (el) { revealObserver.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }

  function initFloatWhatsApp() {
    if (document.getElementById('stk-float-whatsapp')) return;
    var a = document.createElement('a');
    a.id = 'stk-float-whatsapp';
    a.href = 'https://wa.me/916361664811';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', 'Chat on WhatsApp');
    a.title = 'WhatsApp';
    a.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
      '</svg>';
    document.body.appendChild(a);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatWhatsApp);
  } else {
    initFloatWhatsApp();
  }

  function setActiveNav() {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item[data-page="' + page + '"]').forEach(function (a) {
      a.classList.add('text-primary', 'bg-primary/5');
      a.classList.remove('text-gray-700');
    });
    document.querySelectorAll('.nav-mobile-item[data-page="' + page + '"]').forEach(function (a) {
      a.classList.add('text-primary', 'bg-primary/5');
      a.classList.remove('text-gray-700');
    });
  }

  function initNav() {
    var navToggle = document.getElementById('nav-toggle');
    var navMobile = document.getElementById('nav-mobile');
    var navBackdrop = document.getElementById('nav-mobile-backdrop');
    if (navToggle && navMobile) {
      function setMenuOpen(open) {
        navMobile.classList.toggle('open', open);
        navMobile.setAttribute('aria-hidden', !open);
        if (navBackdrop) {
          navBackdrop.classList.toggle('open', open);
          navBackdrop.setAttribute('aria-hidden', !open);
        }
        var icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars', !open);
          icon.classList.toggle('fa-times', open);
        }
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      }
      navToggle.addEventListener('click', function () {
        setMenuOpen(!navMobile.classList.contains('open'));
      });
      if (navBackdrop) {
        navBackdrop.addEventListener('click', function () {
          setMenuOpen(false);
        });
      }
    }
    document.querySelectorAll('.nav-dropdown-trigger').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (window.innerWidth < 768) {
          e.preventDefault();
          var menu = btn.nextElementSibling;
          if (menu) menu.classList.toggle('open');
        }
      });
    });
    var programsBtn = document.querySelector('.nav-mobile-programs-btn');
    var programsContent = document.getElementById('nav-mobile-programs-content');
    if (programsBtn && programsContent) {
      programsBtn.addEventListener('click', function () {
        var open = programsContent.classList.toggle('open');
        programsBtn.classList.toggle('open', open);
        programsBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    setActiveNav();
  }

  var fetches = [];
  if (headerEl) {
    fetches.push(
      fetch(base + '/header.html')
        .then(function (r) { return r.text(); })
        .then(function (html) {
          headerEl.innerHTML = html;
          initNav();
        })
        .catch(function () {
          headerEl.innerHTML = '<p class="p-4 text-gray-500">Header could not be loaded. Please use a local server (e.g. npm start).</p>';
        })
    );
  }
  if (footerEl) {
    fetches.push(
      fetch(base + '/footer.html')
        .then(function (r) { return r.text(); })
        .then(function (html) { footerEl.innerHTML = html; })
        .catch(function () {
          footerEl.innerHTML = '<p class="p-4 text-gray-500">Footer could not be loaded.</p>';
        })
    );
  }
})();
