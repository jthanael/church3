/* ============================================================
   Gospel Crusade Church — Scripts
   ============================================================ */

// ========== Loading Screen ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 600);
});

// ========== Mobile Menu ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('show');
  document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : '';
});

// Close on nav-link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close on outside click (mobile)
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('show') &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)) {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// ========== Navbar Scroll Effect ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ========== Scroll-triggered Animations ==========
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim-reveal').forEach(el => revealObserver.observe(el));

// ========== Events (Dynamic — Bilingual) ==========
const events = [
  {
    month: 'FEB',
    day: '14',
    title: "Valentine's Outreach",
    titleHt: 'Sansibilizasyon Sen Valanten',
    description: 'Join us as we share love and support with the community. Free refreshments and fellowship for all.',
    descriptionHt: 'Vin jwenn nou pandan n ap pataje lanmou ak sipò ak kominote a. Rafrechisan gratis ak fratènite pou tout moun.',
    time: '2:00 PM – 5:00 PM'
  },
  {
    month: 'MAR',
    day: '25',
    title: 'Spring Community Service',
    titleHt: 'Sèvis Kominotè Prentan',
    description: 'Help clean up local parks and spread joy to neighbors in need. Bring your family!',
    descriptionHt: 'Ede netwaye pak lokal yo epi gaye lajwa bay vwazen ki nan bezwen. Mennen fanmi ou!',
    time: '9:00 AM – 12:00 PM'
  },
  {
    month: 'APR',
    day: '07',
    title: 'Easter Celebration',
    titleHt: 'Selebrasyon Pak',
    description: 'Special service with uplifting music, prayer, and a family-friendly Easter egg hunt.',
    descriptionHt: 'Sèvis espesyal ak mizik edifyan, lapriyè, ak yon chache ze Pak pou tout fanmi.',
    time: '10:00 AM – 1:00 PM'
  }
];

const eventsGrid = document.getElementById('eventsGrid');

events.forEach((evt, i) => {
  const card = document.createElement('div');
  card.className = 'event-card anim-reveal';
  card.style.transitionDelay = `${i * 0.1}s`;
  card.innerHTML = `
    <div class="event-date">
      <div class="event-month">${evt.month}</div>
      <div class="event-day">${evt.day}</div>
    </div>
    <div class="event-details">
      <h3>${evt.title} · <span class="creole-label">${evt.titleHt}</span></h3>
      <p class="event-description">${evt.description}</p>
      <p class="event-description event-description-creole">${evt.descriptionHt}</p>
      <span class="event-time">🕐 ${evt.time}</span>
    </div>
    <button class="event-action" onclick="openPopup()">Join · Vin Jwenn →</button>
  `;
  eventsGrid.appendChild(card);
  revealObserver.observe(card);
});

// ========== Popup ==========
const popup = document.getElementById('popup');

function openPopup() {
  popup.style.display = 'flex';
  requestAnimationFrame(() => popup.classList.add('show'));
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  popup.classList.remove('show');
  setTimeout(() => {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }, 350);
}

popup.addEventListener('click', (e) => {
  if (e.target === popup) closePopup();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popup.classList.contains('show')) closePopup();
});

// ========== Prayer Form ==========
const prayerForm  = document.getElementById('prayerForm');
const formMessage = document.getElementById('formMessage');

prayerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = prayerForm.querySelector('.form-submit');
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Submitting… / Ap soumèt…';

  try {
    // REPLACE 'YOUR_FORM_ID' with your actual Formspree ID
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: new FormData(prayerForm),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formMessage.textContent = '✓ Thank you! Your prayer request has been received. / Mèsi! Demann lapriyè ou a resevwa.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
      prayerForm.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch {
    formMessage.textContent = 'Something went wrong. Please try again. / Yon bagay pa t mache. Tanpri eseye ankò.';
    formMessage.className = 'form-message error';
    formMessage.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `Submit Prayer Request · Soumèt Demann Lapriyè
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
    setTimeout(() => { formMessage.style.display = 'none'; }, 6000);
  }
});

// ========== Smooth Scroll ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href.length <= 1) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
