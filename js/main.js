/* ═══════════════════════════════════════════════════════
   VIZZY CHAT – VISUAL STUDIO  ·  Interactions
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Constants ────────────────────────────────────── */
  const VIZZY_AVATAR = 'https://api.dicebear.com/7.x/bottts/svg?seed=vizzy&backgroundColor=1a1a2e';
  const USER_AVATAR  = 'https://api.dicebear.com/7.x/avataaars/svg?seed=neha&backgroundColor=1a1a2e';

  /* ── Mode Content Data ───────────────────────────── */
  const modeData = {
    home: {
      placeholder: 'Tell Vizzy what to imagine, paint, or transform…',
      cards: [
        { id: 'card-1', title: 'Paint my last year',   subtitle: 'Turn memories into an impressionist canvas' },
        { id: 'card-2', title: 'Renaissance portrait', subtitle: 'Classical oil painting from a photo or description' },
        { id: 'card-3', title: 'Vision board',         subtitle: 'Collage your aspirations into a visual manifesto' },
        { id: 'card-4', title: 'Story for my kids',    subtitle: 'Illustrated bedtime story with custom characters' },
        { id: 'card-5', title: 'Quote poster',         subtitle: 'Typography art from words that move you' },
        { id: 'card-6', title: 'Dream visualization',  subtitle: 'Paint the scene from last night\'s dream' },
      ],
      prompts: {
        'card-1': 'Paint my last year as an impressionist canvas — warm tones, golden light…',
        'card-2': 'Create a Renaissance-style oil portrait with rich, moody lighting…',
        'card-3': 'Build a vision board collage for 2026 — growth, travel, creativity…',
        'card-4': 'Write and illustrate a bedtime story about a brave little fox…',
        'card-5': 'Design a minimal quote poster — "The wound is the place where the Light enters you." — Rumi',
        'card-6': 'Visualize a dream: floating above a city of glass towers at dawn…',
      },
    },
    business: {
      placeholder: 'Describe your brand vision, product, or campaign brief…',
      cards: [
        { id: 'card-1', title: 'Premium product visual',      subtitle: 'Luxury product shot with cinematic lighting' },
        { id: 'card-2', title: 'Apple-style product loop',    subtitle: 'Sleek rotating animation for hero sections' },
        { id: 'card-3', title: 'Sale poster',                 subtitle: 'Premium feel promotional design that converts' },
        { id: 'card-4', title: 'Brand-themed artwork',        subtitle: 'Art aligned with your brand palette and values' },
        { id: 'card-5', title: 'In-store ambiance visuals',   subtitle: 'Mood-setting imagery for retail environments' },
        { id: 'card-6', title: 'Marketing campaign creative', subtitle: 'Cohesive visuals for multi-channel campaigns' },
      ],
      prompts: {
        'card-1': 'Create a premium product shot — dark marble surface, soft rim lighting, minimal…',
        'card-2': 'Design a smooth Apple-style product loop — white background, 360° rotation…',
        'card-3': 'Design a luxury sale poster — bold yet refined, high contrast, gold accents…',
        'card-4': 'Create brand-themed artwork using our palette — navy, gold, off-white…',
        'card-5': 'Generate warm in-store ambiance visuals — soft lighting, natural textures…',
        'card-6': 'Build a cohesive marketing campaign visual — hero banner, social tiles, email header…',
      },
    },
  };

  let currentMode = 'home';
  let hasStartedChat = false;

  /* ── DOM refs ─────────────────────────────────────── */
  const pillToggle    = document.getElementById('pill-toggle');
  const pillBtns      = pillToggle.querySelectorAll('.pill-btn');
  const cardsGrid     = document.getElementById('cards-grid');
  const hero          = document.getElementById('hero');
  const composerInput = document.getElementById('composer-input');
  const conversation  = document.getElementById('conversation');
  const sendBtn       = document.getElementById('composer-send');
  const chatHistory   = document.getElementById('chat-history');
  const btnNewChat    = document.getElementById('btn-new-chat');

  /* ── Pill Toggle (mode switch) ───────────────────── */
  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const newMode = btn.dataset.tab;
      if (newMode === currentMode) return;
      pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      pillToggle.setAttribute('data-active', newMode);
      currentMode = newMode;
      switchMode(newMode);
    });
  });

  function switchMode(mode) {
    const data = modeData[mode];
    const cards = cardsGrid.querySelectorAll('.suggestion-card');

    composerInput.style.opacity = '0';
    setTimeout(() => {
      composerInput.placeholder = data.placeholder;
      composerInput.style.opacity = '1';
    }, 200);

    cards.forEach((card, index) => {
      card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(8px)';
      setTimeout(() => {
        const cd = data.cards[index];
        if (cd) {
          card.id = cd.id;
          card.querySelector('.card-title').textContent = cd.title;
          card.querySelector('.card-subtitle').textContent = cd.subtitle;
        }
        setTimeout(() => {
          card.style.transition = `opacity 0.4s ease ${index * 0.06}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 0.06}s`;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      }, 280);
    });
  }

  /* ── Hide welcome screen on first message ────────── */
  function hideWelcome() {
    if (hasStartedChat) return;
    hasStartedChat = true;
    hero.classList.add('hidden');
    cardsGrid.classList.add('hidden');
    conversation.style.display = 'flex';
  }

  /* ── Show welcome screen (new chat) ──────────────── */
  function showWelcome() {
    hasStartedChat = false;
    hero.classList.remove('hidden');
    cardsGrid.classList.remove('hidden');
    conversation.style.display = 'none';
    conversation.innerHTML = '';
  }

  // Initially hide conversation
  conversation.style.display = 'none';

  /* ── Sidebar Chat Items ──────────────────────────── */
  chatHistory.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      e.stopPropagation();
      deleteBtn.closest('.chat-item')?.remove();
      return;
    }
    const item = e.target.closest('.chat-item');
    if (item) {
      chatHistory.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  });

  /* ── New Conversation ────────────────────────────── */
  btnNewChat.addEventListener('click', () => {
    chatHistory.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
    btnNewChat.style.transform = 'scale(0.97)';
    setTimeout(() => { btnNewChat.style.transform = ''; }, 150);
    showWelcome();
  });

  /* ── Suggestion Cards → Fill Composer & Send ─────── */
  cardsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.suggestion-card');
    if (!card) return;
    const prompt = modeData[currentMode].prompts[card.id] || '';
    composerInput.value = '';
    composerInput.focus();
    let i = 0;
    function typeChar() {
      if (i < prompt.length) {
        composerInput.value += prompt.charAt(i);
        i++;
        setTimeout(typeChar, 16);
      } else {
        setTimeout(sendMessage, 250);
      }
    }
    typeChar();
  });

  /* ── Send Message Flow ───────────────────────────── */
  function sendMessage() {
    const text = composerInput.value.trim();
    if (!text) return;

    sendBtn.style.transform = 'scale(0.88)';
    setTimeout(() => { sendBtn.style.transform = ''; }, 160);

    hideWelcome();
    appendMessage('user', text);
    composerInput.value = '';
    composerInput.focus();

    // Show typing indicator, then AI response
    const typingEl = showTyping();
    const delay = 600 + Math.floor(Math.random() * 400);
    setTimeout(() => {
      typingEl.remove();
      const resp = generateResponse(text);
      appendMessage('ai', resp.text, resp.images);
    }, delay);
  }

  sendBtn.addEventListener('click', sendMessage);
  composerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  /* ── Append Message ──────────────────────────────── */
  function appendMessage(who, text, images) {
    const wrap = document.createElement('div');
    wrap.className = `message ${who}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    const img = document.createElement('img');
    img.src = who === 'user' ? USER_AVATAR : VIZZY_AVATAR;
    img.alt = who === 'user' ? 'You' : 'Vizzy';
    img.onerror = () => { img.style.display = 'none'; };
    avatar.appendChild(img);

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text || '';

    if (images && images.length) {
      const grid = document.createElement('div');
      grid.className = 'image-grid';
      images.forEach(src => {
        const im = document.createElement('img');
        im.src = src;
        im.alt = 'Generated visual';
        im.loading = 'lazy';
        im.onerror = () => { im.style.opacity = '0.3'; im.alt = 'Image unavailable'; };
        grid.appendChild(im);
      });
      bubble.appendChild(grid);
    }

    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    conversation.appendChild(wrap);
    scrollBottom();
  }

  /* ── Typing Indicator ────────────────────────────── */
  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'message ai';
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    const img = document.createElement('img');
    img.src = VIZZY_AVATAR;
    img.alt = 'Vizzy';
    avatar.appendChild(img);
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    wrap.appendChild(avatar);
    wrap.appendChild(bubble);
    conversation.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function scrollBottom() {
    requestAnimationFrame(() => {
      conversation.scrollTop = conversation.scrollHeight;
    });
  }

  /* ── Response Generator ──────────────────────────── */
  function generateResponse(input) {
    const s = input.toLowerCase();
    let keywords = ['creative', 'illustration', 'concept'];
    if (s.includes('year') || s.includes('emotion') || s.includes('dream'))
      keywords = ['abstract', 'painting', 'expressionism'];
    else if (s.includes('product') || s.includes('brand') || s.includes('sale'))
      keywords = ['product', 'studio', 'still life'];
    else if (s.includes('poster') || s.includes('quote'))
      keywords = ['typography', 'poster', 'minimal'];

    const images = keywords.map((k, i) =>
      `https://source.unsplash.com/400x300/?${encodeURIComponent(k)}&sig=${Date.now() + i}`
    );
    return { text: 'Here are a few visuals inspired by your prompt.', images };
  }

  /* ── Staggered Card Entrance ─────────────────────── */
  cardsGrid.querySelectorAll('.suggestion-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(14px)';
    card.style.transition = `opacity 0.5s ease ${0.65 + index * 0.07}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.65 + index * 0.07}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    });
  });
});
