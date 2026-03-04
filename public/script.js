// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global Lenis instance for smooth scrolling
let lenis = null;

// Initialize Lenis and connect it to GSAP ScrollTrigger
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  lenis = new Lenis({
    lerp: 0.08,              // lower lerp = smoother, more buttery feel
    wheelMultiplier: 1,      // natural wheel speed
    touchMultiplier: 1,
    anchors: {
      offset: 80
    }
  });

  // Sync Lenis with ScrollTrigger so all scroll animations stay in sync
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    if (lenis) {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
    }
  });

  gsap.ticker.lagSmoothing(0);
}

// Run Lenis and opening/loading screen after all assets are loaded
window.addEventListener('load', () => {
  initLenis();
  initOpeningSection();
});

// ================= Creative Opening Section =================
function initOpeningSection() {
  const openingSection = document.getElementById('openingSection');
  if (!openingSection) return;
  
  // Add loaded class for background effects
  openingSection.classList.add('loaded');
  
  // Animate WELCOME TO MY WEBSITE text letters on load with staggered slide-up effect
  setTimeout(() => {
    const helloText = document.querySelector('.hello-text');
    const letters = document.querySelectorAll('.hello-text .letter');
    const decoration = document.querySelector('.hello-decoration');
    const intro = document.querySelector('.opening-intro');
    const introText = document.querySelector('.intro-text');
    const accent = document.querySelector('.intro-text .accent');
    const introSubtitle = document.querySelector('.intro-subtitle');
    
    if (helloText) {
      helloText.classList.add('revealed');
      
      // Animate each letter with staggered delay using GSAP
      gsap.fromTo(letters, 
        { 
          opacity: 0,
          y: 80,
          scale: 0.8,
          filter: 'blur(10px)'
        },
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3
        }
      );
      
      // Add glow effect after letters reveal
      gsap.to(letters, {
        textShadow: '0 0 20px rgba(255, 7, 58, 0.4)',
        stagger: 0.1,
        delay: 1.5,
        duration: 0.5
      });
    }
    
    if (decoration) {
      // Initial state for decoration
      gsap.set(decoration, { opacity: 0, filter: 'blur(10px)', y: 20 });
      
      // Staggered animation for dots with fade and blur
      gsap.to(decoration, {
        duration: 1.2,
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        delay: 0.8,
        ease: 'power3.out'
      });
      decoration.classList.add('revealed');
    }
    
    if (intro) {
      // Initial state for intro
      gsap.set(intro, { opacity: 0, filter: 'blur(15px)', y: 40 });
      
      intro.classList.add('revealed');
      
      // GSAP enhanced animation for intro section
      gsap.to(intro, {
        duration: 1.4,
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        delay: 1.2,
        ease: 'power3.out'
      });
    }
    
    // Animate individual intro elements with stagger
    if (introText) {
      gsap.fromTo(introText,
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        {
          duration: 1.3,
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          delay: 1.5,
          ease: 'power3.out'
        }
      );
    }
    
    if (accent) {
      gsap.fromTo(accent,
        { opacity: 0, filter: 'blur(8px)' },
        {
          duration: 1.3,
          opacity: 1,
          filter: 'blur(0px)',
          delay: 1.7,
          ease: 'power3.out'
        }
      );
    }
    
    if (introSubtitle) {
      gsap.fromTo(introSubtitle,
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        {
          duration: 1.3,
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          delay: 1.9,
          ease: 'power3.out',
          onComplete: () => {
            // All animations complete - fade out opening section after a brief pause
            setTimeout(() => {
              fadeOutOpeningSection();
            }, 1500); // Wait 1.5 seconds before fading out
          }
        }
      );
    }
  }, 800);
}

// Function to fade out opening section and reveal main content
function fadeOutOpeningSection() {
  const openingSection = document.getElementById('openingSection');
  
  if (openingSection) {
    // Allow page to scroll once loading screen starts disappearing
    document.body.classList.remove('loading');

    // Zoom up and fade out the loading screen
    gsap.to(openingSection, {
      duration: 0.9,
      opacity: 0,
      y: -80,
      scale: 1.1,
      ease: 'power3.inOut',
      onComplete: () => {
        openingSection.style.display = 'none';
      }
    });

    // Trigger all page section animations immediately
    triggerPageAnimations();
  }
}

