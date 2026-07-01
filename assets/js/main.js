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
    document.dispatchEvent(new CustomEvent("overlay:change"));
  }

  function closeModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    document.dispatchEvent(new CustomEvent("overlay:change"));
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
          "assets/img/projects-documentation/" + folder + "/display/1.webp";
      },
      { once: true },
    );
    // ---------------------------------------------------------------

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var folder = btn.dataset.folder;
      var count = parseInt(btn.dataset.count) || 10;
      var basePath = "assets/img/projects-documentation/" + folder + "/";

      // Build three parallel src lists: thumb (strip), display (main view), zoom (deep zoom)
      var thumbSrcs = [];
      var displaySrcs = [];
      var zoomSrcs = [];
      for (var i = 1; i <= count; i++) {
        thumbSrcs.push(basePath + "thumb/" + i + ".webp");
        displaySrcs.push(basePath + "display/" + i + ".webp");
        zoomSrcs.push(basePath + "zoom/" + i + ".webp");
      }

      document.getElementById("modalProjectName").textContent =
        btn.dataset.project;

      // Init gallery with all three src lists, then open modal
      initGallery(thumbSrcs, displaySrcs, zoomSrcs);
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
  var thumbSrcs = []; // small thumbnail-strip images
  var displaySrcs = []; // main gallery view images
  var zoomSrcs = []; // full-res deep zoom images
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
    counter.textContent = index + 1 + " / " + displaySrcs.length;
    activeIndex = index;
  }

  // ── Navigate ──
  function navigate(direction, exact) {
    if (navigating) return;
    navigating = true;

    var next = activeIndex;
    if (direction === "exact") next = exact;
    else if (direction === "next") next = (activeIndex + 1) % displaySrcs.length;
    else if (direction === "prev")
      next = (activeIndex - 1 + displaySrcs.length) % displaySrcs.length;

    if (next === activeIndex && direction !== "exact") {
      navigating = false;
      return;
    }

    updateThumbs(next);
    setMainImage(displaySrcs[next], false);

    // Sync lightbox if open (always resets to display tier; deep zoom re-fetches zoom tier on next click)
    if (lightbox.classList.contains("active")) {
      lightboxImg.style.opacity = "0";
      var lbLoader = new Image();
      lbLoader.onload = lbLoader.onerror = function () {
        lightboxImg.src = displaySrcs[next];
        lightboxImg.classList.remove("deep-zoom");
        lightboxImg.style.transform = "";
        panX = 0;
        panY = 0;
        maxPanX = 0;
        maxPanY = 0;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            lightboxImg.style.opacity = "1";
          });
        });
      };
      lbLoader.src = displaySrcs[next];
    }
  }

  // ── Build thumbnail strip ──
  function buildThumbs() {
    thumbContainer.innerHTML = "";
    wrappers = [];

    thumbSrcs.forEach(function (src, index) {
      var wrapper = document.createElement("div");
      wrapper.className = "thumb-wrapper";

      var img = document.createElement("img");
      img.src = src;
      img.decoding = "async";
      if (index >= maxVisible) img.loading = "lazy";
      img.className = "gallery-thumb";
      img.alt = "Thumbnail " + (index + 1);
      wrapper.appendChild(img);

      // +N overlay on last visible slot when there are more
      if (index === maxVisible - 1 && thumbSrcs.length > maxVisible) {
        var overlay = document.createElement("div");
        overlay.className = "thumb-overlay";
        overlay.textContent = "+" + (thumbSrcs.length - maxVisible);
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

  // ── Public init — called by photo trigger with fresh thumb/display/zoom src arrays ──
  window.initGallery = function (newThumbSrcs, newDisplaySrcs, newZoomSrcs) {
    thumbSrcs = newThumbSrcs;
    displaySrcs = newDisplaySrcs;
    zoomSrcs = newZoomSrcs;
    activeIndex = 0;
    navigating = false;

    buildThumbs();

    // Load first image: instant on first paint (modal not yet visible)
    mainImage.style.transition = "none";
    mainImage.style.opacity = "0";
    mainImage.src = "";

    var loader = new Image();
    loader.onload = loader.onerror = function () {
      mainImage.src = displaySrcs[0];
      // Restore transition after first paint
      requestAnimationFrame(function () {
        mainImage.style.transition = "opacity 0.25s ease";
        requestAnimationFrame(function () {
          mainImage.style.opacity = "1";
        });
      });
    };
    loader.src = displaySrcs[0];

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
    document.dispatchEvent(new CustomEvent("overlay:change"));
  });

  // ── Lightbox close ──
  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.classList.remove("deep-zoom");
    lightboxImg.style.transform = "";
    lightboxImg.src = displaySrcs[activeIndex] || lightboxImg.src;
    panX = 0;
    panY = 0;
    maxPanX = 0;
    maxPanY = 0;
    document.dispatchEvent(new CustomEvent("overlay:change"));
  }

  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxScrollArea.addEventListener("click", function (e) {
    if (e.target === lightboxScrollArea) closeLightbox();
  });

  // ── Lightbox drag-to-pan (deep zoom) ──
  // Panning moves the image with transform: translate3d(), which the browser
  // can composite on the GPU. No scrollLeft/scrollTop writes, no layout, no
  // main-thread bottleneck, this is what makes the drag feel smooth.
  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  var isDragging = false,
    wasDragged = false;
  var startX, startY, baseX, baseY;
  var panX = 0,
    panY = 0;
  var maxPanX = 0,
    maxPanY = 0;
  var pendingPanFrame = null,
    pendingX = 0,
    pendingY = 0;

  function applyPan() {
    panX = pendingX;
    panY = pendingY;
    lightboxImg.style.transform = "translate3d(" + panX + "px, " + panY + "px, 0)";
    pendingPanFrame = null;
  }

  lightboxImg.addEventListener("pointerdown", function (e) {
    if (!this.classList.contains("deep-zoom")) return;
    isDragging = true;
    wasDragged = false;
    startX = e.clientX;
    startY = e.clientY;
    baseX = panX;
    baseY = panY;
    this.setPointerCapture(e.pointerId);
  });
  lightboxImg.addEventListener("pointerup", function () {
    isDragging = false;
  });
  lightboxImg.addEventListener("pointercancel", function () {
    isDragging = false;
  });
  lightboxImg.addEventListener("pointermove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var dx = e.clientX - startX;
    var dy = e.clientY - startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) wasDragged = true;

    pendingX = clamp(baseX + dx, -maxPanX, maxPanX);
    pendingY = clamp(baseY + dy, -maxPanY, maxPanY);

    // Batch the transform write to once per frame instead of once per pointermove
    if (pendingPanFrame === null) {
      pendingPanFrame = requestAnimationFrame(applyPan);
    }
  });

  lightboxImg.addEventListener("click", function (e) {
    e.stopPropagation();
    if (wasDragged) {
      wasDragged = false;
      return;
    }
    var img = this;
    var zoomingIn = !img.classList.contains("deep-zoom");

    if (zoomingIn) {
      var rect = img.getBoundingClientRect();
      var rx = (e.clientX - rect.left) / rect.width;
      var ry = (e.clientY - rect.top) / rect.height;

      // Preload the full-res zoom tier before swapping, so there's no blank flash
      var zoomLoader = new Image();
      zoomLoader.onload = zoomLoader.onerror = function () {
        img.src = zoomSrcs[activeIndex];
        img.classList.add("deep-zoom");
        requestAnimationFrame(function () {
          var nr = lightboxImg.getBoundingClientRect();
          maxPanX = Math.max(0, (nr.width - window.innerWidth) / 2);
          maxPanY = Math.max(0, (nr.height - window.innerHeight) / 2);
          // Center the exact point that was clicked
          pendingX = clamp(nr.width * (0.5 - rx), -maxPanX, maxPanX);
          pendingY = clamp(nr.height * (0.5 - ry), -maxPanY, maxPanY);
          applyPan();
        });
      };
      zoomLoader.src = zoomSrcs[activeIndex];
    } else {
      img.classList.remove("deep-zoom");
      img.style.transform = "";
      img.src = displaySrcs[activeIndex];
      panX = 0;
      panY = 0;
      maxPanX = 0;
      maxPanY = 0;
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
      document.dispatchEvent(new CustomEvent("overlay:change"));
    }
    if ((modalActive || lbActive) && !deepZoom) {
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === "ArrowLeft") navigate("prev");
    }
  });

  // ── Mouse wheel navigation ──
  // Only attached while a modal or the lightbox is actually open, so the rest
  // of the page never pays the cost of a non-passive wheel listener on window.
  var wheelAttached = false;

  function handleWheel(e) {
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
  }

  function syncWheelListener() {
    var lbActive = lightbox.classList.contains("active");
    var modalActive = document
      .getElementById("photoModal")
      .classList.contains("open");
    var shouldAttach = modalActive || lbActive;

    if (shouldAttach && !wheelAttached) {
      window.addEventListener("wheel", handleWheel, { passive: false });
      wheelAttached = true;
    } else if (!shouldAttach && wheelAttached) {
      window.removeEventListener("wheel", handleWheel);
      wheelAttached = false;
    }
  }

  document.addEventListener("overlay:change", syncWheelListener);
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
