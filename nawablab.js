/**
 * Computer Zone - Official Interactive Scripts
 * Handles Theme Switching, FAQ Accordion, mobile drawer, WhatsApp booking, issue tags, and smooth scrolling
 * Contact: +91 90266 47832 | Email: Zonecomputer062@gmail.com
 */

// ── THEME SWITCHER ──
function setTheme(theme) {
  if (theme === 'blue') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  try {
    localStorage.setItem('cz_theme', theme);
  } catch(e) {}

  // Update button active state
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-set-theme') === theme);
  });
}

// Initialize saved theme on load (default to electric blue)
(function initTheme() {
  try {
    const saved = localStorage.getItem('cz_theme') || 'blue';
    setTheme(saved);
  } catch(e) {
    setTheme('blue');
  }
})();

// Mobile navigation drawer toggle
function setNavDrawer(open) {
  const drawer = document.getElementById('navDrawer');
  const overlay = document.getElementById('navOverlay');
  const btn = document.getElementById('navMenuBtn');
  const closeBtn = document.getElementById('navDrawerClose');
  if (!drawer || !overlay || !btn) return;
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  document.body.classList.toggle('nav-open', open);
  if (open) {
    overlay.removeAttribute('hidden');
    closeBtn?.focus();
  } else {
    overlay.setAttribute('hidden', '');
    btn.focus();
  }
}

function toggleNavDrawer() {
  const drawer = document.getElementById('navDrawer');
  if (!drawer) return;
  setNavDrawer(!drawer.classList.contains('open'));
}

(function initNavDrawer() {
  const btn = document.getElementById('navMenuBtn');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('navDrawerClose');
  btn?.addEventListener('click', toggleNavDrawer);
  overlay?.addEventListener('click', () => setNavDrawer(false));
  closeBtn?.addEventListener('click', () => setNavDrawer(false));
  document.querySelectorAll('.nav-drawer-links a').forEach(a => {
    a.addEventListener('click', () => setNavDrawer(false));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('navDrawer')?.classList.contains('open')) {
      setNavDrawer(false);
    }
  });
})();

// ── INTERACTIVE FAQ ACCORDION ──
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const answer = item.querySelector('p');
    if (!answer) return;
    const isExpanded = item.classList.contains('active');

    // Toggle active state
    item.classList.toggle('active', !isExpanded);
    if (!isExpanded) {
      answer.style.display = 'block';
    } else {
      answer.style.display = 'none';
    }
  });
});

// Floating WhatsApp Widget Toggle
function toggleWA() {
  const p = document.getElementById('waPanel');
  const t = document.getElementById('waTrigger');
  if (!p || !t) return;
  const isOpen = p.classList.contains('open');
  p.classList.toggle('open');
  p.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  t.classList.toggle('active');
}

// Floating WhatsApp Widget Booking Submission
function submitWA() {
  const n = document.getElementById('wf-name')?.value.trim();
  const p = document.getElementById('wf-phone')?.value.trim();
  const dv = document.getElementById('wf-device')?.value;
  const br = document.getElementById('wf-brand')?.value;
  const ar = document.getElementById('wf-area')?.value;
  const is = document.getElementById('wf-issue')?.value.trim();
  if (!n || !p || !dv || !br || !ar) {
    alert('Please fill in all required fields: Name, Phone, Device Type, Brand, and Area.');
    return;
  }
  const msg = `Hi Computer Zone! I would like to book a doorstep repair service.%0A%0A*Name:* ${encodeURIComponent(n)}%0A*Phone:* ${encodeURIComponent(p)}%0A*Device Type:* ${encodeURIComponent(dv)}%0A*Brand:* ${encodeURIComponent(br)}%0A*Area in Lucknow:* ${encodeURIComponent(ar)}${is ? `%0A*Issue:* ${encodeURIComponent(is)}` : ''}%0A%0APlease confirm my booking. Thank you!`;
  window.open(`https://wa.me/919026647832?text=${msg}`, '_blank', 'noopener,noreferrer');
  const succ = document.getElementById('waSuccess');
  if (succ) {
    succ.style.display = 'block';
    setTimeout(() => {
      succ.style.display = 'none';
      toggleWA();
    }, 3000);
  }
}

// Main Page Booking Form Submission
function submitPageForm() {
  const n = document.getElementById('f-name')?.value.trim();
  const p = document.getElementById('f-phone')?.value.trim();
  const dv = document.getElementById('f-device')?.value;
  const br = document.getElementById('f-brand')?.value;
  const ar = document.getElementById('f-area')?.value;
  if (!n || !p || !dv || !br || !ar) {
    alert('Please fill in all required fields: Name, Mobile, Device Type, Brand and Area.');
    return;
  }
  const iss = [...document.querySelectorAll('.itag.on')].map(t => t.textContent.trim()).join(', ') || 'General Inspection';
  const dc = document.getElementById('f-desc')?.value.trim() || '';
  const msg = `Hi Computer Zone! I would like to book a doorstep repair service.%0A%0A*Name:* ${encodeURIComponent(n)}%0A*Phone:* ${encodeURIComponent(p)}%0A*Device Type:* ${encodeURIComponent(dv)}%0A*Brand:* ${encodeURIComponent(br)}%0A*Issues:* ${encodeURIComponent(iss)}%0A*Area in Lucknow:* ${encodeURIComponent(ar)}${dc ? `%0A*Details:* ${encodeURIComponent(dc)}` : ''}%0A%0APlease confirm my booking. Thank you!`;
  window.open(`https://wa.me/919026647832?text=${msg}`, '_blank', 'noopener,noreferrer');
  const box = document.getElementById('pageSuccess');
  if (box) {
    box.style.display = 'block';
    box.focus();
  }
}

// Smooth scrolling for anchor links with sticky header offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const targetElem = document.querySelector(targetId);
    if (targetElem) {
      e.preventDefault();
      window.scrollTo({
        top: targetElem.getBoundingClientRect().top + window.scrollY - 74,
        behavior: 'smooth'
      });
    }
  });
});

// Auto-open WhatsApp popup gently after 10 seconds if not already opened
setTimeout(() => {
  const p = document.getElementById('waPanel');
  if (p && !p.classList.contains('open')) {
    toggleWA();
  }
}, 10000);
