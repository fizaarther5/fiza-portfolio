// ============ LOADER ============
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 900);
});

// ============ CURSOR ORB ============
const orb = document.getElementById('cursorOrb');
if (orb && matchMedia('(hover:hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    orb.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
  document.querySelectorAll('a, button, .tilt').forEach(el => {
    el.addEventListener('mouseenter', () => orb.classList.add('hover'));
    el.addEventListener('mouseleave', () => orb.classList.remove('hover'));
  });
}

// ============ MAGNETIC BUTTONS ============
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ============ TILT CARDS ============
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ============ TYPING EFFECT ============
const typedEl = document.getElementById('typed');
const words = ['Project Management', 'Agile Delivery', 'Software Projects', 'Leadership', 'Client Success', 'Digital Transformation'];
let wIdx = 0, cIdx = 0, deleting = false;
function typeLoop() {
  const word = words[wIdx];
  if (!deleting) {
    cIdx++;
    typedEl.textContent = word.slice(0, cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    cIdx--;
    typedEl.textContent = word.slice(0, cIdx);
    if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
if (typedEl) typeLoop();

// ============ PARTICLES ============
const particlesWrap = document.getElementById('particles');
if (particlesWrap) {
  const count = window.innerWidth < 700 ? 16 : 34;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.bottom = '-10px';
    p.style.animationDuration = (10 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.opacity = 0.3 + Math.random() * 0.5;
    particlesWrap.appendChild(p);
  }
}

// ============ REVEAL ON SCROLL ============
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ============ NUMBER COUNTERS ============
const numberEls = document.querySelectorAll('.number');
const numIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
    numIo.unobserve(el);
  });
}, { threshold: 0.5 });
numberEls.forEach(el => numIo.observe(el));

// ============ NAV HIDE ON SCROLL ============
const nav = document.getElementById('nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastScroll && y > 200) nav.classList.add('nav-hidden');
  else nav.classList.remove('nav-hidden');
  lastScroll = y;
});

// ============ MOBILE NAV ============
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  if (open) {
    navLinks.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:70px;right:20px;background:#13151A;border:1px solid rgba(255,255,255,0.1);padding:20px 28px;border-radius:16px;gap:16px;';
  } else {
    navLinks.removeAttribute('style');
  }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navLinks.removeAttribute('style');
}));

// ============ PROJECT CASE STUDIES ============
const projectData = {
  dashboard: {
    tag: 'Web App · 2025', title: 'Project Management Dashboard',
    meta: ['Role: Technical Project Manager', 'Team: 6 members', 'Timeline: 10 weeks', 'Tools: Jira, REST APIs, Azure DevOps'],
    body: [
      ['Overview', 'A centralized dashboard giving leadership and the delivery team real-time visibility into sprint health, blockers, and burn-down across three concurrent workstreams.'],
      ['Problem & Business Goal', 'Leadership had no single source of truth for delivery status, leading to duplicated status meetings and delayed risk escalation.'],
      ['Planning & Stakeholders', 'Ran discovery workshops with engineering leads and department heads to define the metrics that actually mattered, then mapped a phased build plan.'],
      ['Execution', 'Coordinated a two-sprint build with the engineering team, running daily standups and managing the API integration risk that threatened the timeline.'],
      ['Results', 'Cut status-reporting meetings by 60% and gave leadership same-day visibility into blockers instead of a weekly lag.'],
      ['Lessons Learned', 'Early alignment on what "done" means for a metric saves far more time than late polish on the dashboard itself.']
    ]
  },
  inventory: {
    tag: 'Internal Tool · 2024', title: 'Inventory Management System',
    meta: ['Role: Delivery Coordinator', 'Timeline: 8 weeks', 'Tools: SDLC, QA, Confluence'],
    body: [
      ['Overview', 'A rebuilt inventory system replacing a spreadsheet-based process prone to stock discrepancies.'],
      ['Challenges', 'Legacy data was inconsistent across three regional teams, requiring a careful migration and validation plan.'],
      ['Risk Management', 'Built a rollback plan and staged the migration by region to contain any data-quality issues.'],
      ['Results', 'Reduced stock discrepancies by 32% and cut manual reconciliation time by half.']
    ]
  },
  woocommerce: {
    tag: 'E-Commerce · 2024', title: 'WooCommerce Website',
    meta: ['Role: Project Coordinator', 'Timeline: 6 weeks', 'Tools: WordPress, Stripe, Google Workspace'],
    body: [
      ['Overview', 'Coordinated the launch of a WooCommerce storefront with integrated Stripe payments for a retail client.'],
      ['Planning & Sprint Setup', 'Broke the build into a design sprint, a build sprint, and a QA/launch sprint, each with a clear stakeholder sign-off gate.'],
      ['Execution', 'Managed the developer and designer against a fixed launch date tied to a seasonal sales window.'],
      ['Results', 'Delivered on time and on budget, with zero critical issues in the first month post-launch.']
    ]
  },
  crm: {
    tag: 'Platform · 2023', title: 'CRM Platform',
    meta: ['Role: Relationship Manager & Coordinator', 'Clients: 20+ accounts', 'Tools: CRM, Excel, Slack'],
    body: [
      ['Overview', 'Unified fragmented client records from spreadsheets and email threads into a single CRM platform.'],
      ['Stakeholders', 'Worked directly with account owners to define required fields without over-engineering the system.'],
      ['Results', 'Gave the team a single, reliable view of 20+ client relationships, reducing missed follow-ups significantly.']
    ]
  },
  portal: {
    tag: 'Client Portal · 2023', title: 'Client Portal & Software Delivery',
    meta: ['Role: Technical Project Manager', 'Tools: Sprint Planning, Confluence, Risk Register'],
    body: [
      ['Overview', 'An end-to-end delivery portal giving clients live status on their software projects without needing to email the team.'],
      ['Risk Management & Sprint Planning', 'Maintained a live risk register reviewed every sprint, catching two major delivery risks before they hit the timeline.'],
      ['Communication', 'Structured weekly async updates so clients always had current status without a meeting.'],
      ['Results', 'Cut client status-check emails by roughly 40% and improved on-time delivery confidence.']
    ]
  },
  process: {
    tag: 'Process · 2023', title: 'Internal Process Improvement',
    meta: ['Role: Team Lead', 'Tools: Kanban, Retrospectives'],
    body: [
      ['Overview', 'Redesigned the team\'s intake and sprint-planning workflow after retrospectives flagged planning as the biggest time sink.'],
      ['Execution', 'Introduced a lightweight Kanban intake board ahead of sprint planning, so planning meetings started with a pre-groomed backlog.'],
      ['Results', 'Cut sprint planning time in half and improved estimate accuracy across the following two quarters.']
    ]
  }
};

const modalOverlay = document.getElementById('modalOverlay');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', () => {
    const data = projectData[card.dataset.project];
    if (!data) return;
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalMeta.innerHTML = data.meta.map(m => `<span>${m}</span>`).join('');
    modalBody.innerHTML = data.body.map(([h, p]) => `<h4>${h}</h4><p>${p}</p>`).join('');
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ============ CONTACT FORM ============
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  success.classList.add('show');
  form.reset();
  setTimeout(() => success.classList.remove('show'), 4500);
});

// ============ BACK TO TOP ============
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
