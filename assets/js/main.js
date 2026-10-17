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
    }, 100);
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  document.querySelectorAll(".photo-trigger").forEach(function (btn) {
    function prefetchFirstImage() {
      var folder = this.dataset.folder;
      var preloadImg = new Image();
      preloadImg.src =
        "assets/img/projects-documentation/" + folder + "/display/1.webp";
    }

    btn.addEventListener("mouseenter", prefetchFirstImage, { once: true });
    btn.addEventListener("touchstart", prefetchFirstImage, {
      once: true,
      passive: true,
    });

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var folder = btn.dataset.folder;
      var count = parseInt(btn.dataset.count) || 10;
      var basePath = "assets/img/projects-documentation/" + folder + "/";

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

      initGallery(thumbSrcs, displaySrcs, zoomSrcs);
      openModal("photoModal");
    });
  });

  document.querySelectorAll(".openContactTrigger").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      openModal("contactModal");
    });
  });

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

  slides.forEach(function (slide) {
    var textEl = slide.querySelector(".quote-text");
    if (textEl) {
      var charCount = textEl.textContent.trim().length;

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
      resetAutoplay();
    });
  });

  startAutoplay();

  dots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var index = parseInt(this.getAttribute("data-index"));
      showSlide(index);
    });
  });
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

  var thumbSrcs = [];
  var displaySrcs = [];
  var zoomSrcs = [];
  var activeIndex = 0;
  var wrappers = [];
  var navigating = false;

  var mainLoader = new Image();
  var lightboxLoader = new Image();

  function setMainImage(src, instant) {
    if (instant) {
      mainImage.src = src;
      mainImage.style.opacity = "1";
      return;
    }
    mainImage.style.opacity = "0";
    mainLoader.onload = mainLoader.onerror = function () {
      mainImage.src = src;
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

  thumbContainer.addEventListener("click", function (e) {
    var wrapper = e.target.closest(".thumb-wrapper");
    if (!wrapper) return;
    var index = parseInt(wrapper.getAttribute("data-index"), 10);
    if (!isNaN(index)) navigate("exact", index);
  });

  function buildThumbs() {
    var existingWrappers = thumbContainer.children;
    var numNeeded = thumbSrcs.length;

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

    for (var i = 0; i < wrappers.length; i++) {
      var wrapper = wrappers[i];
      if (i < numNeeded) {
        wrapper.setAttribute("data-index", i);
        var img = wrapper.querySelector("img");

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

  window.initGallery = function (newThumbSrcs, newDisplaySrcs, newZoomSrcs) {
    thumbSrcs = newThumbSrcs;
    displaySrcs = newDisplaySrcs;
    zoomSrcs = newZoomSrcs;
    activeIndex = 0;
    navigating = false;

    counter.textContent = "1 / " + displaySrcs.length;
    wrappers.forEach(function (w) {
      w.style.display = "none";
    });

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

    clearTimeout(window._thumbRenderTimeout);
    window._thumbRenderTimeout = setTimeout(function () {
      buildThumbs();
      updateThumbs(0);
    }, 80);
  };

  prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    navigate("prev");
  });
  nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    navigate("next");
  });

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
  }

  lightboxCloseBtn.addEventListener("click", closeLightbox);
  lightboxScrollArea.addEventListener("click", function (e) {
    if (e.target === lightboxScrollArea) closeLightbox();
  });

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  var MIN_SCALE = 1;
  var MAX_SCALE = 3.5;
  var ZOOM_TIER_THRESHOLD = 1.15;
  var scale = 1;
  var panX = 0,
    panY = 0;
  var baseWidth = 0,
    baseHeight = 0;
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

    var originalBtnContent = submitBtn.innerHTML;

    submitBtn.innerHTML =
      '<i class="bi bi-arrow-repeat spin-icon"></i> Sending...';
    submitBtn.disabled = true;

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
          submitBtn.innerHTML =
            '<i class="bi bi-check-circle-fill"></i> Message Sent';
          submitBtn.classList.add("btn-success-state");
          form.reset();

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

  cards.forEach(function (card) {
    card.classList.add("fade-in-section");
  });

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
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

(function () {
  var root = document.documentElement;
  var BREAKPOINT = 1440;
  var MAX_SCALE = 1.33;
  var GUTTER_Y = 32;
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

    root.style.setProperty("--bento-scale", "1");

    var rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    var cs = getComputedStyle(pageEl);
    var padX =
      (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
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
