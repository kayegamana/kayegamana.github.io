/* ─────────────────────────────────────
MODALS LOGIC
──────────────────────────────────────── */
(function () {
  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
  }

  function closeModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  }

  // Photo Modal Triggers — dynamically populate gallery per project
  document.querySelectorAll(".photo-trigger").forEach(function (btn) {
    // --- PREFETCH LOGIC: Download first image instantly on hover ---
    btn.addEventListener(
      "mouseenter",
      function () {
        var folder = this.dataset.folder;
        var preloadImg = new Image();
        preloadImg.src =
          "assets/img/projects-documentation/" + folder + "/1.webp";
      },
      { once: true },
    );
    // ---------------------------------------------------------------

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var folder = btn.dataset.folder;
      var count = parseInt(btn.dataset.count) || 10;
      var basePath = "assets/img/projects-documentation/" + folder + "/";

      // Build image src list (Updated to pull .webp files)
      var srcs = [];
      for (var i = 1; i <= count; i++) {
        srcs.push(basePath + i + ".webp");
      }

      document.getElementById("modalProjectName").textContent =
        btn.dataset.project;

      // Init gallery with src list, then open modal
      initGallery(srcs);
      openModal("photoModal");
    });
  });

  // Contact Modal Trigger
  document.querySelectorAll(".openContactTrigger").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      openModal("contactModal");
    });
  });

  // Close Triggers
  document.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      closeModal(btn.dataset.close);
    });
  });
})();

/* ─────────────────────────────────────
TECH STACK TAB LOGIC
──────────────────────────────────────── */
(function () {
  var tabs = document.querySelectorAll(".tech-tab");
  var pages = document.querySelectorAll(".tech-page");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) {
        t.classList.remove("active");
      });
      pages.forEach(function (p) {
        p.classList.remove("active");
      });

      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    });
  });
})();

/* ─────────────────────────────────────
COPY EMAIL LOGIC
──────────────────────────────────────── */
(function () {
  var copyBtn = document.getElementById("copyEmailBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = "kayecgamana@gmail.com";
      navigator.clipboard.writeText(email).then(function () {
        copyBtn.classList.add("copied");
        var icon = copyBtn.querySelector("i");
        icon.classList.replace("bi-copy", "bi-check2");

        setTimeout(function () {
          copyBtn.classList.remove("copied");
          icon.classList.replace("bi-check2", "bi-copy");
        }, 2000);
      });
    });
  }
})();

/* ─────────────────────────────────────
GLOBAL SHORTCUT LOGIC
──────────────────────────────────────── */
(function () {
  document.addEventListener("keydown", function (e) {
    // Prevent triggering while typing in the contact form
    var targetTag = e.target.tagName.toLowerCase();
    if (
      targetTag === "input" ||
      targetTag === "textarea" ||
      targetTag === "select"
    )
      return;

    if (e.key.toLowerCase() === "m") {
      window.location.href = "index.html";
    }
  });
})();

/* ─────────────────────────────────────
TESTIMONIAL CAROUSEL LOGIC
──────────────────────────────────────── */
(function () {
  var slides = document.querySelectorAll(".t-slide");
  var dots = document.querySelectorAll(".t-dot");
  var currentIndex = 0;
  var interval;

  if (!slides.length) return;

  // Dynamically calculate font-size based on the exact character count
  // This ensures short quotes enlarge to fill the space, and long quotes shrink to fit without getting cut off.
  slides.forEach(function (slide) {
    var textEl = slide.querySelector(".quote-text");
    if (textEl) {
      var charCount = textEl.textContent.trim().length;

      // Dialed back bounds to find the sweet spot between filling space and retaining elegant padding
      if (charCount < 100) {
        textEl.style.fontSize = "clamp(1rem, 5.5cqi, 1.4rem)";
        textEl.style.lineHeight = "1.55";
      } else if (charCount <= 160) {
        textEl.style.fontSize = "clamp(0.9rem, 4.8cqi, 1.25rem)";
        textEl.style.lineHeight = "1.5";
      } else {
        textEl.style.fontSize = "clamp(0.75rem, 4.2cqi, 1rem)";
        textEl.style.lineHeight = "1.45";
      }
    }
  });

  function showSlide(index) {
    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });
    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  function nextSlide() {
    var nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 6000); // Transitions every 6 seconds
  }

  function resetAutoplay() {
    clearInterval(interval);
    startAutoplay();
  }

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var index = parseInt(this.getAttribute("data-index"));
      showSlide(index);
      resetAutoplay(); // Reset the timer so it doesn't instantly jump after clicking
    });
  });

  startAutoplay();
})();

