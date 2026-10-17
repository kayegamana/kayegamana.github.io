const PORTFOLIO_CONFIG = {
  web3formsAccessKey: "16ad77fa-6c86-4d85-8b21-63ec4400d707",
  contactEmail: "kayecgamana@gmail.com"
};

function loadImage(img) {
  if (!img || !img.dataset.src) return;
  img.src = img.dataset.src;
  img.removeAttribute("data-src");
}

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggler = document.getElementById("nav-toggler");
  const menu = document.getElementById("nav-menu");

  if (!navbar || !toggler || !menu) return;

  const links = navbar.querySelectorAll(".navbar__link");
  const sections = document.querySelectorAll("main section[id]");
  const desktopQuery = window.matchMedia("(min-width: 992px)");

  const HIDE_AFTER = 80;
  const MIN_SCROLL_STEP = 5;
  let lastScrollY = window.scrollY;

  function isMenuOpen() {
    return menu.classList.contains("is-open");
  }

  function openMenu() {
    menu.classList.add("is-open");
    toggler.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.classList.remove("is-open");
    toggler.setAttribute("aria-expanded", "false");
  }

  toggler.addEventListener("click", function () {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("click", function (event) {
    if (isMenuOpen() && !navbar.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
      toggler.focus();
    }
  });

  desktopQuery.addEventListener("change", function (event) {
    if (event.matches) closeMenu();
  });

  function handleScroll() {
    const currentY = window.scrollY;

    if (Math.abs(currentY - lastScrollY) < MIN_SCROLL_STEP) return;

    const scrollingDown = currentY > lastScrollY;
    const shouldHide = scrollingDown && currentY > HIDE_AFTER && !isMenuOpen();

    navbar.classList.toggle("navbar--hidden", shouldHide);
    lastScrollY = currentY;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  navbar.addEventListener("focusin", function () {
    navbar.classList.remove("navbar--hidden");
  });

  function setActiveLink(sectionId) {
    links.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + sectionId;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateActiveSection() {
    const probeLine = window.innerHeight * 0.35;
    let currentId = "";

    sections.forEach(function (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= probeLine && rect.bottom > probeLine) {
        currentId = section.id;
      }
    });

    setActiveLink(currentId);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(updateActiveSection, {
      rootMargin: "-35% 0px -64% 0px"
    });
    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else {
    window.addEventListener("scroll", updateActiveSection, { passive: true });
  }

  updateActiveSection();
}

function initBackToTop() {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  const SHOW_AFTER = 400;

  function updateVisibility() {
    button.classList.toggle("is-visible", window.scrollY > SHOW_AFTER);
  }

  window.addEventListener("scroll", updateVisibility, { passive: true });

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  updateVisibility();
}

function initCopyEmail() {
  const button = document.querySelector("[data-copy-email]");
  if (!button) return;

  const email = button.dataset.copyEmail;
  let resetTimer;

  function copyWithFallback(text) {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    document.body.removeChild(helper);
    return copied;
  }

  async function copyEmail() {
    let copied = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch (error) {
        copied = copyWithFallback(email);
      }
    } else {
      copied = copyWithFallback(email);
    }

    if (!copied) return;

    button.classList.add("is-copied");
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () {
      button.classList.remove("is-copied");
    }, 2000);
  }

  button.addEventListener("click", copyEmail);
}

function initInternshipGallery() {
  const gallery = document.getElementById("internship-gallery");
  if (!gallery) return;

  const photos = gallery.querySelectorAll(".gallery__photo");
  const captions = gallery.querySelectorAll(".gallery__caption");
  const thumbs = gallery.querySelectorAll(".gallery__thumb");
  const counter = gallery.querySelector(".gallery__counter");
  const dotsContainer = gallery.querySelector(".gallery__dots");
  const prevButton = gallery.querySelector("[data-gallery-prev]");
  const nextButton = gallery.querySelector("[data-gallery-next]");
  const layout = gallery.querySelector(".gallery__layout");

  const total = photos.length;
  const SWIPE_DISTANCE = 50;
  let currentIndex = 0;
  let touchStartX = 0;

  const dots = [];
  photos.forEach(function () {
    const dot = document.createElement("span");
    dot.className = "gallery__dot";
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function pad(number) {
    return String(number).padStart(2, "0");
  }

  function showSlide(index) {
    currentIndex = (index + total) % total;

    photos.forEach(function (photo, i) {
      photo.classList.toggle("is-active", i === currentIndex);
    });

    captions.forEach(function (caption, i) {
      const isActive = i === currentIndex;
      caption.classList.toggle("is-active", isActive);
      caption.setAttribute("aria-hidden", String(!isActive));
    });

    thumbs.forEach(function (thumb, i) {
      const isActive = i === currentIndex;
      thumb.classList.toggle("is-active", isActive);
      if (isActive) {
        thumb.setAttribute("aria-current", "true");
      } else {
        thumb.removeAttribute("aria-current");
      }
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === currentIndex);
    });

    counter.textContent = pad(currentIndex + 1) + " / " + pad(total);
  }

  prevButton.addEventListener("click", function () {
    showSlide(currentIndex - 1);
  });

  nextButton.addEventListener("click", function () {
    showSlide(currentIndex + 1);
  });

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function () {
      showSlide(i);
    });
  });

  gallery.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
    if (event.key === "ArrowRight") showSlide(currentIndex + 1);
  });

  layout.addEventListener("touchstart", function (event) {
    touchStartX = event.touches[0].clientX;
  }, { passive: true });

  layout.addEventListener("touchend", function (event) {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) < SWIPE_DISTANCE) return;

    showSlide(distance < 0 ? currentIndex + 1 : currentIndex - 1);
  }, { passive: true });

  showSlide(0);
}

