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

  document.querySelectorAll('.year-selector').forEach((selector) => {
    const yearToggle = selector.querySelector('.year-toggle');
    const yearMenu = selector.querySelector('.year-dropdown-menu');
    if (!yearToggle || !yearMenu) return;

    const closeYearMenu = () => {
      yearMenu.classList.remove('open');
      yearToggle.setAttribute('aria-expanded', 'false');
    };

    yearToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = yearMenu.classList.toggle('open');
      yearToggle.setAttribute('aria-expanded', String(open));
    });

    yearMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        closeYearMenu();
        if (targetEl) {
          event.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', `#${targetId}`);
        }
      });
    });

    document.addEventListener('click', (event) => {
      if (yearMenu.classList.contains('open') && !selector.contains(event.target)) {
        closeYearMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && yearMenu.classList.contains('open')) {
        closeYearMenu();
        yearToggle.focus();
      }
    });
  });

  document.querySelectorAll('.news-carousel').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.news-slide'));
    const dots = Array.from(carousel.querySelectorAll('.news-dot'));
    const prevBtn = carousel.querySelector('.news-arrow-prev');
    const nextBtn = carousel.querySelector('.news-arrow-next');
    if (slides.length < 2) return;

    let currentIndex = 0;
    let timerId = null;
    const INTERVAL_MS = 6000;

    const showSlide = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
      dots.forEach((dot, i) => {
        const isActive = i === currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      timerId = window.setInterval(() => {
        showSlide(currentIndex + 1);
      }, INTERVAL_MS);
    };

    const stopAutoPlay = () => {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        startAutoPlay();
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        startAutoPlay();
      });
    });

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('focusin', stopAutoPlay);
    carousel.addEventListener('focusout', startAutoPlay);

    startAutoPlay();
  });
})();
