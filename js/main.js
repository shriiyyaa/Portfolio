/* =============================================
   SHRIYA NAYYAR PORTFOLIO - MAIN JAVASCRIPT
   Interactivity, Animations, Scroll Effects
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // ========== SCROLL PROGRESS INDICATOR ==========
  const scrollIndicator = document.getElementById('scrollIndicator');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollIndicator.style.width = `${scrollPercent}%`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 20;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== SCROLL REVEAL ANIMATIONS ==========
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after revealing to save resources
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ========== SECTION FADE-IN ON SCROLL ==========
  const sections = document.querySelectorAll('.section');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
      }
    });
  }, {
    threshold: 0.05
  });

  sections.forEach(section => {
    if (section.id !== 'hero') {
      sectionObserver.observe(section);
    }
  });

  // ========== DOODLE PARALLAX EFFECT ==========
  const doodles = document.querySelectorAll('.doodle');
  let ticking = false;

  function updateDoodlePositions() {
    const scrollY = window.scrollY;

    doodles.forEach((doodle, index) => {
      const speed = 0.02 + (index * 0.01);
      const rotation = Math.sin(scrollY * 0.002 + index) * 3;
      const yOffset = scrollY * speed;

      doodle.style.transform = `translateY(${-yOffset}px) rotate(${rotation}deg)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateDoodlePositions);
      ticking = true;
    }
  }, { passive: true });

  // ========== CARD TILT EFFECT ON HOVER ==========
  const cards = document.querySelectorAll('.system-card, .casestudy-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ========== BUTTON RIPPLE EFFECT ==========
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ========== DYNAMIC PAGE TITLE ==========
  const originalTitle = document.title;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = 'Come back soon!';
    } else {
      document.title = originalTitle;
    }
  });

  // ========== KEYBOARD NAVIGATION ==========
  document.addEventListener('keydown', (e) => {
    // Press 'S' to go to Systems
    if (e.key === 's' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
      document.querySelector('#systems')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'C' to go to Case Studies
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
      document.querySelector('#casestudies')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'A' to go to About
    if (e.key === 'a' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
      document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    }
    // Press 'H' to go to Hero/Home
    if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !isInputFocused()) {
      document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  function isInputFocused() {
    const activeElement = document.activeElement;
    return activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.isContentEditable;
  }


  // ========== LOGIC FLOW ANIMATION (SEQUENTIAL) ==========
  const vizObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const children = entry.target.querySelectorAll('.system-viz-block, .system-viz-arrow');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 150}ms`; // Staggered delay
        });
        vizObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.system-viz').forEach(viz => vizObserver.observe(viz));

  // ========== HERO TYPEWRITER EFFECT ==========
  const heroHighlight = document.querySelector('.hero-title .highlight');
  if (heroHighlight) {
    const text = "intelligent digital systems.";
    heroHighlight.textContent = "";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        heroHighlight.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    setTimeout(typeWriter, 800);
  }

  // ========== MAGNETIC BUTTONS ==========
  const magneticButtons = document.querySelectorAll('.btn');

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 768) {
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) rotate(${x * 0.05}deg)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) rotate(0)';
      });
    });
  }


  // ========== DARK MODE TOGGLE ==========
  const toggleBtn = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Load saved theme
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme == 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (currentTheme == 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    // Default to light if no preference saved
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      let theme = 'light';
      if (document.documentElement.getAttribute('data-theme') !== 'dark') {
        theme = 'dark';
      }
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }

  // ========== MUSHROOM CURSOR FOLLOWER (CHICK) ==========
  const chick = document.getElementById('chick-follower');
  if (chick) {
    let mouseX = 0, mouseY = 0;
    let chickX = 0, chickY = 0;
    let walkCycle = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Opacity handled in animateChick
    });

    function animateChick() {
      // Constant Slow Speed (Creeping)
      const dx = mouseX - chickX;
      const dy = mouseY - chickY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Speed: 0.8px/frame (Faster creep)
      const speed = 0.8;

      // Disappear if reached target (within range) -> USER WANTS IT VISIBLE
      // chick.style.opacity = 1; // Always visible
      chick.style.opacity = 1;

      if (distance > 1) {
        const moveDist = Math.min(distance, speed);
        const vx = (dx / distance) * moveDist;
        const vy = (dy / distance) * moveDist;

        chickX += vx;
        chickY += vy;

        // Walking Waddle (Quicker steps because movement is slow)
        walkCycle += 0.2;
        const rotation = Math.sin(walkCycle) * 12; // More tilt
        const bounce = Math.abs(Math.sin(walkCycle * 2)) * 4;

        // Face direction
        const direction = dx > 0 ? 1 : -1;

        chick.style.transform = `translate(${chickX}px, ${chickY}px) translate(-50%, -50%) scaleX(${direction}) rotate(${rotation}deg) translateY(${-bounce}px)`;
      } else {
        chick.style.transform = `translate(${chickX}px, ${chickY}px) translate(-50%, -50%) scaleX(${mouseX > chickX ? 1 : -1})`;
      }

      requestAnimationFrame(animateChick);
    }
    animateChick();
  }

  // ========== CONSOLE EASTER EGG ==========
  console.log(`
  ╔═══════════════════════════════════════════════════╗
  ║                                                   ║
  ║   👋 Hey there, curious developer!                ║
  ║                                                   ║
  ║   Thanks for checking out my code.                ║
  ║   If you're here, we probably think alike.        ║
  ║                                                   ║
  ║   Let's connect: nayyarshriya825@gmail.com        ║
  ║                                                   ║
  ║   — Shriya ✨                                     ║
  ║                                                   ║
  ╚═══════════════════════════════════════════════════╝
  `);

  // ========== PERFORMANCE: REDUCE MOTION IF PREFERRED ==========
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';

    // Disable parallax for doodles
    doodles.forEach(doodle => {
      doodle.style.animation = 'none';
    });
  }
});

// ========== RIPPLE EFFECT STYLES (injected dynamically) ==========
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: rippleAnimation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes rippleAnimation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyles);