function initProjectCarousels() {
  const carousels = document.querySelectorAll("[data-carousel]");
  const SWIPE_DISTANCE = 50;

  carousels.forEach(function (carousel) {
    const slides = carousel.querySelectorAll(".carousel__slide");
    const dotsContainer = carousel.querySelector(".carousel__dots");
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const caption = carousel.querySelector("[data-carousel-caption]");

    const total = slides.length;
    let currentIndex = 0;
    let touchStartX = 0;

    function showCaption(index) {
      if (caption) caption.textContent = slides[index].dataset.caption || "";
    }

    if (total < 2) {
      carousel.classList.add("is-single");
      showCaption(0);
      return;
    }

    carousel.tabIndex = 0;

    const dots = [];
    slides.forEach(function (slide, i) {
      const dot = document.createElement("button");
      dot.className = "carousel__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Show picture " + (i + 1) + " of " + total);
      dot.addEventListener("click", function () {
        showSlide(i);
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    function showSlide(index, preload = true) {
      currentIndex = (index + total) % total;

      if (preload) {
        loadImage(slides[currentIndex]);
        loadImage(slides[(currentIndex + 1) % total]);
      }

      slides.forEach(function (slide, i) {
        const isActive = i === currentIndex;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });

      dots.forEach(function (dot, i) {
        const isActive = i === currentIndex;
        dot.classList.toggle("is-active", isActive);
        if (isActive) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });

      showCaption(currentIndex);
    }

    prevButton.addEventListener("click", function () {
      showSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
      showSlide(currentIndex + 1);
    });

    carousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
      if (event.key === "ArrowRight") showSlide(currentIndex + 1);
    });

    carousel.addEventListener("touchstart", function (event) {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", function (event) {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) < SWIPE_DISTANCE) return;

      showSlide(distance < 0 ? currentIndex + 1 : currentIndex - 1);
    }, { passive: true });

    showSlide(0, false);
  });
}

function initCaseStudies() {
  document.querySelectorAll("[data-case-study]").forEach(function (opener) {
    const dialog = document.getElementById(opener.dataset.caseStudy);
    if (!dialog || typeof dialog.showModal !== "function") return;

    const scrollArea = dialog.querySelector(".case-study__scroll");
    const closeButton = dialog.querySelector("[data-modal-close]");

    opener.addEventListener("click", function () {
      dialog.showModal();

      loadImage(dialog.querySelectorAll(".carousel__slide")[1]);

      scrollArea.scrollTop = 0;
    });

    closeButton.addEventListener("click", function () {
      dialog.close();
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  });
}

function openLightbox(picture) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  if (!lightbox || !lightboxImage || !picture) return;

  lightboxImage.src = picture.currentSrc || picture.src;
  lightboxImage.alt = picture.alt;
  lightbox.showModal();
}

function getZoomPicture(zoomable) {
  if (zoomable.matches("img")) return zoomable;
  return zoomable.querySelector(".is-active") || zoomable.querySelector("img");
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.getElementById("lightbox-close");

  if (!lightbox || !lightboxImage || typeof lightbox.showModal !== "function") return;

  lightbox.addEventListener("click", function () {
    lightbox.close();
  });

  lightboxClose.addEventListener("click", function () {
    lightbox.close();
  });

  document.addEventListener("click", function (event) {
    const zoomable = event.target.closest("[data-zoom]");
    if (zoomable) openLightbox(getZoomPicture(zoomable));
  });

  document.querySelectorAll("img[data-zoom]").forEach(function (picture) {
    picture.tabIndex = 0;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") return;

    const target = event.target;
    let zoomable = null;

    if (target.matches("img[data-zoom]")) {
      zoomable = target;
    } else if (target.matches(".carousel, .gallery")) {
      zoomable = target.querySelector("[data-zoom]");
    }

    if (!zoomable) return;

    event.preventDefault();
    openLightbox(getZoomPicture(zoomable));
  });
}

function initHoverImages() {
  if (!window.matchMedia("(hover: hover)").matches) return;

  const grids = document.querySelectorAll(".course-grid");

  if (!("IntersectionObserver" in window)) {
    grids.forEach(function (grid) {
      grid.querySelectorAll("img[data-src]").forEach(loadImage);
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      entry.target.querySelectorAll("img[data-src]").forEach(loadImage);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "200px 0px" });

  grids.forEach(function (grid) {
    observer.observe(grid);
  });
}

function initCertificates() {
  const grid = document.getElementById("cert-grid");
  const moreButton = document.getElementById("cert-more");

  if (!grid) return;

  const cardCount = grid.children.length;
  let rowsShown = 0;

  function getColumns() {
    return getComputedStyle(grid).gridTemplateColumns.split(" ").length;
  }

  function getStartRows() {
    return getColumns() === 3 ? 2 : 3;
  }

  function getRowsPerClick() {
    return getColumns() <= 2 ? 3 : 2;
  }

  function showCards() {
    const visibleCount = rowsShown * getColumns();

    Array.from(grid.children).forEach(function (card, index) {
      card.hidden = index >= visibleCount;
    });

    if (moreButton) {
      const allShown = visibleCount >= cardCount;

      moreButton.textContent = allShown ? "Show less" : "Show more";
      moreButton.setAttribute("aria-expanded", String(allShown));
    }
  }

  if (moreButton) {
    moreButton.addEventListener("click", function () {
      const allShown = rowsShown * getColumns() >= cardCount;

      if (allShown) {
        rowsShown = getStartRows();
        showCards();
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        rowsShown += getRowsPerClick();
        showCards();
      }
    });
  }

  window.addEventListener("resize", showCards);

  rowsShown = getStartRows();
  showCards();

  const sortButtons = document.querySelectorAll("[data-sort]");

  const defaultOrder = Array.from(grid.children);

  function sortCards(mode) {
    const cards = defaultOrder.slice();

    if (mode === "name") {
      cards.sort(function (a, b) {
        const titleA = a.querySelector(".cert__title").textContent;
        const titleB = b.querySelector(".cert__title").textContent;
        return titleA.localeCompare(titleB, "en", { sensitivity: "base" });
      });
    }

    if (mode === "date") {
      cards.sort(function (a, b) {
        const dateA = a.dataset.date || "";
        const dateB = b.dataset.date || "";
        if (dateA === dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
        return dateB.localeCompare(dateA);
      });
    }

    cards.forEach(function (card) {
      grid.appendChild(card);
    });

    showCards();
  }

  sortButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      sortButtons.forEach(function (other) {
        const isThis = other === button;
        other.classList.toggle("is-active", isThis);
        other.setAttribute("aria-pressed", String(isThis));
      });

      rowsShown = getStartRows();
      sortCards(button.dataset.sort);
    });
  });

  grid.addEventListener("click", function (event) {
    const card = event.target.closest(".cert");
    if (!card) return;

    openLightbox(card.querySelector(".cert__image"));
  });
}