// Function to trigger all page section animations
function triggerPageAnimations() {
  // Set initial states for all elements (coming from bottom with fade)
  gsap.set('.intro-left', { y: 80, opacity: 0, filter: 'blur(8px)' });
  gsap.set('.intro-right', { y: 80, opacity: 0, filter: 'blur(8px)' });
  gsap.set('.stats-grid > div', { y: 80, opacity: 0, filter: 'blur(6px)' });
  gsap.set('.bio', { y: 80, opacity: 0, filter: 'blur(8px)' });
  gsap.set('.about', { y: 80, opacity: 0, filter: 'blur(8px)' });
  gsap.set('#frontend-skills, #backend-skills', { y: 70, opacity: 0, filter: 'blur(6px)' });
  gsap.set('.skill-item', { y: 70, opacity: 0, filter: 'blur(5px)' });
  gsap.set('#projects-title', { y: 60, opacity: 0, filter: 'blur(6px)' });
  gsap.set('.project-card', { y: 80, opacity: 0, filter: 'blur(8px)' });
  gsap.set('#contacts', { y: 70, opacity: 0, filter: 'blur(6px)' });
  gsap.set('.social-link', { y: 60, opacity: 0, filter: 'blur(4px)' });
  gsap.set('.contact-form', { y: 80, opacity: 0, filter: 'blur(8px)' });
  
  // Create a master timeline with smooth, modern entrance animations
  const tl = gsap.timeline();
  
  // ===== INTRO SECTION - Slide up from bottom =====
  tl.to(['.intro-left', '.intro-right'], { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.9, 
    ease: 'power2.out',
    stagger: 0.12
  })
  
  // ===== STATS GRID - Simple upward cascade =====
  .to('.stats-grid > div', { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.7, 
    ease: 'power2.out', 
    stagger: 0.1
  }, '-=0.5')
  
  // ===== BIO SECTION - Minimal fade/slide =====
  .to('.bio', { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.7, 
    ease: 'power2.out' 
  }, '-=0.3')
  
  // ===== ABOUT CARDS - Staggered slide up =====
  .to('.about', { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.7, 
    ease: 'power2.out', 
    stagger: 0.12
  }, '-=0.25')
  
  // ===== SKILLS TITLES - Simple fade up =====
  .to('#frontend-skills, #backend-skills', { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.7, 
    ease: 'power2.out' 
  }, '-=0.35')
  
  // ===== SKILL ITEMS - Clean slide up =====
  .to('.skill-item', { 
    y: 0,
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.6, 
    ease: 'power2.out', 
    stagger: 0.05
  }, '-=0.35')
  
  // ===== PROJECTS TITLE =====
  .to('#projects-title', { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.6, 
    ease: 'power2.out' 
  }, '-=0.25')
  
  // ===== PROJECT CARDS - Staggered slide up =====
  .to('.project-card', { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.7, 
    ease: 'power2.out', 
    stagger: 0.1
  }, '-=0.35')
  
  // ===== CONTACT SECTION TITLE =====
  .to('#contacts', { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.7, 
    ease: 'power2.out' 
  }, '-=0.25')
  
  // ===== SOCIAL LINKS - Simple slide up =====
  .to('.social-link', { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    duration: 0.5, 
    ease: 'power2.out', 
    stagger: 0.08
  }, '-=0.3')
  
  // ===== CONTACT FORM - Final soft zoom =====
  .to('.contact-form', { 
    y: 0, 
    opacity: 1, 
    filter: 'blur(0px)',
    scale: 1,
    duration: 0.7, 
    ease: 'power2.out' 
  }, '-=0.25');
  
  // Add additional parallax and floating effects
  addCreativeScrollEffects();
}

// ================= Creative Scroll Effects & Parallax =================
function addCreativeScrollEffects() {
  // Add floating animation to stats cards during scroll
  gsap.utils.toArray('.stats-grid > div').forEach((stat, i) => {
    gsap.fromTo(stat,
      { y: 0 },
      {
        y: -15 + (i % 2) * 10,
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          markers: false
        },
        ease: 'none'
      }
    );
  });
  
  // Parallax effect on about cards
  gsap.utils.toArray('.about').forEach((card, i) => {
    const direction = i % 2 === 0 ? -15 : 15;
    gsap.fromTo(card,
      { y: 0, rotationZ: 0 },
      {
        y: direction,
        rotationZ: i % 2 === 0 ? 1 : -1,
        scrollTrigger: {
          trigger: card,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1.5,
          markers: false
        },
        ease: 'none'
      }
    );
  });
  
  // Skill items hover lift effect on scroll
  gsap.utils.toArray('.skill-item').forEach((skill, i) => {
    const delay = i * 0.015;
    gsap.fromTo(skill,
      { 
        y: 0,
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.2)'
      },
      {
        y: -8,
        boxShadow: '0 15px 40px rgba(255, 7, 58, 0.25)',
        scrollTrigger: {
          trigger: skill,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 1,
          markers: false
        },
        ease: 'sine.inOut',
        delay: delay
      }
    );
  });
  
  // Project cards flip effect on scroll
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
      { rotationY: 0, scale: 1 },
      {
        rotationY: 3 + (i % 2) * -6,
        transformPerspective: 1200,
        scrollTrigger: {
          trigger: card,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 2,
          markers: false
        },
        ease: 'none'
      }
    );
  });
  
  // Contact form scaling parallax
  gsap.fromTo('.contact-form',
    { scale: 0.98, filter: 'blur(0px)' },
    {
      scale: 1.02,
      filter: 'blur(0px)',
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        markers: false
      },
      ease: 'none'
    }
  );
  
  // Add staggered glow effect on social links
  gsap.utils.toArray('.social-link').forEach((link, i) => {
    gsap.fromTo(link,
      { filter: 'drop-shadow(0 0 0px rgba(255, 7, 58, 0))' },
      {
        filter: 'drop-shadow(0 0 15px rgba(255, 7, 58, 0.4))',
        scrollTrigger: {
          trigger: link,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
          markers: false
        },
        ease: 'none',
        delay: i * 0.1
      }
    );
  });
  
  // Divider line animations
  gsap.utils.toArray('.divider').forEach((divider) => {
    gsap.fromTo(divider,
      { 
        opacity: 0.3, 
        scaleX: 0.8 
      },
      {
        opacity: 0.8,
        scaleX: 1,
        scrollTrigger: {
          trigger: divider,
          start: 'top 90%',
          end: 'top 50%',
          scrub: 1,
          markers: false
        },
        ease: 'power2.out'
      }
    );
  });
}

