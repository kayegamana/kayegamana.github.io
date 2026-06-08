/* ===========================================================
   Portfolio interactions
   - Scroll-spy: which section is in view → highlight nav link
   - Auto-close mobile nav on link click
   - Soft section reveal
   - Certifications slider + lightbox
   - Back-to-top
   - Copy email
   - Smart navbar (hide on scroll down)
   - Contact forms (Web3Forms) with per-form keys from PORTFOLIO_CONFIG
   - Contact modal: intent-driven copy (hero / testimonial / hello)
=========================================================== */

(function () {
  "use strict";

  /* ---------- Modal intent copy table ----------
     Each trigger button can carry data-contact-intent="<key>".
     When the modal opens, we swap the eyebrow + title + subject
     default + textarea placeholder accordingly, AND switch the
     form's access_key by setting data-form-key on the form so
     the submit handler reads the right one from PORTFOLIO_CONFIG.
  */
  const INTENT_COPY = {
    hero: {
      eyebrow: "// GET IN TOUCH",
      title: "Got a project, a role, or a build in mind?",
      greeting: "Hello, future collaborator!",
      subjectPlaceholder: "Role, project, or just a hello",
      messagePlaceholder: "Tell me about the work — the stack, the scope, what 'done' looks like to you. I read every message.",
      defaultSubject: "[CONTACT] New message via portfolio",
      formKey: "hero"
    },
    testimonial: {
      eyebrow: "// IN YOUR WORDS",
      title: "We've worked together — what was that like?",
      greeting: "Hello, past collaborator!",
      subjectPlaceholder: "Your role and how we worked together",
      messagePlaceholder: "A few honest sentences about working with me — what stood out, what could've been better. I'll ask before publishing anything.",
      defaultSubject: "[TESTIMONIAL] " ,
      formKey: "testimonial"
    },
    hello: {
      eyebrow: "// JUST SAYING HI",
      title: "Just want to say hi? Even better.",
      greeting: "Hello, fellow human!",
      subjectPlaceholder: "What's on your mind",
      messagePlaceholder: "No pitch needed — a question, a thought, a recommendation, a hello. I reply to most messages within a day.",
      defaultSubject: "[HELLO] New message via portfolio",
      formKey: "hero"
    }
  };

  /* ---------- Scroll-spy ---------- */
  const links = document.querySelectorAll(".navbar-nav .nav-link[href^='#']");
  const linkByHash = new Map();
  links.forEach(a => linkByHash.set(a.getAttribute("href"), a));

  const sections = Array.from(document.querySelectorAll("section[id]"));

  function setActiveByHash(hash) {
    links.forEach(a => a.classList.remove("active"));
    const target = linkByHash.get(hash);
    if (target) target.classList.add("active");
  }

  if (links.length && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveByHash("#" + visible.target.id);
    }, {
      rootMargin: "-40% 0px -50% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Auto-close mobile nav on link click ---------- */
  const navCollapse = document.getElementById("nav");
  document.querySelectorAll("#nav a[href^='#']").forEach(a => {
    a.addEventListener("click", () => {
      if (navCollapse && navCollapse.classList.contains("show")) {
        const inst = window.bootstrap && window.bootstrap.Collapse
          ? window.bootstrap.Collapse.getOrCreateInstance(navCollapse)
          : null;
        if (inst) inst.hide();
      }
    });
  });

  /* ---------- Soft section reveal ---------- */
  const revealTargets = sections.filter(s => s.id !== "home");
  revealTargets.forEach(s => s.classList.add("will-reveal"));

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-revealed");
        reveal.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(s => reveal.observe(s));

  /* ---------- Generic reveal for non-section blocks ---------- */
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.classList.add('will-reveal');
    reveal.observe(el);
  });

  /* ---------- Modern Certifications Slider ---------- */
  const slides = document.querySelectorAll('.cert-slide');
  const dots = document.querySelectorAll('.cert-dot');
  const prevBtn = document.querySelector('.cert-nav-prev');
  const nextBtn = document.querySelector('.cert-nav-next');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function resetSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetSlideTimer();
      });
    });

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => { prevSlide(); resetSlideTimer(); });
      nextBtn.addEventListener('click', () => { nextSlide(); resetSlideTimer(); });
    }
  }

  /* ---------- Certificate Modal / Lightbox (delegated so marquee clones still work) ---------- */
  const certModalElem = document.getElementById('certModal');
  const modalCertImg = document.getElementById('modalCertImg');

  if (certModalElem && modalCertImg && window.bootstrap) {
    const certModal = new bootstrap.Modal(certModalElem);

    document.addEventListener('click', (e) => {
      const img = e.target.closest('.cert-img, .credcard__thumb img');
      if (!img) return;
      if (!img.src) return;
      if (img.closest('.credcard__thumb--ph')) return; // skip placeholders
      modalCertImg.src = img.src;
      certModal.show();
      clearInterval(slideInterval);
    });

    certModalElem.addEventListener('hidden.bs.modal', resetSlideTimer);
  }

  /* ---------- Back to top ---------- */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Copy Email (Hero CTA) ---------- */
  const copyEmailBtn = document.getElementById('heroCopyEmail');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.dataset.email || 'kayecgamana@gmail.com';
      const flash = () => {
        copyEmailBtn.classList.add('copied');
        setTimeout(() => copyEmailBtn.classList.remove('copied'), 2000);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(flash).catch(legacyCopy);
      } else {
        legacyCopy();
      }
      function legacyCopy() {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
        flash();
      }
    });
  }

  /* ---------- Smart Navbar (Hide on Scroll Down) ---------- */
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  /* ---------- Web3Forms: pull keys from PORTFOLIO_CONFIG ----------
     Each form has data-form-key="<bucket>" (main / hero / testimonial).
     We populate its hidden access_key from window.PORTFOLIO_CONFIG.
     If config is missing the form will fall back to mailto on submit.
  */
  function getKey(bucket) {
    const cfg = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.web3forms) || {};
    return (cfg[bucket] || '').trim();
  }

  function applyKeyToForm(form) {
    if (!form) return;
    const bucket = form.dataset.formKey || 'main';
    const input = form.querySelector('input[name="access_key"]');
    if (input) input.value = getKey(bucket);
  }

  document.querySelectorAll('form.cform').forEach(applyKeyToForm);

  /* ---------- Contact Modal: intent-driven copy + key swap ---------- */
  const contactModalElem = document.getElementById('contactModal');
  if (contactModalElem) {
    const eyebrowEl  = contactModalElem.querySelector('.cmodal__eyebrow');
    const titleEl    = contactModalElem.querySelector('.cmodal__title');
    const greetingEl = contactModalElem.querySelector('.contact-greeting');
    const subjectEl  = contactModalElem.querySelector('input[name="topic"]');
    const messageEl  = contactModalElem.querySelector('textarea[name="message"]');
    const subjectHid = contactModalElem.querySelector('input[name="subject"]');
    const modalForm  = document.getElementById('contactModalForm');

    function applyIntent(intent) {
      const copy = INTENT_COPY[intent] || INTENT_COPY.hero;
      if (eyebrowEl)  eyebrowEl.textContent  = copy.eyebrow;
      if (titleEl)    titleEl.textContent    = copy.title;
      if (greetingEl) greetingEl.textContent = copy.greeting;
      if (subjectEl)  subjectEl.placeholder  = copy.subjectPlaceholder;
      if (messageEl)  messageEl.placeholder  = copy.messagePlaceholder;
      if (subjectHid) subjectHid.value       = copy.defaultSubject;
      if (modalForm) {
        modalForm.dataset.formKey = copy.formKey;
        applyKeyToForm(modalForm);
        // Track which CTA opened the modal in form_origin
        const origin = modalForm.querySelector('input[name="form_origin"]');
        if (origin) origin.value = intent + '-modal';
      }
    }

    contactModalElem.addEventListener('show.bs.modal', (e) => {
      const trigger = e.relatedTarget;
      const intent = (trigger && trigger.dataset && trigger.dataset.contactIntent) || 'hero';
      applyIntent(intent);
    });

    // Reset modal on close
    contactModalElem.addEventListener('hidden.bs.modal', () => {
      if (modalForm) modalForm.reset();
      const status = document.getElementById('cModalFormStatus');
      if (status) { status.dataset.state = ''; status.textContent = ''; }
    });
  }

  /* ---------- Contact Forms (Web3Forms submit) ---------- */
  const contactForms = [
    { form: document.getElementById('contactForm'),       status: document.getElementById('cformStatus'),       submitBtn: document.getElementById('cformSubmit') },
    { form: document.getElementById('contactModalForm'),  status: document.getElementById('cModalFormStatus'),  submitBtn: document.getElementById('cModalFormSubmit') }
  ];

  contactForms.forEach(({ form, status, submitBtn }) => {
    if (!form) return;

    function setStatus(state, msg) {
      if (!status) return;
      status.dataset.state = state || '';
      status.textContent = msg || '';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      // Re-apply latest key just before submit (modal may have changed bucket)
      applyKeyToForm(form);

      const accessKey = (form.elements.access_key && form.elements.access_key.value || '').trim();
      const fd = new FormData(form);

      // Compose subject
      const base = fd.get('subject') || 'New message from your portfolio';
      if (fd.get('request_resume') === 'yes') {
        fd.set('subject', '[RÉSUMÉ REQUEST] ' + (fd.get('topic') || base));
      } else {
        fd.set('subject', base + ' — ' + (fd.get('topic') || 'No subject'));
      }

      // No real key configured — mailto fallback
      if (!accessKey || accessKey.startsWith('YOUR-')) {
        const body = [
          'Name: ' + (fd.get('name') || ''),
          'Email: ' + (fd.get('email') || ''),
          'Origin: ' + (fd.get('form_origin') || 'unknown'),
          'Resume requested: ' + (fd.get('request_resume') === 'yes' ? 'YES' : 'no'),
          '',
          fd.get('message') || ''
        ].join('\n');
        const mailto = 'mailto:kayecgamana@gmail.com'
          + '?subject=' + encodeURIComponent(fd.get('subject'))
          + '&body=' + encodeURIComponent(body);
        setStatus('busy', 'Form not connected yet — opening your mail app as a fallback.');
        window.location.href = mailto;
        return;
      }

      submitBtn.disabled = true;
      const labelEl = submitBtn.querySelector('.cform__btn-label');
      const originalLabel = labelEl ? labelEl.textContent : '';
      if (labelEl) labelEl.textContent = 'Sending…';
      setStatus('busy', 'Sending your message…');

      try {
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          const resumeNote = fd.get('request_resume') === 'yes'
            ? ' I\'ll send the résumé along with my reply.'
            : '';
          setStatus('ok', 'Message sent — I\'ll reply within a day.' + resumeNote);
          form.reset();
          applyKeyToForm(form); // re-populate hidden key after reset
        } else {
          setStatus('error', (data && data.message) || 'Something went wrong. Please try again or email me directly.');
        }
      } catch (err) {
        setStatus('error', 'Network hiccup — please try again or email me directly.');
      } finally {
        submitBtn.disabled = false;
        if (labelEl) labelEl.textContent = originalLabel;
      }
    });
  });

  /* ---------- Credentials accordion: close others when one opens ---------- */
  const drawers = document.querySelectorAll('.cab-drawer');
  if (drawers.length) {
    drawers.forEach((d) => {
      d.addEventListener('toggle', () => {
        if (d.open) {
          drawers.forEach((other) => {
            if (other !== d && other.open) other.open = false;
          });
        }
      });
    });
  }

  /* ---------- Credentials: infinite marquee when a drawer's grid overflows ----------
     Only activates for grids that would visually overflow one row (4+ cards
     on typical viewport). We duplicate children once and let CSS keyframes
     translate -50% for seamless loop. Pauses on hover via CSS.
  */
  function setupCredMarquee(grid) {
    if (!grid || grid.dataset.marqueeReady === '1') return;
    const cards = Array.from(grid.children).filter(el => el.classList.contains('credcard'));
    if (cards.length < 4) return; // single-row → no marquee
    // Wrap originals in a track, then clone for the loop
    const track = document.createElement('div');
    track.className = 'cab-marquee__track';
    cards.forEach(c => track.appendChild(c));
    cards.forEach(c => {
      const clone = c.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    grid.innerHTML = '';
    grid.appendChild(track);
    grid.classList.add('cab-grid--marquee');
    grid.dataset.marqueeReady = '1';
  }

  document.querySelectorAll('.cab-drawer .cab-grid').forEach((grid) => {
    // Skip the honors grid — those aren't certificates, they're stat cards
    if (grid.classList.contains('cab-grid--honors')) return;
    setupCredMarquee(grid);
  });

  /* ---------- Services tab switcher + auto-rotate (15s loop) + per-service GIF ---------- */
  const svcBtns = document.querySelectorAll('.svc-nav__btn');
  const svcGif  = document.getElementById('svcGif');
  const SVC_DURATION = 15000;

  if (svcBtns.length) {
    const svcKeys = Array.from(svcBtns).map(b => b.dataset.svc);
    let svcIndex = 0;
    let svcTimer;

    function activateSvc(index, manual) {
      svcIndex = (index + svcKeys.length) % svcKeys.length;
      const key = svcKeys[svcIndex];

      // Swap active classes
      document.querySelectorAll('.svc-nav__btn, .svc-desc')
        .forEach(el => el.classList.remove('active'));
      document.querySelectorAll(`[data-svc="${key}"]`)
        .forEach(el => el.classList.add('active'));

      // Force progress bar restart: remove active briefly so animation resets
      svcBtns.forEach(btn => {
        const bar = btn.querySelector('.svc-nav__progress');
        if (bar) { bar.style.animation = 'none'; bar.offsetHeight; bar.style.animation = ''; }
      });

      // Swap GIF with brief fade
      if (svcGif) {
        const gifNum = svcIndex + 1;
        svcGif.classList.add('is-swapping');
        setTimeout(() => {
          svcGif.src = `assets/img/services-section/${gifNum}.gif`;
          svcGif.classList.remove('is-swapping');
        }, 150);
      }

      if (manual) startSvcTimer();
    }

    function startSvcTimer() {
      clearInterval(svcTimer);
      svcTimer = setInterval(() => activateSvc(svcIndex + 1), SVC_DURATION);
    }

    svcBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => activateSvc(i, true));
    });

    activateSvc(0);
    startSvcTimer();
  }

  /* ---------- Page-ready fade-in ---------- */
  // Body starts at opacity 0 from CSS; flip on next frame for a soft fade.
  requestAnimationFrame(() => {
    document.body.classList.add('page-ready');
  });

})();