function initContactModal() {
  const modal = document.getElementById("contact-modal");
  if (!modal || typeof modal.showModal !== "function") return;

  const closeButton = modal.querySelector("[data-modal-close]");
  const form = modal.querySelector("[data-contact-form]");

  document.querySelectorAll("[data-open-contact]").forEach(function (opener) {
    opener.addEventListener("click", function (event) {
      event.preventDefault();

      if (!modal.open) {
        form.dispatchEvent(new CustomEvent("contact:mode", {
          detail: opener.dataset.contactMode || "message"
        }));
        modal.showModal();
      }
    });
  });

  closeButton.addEventListener("click", function () {
    modal.close();
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) modal.close();
  });
}

function setupContactForm(form) {
  const config = PORTFOLIO_CONFIG;
  const title = form.querySelector("[data-form-title]");
  const status = form.querySelector("[data-form-status]");
  const submitButton = form.querySelector(".form__submit");
  const submitLabel = form.querySelector(".form__submit-label");
  const nameInput = form.elements.namedItem("name");
  const emailInput = form.elements.namedItem("email");
  const subjectInput = form.elements.namedItem("topic");
  const messageInput = form.elements.namedItem("message");
  const subjectLabel = form.querySelector('[data-label="topic"]');
  const messageLabel = form.querySelector('[data-label="message"]');
  const resumeOption = form.querySelector("[data-resume-option]");
  const resumeInput = form.elements.namedItem("request_resume");

  const modal = form.closest("dialog");
  let closeTimer;
  let mode = "message";

  const FORM_TEXT = {
    message: {
      title: "Send a message",
      submit: "Send message",
      subjectLabel: subjectLabel ? subjectLabel.textContent : "",
      messageLabel: messageLabel ? messageLabel.textContent : "",
      name: nameInput.placeholder,
      email: emailInput.placeholder,
      subject: subjectInput.placeholder,
      message: messageInput.placeholder
    },
    testimonial: {
      title: "Leave a testimonial",
      submit: "Send testimonial",
      subjectLabel: "Role or company",
      messageLabel: "Testimonial",
      name: "Your full name",
      email: "you@example.com",
      subject: "Your job title and company",
      message: "Share your experience working with me."
    }
  };

  function setStatus(text, type) {
    status.textContent = text;
    status.classList.toggle("is-success", type === "success");
    status.classList.toggle("is-error", type === "error");
  }

  function setFormMode(newMode) {
    const text = FORM_TEXT[newMode];
    const isTestimonial = newMode === "testimonial";

    mode = newMode;
    title.textContent = text.title;
    submitLabel.textContent = text.submit;
    nameInput.placeholder = text.name;
    emailInput.placeholder = text.email;
    subjectInput.placeholder = text.subject;
    messageInput.placeholder = text.message;

    if (subjectLabel) subjectLabel.textContent = text.subjectLabel;
    if (messageLabel) messageLabel.textContent = text.messageLabel;

    if (resumeOption) resumeOption.hidden = isTestimonial;
    if (resumeInput) {
      resumeInput.disabled = isTestimonial;
      if (isTestimonial) resumeInput.checked = false;
    }
  }

  function setSending(isSending) {
    submitButton.disabled = isSending;
    submitLabel.textContent = isSending ? "Sending…" : FORM_TEXT[mode].submit;
  }

  form.addEventListener("contact:mode", function (event) {
    if (event.detail !== mode) form.reset();
    setStatus("");
    setFormMode(event.detail);
  });

  function closeModalSoon(delay) {
    if (!modal) return;

    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      if (modal.open) modal.close();
    }, delay);
  }

  if (modal) {
    modal.addEventListener("close", function () {
      clearTimeout(closeTimer);
      setStatus("");
    });
  }

  function openEmailApp(subject, formData, wantsResume) {
    const body =
      "Name: " + formData.get("name") + "\n" +
      "Email: " + formData.get("email") + "\n" +
      (mode === "testimonial"
        ? "Role or company: " + formData.get("topic") + "\n\n"
        : "Resume requested: " + (wantsResume ? "YES" : "no") + "\n\n") +
      formData.get("message");

    setStatus("Opening your mail app…");
    window.location.href =
      "mailto:" + config.contactEmail +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    closeModalSoon(1500);
  }

  async function sendWithWeb3Forms(subject, formData) {
    formData.set("access_key", config.web3formsAccessKey);
    formData.set("subject", subject);
    formData.set("from_name", "Kaye's Portfolio");

    setSending(true);
    setStatus("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const result = await response.json().catch(function () {
        return {};
      });

      if (response.ok && result.success) {
        form.reset();
        setStatus(
          mode === "testimonial"
            ? "Thank you! I'll check with you before publishing."
            : "Sent. I'll reply within a day.",
          "success"
        );
        closeModalSoon(2500);
      } else {
        setStatus(result.message || "Something went wrong. Try emailing me directly.", "error");
      }
    } catch (error) {
      setStatus("Network hiccup. Try emailing me directly.", "error");
    }

    setSending(false);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const wantsResume = formData.get("request_resume") === "yes";
    let prefix = wantsResume ? "[RÉSUMÉ REQUEST] " : "New message from your portfolio — ";
    if (mode === "testimonial") prefix = "[TESTIMONIAL] ";
    const subject = prefix + formData.get("topic");

    if (config.web3formsAccessKey) {
      sendWithWeb3Forms(subject, formData);
    } else {
      openEmailApp(subject, formData, wantsResume);
    }
  });

}