// === Interactive Mouse Parallax Effects ===
function addMouseParallax() {
  // Add subtle mouse parallax to project cards
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      
      // Only apply effect if card is visible
      if (rect.top > -rect.height && rect.top < window.innerHeight) {
        const rotateX = (mouseY - 0.5) * 2;
        const rotateY = (mouseX - 0.5) * -2;
        
        gsap.to(card, {
          rotationX: rotateX * 0.5,
          rotationY: rotateY * 0.5,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });
  });
  
  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    gsap.to('.project-card', {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
}

// == GSAP Smooth Scrolling Functionality ==
document.addEventListener('DOMContentLoaded', function () {
  
  // GSAP enhanced smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]:not(.nav-btn)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        if (lenis) {
          lenis.scrollTo(targetElement, { offset: 80 });
        } else {
          // Fallback to GSAP scrollTo if Lenis is not available
          gsap.to(window, {
            duration: 1.2,
            scrollTo: {
              y: targetElement,
              offsetY: 80
            },
            ease: "power2.inOut"
          });
        }
      }
    });
  });

  // Add scroll progress indicator
  const addScrollProgress = () => {
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress';
    progressIndicator.innerHTML = `
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    `;
    document.body.appendChild(progressIndicator);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.querySelector('.progress-fill').style.width = scrollPercent + '%';
    });
  };

  // Initialize scroll progress
  addScrollProgress();

  //== GSAP ScrollTrigger Animations ==
  // Animate intro section elements when they come into view (bidirectional)
  gsap.to('.intro-left', {
    duration: 1.2,
    x: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '.intro-left',
      start: 'top 85%',
      end: 'top 30%',
      toggleActions: 'play reverse play reverse',
      scrub: false
    },
    ease: 'power3.out'
  });

  gsap.to('.intro-right', {
    duration: 1.2,
    x: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '.intro-right',
      start: 'top 85%',
      end: 'top 30%',
      toggleActions: 'play reverse play reverse',
      scrub: false
    },
    ease: 'power3.out'
  });
  
  // Parallax effect for intro images
  gsap.to('.intro-img', {
    y: -30,
    scrollTrigger: {
      trigger: '.intro-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    ease: 'none'
  });

  // Animate stats grid items
  gsap.utils.toArray('.stats-grid > div').forEach((stat, i) => {
    gsap.to(stat, {
      duration: 1,
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: stat,
        start: 'top 90%',
        end: 'top 40%',
        toggleActions: 'play reverse play reverse',
        scrub: false
      },
      ease: 'back.out(1.7)',
      delay: i * 0.1
    });
  });
  
  // Parallax for stats section background
  gsap.fromTo('.stats-section', 
    { backgroundPositionY: '0%' },
    {
      backgroundPositionY: '50%',
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      ease: 'none'
    }
  );

  // Animate bio section
  gsap.to('.bio', {
    duration: 1.2,
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '.bio',
      start: 'top 85%',
      end: 'top 35%',
      toggleActions: 'play reverse play reverse',
      scrub: false
    },
    ease: 'power3.out'
  });
  
  // Scale effect for bio image
  gsap.fromTo('.profile-img',
    { scale: 1.1 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: '.bio',
        start: 'top bottom',
        end: 'center center',
        scrub: true
      },
      ease: 'none'
    }
  );

  // Animate about section cards
  gsap.utils.toArray('.about').forEach((about, i) => {
    gsap.to(about, {
      duration: 1,
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: about,
        start: 'top 85%',
        end: 'top 40%',
        toggleActions: 'play reverse play reverse',
        scrub: false
      },
      ease: 'power3.out',
      delay: i * 0.1
    });
  });

  // Animate skills container and items
  gsap.to('#frontend-skills, #backend-skills', {
    duration: 1.2,
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '#frontend-skills',
      start: 'top 85%',
      end: 'top 40%',
      toggleActions: 'play reverse play reverse',
      scrub: false
    },
    ease: 'power3.out'
  });

  gsap.utils.toArray('.skill-item').forEach((skill, i) => {
    gsap.to(skill, {
      duration: 0.8,
      scale: 1,
      opacity: 1,
      scrollTrigger: {
        trigger: skill,
        start: 'top 90%',
        end: 'top 45%',
        toggleActions: 'play reverse play reverse',
        scrub: false
      },
      ease: 'back.out(1.7)',
      delay: i * 0.05
    });
  });
  
  // Floating effect for skill icons on scroll
  gsap.utils.toArray('.skill-icon').forEach((icon, i) => {
    gsap.fromTo(icon,
      { y: -20, rotation: -5 },
      {
        y: 0,
        rotation: 0,
        scrollTrigger: {
          trigger: icon.parentElement,
          start: 'top bottom',
          end: 'center center',
          scrub: true
        },
        ease: 'power2.out'
      }
    );
  });

  // Animate projects section
  gsap.to('#projects-title', {
    duration: 1.2,
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '#projects-title',
      start: 'top 85%',
      end: 'top 40%',
      toggleActions: 'play reverse play reverse',
      scrub: false
    },
    ease: 'power3.out'
  });

  gsap.utils.toArray('.project-card').forEach((project, i) => {
    gsap.to(project, {
      duration: 1,
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: project,
        start: 'top 85%',
        end: 'top 45%',
        toggleActions: 'play reverse play reverse',
        scrub: false
      },
      ease: 'power3.out',
      delay: i * 0.1
    });
  });
  
  // Scale and lift effect for project cards
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
      { scale: 0.95, y: 30 },
      {
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'center center',
          scrub: true
        },
        ease: 'power2.out'
      }
    );
  });

  // Animate contact section
  gsap.to('#contacts', {
    duration: 1.2,
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '#contacts',
      start: 'top 85%',
      end: 'top 40%',
      toggleActions: 'play reverse play reverse',
      scrub: false
    },
    ease: 'power3.out'
  });

  // Animate social links
  gsap.utils.toArray('.social-link').forEach((link, i) => {
    gsap.to(link, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: link,
        start: 'top 85%',
        end: 'top 45%',
        toggleActions: 'play reverse play reverse',
        scrub: false
      },
      ease: 'back.out(1.7)',
      delay: i * 0.1
    });
  });

  // Animate contact form
  gsap.to('.contact-form', {
    duration: 1.2,
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 85%',
      end: 'top 45%',
      toggleActions: 'play reverse play reverse',
      scrub: false
    },
    ease: 'power3.out'
  });
  
  // Smooth fade-in for form inputs
  gsap.utils.toArray('.form-group input, .form-group textarea').forEach((input, i) => {
    gsap.fromTo(input,
      { opacity: 0.7, scale: 0.98 },
      {
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: input,
          start: 'top bottom',
          end: 'center center',
          scrub: true
        },
        ease: 'power2.out'
      }
    );
  });

  // ================= CV Download Feedback =================
  // Add feedback for CV download buttons
  document.querySelectorAll('a[href*="pdf"]:not([href^="#"])').forEach(link => {
    link.addEventListener('click', function(e) {
      // Visual feedback for CV buttons
      this.style.transform = 'scale(0.95)';
      this.style.boxShadow = '0 5px 15px rgba(255, 7, 58, 0.6)';
      
      setTimeout(() => {
        this.style.transform = '';
        this.style.boxShadow = '';
      }, 200);
    });
  });

  // ================= Scroll Animation Observer for Cards =================
  // Initialize Intersection Observer for smooth scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for smooth cascading animation
        setTimeout(() => {
          entry.target.classList.add('scroll-animated');
          
          // Add hover pop-up animation with GSAP
          addPopUpHoverAnimation(entry.target);
        }, index * 50);
        
        // Stop observing once animated
        scrollAnimationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all about and skill cards
  document.querySelectorAll('.about, .skill-item').forEach(card => {
    scrollAnimationObserver.observe(card);
  });

  // ================= Enhanced Pop-Up Hover Effects =================
  function addPopUpHoverAnimation(element) {
    let animationId = null;

    element.addEventListener('mouseenter', function() {
      // Kill any existing animation
      if (animationId) {
        gsap.killTweensOf(this);
      }

      // Create smooth pop-up animation with spring effect
      gsap.to(this, {
        duration: 0.4,
        y: -20,
        scale: 1.08,
        boxShadow: '0 25px 60px rgba(255, 7, 58, 0.4), inset 0 0 25px rgba(255, 7, 58, 0.15)',
        ease: 'back.out(1.8)',
        overwrite: 'auto'
      });

      // Animate internal elements
      gsap.to(this.querySelectorAll('h3, .skill-name'), {
        duration: 0.3,
        color: '#ffffff',
        textShadow: '0 0 20px rgba(255, 7, 58, 0.6)',
        ease: 'power2.out'
      });

      // Rotate and scale skill icons
      gsap.to(this.querySelectorAll('.skill-icon img'), {
        duration: 0.5,
        rotation: 8,
        scale: 1.15,
        ease: 'back.out(1.5)'
      });

      // Animate border
      gsap.to(this, {
        duration: 0.3,
        borderColor: 'rgba(255, 7, 58, 0.8)',
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', function() {
      // Kill any existing animation
      gsap.killTweensOf(this);

      // Smooth return animation
      gsap.to(this, {
        duration: 0.5,
        y: 0,
        scale: 1,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // Reset internal elements
      gsap.to(this.querySelectorAll('h3, .skill-name'), {
        duration: 0.3,
        color: 'rgba(255, 255, 255, 0.95)',
        textShadow: '0 0 0px rgba(255, 7, 58, 0)',
        ease: 'power2.out'
      });

      // Reset skill icons
      gsap.to(this.querySelectorAll('.skill-icon img'), {
        duration: 0.5,
        rotation: 0,
        scale: 1,
        ease: 'power2.out'
      });

      // Reset border
      gsap.to(this, {
        duration: 0.3,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        ease: 'power2.out'
      });
    });

    // Add mouse move parallax effect
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) * 0.05;
      const rotateY = (centerX - x) * 0.05;

      gsap.to(this, {
        duration: 0.3,
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', function() {
      gsap.to(this, {
        duration: 0.5,
        rotationX: 0,
        rotationY: 0,
        ease: 'power2.out'
      });
    });
  }
  
  // ================= Enhanced Smooth Scroll Navigation =================
  // Ultra-smooth scroll to section when clicking nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      const navToggle = document.querySelector('.nav-toggle');
      const navMenu = document.querySelector('.nav-menu');
      if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
      
      // Smooth scroll with Lenis if available, otherwise fallback to GSAP
      if (lenis) {
        lenis.scrollTo(targetElement, { offset: 70 });
      } else {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: targetElement,
            offsetY: 70
          },
          ease: 'power3.inOut'
        });
      }
    });
  });

  // ================= Skills =================
  const frontendSkills = [
    { name: 'JavaScript', level: 'Expert', icon: '<img src="img/Skills icons/javascript.svg" alt="JavaScript" class="custom-icon">' },
    { name: 'TypeScript', level: 'Advanced', icon: '<img src="img/Skills icons/typescript.svg" alt="TypeScript" class="custom-icon">' },
    { name: 'HTML5', level: 'Expert', icon: '<img src="img/Skills icons/html-5.svg" alt="HTML5" class="custom-icon">' },
    { name: 'CSS3', level: 'Expert', icon: '<img src="img/Skills icons/css.svg" alt="CSS3" class="custom-icon">'},
    { name: 'React', level: 'Advanced', icon: '<img src="img/Skills icons/react.svg" alt="React" class="custom-icon">' },
    { name: 'Tailwind CSS', level: 'Advanced', icon: '<img src="img/Skills icons/icons8-tailwindcss.svg" alt="Tailwind CSS" class="custom-icon">' },
    { name: 'next.js', level: 'Intermediate', icon: '<img src="img/Skills icons/Next.js_Symbol_0.svg" alt="next.js" class="custom-icon">' },
    { name: 'vite', level: 'Intermediate', icon: '<img src="img/Skills icons/vite.svg" alt="vite" class="custom-icon">' },
    { name: 'Figma', level: 'Intermediate', icon: '<img src="img/Skills icons/figma.svg" alt="Figma" class="custom-icon">' },
    { name: 'Redux', level: 'Advanced', icon: '<img src="img/Skills icons/redux.svg" alt="Redux" class="custom-icon">' },
    { name: 'GSAP', level: 'Intermediate', icon: '<img src="img/Skills icons/gsap-greensock.svg" alt="GSAP" class="custom-icon">' }
  ];

  const backendSkills = [
    { name: 'Node.js', level: 'Advanced', icon: '<img src="img/Skills icons/Node.js.svg" alt="Node.js" class="custom-icon">' },
    { name: 'NestJS', level: 'Advanced', icon: '<img src="img/Skills icons/nestjs-svgrepo-com.svg" alt="NestJS" class="custom-icon">' },
    { name: 'Express', level: 'Advanced', icon: '<img src="img/Skills icons/express.svg" alt="Express" class="custom-icon">' },
    { name: 'Python', level: 'Intermediate', icon: '<img src="img/Skills icons/python.svg" alt="Python" class="custom-icon">' },
    { name: 'MongoDB', level: 'Intermediate', icon: '<img src="img/Skills icons/mongodb.svg" alt="MongoDB" class="custom-icon">' },
    { name: 'MySQL', level: 'Intermediate', icon: '<img src="img/Skills icons/mysql.svg" alt="MySQL" class="custom-icon">' },
    { name: 'RESTful APIs', level: 'Expert', icon: '<img src="img/Skills icons/rest-api-icon.svg" alt="RESTful APIs" class="custom-icon">' },
    { name: 'Git', level: 'Intermediate', icon: '<img src="img/Skills icons/git.svg" alt="Git" class="custom-icon">' },
    { name: 'Docker', level: 'Intermediate', icon: '<img src="img/Skills icons/Docker.svg" alt="Docker" class="custom-icon">' }
  ];

  // ================= Social Links =================
  const socialLinks = [
    { name: 'Facebook', icon: '<i class="fab fa-facebook"></i>', url: 'https://www.facebook.com/AhmedBakruwk' },
    { name: 'Instagram', icon: '<i class="fab fa-instagram"></i>', url: 'https://www.instagram.com/_.aatrox/' },
    { name: 'GitHub', icon: '<i class="fab fa-github"></i>', url: 'https://github.com/Mody-ctrl' },
    { name: 'LinkedIn', icon: '<i class="fab fa-linkedin"></i>', url: 'https://www.linkedin.com/in/ahmed-abobaker-4705102a4' },
    { name: 'WhatsApp', icon: '<i class="fab fa-whatsapp text-green-500"></i>', url: 'https://wa.me/201015605634' },
    { name: 'Gmail', icon: '<i class="fas fa-envelope text-red-500"></i>', url: 'mailto:ahmedabobakerasms55@gmail.com' }
  ];

  // ================= Projects =================
  const projects = [
    {
      title: 'Shop Hub',
      description: 'ShopHub premium shopping website with modern UI, cart functionality, and seamless checkout experience.',
      url: 'https://shop-hub-topaz-xi.vercel.app/',
      github: 'https://github.com/Mody-ctrl/shop-hub',
      icon: 'fa-shopping-bag',
      image: 'img/ShopHub.png',
      tags: ['React', 'CSS', 'HTML']
    },
    {
      title: 'CSS Reference Guide',
      description: 'Complete interactive guide to CSS properties and techniques for developers of all levels.',
      url: 'https://css-refrences-guide.vercel.app/',
      github: 'https://github.com/Mody-ctrl/css-reference-guide',
      icon: 'fa-palette',
      image: 'img/Css Website.png',
      tags: ['HTML', 'CSS', 'JavaScript','TypeScript']
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio showcasing projects, skills, and professional journey.',
      url: 'https://mody-ctrl.github.io/Portfolio/',
      github: 'https://github.com/Mody-ctrl/Portfolio',
      icon: 'fa-briefcase',
      image: 'img/photo_2025-12-24_18-27-29.jpg',
      tags: ['HTML', 'CSS', 'JavaScript','GSAP','Node.js','Express.js']
    },
    {
      title: 'Games Website',
      description: 'Contains classic games from 2010.',
      url: 'https://mody-ctrl.github.io/Portfolio/',
      github: 'https://github.com/Mody-ctrl/games-website',
      icon: 'fa-gamepad',
      image: 'img/Background.jpg',
      tags: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  // ================= Render Frontend Skills =================
  const frontendSkillsContainer = document.getElementById('frontend-skills');
  if (frontendSkillsContainer) {
    frontendSkills.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill-item';
      div.innerHTML = `${skill.icon ? `<span class="skill-icon">${skill.icon}</span>` : ''}
      ${skill.name ? `<span class="skill-name">${skill.name}</span>` : ''} 
      ${skill.level ? `<span class="skill-level">${skill.level}</span>` : ''}`;
      frontendSkillsContainer.appendChild(div);
    });
  }

  // ================= Render Backend Skills =================
  const backendSkillsContainer = document.getElementById('backend-skills');
  if (backendSkillsContainer) {
    backendSkills.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill-item';
      div.innerHTML = `${skill.icon ? `<span class="skill-icon">${skill.icon}</span>` : ''}
      ${skill.name ? `<span class="skill-name">${skill.name}</span>` : ''} 
      ${skill.level ? `<span class="skill-level">${skill.level}</span>` : ''}`;
      backendSkillsContainer.appendChild(div);
    });
  }

  // ================= Render Social Links =================
  const socialLinksContainer = document.getElementById('contact');
  if (socialLinksContainer) {
    socialLinks.forEach(link => {
      const a = document.createElement('a');
      a.className = 'social-link';
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = `${link.icon} ${link.name}`;
      socialLinksContainer.appendChild(a);
    });
  }

  // ================= Render Projects =================
  const projectsContainer = document.getElementById('projects');
  if (projectsContainer) {
    projects.forEach((project, index) => {
      const projectElement = document.createElement('div');
      projectElement.className = 'project-card';

      const tagsHTML = project.tags
        .map(tag => `<span class="project-tag">${tag}</span>`)
        .join('');

      projectElement.innerHTML = `
        <span class="project-number">0${index + 1}</span>
        <img src="${project.image}" alt="${project.title}" class="project-image">
        <div class="project-icon">
          <i class="fas ${project.icon}"></i>
        </div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">${tagsHTML}</div>
        <div class="project-links">
          <a href="${project.url}" target="_blank" class="project-link">
            View Project <i class="fas fa-arrow-right"></i>
          </a>
          <a href="${project.github}" target="_blank" class="project-link github-link">
            <i class="fab fa-github"></i> GitHub
          </a>
        </div>
        <div class="project-corner"></div>
      `;

      projectsContainer.appendChild(projectElement);
    });
  }

  // ================= Contact Form Handling =================
  initializeContactForm();
  
  // ================= Add Interactive Mouse Parallax =================
  addMouseParallax();
});

