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
    else if (direction === "next")
      next = (activeIndex + 1) % displaySrcs.length;
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
        computeBaseSize(lbLoader.naturalWidth, lbLoader.naturalHeight);
        resetZoom();
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
    computeBaseSize(this.naturalWidth, this.naturalHeight);
    resetZoom();
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.dispatchEvent(new CustomEvent("overlay:change"));
  });

  // ── Lightbox close ──
  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    resetZoom();
    activePointers = {};
    lightboxImg.src = displaySrcs[activeIndex] || lightboxImg.src;
    document.dispatchEvent(new CustomEvent("overlay:change"));
  }

  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxScrollArea.addEventListener("click", function (e) {
    if (e.target === lightboxScrollArea) closeLightbox();
  });

  // ── Continuous zoom + pan (deep zoom) ──
  // The image never changes its CSS layout box, everything from a tiny
  // wheel nudge to a full pinch is a translate3d + scale transform, so
  // there is zero layout work at any point during a zoom or a pan.
  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  var MIN_SCALE = 1;
  var MAX_SCALE = 3.5;
  var ZOOM_TIER_THRESHOLD = 1.15; // scale at which we upgrade to the full-res zoom tier

  var scale = 1;
  var panX = 0,
    panY = 0;
  var baseWidth = 0,
    baseHeight = 0; // the image's "fit to screen" size at scale 1
  var usingZoomTier = false;

  var isDragging = false,
    wasDragged = false;
  var dragStartX, dragStartY, dragBaseX, dragBaseY;

  var activePointers = {};
  var pinchStartDist = 0,
    pinchStartScale = 1;

  var pendingFrame = null,
    pendingScale = 1,
    pendingPanX = 0,
    pendingPanY = 0;

  // Figures out the image's rendered "fit" box from its natural pixel size,
  // without touching the DOM, so it stays correct no matter what transform
  // is currently applied.
  function computeBaseSize(naturalW, naturalH) {
    naturalW = naturalW || 1;
    naturalH = naturalH || 1;
    var maxW = window.innerWidth * 0.9;
    var maxH = window.innerHeight * 0.9;
    if (naturalW / naturalH > maxW / maxH) {
      baseWidth = maxW;
      baseHeight = maxW * (naturalH / naturalW);
    } else {
      baseHeight = maxH;
      baseWidth = maxH * (naturalW / naturalH);
    }
  }

  function clampPan(px, py, s) {
    var vw = window.innerWidth,
      vh = window.innerHeight;
    var rw = baseWidth * s,
      rh = baseHeight * s;
    var maxX = Math.max(0, (rw - vw) / 2);
    var maxY = Math.max(0, (rh - vh) / 2);
    return { x: clamp(px, -maxX, maxX), y: clamp(py, -maxY, maxY) };
  }

  function applyTransform() {
    var c = clampPan(pendingPanX, pendingPanY, pendingScale);
    scale = pendingScale;
    panX = c.x;
    panY = c.y;
    lightboxImg.style.transform =
      "translate(" + panX + "px, " + panY + "px) scale(" + scale + ")";
    lightboxImg.classList.toggle("is-zoomed", scale > 1.01);
    pendingFrame = null;

    // Upgrade to the full-res zoom tier once meaningfully zoomed in, and
    // just keep it loaded rather than swapping back and forth as scale wobbles.
    if (!usingZoomTier && scale >= ZOOM_TIER_THRESHOLD) {
      usingZoomTier = true;
      var hiRes = new Image();
      hiRes.onload = hiRes.onerror = function () {
        lightboxImg.src = zoomSrcs[activeIndex];
      };
      hiRes.src = zoomSrcs[activeIndex];
    }
  }

  function scheduleTransform(newScale, newPanX, newPanY) {
    pendingScale = newScale;
    pendingPanX = newPanX;
    pendingPanY = newPanY;
    if (pendingFrame === null)
      pendingFrame = requestAnimationFrame(applyTransform);
  }

  function resetZoom() {
    scale = 1;
    panX = 0;
    panY = 0;
    pendingScale = 1;
    pendingPanX = 0;
    pendingPanY = 0;
    usingZoomTier = false;
    lightboxImg.style.transform = "";
    lightboxImg.style.willChange = "auto";
    lightboxImg.classList.remove("is-zoomed");
  }

  // Zooms to newScale while keeping the point under (cx, cy) fixed on screen
  function zoomAt(cx, cy, newScale) {
    newScale = clamp(newScale, MIN_SCALE, MAX_SCALE);
    var cx0 = window.innerWidth / 2,
      cy0 = window.innerHeight / 2;
    var ox = (cx - cx0 - panX) / scale;
    var oy = (cy - cy0 - panY) / scale;
    scheduleTransform(
      newScale,
      cx - cx0 - ox * newScale,
      cy - cy0 - oy * newScale,
    );
  }

  function pointerList() {
    return Object.keys(activePointers).map(function (id) {
      return activePointers[id];
    });
  }
  function pointDistance(a, b) {
    var dx = a.x - b.x,
      dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function pointMidpoint(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }

  // ── Wheel: zoom in/out anchored on the cursor ──
  lightboxImg.addEventListener(
    "wheel",
    function (e) {
      if (!lightbox.classList.contains("active")) return;
      e.preventDefault();
      e.stopPropagation();

      lightboxImg.style.willChange = "transform";
      clearTimeout(lightboxImg.wheelTimeout);
      lightboxImg.wheelTimeout = setTimeout(function () {
        lightboxImg.style.willChange = "auto";
      }, 150);

      var factor = Math.exp(-e.deltaY * 0.0018);
      zoomAt(e.clientX, e.clientY, scale * factor);
    },
    { passive: false },
  );

  // ── Pointer: single finger/mouse pans, two fingers pinch-zoom ──
  lightboxImg.addEventListener("pointerdown", function (e) {
    this.style.willChange = "transform";
    this.setPointerCapture(e.pointerId);
    activePointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var pts = pointerList();

    if (pts.length === 1) {
      isDragging = true;
      wasDragged = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragBaseX = panX;
      dragBaseY = panY;
    } else if (pts.length === 2) {
      isDragging = false;
      pinchStartDist = pointDistance(pts[0], pts[1]);
      pinchStartScale = scale;
    }
  });

  function endPointer(e) {
    delete activePointers[e.pointerId];
    var pts = pointerList();
    if (pts.length === 1) {
      // Dropped from two fingers to one mid-gesture, resume panning cleanly
      isDragging = true;
      wasDragged = true;
      dragStartX = pts[0].x;
      dragStartY = pts[0].y;
      dragBaseX = panX;
      dragBaseY = panY;
    } else {
      isDragging = false;
    }

    if (pts.length === 0) {
      lightboxImg.style.willChange = "auto";
    }
  }
  lightboxImg.addEventListener("pointerup", endPointer);
  lightboxImg.addEventListener("pointercancel", endPointer);

  lightboxImg.addEventListener("pointermove", function (e) {
    if (!activePointers[e.pointerId]) return;
    activePointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var pts = pointerList();

    if (pts.length === 2) {
      e.preventDefault();
      var dist = pointDistance(pts[0], pts[1]);
      var mid = pointMidpoint(pts[0], pts[1]);
      wasDragged = true;
      zoomAt(mid.x, mid.y, pinchStartScale * (dist / pinchStartDist));
      return;
    }

    if (!isDragging) return;
    e.preventDefault();
    var dx = e.clientX - dragStartX;
    var dy = e.clientY - dragStartY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) wasDragged = true;
    scheduleTransform(scale, dragBaseX + dx, dragBaseY + dy);
  });

  // ── Click: quick toggle between fit and a preset zoom level ──
  lightboxImg.addEventListener("click", function (e) {
    e.stopPropagation();
    if (wasDragged) {
      wasDragged = false;
      return;
    }
    if (scale > 1.05) {
      resetZoom();
    } else {
      zoomAt(e.clientX, e.clientY, 2.5);
    }
  });

  // ── Keyboard: Esc / arrows ──
  document.addEventListener("keydown", function (e) {
    var lbActive = lightbox.classList.contains("active");
    var modalActive = document
      .getElementById("photoModal")
      .classList.contains("open");
    var deepZoom = scale > 1.01;

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

  // ── Mouse wheel navigation (only outside the image itself, see above) ──
  // Only attached while a modal or the lightbox is actually open, so the rest
  // of the page never pays the cost of a non-passive wheel listener on window.
  var wheelAttached = false;

  function handleWheel(e) {
    var lbActive = lightbox.classList.contains("active");
    var modalActive = document
      .getElementById("photoModal")
      .classList.contains("open");
    var deepZoom = scale > 1.01;
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
