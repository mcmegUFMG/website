(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');

  if (toggle && !toggle.querySelector('.menu-toggle-label')) {
    const existingBars = Array.from(toggle.querySelectorAll('span'));
    toggle.innerHTML = '';

    const label = document.createElement('span');
    label.className = 'menu-toggle-label';
    label.textContent = 'Menu';

    const barsWrapper = document.createElement('span');
    barsWrapper.className = 'menu-toggle-bars';
    existingBars.forEach((bar) => barsWrapper.appendChild(bar));

    toggle.appendChild(label);
    toggle.appendChild(barsWrapper);
  }

  if (nav) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = nav.querySelectorAll('a');
    let matchedDropdown = false;

    nav.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
      const dropdownToggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (dropdownToggle && !dropdownToggle.querySelector('.submenu-arrow')) {
        const cleanTitle = dropdownToggle.textContent.replace(/[▾▸›]/g, '').trim();
        dropdownToggle.innerHTML = `<span>${cleanTitle}</span><span class="submenu-arrow" aria-hidden="true">›</span>`;
      }

      if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (event) => {
          if (event.target.closest('.submenu-arrow')) {
            event.preventDefault();
            event.stopPropagation();
            dropdown.classList.toggle('submenu-open');
          }
        });
      }
    });

    allLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href === currentPath && !link.classList.contains('nav-dropdown-toggle')) {
        link.setAttribute('aria-current', 'page');
        const dropdown = link.closest('.nav-dropdown');
        if (dropdown) {
          dropdown.classList.add('active', 'submenu-open');
          matchedDropdown = true;
        }
      }
    });

    if ((currentPath.startsWith('project') || currentPath === 'internal-dosimetry.html') && !matchedDropdown) {
      const projectsDropdown = nav.querySelector('.nav-dropdown');
      if (projectsDropdown) {
        projectsDropdown.classList.add('active', 'submenu-open');
      }
    }
  }

  if (nav && toggle) {
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('click', (event) => {
      if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  document.querySelectorAll('.link-card[data-href]').forEach((card) => {
    const url = card.getAttribute('data-href');
    if (!url) return;

    card.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') return;
      window.open(url, '_blank', 'noopener');
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.open(url, '_blank', 'noopener');
      }
    });
  });
})();
