(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');

  if (nav) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = nav.querySelectorAll('a');
    let matchedDropdown = false;

    allLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href === currentPath) {
        link.setAttribute('aria-current', 'page');
        const dropdown = link.closest('.nav-dropdown');
        if (dropdown) {
          dropdown.classList.add('active');
          matchedDropdown = true;
        }
      }
    });

    if ((currentPath.startsWith('project') || currentPath === 'internal-dosimetry.html') && !matchedDropdown) {
      const projectsDropdown = nav.querySelector('.nav-dropdown');
      if (projectsDropdown) {
        projectsDropdown.classList.add('active');
      }
    }
  }

  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 640 && nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
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