// ================= Contact Form Functionality =================
function initializeContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  // Add loading state elements
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.querySelector('span').textContent;
  
  // Create loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'form-loading';
  loadingIndicator.innerHTML = '<div class="spinner"></div>';
  loadingIndicator.style.display = 'none';
  submitButton.parentNode.insertBefore(loadingIndicator, submitButton);

  // Add form event listener
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();
    
    // Validate form data
    const validation = validateForm({ name, email, message });
    if (!validation.isValid) {
      showFormErrors(validation.errors);
      return;
    }
    
    // Clear previous errors
    clearFormErrors();
    
    // Show loading state
    setFormLoading(true, submitButton, loadingIndicator, originalButtonText);
    
    try {
      // Submit to backend API
      const response = await submitContactForm({ name, email, message });
      
      if (response.success) {
        // Show success message
        showFormSuccess('Message sent successfully! I\'ll get back to you soon.');
        contactForm.reset();
      } else {
        // Show error message
        showFormError(response.error?.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showFormError('Network error. Please check your connection and try again.');
    } finally {
      // Hide loading state
      setFormLoading(false, submitButton, loadingIndicator, originalButtonText);
    }
  });

  // Add input validation on blur
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      const fieldName = this.name || (this.type === 'text' ? 'name' : this.type);
      const value = this.value.trim();
      
      if (value) {
        const validation = validateField(fieldName, value);
        if (!validation.isValid) {
          showFieldError(this, validation.error);
        } else {
          clearFieldError(this);
        }
      }
    });
  });
}

