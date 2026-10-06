(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }
  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }
  function on(el, type, fn, opts) {
    if (el) el.addEventListener(type, fn, opts);
  }

  var nav = $("#nav");
  var toTop = $("#toTop");

  function handleScrollState() {
    var y = window.pageYOffset;
    if (nav) nav.classList.toggle("is-scrolled", y > 24);
    if (toTop) toTop.classList.toggle("is-visible", y > 520);
    updateActiveLink(y);
  }

  window.addEventListener("scroll", handleScrollState, { passive: true });

  var navToggle = $("#navToggle");
  var navMenu = $("#navMenu");

  function setMenu(open) {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle("is-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
  }

  on(navToggle, "click", function () {
    setMenu(!navMenu.classList.contains("is-open"));
  });

  var navLinks = $$(".nav__link");

  navLinks.forEach(function (link) {
    on(link, "click", function () {
      setMenu(false);
    });
  });

  on(document, "keydown", function (e) {
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("is-open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  on(document, "click", function (e) {
    if (!navMenu || !navMenu.classList.contains("is-open")) return;
    if (navMenu.contains(e.target) || navToggle.contains(e.target)) return;
    setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMenu(false);
  });

  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? { link: link, el: $(id) } : null;
    })
    .filter(function (item) {
      return item && item.el;
    });

  function updateActiveLink(scrollY) {
    if (!sections.length) return;
    var offset = scrollY + (nav ? nav.offsetHeight : 76) + 120;
    var current = sections[0];
    sections.forEach(function (item) {
      if (item.el.offsetTop <= offset) current = item;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link === current.link);
    });
  }

  var revealEls = $$(".reveal, .reveal-img");

  function showElement(el) {
    el.classList.add("is-visible");
    if (el.id === "charging") el.classList.add("is-charged");
  }

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            showElement(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(showElement);
  }

  var counters = $$(".count");

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    if (prefersReducedMotion || target === 0) {
      el.textContent = String(target);
      return;
    }
    var duration = 1500;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    counters.forEach(animateCounter);
  }

  $$(".accordion__item").forEach(function (item) {
    var btn = $(".accordion__btn", item);
    var panel = $(".accordion__panel", item);
    if (!btn || !panel) return;

    on(btn, "click", function () {
      var isOpen = item.classList.contains("is-open");

      // close siblings (single-open accordion)
      $$(".accordion__item.is-open").forEach(function (openItem) {
        if (openItem === item) return;
        openItem.classList.remove("is-open");
        var openBtn = $(".accordion__btn", openItem);
        var openPanel = $(".accordion__panel", openItem);
        if (openBtn) openBtn.setAttribute("aria-expanded", "false");
        if (openPanel) openPanel.style.maxHeight = "";
      });

      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? "" : panel.scrollHeight + "px";
    });
  });

  var slider = $("#reviewSlider");
  if (slider) {
    var track = $(".slider__track", slider);
    var slides = $$(".slide", slider);
    var dotsWrap = $(".slider__dots", slider);
    var index = 0;
    var timer = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Show review " + (i + 1));
      on(dot, "click", function () {
        goTo(i);
        restartAutoplay();
      });
      dotsWrap.appendChild(dot);
    });

    var dots = $$(".slider__dot", slider);

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      slides.forEach(function (slide, s) {
        slide.classList.toggle("is-active", s === index);
      });
      dots.forEach(function (dot, d) {
        dot.classList.toggle("is-active", d === index);
      });
    }

    function startAutoplay() {
      if (prefersReducedMotion) return;
      stopAutoplay();
      timer = window.setInterval(function () {
        goTo(index + 1);
      }, 6000);
    }
    function stopAutoplay() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    on($('[data-slider="prev"]', slider), "click", function () {
      goTo(index - 1);
      restartAutoplay();
    });
    on($('[data-slider="next"]', slider), "click", function () {
      goTo(index + 1);
      restartAutoplay();
    });

    on(slider, "mouseenter", stopAutoplay);
    on(slider, "mouseleave", startAutoplay);
    on(slider, "focusin", stopAutoplay);
    on(slider, "focusout", startAutoplay);

    goTo(0);
    startAutoplay();
  }

  var lightbox = $("#lightbox");
  var lightboxImg = $("#lightboxImg");
  var lightboxCaption = $("#lightboxCaption");
  var lightboxCounter = $("#lightboxCounter");
  var galleryButtons = $$("[data-gallery-index]");
  var galleryItems = galleryButtons.map(function (btn) {
    var img = $("img", btn);
    var caption = $(".gallery__caption", btn);
    return {
      src: img ? img.getAttribute("src") : "",
      alt: img ? img.getAttribute("alt") : "",
      caption: caption ? caption.textContent : ""
    };
  });
  var lightboxIndex = 0;
  var lastFocused = null;

  function renderLightbox(i) {
    if (!galleryItems.length) return;
    lightboxIndex = (i + galleryItems.length) % galleryItems.length;
    var item = galleryItems[lightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.caption;
    lightboxCounter.textContent = lightboxIndex + 1 + " / " + galleryItems.length;
  }

  function openLightbox(i) {
    lastFocused = document.activeElement;
    renderLightbox(i);
    lightbox.hidden = false;
    document.body.classList.add("is-locked");
    $(".lightbox__close", lightbox).focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("is-locked");
    if (lastFocused) lastFocused.focus();
  }

  galleryButtons.forEach(function (btn, i) {
    on(btn, "click", function () {
      openLightbox(i);
    });
  });

  if (lightbox) {
    on($(".lightbox__close", lightbox), "click", closeLightbox);
    on($(".lightbox__nav--prev", lightbox), "click", function () {
      renderLightbox(lightboxIndex - 1);
    });
    on($(".lightbox__nav--next", lightbox), "click", function () {
      renderLightbox(lightboxIndex + 1);
    });
    on(lightbox, "click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    on(document, "keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") renderLightbox(lightboxIndex - 1);
      if (e.key === "ArrowRight") renderLightbox(lightboxIndex + 1);
    });
  }

  on(toTop, "click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  var modal = $("#testRideModal");
  var form = $("#testRideForm");
  var formView = $("#modalFormView");
  var successView = $("#modalSuccessView");
  var successMessage = $("#successMessage");
  var modalLastFocused = null;

  function openModal() {
    if (!modal) return;
    modalLastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("is-locked");
    formView.hidden = false;
    successView.hidden = true;
    var firstInput = $("#trName", modal);
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove("is-locked");
    if (modalLastFocused) modalLastFocused.focus();
  }

  $$("[data-open-modal]").forEach(function (btn) {
    on(btn, "click", openModal);
  });
  $$("[data-close-modal]").forEach(function (btn) {
    on(btn, "click", closeModal);
  });
  on(document, "keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  // minimum date = today
  var dateField = $("#trDate");
  if (dateField) {
    var today = new Date();
    var iso = today.getFullYear() + "-" +
      String(today.getMonth() + 1).padStart(2, "0") + "-" +
      String(today.getDate()).padStart(2, "0");
    dateField.setAttribute("min", iso);
  }

  function setError(field, message) {
    var wrapper = field.closest(".field");
    var errorEl = $('[data-error-for="' + field.id + '"]', form);
    if (wrapper) wrapper.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  }

  function validateField(field) {
    var value = (field.value || "").trim();

    if (field.hasAttribute("required") && !value) {
      setError(field, "This field is required.");
      return false;
    }

    switch (field.id) {
      case "trName":
        if (value.length < 2) {
          setError(field, "Please enter your full name.");
          return false;
        }
        break;
      case "trEmail":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          setError(field, "Enter a valid email address.");
          return false;
        }
        break;
      case "trPhone":
        if (value.replace(/\D/g, "").length < 7) {
          setError(field, "Enter a valid phone number.");
          return false;
        }
        break;
      case "trDate": {
        var chosen = new Date(value + "T00:00:00");
        var now = new Date();
        now.setHours(0, 0, 0, 0);
        if (isNaN(chosen) || chosen < now) {
          setError(field, "Choose today or a future date.");
          return false;
        }
        break;
      }
    }

    setError(field, "");
    return true;
  }

  if (form) {
    $$("input, select, textarea", form).forEach(function (field) {
      on(field, "blur", function () {
        if (field.value.trim() || field.hasAttribute("required")) validateField(field);
      });
      on(field, "input", function () {
        if (field.closest(".field") && field.closest(".field").classList.contains("has-error")) {
          validateField(field);
        }
      });
    });

    on(form, "submit", function (e) {
      e.preventDefault();

      var fields = $$("input[required], select[required]", form);
      var valid = true;
      var firstInvalid = null;

      fields.forEach(function (field) {
        var ok = validateField(field);
        if (!ok && valid) {
          firstInvalid = field;
        }
        valid = valid && ok;
      });

      if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var data = {
        name: $("#trName").value.trim(),
        email: $("#trEmail").value.trim(),
        phone: $("#trPhone").value.trim(),
        model: $("#trModel").value,
        date: $("#trDate").value,
        message: $("#trMessage").value.trim()
      };

      successMessage.textContent =
        "Thanks " + data.name.split(" ")[0] +
        " — your " + data.model + " test ride request for " +
        formatDate(data.date) +
        " is confirmed. We'll email " + data.email + " within 24 hours.";
      formView.hidden = true;
      successView.hidden = false;
      form.reset();
    });
  }

  function formatDate(isoDate) {
    var d = new Date(isoDate + "T00:00:00");
    if (isNaN(d)) return isoDate;
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  handleScrollState();
})();
