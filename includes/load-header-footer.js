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