// Form validation functions
function validateForm(data) {
  const errors = [];
  
  // Name validation
  const nameValidation = validateField('name', data.name);
  if (!nameValidation.isValid) {
    errors.push({ field: 'name', message: nameValidation.error });
  }
  
  // Email validation
  const emailValidation = validateField('email', data.email);
  if (!emailValidation.isValid) {
    errors.push({ field: 'email', message: emailValidation.error });
  }
  
  // Message validation
  const messageValidation = validateField('message', data.message);
  if (!messageValidation.isValid) {
    errors.push({ field: 'message', message: messageValidation.error });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateField(field, value) {
  switch (field) {
    case 'name':
      if (!value) return { isValid: false, error: 'Name is required' };
      if (value.length < 2) return { isValid: false, error: 'Name must be at least 2 characters' };
      if (value.length > 50) return { isValid: false, error: 'Name must be less than 50 characters' };
      if (!/^[a-zA-Z\s]+$/.test(value)) return { isValid: false, error: 'Name can only contain letters and spaces' };
      return { isValid: true };
      
    case 'email':
      if (!value) return { isValid: false, error: 'Email is required' };
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return { isValid: false, error: 'Please enter a valid email address' };
      return { isValid: true };
      
    case 'message':
      if (!value) return { isValid: false, error: 'Message is required' };
      if (value.length < 10) return { isValid: false, error: 'Message must be at least 10 characters' };
      if (value.length > 1000) return { isValid: false, error: 'Message must be less than 1000 characters' };
      return { isValid: true };
      
    default:
      return { isValid: true };
  }
}

// Form submission function - GitHub Pages version
async function submitContactForm(data) {
  // For GitHub Pages - use Formspree
  // You'll need to replace YOUR_FORM_ID with your actual Formspree form ID
  
  const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree form ID
  
  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        _replyto: data.email,  // This ensures Formspree uses the submitted email for replies
        _subject: `New Portfolio Contact from ${data.name}`  // Custom subject
      })
    });
    
    if (response.ok) {
      return { success: true, message: 'Message sent successfully!' };
    } else {
      const result = await response.json();
      throw new Error(result.error || 'Failed to send message');
    }
  } catch (error) {
    console.warn('Formspree failed, falling back to mailto:', error);
    // Fallback to mailto link
    const mailtoLink = `mailto:ahmedabobakerasms55@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(data.name)}&body=Name: ${encodeURIComponent(data.name)}%0AEmail: ${encodeURIComponent(data.email)}%0AMessage: ${encodeURIComponent(data.message)}`;
    window.open(mailtoLink, '_blank');
    return { success: true, message: 'Opening email client...' };
  }
}

