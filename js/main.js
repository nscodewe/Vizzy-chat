/* ═══════════════════════════════════════════════════════
   VIZZY CHAT – VISUAL STUDIO  ·  Interactions
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Pill Toggle ──────────────────────────────────
  const pillToggle = document.getElementById('pill-toggle');
  const pillBtns   = pillToggle.querySelectorAll('.pill-btn');

  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pillToggle.setAttribute('data-active', btn.dataset.tab);
    });
  });


  // ── Sidebar Chat Items ───────────────────────────
  const chatItems = document.querySelectorAll('.chat-item');

  chatItems.forEach(item => {
    item.addEventListener('click', () => {
      chatItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });


  // ── New Conversation Button ──────────────────────
  const btnNewChat = document.getElementById('btn-new-chat');
  btnNewChat.addEventListener('click', () => {
    chatItems.forEach(i => i.classList.remove('active'));

    // Brief press animation
    btnNewChat.style.transform = 'scale(0.97)';
    setTimeout(() => { btnNewChat.style.transform = ''; }, 150);
  });


  // ── Suggestion Cards → Fill Composer ─────────────
  const composerInput = document.getElementById('composer-input');
  const cards = document.querySelectorAll('.suggestion-card');

  const cardPrompts = {
    'card-paint':       'Paint my last year as an impressionist canvas — warm tones, golden light…',
    'card-renaissance': 'Create a Renaissance-style oil portrait with rich, moody lighting…',
    'card-vision':      'Build a vision board collage for 2026 — growth, travel, creativity…',
    'card-story':       'Write and illustrate a bedtime story about a brave little fox…',
    'card-quote':       'Design a minimal quote poster — "The wound is the place where the Light enters you." — Rumi',
    'card-dream':       'Visualize a dream: floating above a city of glass towers at dawn…',
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const prompt = cardPrompts[card.id] || '';
      composerInput.value = '';
      composerInput.focus();

      // Typewriter effect
      let i = 0;
      const speed = 18;
      function typeChar() {
        if (i < prompt.length) {
          composerInput.value += prompt.charAt(i);
          i++;
          setTimeout(typeChar, speed);
        }
      }
      typeChar();
    });
  });


  // ── Send Button ──────────────────────────────────
  const sendBtn = document.getElementById('composer-send');

  sendBtn.addEventListener('click', () => {
    if (composerInput.value.trim()) {
      // Brief pulse
      sendBtn.style.transform = 'scale(0.88)';
      setTimeout(() => { sendBtn.style.transform = ''; }, 200);

      // Clear after "sending"
      setTimeout(() => {
        composerInput.value = '';
        composerInput.focus();
      }, 300);
    }
  });

  // Enter key to "send"
  composerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });


  // ── Staggered Card Entrance ──────────────────────
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px)';
    card.style.transition = `opacity 0.5s ease ${0.65 + index * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.65 + index * 0.07}s`;

    // Trigger after a frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    });
  });

});