function initContactForm() {
  document.querySelectorAll("[data-contact-form]").forEach(setupContactForm);
}

function cleanUpReveal(event) {
  const item = event.currentTarget;
  if (event.target !== item) return;

  item.classList.remove("reveal", "is-visible");
  item.style.removeProperty("--reveal-delay");
  item.removeEventListener("animationend", cleanUpReveal);
}

function initScrollReveal() {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const REVEAL_SELECTOR = [
    ".section-label", ".section-title", ".subsection-title", ".section-intro",
    ".about", ".school", ".award--framed",
    ".internship__company", ".internship__lead", ".overview",
    ".internship__aside .info-card", ".system-card",
    ".gallery__layout", ".gallery__thumbs",
    ".project", ".course-group-title", ".course-card",
    ".service", ".stack-collection", ".stack-column", ".stack-more",
    ".cert-sort", ".cert",
    ".testimonial__quote", ".testimonial__side",
    ".contact__info", ".contact > .form"
  ].join(", ");

  const STAGGER_MS = 70;
  const MAX_STAGGERED = 3;

  const items = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
  const tops = items.map(function (item) {
    return item.getBoundingClientRect().top;
  });

  function showItems(entries) {
    let order = 0;

    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const item = entry.target;
      item.style.setProperty("--reveal-delay", Math.min(order, MAX_STAGGERED) * STAGGER_MS + "ms");
      item.classList.add("is-visible");
      item.addEventListener("animationend", cleanUpReveal);

      observer.unobserve(item);
      order++;
    });
  }

  const observer = new IntersectionObserver(showItems, {
    rootMargin: "0px 0px -10% 0px"
  });

  items.forEach(function (item, index) {
    if (item.hidden || tops[index] > window.innerHeight) {
      item.classList.add("reveal");
      observer.observe(item);
    }
  });
}

initNavbar();
initBackToTop();
initCopyEmail();
initInternshipGallery();
initProjectCarousels();
initCaseStudies();
initLightbox();
initHoverImages();
initCertificates();
initContactModal();
initContactForm();
initScrollReveal();
