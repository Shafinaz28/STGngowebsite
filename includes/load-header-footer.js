(function () {
  var base = document.querySelector('script[src*="load-header-footer.js"]');
  base = base ? base.getAttribute('src').replace(/\/[^/]+$/, '') : 'includes';
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');

  /* Page loader: show logo + spinner until page load */
  (function initPageLoader() {
    var logoPath = 'Assests/Logo.png';
    if (base && base !== 'includes') {
      var root = base.replace(/\/includes\/?$/, '');
      logoPath = (root ? root + '/' : '') + 'Assests/Logo.png';
    }
    var loaderCSS = [
      '@keyframes page-loader-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.85; transform: scale(1.03); } }',
      '@keyframes page-loader-bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-8px); } }',
      '#page-loader { position: fixed; inset: 0; z-index: 99999; background: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; transition: opacity 0.5s ease, visibility 0.5s ease; }',
      '#page-loader.loaded { opacity: 0; visibility: hidden; pointer-events: none; }',
      '#page-loader .page-loader-logo { width: 120px; height: auto; max-height: 120px; object-fit: contain; animation: page-loader-pulse 1.5s ease-in-out infinite; }',
      '#page-loader .page-loader-name { font-family: system-ui, sans-serif; font-size: 1rem; font-weight: 600; color: #001e8c; letter-spacing: 0.02em; }',
      '#page-loader .page-loader-dots { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 0.5rem; }',
      '#page-loader .page-loader-dot { width: 8px; height: 8px; border-radius: 50%; background: #001e8c; animation: page-loader-bounce 1.4s ease-in-out infinite both; }',
      '#page-loader .page-loader-dot:nth-child(1) { animation-delay: 0s; }',
      '#page-loader .page-loader-dot:nth-child(2) { animation-delay: 0.2s; }',
      '#page-loader .page-loader-dot:nth-child(3) { animation-delay: 0.4s; }'
    ].join('\n');
    var styleEl = document.createElement('style');
    styleEl.id = 'page-loader-styles';
    styleEl.textContent = loaderCSS;
    document.head.appendChild(styleEl);
    var loaderEl = document.createElement('div');
    loaderEl.id = 'page-loader';
    loaderEl.setAttribute('role', 'status');
    loaderEl.setAttribute('aria-label', 'Loading');
    loaderEl.innerHTML = '<img src="' + logoPath + '" alt="" class="page-loader-logo" /><span class="page-loader-name">Sri Takshashila Gurukul</span><div class="page-loader-dots" aria-hidden="true"><span class="page-loader-dot"></span><span class="page-loader-dot"></span><span class="page-loader-dot"></span></div>';
    document.body.appendChild(loaderEl);
    function hideLoader() {
      var el = document.getElementById('page-loader');
      if (el) el.classList.add('loaded');
    }
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }
  })();

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
    /* Desktop: Programs dropdown (hover) */
    document.querySelectorAll('.nav-dropdown-trigger').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (window.innerWidth < 768) {
          e.preventDefault();
          var menu = btn.nextElementSibling;
          if (menu) menu.classList.toggle('open');
        }
      });
    });
    /* Mobile: Programs collapsible */
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

  if (headerEl) {
    fetch(base + '/header.html').then(function (r) { return r.text(); }).then(function (html) {
      headerEl.innerHTML = html;
      initNav();
    }).catch(function () { headerEl.innerHTML = '<p class="p-4 text-gray-500">Header could not be loaded. Please use a local server (e.g. npm start).</p>'; });
  }
  if (footerEl) {
    fetch(base + '/footer.html').then(function (r) { return r.text(); }).then(function (html) {
      footerEl.innerHTML = html;
    }).catch(function () { footerEl.innerHTML = '<p class="p-4 text-gray-500">Footer could not be loaded.</p>'; });
  }
})();
