(function () {
  const MOBILE_RE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const prefersReducedMotion = typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  function safePlayMedia(media) {
    if (!media) return;
    if (typeof media.play === 'function') {
      media.play().catch(() => {});
    }
  }

  function initVideoBackground() {
    const videoContainer = document.querySelector('.video-background');
    if (!videoContainer) return;

    if (MOBILE_RE.test(navigator.userAgent)) {
      videoContainer.remove();
      return;
    }

    const video = document.getElementById('bgVideo');
    if (video) {
      video.muted = true;
      safePlayMedia(video);
    }
  }

  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (window.__scrollRevealObserver) {
      window.__scrollRevealObserver.disconnect();
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealEls.forEach((el) => observer.observe(el));
    window.__scrollRevealObserver = observer;
  }

  function initMusicControl() {
    const bgMusic = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    if (!bgMusic || !playBtn || !pauseBtn) return;

    const syncMusicButtons = () => {
      if (bgMusic.paused) {
        playBtn.classList.remove('hidden');
        pauseBtn.classList.add('hidden');
      } else {
        playBtn.classList.add('hidden');
        pauseBtn.classList.remove('hidden');
      }
    };

    playBtn.addEventListener('click', () => {
      safePlayMedia(bgMusic);
      syncMusicButtons();
    });

    pauseBtn.addEventListener('click', () => {
      bgMusic.pause();
      syncMusicButtons();
    });

    bgMusic.addEventListener('ended', () => {
      bgMusic.currentTime = 0;
      safePlayMedia(bgMusic);
      syncMusicButtons();
    });

    bgMusic.addEventListener('play', syncMusicButtons);
    bgMusic.addEventListener('pause', syncMusicButtons);
    syncMusicButtons();
  }

  function initClickEffect() {
    document.addEventListener('click', (event) => {
      if (event.target && event.target.closest('input, textarea, select, option')) {
        return;
      }

      const ripple = document.createElement('div');
      ripple.classList.add('click-ripple');

      const colorClasses = ['color-1', 'color-2', 'color-3', 'color-4'];
      const sizeClasses = ['small', 'medium', 'large'];
      const speedClasses = ['fast', 'normal', 'slow'];

      ripple.classList.add(colorClasses[Math.floor(Math.random() * colorClasses.length)]);
      ripple.classList.add(sizeClasses[Math.floor(Math.random() * sizeClasses.length)]);
      ripple.classList.add(speedClasses[Math.floor(Math.random() * speedClasses.length)]);

      if (Math.random() > 0.5) {
        ripple.classList.add('glow');
      }

      ripple.style.left = `${event.clientX - 20}px`;
      ripple.style.top = `${event.clientY - 20}px`;

      document.body.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 1000);
    });
  }

  function initRippleEffect() {
    const buttons = document.querySelectorAll('button, a, .article-card');
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        window.setTimeout(() => ripple.remove(), 800);
      });
    });
  }

  function initAdvancedCursorEffect() {
    if (prefersReducedMotion || MOBILE_RE.test(navigator.userAgent)) return;

    if (window.__cursorEffectInstance) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-canvas';
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;overflow:hidden;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const colors = ['#00f5ff', '#a855f7', '#ec4899', '#ffffff'];
    const glowRGB = ['0, 245, 255', '168, 85, 247', '236, 72, 153'];
    const trail = [];
    const bursts = [];
    const MAX_TRAIL = 80;

    let mouseX = -100;
    let mouseY = -100;
    let isActive = false;
    let glowPhase = 0;
    let animationFrameId = null;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function isMouseInViewport() {
      return mouseX >= 0 && mouseX <= window.innerWidth && mouseY >= 0 && mouseY <= window.innerHeight;
    }

    function draw() {
      const shouldShowEffects = isActive && isMouseInViewport();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (shouldShowEffects) {
        trail.push({ x: mouseX, y: mouseY, life: 1 });
        if (trail.length > MAX_TRAIL) trail.shift();
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.02;
        if (p.life <= 0) {
          trail.splice(i, 1);
          continue;
        }

        const colorIdx = Math.floor((1 - p.life) * 3) % 3;
        const size = (10 + p.life * 3) * p.life;
        const alpha = p.life;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5);
        gradient.addColorStop(0, `rgba(${glowRGB[colorIdx]}, ${alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[colorIdx];
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      for (let i = bursts.length - 1; i >= 0; i--) {
        const burst = bursts[i];
        burst.x += burst.vx;
        burst.y += burst.vy;
        burst.vx *= 0.95;
        burst.vy *= 0.95;
        burst.life -= 0.025;

        if (burst.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        const size = burst.size * burst.life;
        const gradient = ctx.createRadialGradient(burst.x, burst.y, 0, burst.x, burst.y, size * 2);
        gradient.addColorStop(0, `rgba(${glowRGB[burst.colorIdx]}, ${burst.life * 0.8})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(burst.x, burst.y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(burst.x, burst.y, size, 0, Math.PI * 2);
        ctx.fillStyle = colors[burst.colorIdx];
        ctx.globalAlpha = burst.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (shouldShowEffects) {
        glowPhase += 0.05;
        const breathe = (Math.sin(glowPhase) + 1) / 2 * 0.4 + 0.4;

        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 60 + i * 20, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${glowRGB[i]}, ${breathe * (0.5 - i * 0.15)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        const innerGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50);
        innerGradient.addColorStop(0, `rgba(0, 245, 255, ${breathe * 0.5})`);
        innerGradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2);
        ctx.fillStyle = innerGradient;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      isActive = true;
    };

    const handleMouseLeave = () => {
      isActive = false;
    };

    const handleMouseEnter = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      isActive = true;
    };

    const handleMouseOut = (event) => {
      if (!event.relatedTarget || event.relatedTarget === document.documentElement) {
        isActive = false;
      }
    };

    const handleClick = (event) => {
      const count = 15 + Math.floor(Math.random() * 10);
      for (let i = 0; i < count; i++) {
        bursts.push({
          x: event.clientX,
          y: event.clientY,
          vx: (Math.random() - 0.5) * 16,
          vy: (Math.random() - 0.5) * 16,
          size: 5 + Math.random() * 7,
          colorIdx: Math.floor(Math.random() * 3),
          life: 1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isActive = false;
      }
    });

    resizeCanvas();
    animationFrameId = requestAnimationFrame(draw);

    window.__cursorEffectInstance = {
      canvas,
      ctx,
      cancel: () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('mouseenter', handleMouseEnter);
        window.removeEventListener('mouseout', handleMouseOut);
        window.removeEventListener('click', handleClick);
        window.removeEventListener('resize', resizeCanvas);
        canvas.remove();
        delete window.__cursorEffectInstance;
      }
    };
  }

  function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('a, button, .article-card, .tag, .pagination-btn');
    if (!magneticElements.length) return;

    magneticElements.forEach((element) => {
      element.addEventListener('mousemove', (event) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          const moveX = dx * force * 0.3;
          const moveY = dy * force * 0.3;
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
          element.style.transition = 'transform 0.1s ease-out';
        }
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
        element.style.transition = 'transform 0.3s ease-out';
      });
    });
  }

  function initParticleAnimation() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    const mouse = { x: null, y: null };
    const maxDistance = 150;
    let animationFrameId = null;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 0.8 + 0.2})`
        });
      }
    }

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        if (mouse.x !== null && mouse.y !== null) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            const moveX = (dx / distance) * force;
            const moveY = (dy / distance) * force;
            particle.x += moveX;
            particle.y += moveY;
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200, 200, 200, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    createParticles();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    animate();

    window.__particleAnimationInstance = {
      cancel: () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resizeCanvas);
      }
    };
  }

  function initParticleText() {
    const ptCanvas = document.getElementById('particle-text-canvas');
    if (!ptCanvas) return;

    const ptCtx = ptCanvas.getContext('2d');
    let ptW = 0;
    let ptH = 0;
    let ptParticles = [];
    const ptText = 'CODE';
    const ptMouse = { x: null, y: null };
    let animationFrameId = null;

    function resizeParticleText() {
      const container = ptCanvas.parentElement;
      if (!container) return;

      ptW = ptCanvas.width = container.offsetWidth;
      ptH = ptCanvas.height = container.offsetHeight;
      createParticleText();
    }

    function createParticleText() {
      ptParticles = [];
      const centerX = ptW / 2;
      const centerY = ptH / 2;
      const maxTextWidth = ptW * 0.9;
      const maxTextHeight = ptH * 0.85;

      let fontSize = Math.min(ptW, ptH) * 0.4;
      ptCtx.font = `900 ${fontSize}px Arial`;
      let metrics = ptCtx.measureText(ptText);
      let textWidth = metrics.width;

      while ((textWidth > maxTextWidth || fontSize > maxTextHeight) && fontSize > 10) {
        fontSize -= 2;
        ptCtx.font = `900 ${fontSize}px Arial`;
        metrics = ptCtx.measureText(ptText);
        textWidth = metrics.width;
      }

      ptCtx.fillStyle = '#fff';
      ptCtx.textAlign = 'center';
      ptCtx.textBaseline = 'middle';
      ptCtx.fillText(ptText, centerX, centerY);

      const data = ptCtx.getImageData(0, 0, ptW, ptH).data;
      ptCtx.clearRect(0, 0, ptW, ptH);

      const gap = 3;
      for (let y = 0; y < ptH; y += gap) {
        for (let x = 0; x < ptW; x += gap) {
          const index = (y * ptW + x) * 4;
          if (data[index + 3] > 128) {
            ptParticles.push({
              x,
              y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 2 + 1,
              hue: Math.random() * 60 + 280
            });
          }
        }
      }
    }

    function animateParticleText() {
      ptCtx.clearRect(0, 0, ptW, ptH);

      ptParticles.forEach((particle) => {
        if (ptMouse.x !== null && ptMouse.y !== null) {
          const dx = ptMouse.x - particle.x;
          const dy = ptMouse.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const force = (80 - dist) / 80;
            particle.vx -= dx * force * 0.03;
            particle.vy -= dy * force * 0.03;
          }
        }

        const dx = particle.originX - particle.x;
        const dy = particle.originY - particle.y;
        particle.vx += dx * 0.03;
        particle.vy += dy * 0.03;

        particle.vx *= 0.92;
        particle.vy *= 0.92;

        particle.x += particle.vx;
        particle.y += particle.vy;

        ptCtx.fillStyle = `hsla(${particle.hue}, 80%, 70%, 0.9)`;
        ptCtx.beginPath();
        ptCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ptCtx.fill();
      });

      animationFrameId = requestAnimationFrame(animateParticleText);
    }

    const handleMouseMove = (event) => {
      const rect = ptCanvas.getBoundingClientRect();
      ptMouse.x = event.clientX - rect.left;
      ptMouse.y = event.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeParticleText);

    resizeParticleText();
    animateParticleText();

    window.__particleTextInstance = {
      cancel: () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', resizeParticleText);
      }
    };
  }

  let sidebarEnabled = true;
  let particlesEnabled = true;
  let immersiveMode = false;

  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 60;

  function updateFPS() {
    frameCount += 1;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = now;
    }
    return fps;
  }

  function initSidebar() {
    if (!sidebarEnabled) return;

    function updateTime() {
      const timeEl = document.getElementById('holo-time');
      if (timeEl) {
        const now = new Date();
        timeEl.textContent = now.toLocaleTimeString('zh-CN', { hour12: false });
      }
    }

    setInterval(updateTime, 1000);
    updateTime();

    function updateFPSDisplay() {
      const fpsEl = document.getElementById('holo-fps');
      if (fpsEl) {
        fpsEl.textContent = updateFPS();
      }
      requestAnimationFrame(updateFPSDisplay);
    }
    updateFPSDisplay();

    window.addEventListener('mousemove', (event) => {
      const mouseEl = document.getElementById('holo-mouse');
      if (mouseEl) {
        mouseEl.textContent = `X: ${event.clientX.toString().padStart(4)} Y: ${event.clientY.toString().padStart(4)}`;
      }
    });

    function updateScrollProgress() {
      const scrollBar = document.getElementById('holo-scroll');
      const percentEl = document.getElementById('scroll-percent');
      const ringFill = document.getElementById('reading-progress');

      if (scrollBar || percentEl || ringFill) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        if (scrollBar) {
          scrollBar.style.width = `${scrollPercent}%`;
        }
        if (percentEl) {
          percentEl.textContent = `${Math.round(scrollPercent)}%`;
        }
        if (ringFill) {
          const offset = 100 - scrollPercent;
          ringFill.style.strokeDashoffset = offset;
        }
      }
      requestAnimationFrame(updateScrollProgress);
    }
    updateScrollProgress();

    const waveformCanvas = document.getElementById('holo-waveform');
    if (waveformCanvas) {
      const wfCtx = waveformCanvas.getContext('2d');
      let wavePhase = 0;

      function drawWaveform() {
        wfCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);
        wfCtx.beginPath();
        wfCtx.strokeStyle = 'rgba(0, 217, 255, 0.8)';
        wfCtx.lineWidth = 2;

        for (let x = 0; x < waveformCanvas.width; x++) {
          const y = waveformCanvas.height / 2
            + Math.sin((x + wavePhase) * 0.1) * 15
            + Math.sin((x + wavePhase * 1.5) * 0.05) * 10;

          if (x === 0) {
            wfCtx.moveTo(x, y);
          } else {
            wfCtx.lineTo(x, y);
          }
        }

        wfCtx.stroke();
        wavePhase += 2;
        requestAnimationFrame(drawWaveform);
      }
      drawWaveform();
    }

    const immersiveBtn = document.getElementById('immersive-mode-btn');
    if (immersiveBtn) {
      immersiveBtn.addEventListener('click', toggleImmersiveMode);
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const particleToggleBtn = document.getElementById('particle-toggle-btn');
    if (particleToggleBtn) {
      particleToggleBtn.addEventListener('click', toggleParticles);
    }

    const musicQuickToggle = document.getElementById('music-quick-toggle');
    if (musicQuickToggle) {
      musicQuickToggle.addEventListener('click', toggleMusic);
    }
  }

  function toggleImmersiveMode() {
    immersiveMode = !immersiveMode;
    const holoMonitor = document.querySelector('.holo-monitor');
    const neuroTools = document.querySelector('.neuro-tools');

    if (immersiveMode) {
      if (holoMonitor) holoMonitor.style.display = 'none';
      if (neuroTools) neuroTools.style.display = 'none';
    } else {
      if (holoMonitor) holoMonitor.style.display = 'block';
      if (neuroTools) neuroTools.style.display = 'flex';
    }
  }

  function toggleTheme() {
    const root = document.documentElement;
    const currentBg = getComputedStyle(root).getPropertyValue('--bg').trim();

    if (currentBg === '#1A1A1A') {
      root.style.setProperty('--bg', '#f5f5f5');
      root.style.setProperty('--bg-alt', '#ffffff');
      root.style.setProperty('--fg', '#1a1a1a');
      root.style.setProperty('--fg-muted', '#666666');
    } else {
      root.style.setProperty('--bg', '#1A1A1A');
      root.style.setProperty('--bg-alt', '#242424');
      root.style.setProperty('--fg', '#E8E4DE');
      root.style.setProperty('--fg-muted', '#9A9A9A');
    }
  }

  function toggleParticles() {
    particlesEnabled = !particlesEnabled;
    const particleCanvas = document.getElementById('particle-canvas');
    const particleTextCanvas = document.getElementById('particle-text-canvas');
    const cursorCanvas = document.getElementById('cursor-canvas');

    if (particlesEnabled) {
      if (particleCanvas) particleCanvas.style.display = 'block';
      if (particleTextCanvas) particleTextCanvas.style.display = 'block';
      if (cursorCanvas) cursorCanvas.style.display = 'block';
    } else {
      if (particleCanvas) particleCanvas.style.display = 'none';
      if (particleTextCanvas) particleTextCanvas.style.display = 'none';
      if (cursorCanvas) cursorCanvas.style.display = 'none';
    }
  }

  function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    if (!bgMusic) return;

    if (bgMusic.paused) {
      safePlayMedia(bgMusic);
      if (playBtn) playBtn.classList.add('hidden');
      if (pauseBtn) pauseBtn.classList.remove('hidden');
    } else {
      bgMusic.pause();
      if (pauseBtn) pauseBtn.classList.add('hidden');
      if (playBtn) playBtn.classList.remove('hidden');
    }
  }

  function initApp() {
    if (window.__JUWEB_APP_INITIALIZED) return;
    window.__JUWEB_APP_INITIALIZED = true;

    initVideoBackground();
    initScrollReveal();
    initMusicControl();
    initClickEffect();
    initRippleEffect();
    initAdvancedCursorEffect();
    initMagneticEffect();
    initParticleAnimation();
    initParticleText();
    initSidebar();
  }

  window.initScrollReveal = initScrollReveal;
  window.initSidebar = initSidebar;
  window.toggleTheme = toggleTheme;
  window.toggleMusic = toggleMusic;
  window.toggleParticles = toggleParticles;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp, { once: true });
  } else {
    initApp();
  }
})();
