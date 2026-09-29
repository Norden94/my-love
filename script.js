/* =========================================================
   For Her — shared JavaScript (COMPLETE)
   Handles: floating hearts, daily note, animated counters,
   reason cards, recipe preview, timeline, quote slider,
   gallery filters, lightbox, surprise messages, music,
   scroll reveal, and back-to-top.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. FLOATING HEARTS BACKGROUND
  --------------------------------------------------------- */
  const heartsBg = document.getElementById('heartsBg');
  if (heartsBg) {
    const symbols = ['❤️', '💕', '💖', '🌸', '💗', '🤍', '💞', '🌷'];
    const count = 22;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement('span');
      heart.classList.add('heart');
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (0.7 + Math.random() * 1.5) + 'rem';
      heart.style.animationDuration = (9 + Math.random() * 11) + 's';
      heart.style.animationDelay = (Math.random() * 12) + 's';
      heartsBg.appendChild(heart);
    }
  }

  /* ---------------------------------------------------------
     2. DAILY LOVE NOTE (home page)
  --------------------------------------------------------- */
  const dailyNote = document.getElementById('dailyNote');
  if (dailyNote) {
    const notes = [
      "You are my favorite reason to come home. 🏡",
      "The world is softer when you're in it. 🌸",
      "Your laugh is my favorite sound. 🎶",
      "Thank you for loving me the way you do. 💗",
      "You make ordinary days feel like celebrations. 🎉",
      "Every meal tastes better because you made it. 🍲",
      "I fall for you a little more every single day. 💘",
      "You are the best thing that ever happened to me. 🌟",
      "My heart does a little flip every time I see you. 💓",
      "You're my person, always and forever. 💕"
    ];
    const todayIndex = new Date().getDate() % notes.length;
    const noteText = dailyNote.querySelector('.daily-note-text');
    if (noteText) noteText.textContent = notes[todayIndex];
  }

  /* ---------------------------------------------------------
     3. ANIMATED NUMBER COUNTERS
  --------------------------------------------------------- */
  const counters = document.querySelectorAll('.stat-num');
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* ---------------------------------------------------------
     4. REASON CARDS (home page)
  --------------------------------------------------------- */
  const reasonGrid = document.getElementById('reasonGrid');
  if (reasonGrid) {
    const reasons = [
      { emoji: '🍳', title: 'The way you cook', text: 'You turn simple ingredients into memories.' },
      { emoji: '😊', title: 'Your smile', text: 'It fixes everything, every single time.' },
      { emoji: '🤗', title: 'Your hugs', text: 'Home isn\'t a place — it\'s your arms.' },
      { emoji: '🌙', title: 'Late-night talks', text: 'My favorite conversations are with you.' },
      { emoji: '🎨', title: 'Your creativity', text: 'You see beauty where others see nothing.' },
      { emoji: '💪', title: 'Your strength', text: 'You carry so much and still shine.' },
      { emoji: '🌷', title: 'Your kindness', text: 'You make everyone around you feel seen.' },
      { emoji: '🎶', title: 'Your voice', text: 'Even your "good morning" sounds like a song.' }
    ];

    reasons.forEach((r, i) => {
      const card = document.createElement('div');
      card.className = 'reason-card reveal';
      card.style.transitionDelay = (i * 0.06) + 's';
      card.innerHTML = `
        <span class="reason-emoji">${r.emoji}</span>
        <h3>${r.title}</h3>
        <p>${r.text}</p>
      `;
      reasonGrid.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     5. RECIPE PREVIEW (home page — only if empty)
     NOTE: If you already put real cards inside #recipePreview
     in index.html, this block will leave them alone.
  --------------------------------------------------------- */
  const recipePreview = document.getElementById('recipePreview');
  if (recipePreview && recipePreview.children.length === 0) {
    const recipes = [
      { emoji: '🍝', title: 'Creamy Garlic Pasta', desc: 'Silky, garlicky, and made with patience.' },
      { emoji: '🥘', title: 'Chicken Tikka Masala', desc: 'Rich, spiced, and absolutely unforgettable.' },
      { emoji: '🥞', title: 'Fluffy Banana Pancakes', desc: 'Sunday mornings taste like these.' },
      { emoji: '🍰', title: 'Chocolate Lava Cake', desc: 'Warm, gooey, and dangerously good.' },
      { emoji: '🥗', title: 'Avocado & Quinoa', desc: 'Fresh, colorful, and full of care.' },
      { emoji: '🍲', title: 'Cozy Lentil Soup', desc: 'The kind of comfort only she can make.' }
    ];

    recipes.forEach((r, i) => {
      const card = document.createElement('article');
      card.className = 'recipe-card reveal';
      card.style.transitionDelay = (i * 0.06) + 's';
      card.innerHTML = `
        <span class="recipe-emoji">${r.emoji}</span>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
      `;
      recipePreview.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     6. TIMELINE (home page)
  --------------------------------------------------------- */
  const timelineEl = document.getElementById('timelineEl');
  if (timelineEl) {
    const moments = [
      { date: 'The first day', title: 'We met', text: 'And I knew, quietly, that something good had started.' },
      { date: 'The first meal', title: 'You cooked for me', text: 'I still remember exactly what it tasted like. Perfect.' },
      { date: 'That rainy evening', title: 'We stayed in', text: 'Soup, blankets, and a movie we didn\'t finish.' },
      { date: 'Every Sunday', title: 'Pancake mornings', text: 'Your pancakes are the reason I love Sundays.' },
      { date: 'Today', title: 'Still falling', text: 'And I plan to keep falling for the rest of my life.' }
    ];

    moments.forEach((m, i) => {
      const item = document.createElement('div');
      item.className = 'timeline-item reveal';
      item.style.transitionDelay = (i * 0.1) + 's';
      item.innerHTML = `
        <span class="timeline-dot"></span>
        <span class="timeline-date">${m.date}</span>
        <h3 class="timeline-title">${m.title}</h3>
        <p class="timeline-text">${m.text}</p>
      `;
      timelineEl.appendChild(item);
    });
  }

  /* ---------------------------------------------------------
     7. QUOTE SLIDER (home page)
  --------------------------------------------------------- */
  const quoteText = document.getElementById('quoteText');
  const quoteDots = document.getElementById('quoteDots');
  if (quoteText && quoteDots) {
    const quotes = [
      "Cooking is love made visible — and she makes it every single day.",
      "The best meals aren't the fanciest. They're the ones made by someone who loves you.",
      "She doesn't just feed me. She takes care of me.",
      "Every dish she makes says the same thing: I thought of you.",
      "I could eat anywhere in the world, but I'd still choose her kitchen."
    ];

    let current = 0;
    let intervalId = null;

    quotes.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'quote-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Quote ' + (i + 1));
      dot.addEventListener('click', () => goToQuote(i));
      quoteDots.appendChild(dot);
    });

    const dots = quoteDots.querySelectorAll('.quote-dot');

    function goToQuote(index) {
      current = index;
      quoteText.style.opacity = 0;
      setTimeout(() => {
        quoteText.textContent = quotes[current];
        quoteText.style.opacity = 1;
      }, 250);
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      restartAuto();
    }

    function nextQuote() {
      goToQuote((current + 1) % quotes.length);
    }

    function restartAuto() {
      clearInterval(intervalId);
      intervalId = setInterval(nextQuote, 5500);
    }

    quoteText.textContent = quotes[0];
    restartAuto();
  }

  /* ---------------------------------------------------------
     8. GALLERY FILTERS (gallery page)
  --------------------------------------------------------- */
  const filterBar = document.getElementById('galleryFilters');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryEmpty = document.getElementById('galleryEmpty');
  const galleryCount = document.getElementById('galleryCount');

  function updateCount() {
    if (!galleryCount) return;
    const visible = document.querySelectorAll('.gallery-item:not(.hide)').length;
    galleryCount.textContent = visible === 1
      ? '1 dish made with love'
      : visible + ' dishes made with love';
  }

  if (filterBar) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      galleryItems.forEach(item => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('hide', !match);
        if (match) visibleCount++;
      });

      if (galleryEmpty) galleryEmpty.hidden = visibleCount !== 0;
      updateCount();
    });
  }

  updateCount();

  /* ---------------------------------------------------------
     9. LIGHTBOX (gallery page)
  --------------------------------------------------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (lightbox && galleryItems.length) {
    let visibleItems = [];
    let currentIndex = 0;

    function refreshVisible() {
      visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
    }

    function openLightbox(index) {
      refreshVisible();
      currentIndex = index;
      const item = visibleItems[currentIndex];
      if (!item) return;

      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = item.getAttribute('data-title') || img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function showNext(step) {
      refreshVisible();
      if (!visibleItems.length) return;
      currentIndex = (currentIndex + step + visibleItems.length) % visibleItems.length;
      const item = visibleItems[currentIndex];
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = item.getAttribute('data-title') || img.alt;
    }

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        refreshVisible();
        const idx = visibleItems.indexOf(item);
        if (idx !== -1) openLightbox(idx);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showNext(-1); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showNext(1); });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext(1);
      if (e.key === 'ArrowLeft') showNext(-1);
    });
  }

  /* ---------------------------------------------------------
     10. SURPRISE BUTTON (both pages)
  --------------------------------------------------------- */
  const loveButton = document.getElementById('loveButton');
  const secretMessage = document.getElementById('secretMessage');

  if (loveButton && secretMessage) {
    const messages = [
      "You are my favorite person in the whole world. 💕",
      "I love you more than pasta. And you know how I feel about pasta. 🍝",
      "Thank you for every meal, every hug, every laugh. ❤️",
      "You make my heart full — and my stomach very happy. 🥰",
      "I'd choose you in a hundred lifetimes, in a hundred worlds. 💫",
      "You're the recipe I never knew I needed. 💗",
      "You are, quite simply, my favorite everything. 🌹"
    ];

    loveButton.addEventListener('click', () => {
      const random = messages[Math.floor(Math.random() * messages.length)];
      secretMessage.textContent = random;
      secretMessage.classList.add('show');

      // Re-trigger fade-in animation if clicked again
      secretMessage.style.animation = 'none';
      void secretMessage.offsetWidth;
      secretMessage.style.animation = 'fadeIn 0.6s ease';

      // Little heart burst
      burstHearts();
    });
  }

  function burstHearts() {
    const symbols = ['❤️', '💕', '💖', '💗'];
    for (let i = 0; i < 10; i++) {
      const h = document.createElement('span');
      h.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      h.style.position = 'fixed';
      h.style.left = (50 + (Math.random() - 0.5) * 40) + '%';
      h.style.top = '60%';
      h.style.fontSize = (1 + Math.random() * 1.4) + 'rem';
      h.style.pointerEvents = 'none';
      h.style.zIndex = 9999;
      h.style.transition = 'transform 1.4s ease, opacity 1.4s ease';
      document.body.appendChild(h);

      requestAnimationFrame(() => {
        h.style.transform = `translate(${(Math.random() - 0.5) * 400}px, ${-200 - Math.random() * 200}px) rotate(${(Math.random() - 0.5) * 360}deg)`;
        h.style.opacity = 0;
      });

      setTimeout(() => h.remove(), 1500);
    }
  }

  /* ---------------------------------------------------------
     11. MUSIC BUTTON (both pages) — soft ambient chord
  --------------------------------------------------------- */
  const musicToggle = document.getElementById('musicToggle');
  let audioCtx = null;
  let musicNodes = null;

  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      if (!audioCtx) {
        try {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (err) {
          return;
        }
      }

      if (audioCtx.state === 'suspended') audioCtx.resume();

      if (musicNodes) {
        // Stop
        musicNodes.forEach(n => {
          try { n.stop ? n.stop() : n.disconnect(); } catch (e) {}
        });
        musicNodes = null;
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('.music-icon').textContent = '♪';
      } else {
        // Play a gentle looping chord
        const now = audioCtx.currentTime;

        const master = audioCtx.createGain();
        master.gain.value = 0.06;
        master.connect(audioCtx.destination);

        const notes = [261.63, 329.63, 392.00, 523.25]; // C major chord
        const oscillators = notes.map((freq, i) => {
          const osc = audioCtx.createOscillator();
          osc.type = 'sine';
          osc.frequency.value = freq;
          const gain = audioCtx.createGain();
          gain.gain.value = 0.25 / (i + 1);
          osc.connect(gain);
          gain.connect(master);
          osc.start(now);
          return osc;
        });

        musicNodes = oscillators;
        musicToggle.classList.add('playing');
        musicToggle.querySelector('.music-icon').textContent = '♫';
      }
    });
  }

  /* ---------------------------------------------------------
     12. SCROLL REVEAL
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------
     13. BACK TO TOP
  --------------------------------------------------------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }, { passive: true });

    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     14. FOOTER YEAR
  --------------------------------------------------------- */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     15. LETTER DATE (home page)
  --------------------------------------------------------- */
  const letterDate = document.getElementById('letterDate');
  if (letterDate) {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    letterDate.textContent = now.toLocaleDateString('en-US', options);
  }

});