/* ─────────────────────────────────────
GALLERY & ZOOM LOGIC
──────────────────────────────────────── */
(function () {
  var mainImage = document.getElementById("mainGalleryImage");
  var thumbContainer = document.getElementById("galleryThumbnails");
  var counter = document.getElementById("galleryCounter");
  var prevBtn = document.getElementById("galleryPrev");
  var nextBtn = document.getElementById("galleryNext");
  var lightbox = document.getElementById("imageLightbox");
  var lightboxImg = document.getElementById("lightboxImage");
  var lightboxCloseBtn = document.getElementById("lightboxCloseBtn");
  var lightboxScrollArea = document.getElementById("lightboxScrollArea");
  var maxVisible = 5;

  // ── Gallery state ──
  var srcs = []; // current project's image paths
  var activeIndex = 0;
  var wrappers = [];
  var navigating = false; // debounce rapid fire

  // ── Cache-safe image swap via opacity crossfade ──
  function setMainImage(src, instant) {
    if (instant) {
      mainImage.src = src;
      mainImage.style.opacity = "1";
      return;
    }
    mainImage.style.opacity = "0";
    // Use a hidden loader — works even when the image is already cached
    var loader = new Image();
    loader.onload = loader.onerror = function () {
      mainImage.src = src;
      // rAF ensures the browser has painted the opacity:0 frame first
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          mainImage.style.opacity = "1";
          navigating = false;
        });
      });
    };
    loader.src = src;
  }

  // ── Update thumbnail active state & counter ──
  function updateThumbs(index) {
    wrappers.forEach(function (w) {
      w.classList.remove("active");
    });
    if (index < maxVisible) {
      wrappers[index] && wrappers[index].classList.add("active");
    } else {
      wrappers[maxVisible - 1] &&
        wrappers[maxVisible - 1].classList.add("active");
    }
    counter.textContent = index + 1 + " / " + srcs.length;
    activeIndex = index;
  }

  // ── Navigate ──
  function navigate(direction, exact) {
    if (navigating) return;
    navigating = true;

    var next = activeIndex;
    if (direction === "exact") next = exact;
    else if (direction === "next") next = (activeIndex + 1) % srcs.length;
    else if (direction === "prev")
      next = (activeIndex - 1 + srcs.length) % srcs.length;

    if (next === activeIndex && direction !== "exact") {
      navigating = false;
      return;
    }

    updateThumbs(next);
    setMainImage(srcs[next], false);

    // Sync lightbox if open
    if (lightbox.classList.contains("active")) {
      lightboxImg.style.opacity = "0";
      var lbLoader = new Image();
      lbLoader.onload = lbLoader.onerror = function () {
        lightboxImg.src = srcs[next];
        lightboxImg.classList.remove("deep-zoom");
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            lightboxImg.style.opacity = "1";
          });
        });
      };
      lbLoader.src = srcs[next];
    }
  }

  // ── Build thumbnail strip ──
  function buildThumbs() {
    thumbContainer.innerHTML = "";
    wrappers = [];

    srcs.forEach(function (src, index) {
      var wrapper = document.createElement("div");
      wrapper.className = "thumb-wrapper";

      var img = document.createElement("img");
      img.src = src;
      img.className = "gallery-thumb";
      img.alt = "Thumbnail " + (index + 1);
      wrapper.appendChild(img);

      // +N overlay on last visible slot when there are more
      if (index === maxVisible - 1 && srcs.length > maxVisible) {
        var overlay = document.createElement("div");
        overlay.className = "thumb-overlay";
        overlay.textContent = "+" + (srcs.length - maxVisible);
        wrapper.appendChild(overlay);
      }

      if (index >= maxVisible) wrapper.style.display = "none";

      wrapper.addEventListener("click", function () {
        navigate("exact", index);
      });
      thumbContainer.appendChild(wrapper);
      wrappers.push(wrapper);
    });
  }

  // ── Public init — called by photo trigger with a fresh src array ──
  window.initGallery = function (newSrcs) {
    srcs = newSrcs;
    activeIndex = 0;
    navigating = false;

    buildThumbs();

    // Load first image: instant on first paint (modal not yet visible)
    mainImage.style.transition = "none";
    mainImage.style.opacity = "0";
    mainImage.src = "";

    var loader = new Image();
    loader.onload = loader.onerror = function () {
      mainImage.src = srcs[0];
      // Restore transition after first paint
      requestAnimationFrame(function () {
        mainImage.style.transition = "opacity 0.25s ease";
        requestAnimationFrame(function () {
          mainImage.style.opacity = "1";
        });
      });
    };
    loader.src = srcs[0];

    updateThumbs(0);
  };

  // ── Arrow buttons ──
  prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    navigate("prev");
  });
  nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    navigate("next");
  });

  // ── Lightbox open on main image click ──
  mainImage.addEventListener("click", function () {
    if (!this.src || this.style.opacity === "0") return;
    lightboxImg.src = this.src;
    lightboxImg.style.opacity = "1";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  });

  // ── Lightbox close ──
  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.classList.remove("deep-zoom");
  }

  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxScrollArea.addEventListener("click", function (e) {
    if (e.target === lightboxScrollArea) closeLightbox();
  });

  // ── Lightbox drag-to-pan (deep zoom) ──
  var isDragging = false,
    wasDragged = false;
  var startX, startY, scrollLeft, scrollTop;

  lightboxImg.addEventListener("mousedown", function (e) {
    if (!this.classList.contains("deep-zoom")) return;
    isDragging = true;
    wasDragged = false;
    startX = e.pageX - lightboxScrollArea.offsetLeft;
    startY = e.pageY - lightboxScrollArea.offsetTop;
    scrollLeft = lightboxScrollArea.scrollLeft;
    scrollTop = lightboxScrollArea.scrollTop;
  });
  lightboxImg.addEventListener("mouseleave", function () {
    isDragging = false;
  });
  lightboxImg.addEventListener("mouseup", function () {
    isDragging = false;
  });
  lightboxImg.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var walkX = (e.pageX - lightboxScrollArea.offsetLeft - startX) * 1.5;
    var walkY = (e.pageY - lightboxScrollArea.offsetTop - startY) * 1.5;
    lightboxScrollArea.scrollLeft = scrollLeft - walkX;
    lightboxScrollArea.scrollTop = scrollTop - walkY;
    if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) wasDragged = true;
  });

  lightboxImg.addEventListener("click", function (e) {
    e.stopPropagation();
    if (wasDragged) {
      wasDragged = false;
      return;
    }
    var zoomingIn = !this.classList.contains("deep-zoom");
    this.classList.toggle("deep-zoom");
    if (zoomingIn) {
      var rect = this.getBoundingClientRect();
      var rx = (e.clientX - rect.left) / rect.width;
      var ry = (e.clientY - rect.top) / rect.height;
      setTimeout(function () {
        var nr = lightboxImg.getBoundingClientRect();
        lightboxScrollArea.scrollLeft = nr.width * rx - window.innerWidth / 2;
        lightboxScrollArea.scrollTop = nr.height * ry - window.innerHeight / 2;
      }, 10);
    }
  });

  // ── Keyboard: Esc / arrows ──
  document.addEventListener("keydown", function (e) {
    var lbActive = lightbox.classList.contains("active");
    var modalActive = document
      .getElementById("photoModal")
      .classList.contains("open");
    var deepZoom = lightboxImg.classList.contains("deep-zoom");

    if (e.key === "Escape") {
      if (lbActive) {
        closeLightbox();
        return;
      }
      document.querySelectorAll(".modal-overlay.open").forEach(function (m) {
        m.classList.remove("open");
        m.setAttribute("aria-hidden", "true");
        document.documentElement.style.overflow = "";
      });
    }
    if ((modalActive || lbActive) && !deepZoom) {
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    }
  });

  // ── Mouse wheel navigation ──
  window.addEventListener(
    "wheel",
    function (e) {
      var lbActive = lightbox.classList.contains("active");
      var modalActive = document
        .getElementById("photoModal")
        .classList.contains("open");
      var deepZoom = lightboxImg.classList.contains("deep-zoom");
      if ((modalActive || lbActive) && !deepZoom) {
        e.preventDefault();
        if (e.deltaY > 0) navigate("next");
        else navigate("prev");
      }
    },
    { passive: false },
  );
})();

