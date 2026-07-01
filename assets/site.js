(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');

  if (nav) {
    const navItems = [
      { href: 'index.html', label: 'Home' },
      { href: 'about.html', label: 'About' },
      { href: 'book.html', label: 'Book' },
      { href: 'course.html', label: 'Course' },
      { href: 'contact.html', label: 'Contact' },
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    nav.innerHTML = navItems
      .map(({ href, label }) => {
        const isActive = currentPath === href;
        const attrs = [`href="${href}"`, isActive ? 'aria-current="page"' : ''].filter(Boolean).join(' ');
        return `<a ${attrs}>${label}</a>`;
      })
      .join('');
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
