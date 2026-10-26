document.documentElement.classList.add('js');

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('on'));
}

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    const filter = button.dataset.filter;
    portfolioItems.forEach((item) => {
      item.hidden = filter !== 'all' && item.dataset.cat !== filter;
    });
  });
});

const contactForm = document.querySelector('#contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const message = [
      'Halo CRA University, saya ingin mengetahui lebih lanjut.',
      '',
      `Nama Lengkap: ${formData.get('name')}`,
      `Email / WhatsApp: ${formData.get('contact')}`,
      `Perusahaan / Komunitas: ${formData.get('organization') || '-'}`,
      `Program yang Diminati: ${formData.get('program')}`,
      `Pesan: ${formData.get('message') || '-'}`
    ].join('\n');
    const whatsappUrl = `https://wa.me/6285755976016?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;
  });
}

const menuButton = document.querySelector('.hamb');
const navigationLinks = document.querySelectorAll('.nav-links a');

if (menuButton) {
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu');
    menuButton.textContent = '☰';
  };

  menuButton.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    menuButton.textContent = isOpen ? '×' : '☰';
  });

  navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
      menuButton.focus();
    }
  });
}