// UI Helper functions
function setFormLoading(isLoading, button, indicator, originalText) {
  if (isLoading) {
    button.disabled = true;
    button.querySelector('span').textContent = 'Sending...';
    indicator.style.display = 'flex';
  } else {
    button.disabled = false;
    button.querySelector('span').textContent = originalText;
    indicator.style.display = 'none';
  }
}

function showFormErrors(errors) {
  // Clear all previous errors
  clearFormErrors();
  
  // Show each error
  errors.forEach(error => {
    const field = document.querySelector(`input[name="${error.field}"], textarea[name="${error.field}"], input[type="${error.field}"]`);
    if (field) {
      showFieldError(field, error.message);
    }
  });
  
  // Show general error message
  const errorMessage = errors.map(e => e.message).join(', ');
  showFormError(errorMessage);
}

function showFieldError(field, message) {
  // Remove existing error
  clearFieldError(field);
  
  // Add error class
  field.classList.add('error');
  
  // Create error message element
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  errorElement.style.color = '#ff073a';
  errorElement.style.fontSize = '14px';
  errorElement.style.marginTop = '5px';
  
  field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(field) {
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

function clearFormErrors() {
  // Clear all field errors
  document.querySelectorAll('.field-error').forEach(el => el.remove());
  document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  
  // Clear general error message
  const generalError = document.querySelector('.form-error-message');
  if (generalError) {
    generalError.remove();
  }
  
  // Clear success message
  const successMessage = document.querySelector('.form-success-message');
  if (successMessage) {
    successMessage.remove();
  }
}

function showFormError(message) {
  clearFormErrors();
  
  const errorElement = document.createElement('div');
  errorElement.className = 'form-error-message';
  errorElement.style.cssText = `
    color: #ff073a;
    background: rgba(255, 7, 58, 0.1);
    padding: 15px;
    border-radius: 5px;
    margin: 15px 0;
    border: 1px solid #ff073a;
    text-align: center;
  `;
  errorElement.textContent = message;
  
  const form = document.querySelector('.contact-form');
  form.insertBefore(errorElement, form.firstChild);
}

function showFormSuccess(message) {
  clearFormErrors();
  
  const successElement = document.createElement('div');
  successElement.className = 'form-success-message';
  successElement.style.cssText = `
    color: #28a745;
    background: rgba(40, 167, 69, 0.1);
    padding: 15px;
    border-radius: 5px;
    margin: 15px 0;
    border: 1px solid #28a745;
    text-align: center;
  `;
  successElement.textContent = message;
  
  const form = document.querySelector('.contact-form');
  form.insertBefore(successElement, form.firstChild);
  
  // Auto-hide success message after 5 seconds
  setTimeout(() => {
    if (successElement.parentNode) {
      successElement.remove();
    }
  }, 5000);
}

// ================= Mobile Menu Toggle =================
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburger && navMenu) {
    // Toggle menu
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a nav link (anchor links)
    document.querySelectorAll('.nav-btn[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        this.style.opacity = '0.8';
        
        // Reset after animation
        setTimeout(() => {
          this.style.transform = '';
          this.style.opacity = '';
        }, 150);
        
        // Store the href before closing the menu
        const href = this.getAttribute('href');
        
        // Close menu immediately
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Wait for menu to close, then scroll
        setTimeout(() => {
          // Manually trigger the navigation with Lenis if available, otherwise GSAP
          const targetElement = document.querySelector(href);
          if (targetElement) {
            if (typeof lenis !== 'undefined' && lenis) {
              lenis.scrollTo(targetElement, { offset: 80 });
            } else if (typeof gsap !== 'undefined') {
              gsap.to(window, {
                duration: 1.2,
                scrollTo: {
                  y: targetElement,
                  offsetY: 80 
                },
                ease: "power2.inOut"
              });
            } else {
              // Fallback to native scroll
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        }, 300); 
      });
    });
    
    // Handle CV buttons (PDF links) - just close the menu
    document.querySelectorAll('.nav-btn[href$=".pdf"]').forEach(link => {
      link.addEventListener('click', function() {
        // Close menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
  
  // ================= CV Modal Functionality =================
  initializeCVModal();
});

// ================= CV Modal Functions =================
function initializeCVModal() {
  const viewCvBtn = document.getElementById('viewCvBtn');
  const cvModal = document.getElementById('cvModal');
  const closeCvBtn = document.getElementById('closeCvBtn');
  const cvModalOverlay = document.getElementById('cvModalOverlay');
  
  if (!viewCvBtn || !cvModal) return;
  
  // Open modal when View CV button is clicked
  viewCvBtn.addEventListener('click', function(e) {
    e.preventDefault();
    openCVModal();
    
    // Close menu if open
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    if (navMenu && hamburger) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
  
  // Close modal when close button is clicked
  closeCvBtn.addEventListener('click', function() {
    closeCVModal();
  });
  
  // Close modal when overlay is clicked
  cvModalOverlay.addEventListener('click', function() {
    closeCVModal();
  });
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && cvModal.classList.contains('active')) {
      closeCVModal();
    }
  });
  
  // Prevent closing when clicking inside modal content
  const cvModalContent = document.querySelector('.cv-modal-content');
  cvModalContent.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}

function openCVModal() {
  const cvModal = document.getElementById('cvModal');
  
  // Add active class with animation
  cvModal.classList.add('active');
  cvModal.setAttribute('aria-hidden', 'false');
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
  
  // Add animation to modal content
  const cvModalContent = document.querySelector('.cv-modal-content');
  gsap.fromTo(cvModalContent, 
    {
      opacity: 0,
      scale: 0.8,
      y: 30
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(1.5)'
    }
  );
}

function closeCVModal() {
  const cvModal = document.getElementById('cvModal');
  const cvModalContent = document.querySelector('.cv-modal-content');
  
  // Animate close
  gsap.to(cvModalContent, {
    opacity: 0,
    scale: 0.8,
    y: 30,
    duration: 0.3,
    ease: 'power2.in',
    onComplete: function() {
      cvModal.classList.remove('active');
      cvModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}

// ================= Particles Animation =================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.size = Math.random() * 2 + 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ff073a";
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    this.draw();
  }
}

for (let i = 0; i < 120; i++) {
  particles.push(new Particle());
}

function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.strokeStyle = "rgba(255,7,58,0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  connect();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});