/* ─────────────────────────────────────
PERFORMANCE LOGIC: PAUSE OFF-SCREEN ANIMATIONS
──────────────────────────────────────── */
(function () {
  var flagshipCard = document.querySelector(".card-flagship");
  if (!flagshipCard || !window.IntersectionObserver) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          flagshipCard.style.setProperty("--play-state", "running");
        } else {
          flagshipCard.style.setProperty("--play-state", "paused");
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(flagshipCard);
})();

/* ─────────────────────────────────────
CONTACT FORM AJAX SUBMISSION
──────────────────────────────────────── */
(function () {
  var form = document.getElementById("contactForm");
  var submitBtn = form ? form.querySelector(".cform-submit") : null;

  if (!form || !submitBtn) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Cache original layout elements
    var originalBtnContent = submitBtn.innerHTML;

    // Trigger explicit CSS loading state
    submitBtn.innerHTML =
      '<i class="bi bi-arrow-repeat spin-icon"></i> Sending...';
    submitBtn.disabled = true;

    // Marshall object graph into standard payload format
    var formData = new FormData(form);
    var object = Object.fromEntries(formData);
    var json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async function (response) {
        var jsonResponse = await response.json();

        if (response.status === 200) {
          // Commit Success Presentation State
          submitBtn.innerHTML =
            '<i class="bi bi-check-circle-fill"></i> Message Sent';
          submitBtn.classList.add("btn-success-state");
          form.reset();

          // Reset presentation components and hide layout context gracefully
          setTimeout(function () {
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
            submitBtn.classList.remove("btn-success-state");

            var modal = document.getElementById("contactModal");
            if (modal) {
              modal.classList.remove("open");
              modal.setAttribute("aria-hidden", "true");
              document.documentElement.style.overflow = "";
            }
          }, 2500);
        } else {
          console.error("Web3Forms Response Error: ", jsonResponse);
          submitBtn.innerHTML =
            '<i class="bi bi-exclamation-triangle-fill"></i> Error. Retry.';
          submitBtn.disabled = false;
        }
      })
      .catch(function (error) {
        console.error("Network Fetch Exception: ", error);
        submitBtn.innerHTML =
          '<i class="bi bi-exclamation-triangle-fill"></i> Network Error.';
        submitBtn.disabled = false;
      });
  });
})();
