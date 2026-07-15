/* ─────────────────────────────────────
MODALS LOGIC
──────────────────────────────────────── */
(function () {
  function anyModalOpen() {
    return !!document.querySelector(".modal-overlay.open");
  }

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    clearTimeout(modal._hideTimeout);

    // Simplified synchronous trigger avoids CPU thrashing on weak devices
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

    clearTimeout(modal._hideTimeout);
    modal._hideTimeout = setTimeout(function () {
      if (modal.contains(document.activeElement)) {
        document.activeElement.blur();
      }
      if (!anyModalOpen()) {
        document.documentElement.style.overflow = "";
        document.dispatchEvent(new CustomEvent("overlay:change"));
      }
    }, 100); // Wait for CSS transition to finish natively
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  // Photo Modal Triggers — dynamically populate gallery per project
  document.querySelectorAll(".photo-trigger").forEach(function (btn) {
    // --- PREFETCH LOGIC: Download first image instantly on hover/touch ---
    function prefetchFirstImage() {
      var folder = this.dataset.folder;
      var preloadImg = new Image();
      preloadImg.src =
        "assets/img/projects-documentation/" + folder + "/display/1.webp";
    }
    // Desktop gets a head start on hover. Phones have no hover event at all,
    // so without this they got zero benefit from the trick above; touchstart
    // fires ~100-300ms before "click", which is enough to give Android the
    // same instant-first-image feel that desktop already had.
    btn.addEventListener("mouseenter", prefetchFirstImage, { once: true });
    btn.addEventListener("touchstart", prefetchFirstImage, {
      once: true,
      passive: true,
    });
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
        var textSpan = copyBtn.querySelector("span");

        icon.classList.replace("bi-copy", "bi-check2");
        if (textSpan) textSpan.textContent = "Copied";

        setTimeout(function () {
          copyBtn.classList.remove("copied");
          icon.classList.replace("bi-check2", "bi-copy");
          if (textSpan) textSpan.textContent = "Copy";
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
    interval = setInterval(function () {
      // Hardware check: Only slide automatically if on desktop
      if (window.innerWidth >= 720) {
        nextSlide();
      }
    }, 6000);
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

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var index = parseInt(this.getAttribute("data-index"));
      showSlide(index);
      // resetAutoplay(); // Reset the timer so it doesn't instantly jump after clicking
    });
  });
  // startAutoplay();
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
  var photoModal = document.getElementById("photoModal");
  var maxVisible = 5;

  // ── Gallery state ──
  var thumbSrcs = []; // small thumbnail-strip images
  var displaySrcs = []; // main gallery view images
  var zoomSrcs = []; // full-res deep zoom images
  var activeIndex = 0;
  var wrappers = [];
  var navigating = false; // debounce rapid fire

  // Reused across every navigation instead of allocating a fresh Image()
  // object (and closure) per call. Rapid tapping through the gallery was
  // creating and discarding a new Image() on every single step, churn that
  // lines up with occasional GC pauses right during interaction.
  var mainLoader = new Image();
  var lightboxLoader = new Image();

  // ── Cache-safe image swap via opacity crossfade ──
  function setMainImage(src, instant) {
    if (instant) {
      mainImage.src = src;
      mainImage.style.opacity = "1";
      return;
    }
    mainImage.style.opacity = "0";
    mainLoader.onload = mainLoader.onerror = function () {
      mainImage.src = src;
      // Decode the image asynchronously off the main thread before animating
      mainImage
        .decode()
        .then(function () {
          requestAnimationFrame(function () {
            mainImage.style.opacity = "1";
            navigating = false;
          });
        })
        .catch(function () {
          requestAnimationFrame(function () {
            mainImage.style.opacity = "1";
            navigating = false;
          });
        });
    };
    mainLoader.src = src;
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
      lightboxLoader.onload = lightboxLoader.onerror = function () {
        lightboxImg.src = displaySrcs[next];
        computeBaseSize(
          lightboxLoader.naturalWidth,
          lightboxLoader.naturalHeight,
        );
        resetZoom();
        lightboxImg
          .decode()
          .then(function () {
            requestAnimationFrame(function () {
              lightboxImg.style.opacity = "1";
            });
          })
          .catch(function () {
            requestAnimationFrame(function () {
              lightboxImg.style.opacity = "1";
            });
          });
      };
      lightboxLoader.src = displaySrcs[next];
    }
  }

  // ── Event Delegation for Thumbnails ──
  thumbContainer.addEventListener("click", function (e) {
    var wrapper = e.target.closest(".thumb-wrapper");
    if (!wrapper) return;
    var index = parseInt(wrapper.getAttribute("data-index"), 10);
    if (!isNaN(index)) navigate("exact", index);
  });

  // ── Build thumbnail strip (Recycling Nodes) ──
  function buildThumbs() {
    var existingWrappers = thumbContainer.children;
    var numNeeded = thumbSrcs.length;

    // 1. Inflate pool if missing nodes
    while (existingWrappers.length < numNeeded) {
      var wrapper = document.createElement("div");
      wrapper.className = "thumb-wrapper";
      var img = document.createElement("img");
      img.className = "gallery-thumb";
      img.decoding = "async";
      wrapper.appendChild(img);
      thumbContainer.appendChild(wrapper);
    }

    wrappers = Array.from(existingWrappers);

    // 2. Recycle existing DOM nodes (Zero allocations, zero GC pauses)
    for (var i = 0; i < wrappers.length; i++) {
      var wrapper = wrappers[i];
      if (i < numNeeded) {
        wrapper.setAttribute("data-index", i);
        var img = wrapper.querySelector("img");

        // Only touch DOM property if changed to avoid invalidation
        if (img.src.indexOf(thumbSrcs[i]) === -1) img.src = thumbSrcs[i];

        img.alt = "Thumbnail " + (i + 1);
        if (i >= maxVisible) img.setAttribute("loading", "lazy");
        else img.removeAttribute("loading");

        var overlay = wrapper.querySelector(".thumb-overlay");
        if (i === maxVisible - 1 && numNeeded > maxVisible) {
          if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "thumb-overlay";
            wrapper.appendChild(overlay);
          }
          overlay.textContent = "+" + (numNeeded - maxVisible);
          overlay.style.display = "flex";
        } else if (overlay) {
          overlay.style.display = "none";
        }

        wrapper.style.display = i >= maxVisible ? "none" : "";
      } else {
        wrapper.style.display = "none";
        wrapper.removeAttribute("data-index");
      }
    }
  }

  // ── Public init — called by photo trigger with fresh thumb/display/zoom src arrays ──
  window.initGallery = function (newThumbSrcs, newDisplaySrcs, newZoomSrcs) {
    thumbSrcs = newThumbSrcs;
    displaySrcs = newDisplaySrcs;
    zoomSrcs = newZoomSrcs;
    activeIndex = 0;
    navigating = false;

    // Instantly update text and blank out old thumbnails to prevent ghosting
    counter.textContent = "1 / " + displaySrcs.length;
    wrappers.forEach(function (w) {
      w.style.display = "none";
    });

    // Load first image: instant on first paint (modal not yet visible)
    mainImage.style.transition = "none";
    mainImage.style.opacity = "0";
    mainImage.src = "";

    mainLoader.onload = mainLoader.onerror = function () {
      mainImage.src = displaySrcs[0];
      mainImage
        .decode()
        .then(function () {
          requestAnimationFrame(function () {
            mainImage.style.transition = "opacity 0.25s ease";
            requestAnimationFrame(function () {
              mainImage.style.opacity = "1";
            });
          });
        })
        .catch(function () {
          requestAnimationFrame(function () {
            mainImage.style.transition = "opacity 0.25s ease";
            requestAnimationFrame(function () {
              mainImage.style.opacity = "1";
            });
          });
        });
    };
    mainLoader.src = displaySrcs[0];

    // Defer thumbnail DOM writes just enough to clear the 80ms opacity fade.
    clearTimeout(window._thumbRenderTimeout);
    window._thumbRenderTimeout = setTimeout(function () {
      buildThumbs();
      updateThumbs(0);
    }, 80);
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
    clearTimeout(lightbox._hideTimeout);
    lightboxImg.src = this.src;
    lightboxImg.style.opacity = "1";
    computeBaseSize(this.naturalWidth, this.naturalHeight);
    resetZoom();
    lightbox.style.display = "flex";
    lightbox.setAttribute("aria-hidden", "false");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        lightbox.classList.add("active");
      });
    });
    document.dispatchEvent(new CustomEvent("overlay:change"));
  });

  // ── Lightbox close ──
  function closeLightbox() {
    if (lightbox.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    resetZoom();
    activePointers = {};
    lightboxImg.src = displaySrcs[activeIndex] || lightboxImg.src;
    document.dispatchEvent(new CustomEvent("overlay:change"));

    clearTimeout(lightbox._hideTimeout);
    // Element hides automatically via CSS visibility transition delay
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
    var modalActive = photoModal.classList.contains("open");
    var deepZoom = scale > 1.01;

    if (e.key === "Escape") {
      if (lbActive) {
        closeLightbox();
        return;
      }
      document.querySelectorAll(".modal-overlay.open").forEach(function (m) {
        window.closeModal(m.id);
      });
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
    var modalActive = photoModal.classList.contains("open");
    var deepZoom = scale > 1.01;
    if ((modalActive || lbActive) && !deepZoom) {
      e.preventDefault();
      if (e.deltaY > 0) navigate("next");
      else navigate("prev");
    }
  }

  function syncWheelListener() {
    var lbActive = lightbox.classList.contains("active");
    var modalActive = photoModal.classList.contains("open");
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

  var isIntersecting = false;

  // Runs whenever visibility OR overlay state changes, so the animation
  // is only ever running when it's actually visible: in view AND not
  // covered by a modal or the lightbox.
  function syncPlayState() {
    var overlayOpen = !!document.querySelector(
      ".modal-overlay.open, .lightbox-overlay.active",
    );
    flagshipCard.style.setProperty(
      "--play-state",
      isIntersecting && !overlayOpen ? "running" : "paused",
    );
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        isIntersecting = entry.isIntersecting;
        syncPlayState();
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(flagshipCard);
  document.addEventListener("overlay:change", syncPlayState);
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

            if (window.closeModal) window.closeModal("contactModal");
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

/* ─────────────────────────────────────
SMOOTH SCROLL FADE-IN LOGIC
──────────────────────────────────────── */
(function () {
  var cards = document.querySelectorAll(".card");

  // Inject CSS class dynamically
  cards.forEach(function (card) {
    card.classList.add("fade-in-section");
  });

  // Watch elements and trigger animation when visible
  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  cards.forEach(function (card) {
    observer.observe(card);
  });
})();

/* ─────────────────────────────────────
FLUID DESKTOP SCALE (≥1440px)
Continuously scales the bento canvas instead of snapping to a fixed
133% zoom. The canvas is measured at its true, unscaled size on every
recalculation, then:

  scale = min(pageContentWidth / naturalWidth,
              availableHeight  / naturalHeight,
              maxScale)

Both axes are checked, not just width - so on a screen that's wide
but short (e.g. 2560x1024), or narrow but tall for its width
(e.g. 1440x1024), the canvas scales down just enough to fit the
tighter axis, instead of overflowing it.

1424px (1360px canvas + the page's 64px of horizontal padding) is
the exact width where the dense grid first fits at its own native,
unscaled size. The breakpoint here is set a little past that, at
1440px, as a safety margin so a vertical scrollbar can never drag
the starting scale just under 1x. Below 1440px there's no
guaranteed room to show the dense grid at 1x, so the "Mid & Narrow
Desktop" 2-column layout (900-1439px, in style.css) is used instead
- it's a genuinely fluid CSS Grid, not this fixed-canvas-plus-zoom
system, so it never needs to shrink below its own natural
proportions. The zoom system only takes over once the canvas can be
shown at ≥1x, which is what keeps this tier feeling like a smooth
"zoom in as you widen the window" rather than a shrink-then-grow.

X and Y are deliberately handled two different ways:

- X: "pageContentWidth" is .page's own content box - its real,
  rendered width minus its own CSS padding (set in style.css), read
  via getComputedStyle. That real, guaranteed padding is what fixes
  the gutter reliably at every width, including the narrow band right
  above the 1440px breakpoint where an inferred (not CSS-guaranteed)
  margin was proving unreliable.

- Y: kept as a plain computed value (viewport height minus a fixed
  gutter), matching the vertical behavior already confirmed to look
  right. This is intentional - only the horizontal gutter needed the
  more robust treatment above, and it stays scoped to X only.
──────────────────────────────────────── */
(function () {
  var root = document.documentElement;
  var BREAKPOINT = 1440; // matches the CSS media query
  var MAX_SCALE = 1.33; // the approved "wide monitor" magnification
  var GUTTER_Y = 32; // minimum top/bottom breathing room, in px, per side
  var frame = null;

  function updateBentoScale() {
    var pageEl = document.querySelector(".page");
    var el = document.querySelector(".bento-master");
    var h = window.innerHeight;
    if (!pageEl || !el) return;

    if (document.documentElement.clientWidth < BREAKPOINT) {
      root.style.setProperty("--bento-scale", "1");
      return;
    }

    // Reset to unscaled before measuring anything, so every reading
    // below reflects the same, unscaled layout pass.
    root.style.setProperty("--bento-scale", "1");

    var rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    var cs = getComputedStyle(pageEl);
    var padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    var availW = pageEl.clientWidth - padX;
    var availH = Math.max(h - GUTTER_Y * 2, rect.height * 0.5);
    if (availW <= 0 || availH <= 0) return;

    var scale = Math.min(availW / rect.width, availH / rect.height, MAX_SCALE);
    if (!isFinite(scale) || scale <= 0) scale = 1;
    root.style.setProperty("--bento-scale", scale.toFixed(4));
  }

  function scheduleUpdate() {
    if (frame) return;
    frame = requestAnimationFrame(function () {
      frame = null;
      updateBentoScale();
    });
  }

  updateBentoScale();
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("orientationchange", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleUpdate);
  }
})();
