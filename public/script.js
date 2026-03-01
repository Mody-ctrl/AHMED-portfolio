// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ================= Loading Animation =================
function initLoadingAnimation() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingBar = document.getElementById('loadingBar');
  
  if (!loadingScreen) return;
  
  // Animate loading bar
  gsap.to(loadingBar, {
    width: "100%",
    duration: 2,
    ease: "power2.out"
  });
  
  // Animate loading content
  gsap.from(".loading-content", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });
  
  // Simulate loading delay and then fade out the loading screen
  setTimeout(() => {
    // Final loading bar animation
    gsap.to(loadingBar, {
      width: "100%",
      duration: 0.5,
      ease: "power2.inOut"
    });
    
    // Fade out the loading screen
    gsap.to(loadingScreen, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        loadingScreen.style.display = "none";
      }
    });
  }, 2500); // Total loading time
}

// ================= GSAP Smooth Scrolling Functionality =================
document.addEventListener('DOMContentLoaded', function () {
  // Initialize loading animation
  initLoadingAnimation();
  
  // GSAP enhanced smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]:not(.nav-btn)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Use GSAP scrollTo plugin for smoother scrolling
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetElement,
            offsetY: 80 // offset for header
          },
          ease: "power2.inOut"
        });
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

  // ================= GSAP ScrollTrigger Animations =================
  // Animate intro section elements when they come into view
  gsap.from('.intro-left', {
    duration: 1,
    x: -100,
    opacity: 0,
    scrollTrigger: {
      trigger: '.intro-left',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    ease: 'power2.out'
  });

  gsap.from('.intro-right', {
    duration: 1,
    x: 100,
    opacity: 0,
    scrollTrigger: {
      trigger: '.intro-right',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    ease: 'power2.out'
  });

  // Animate stats grid items
  gsap.utils.toArray('.stats-grid > div').forEach((stat, i) => {
    gsap.from(stat, {
      duration: 0.8,
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: stat,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      ease: 'power2.out',
      delay: i * 0.1
    });
  });

  // Animate bio section
  gsap.from('.bio', {
    duration: 1,
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: '.bio',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    ease: 'power2.out'
  });

  // Animate about section cards
  gsap.utils.toArray('.about').forEach((about, i) => {
    gsap.from(about, {
      duration: 0.8,
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: about,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      ease: 'power2.out',
      delay: i * 0.1
    });
  });

  // Animate skills container and items
  gsap.from('.skills-container', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: '.skills-container',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    ease: 'power2.out'
  });

  gsap.utils.toArray('.skill-item').forEach((skill, i) => {
    gsap.from(skill, {
      duration: 0.6,
      scale: 0.8,
      opacity: 0,
      scrollTrigger: {
        trigger: skill,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      ease: 'back.out(1.7)',
      delay: i * 0.05
    });
  });

  // Animate projects section
  gsap.from('#projects-title', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    scrollTrigger: {
      trigger: '#projects-title',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    ease: 'power2.out'
  });

  gsap.utils.toArray('.project-card').forEach((project, i) => {
    gsap.from(project, {
      duration: 0.8,
      y: 50,
      opacity: 0,
      scrollTrigger: {
        trigger: project,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      ease: 'power2.out',
      delay: i * 0.1
    });
  });

  // Animate contact section
  gsap.from('#contacts', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: '#contacts',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    ease: 'power2.out'
  });

  // Animate social links
  gsap.utils.toArray('.social-link').forEach((link, i) => {
    gsap.from(link, {
      duration: 0.6,
      y: 30,
      opacity: 0,
      scrollTrigger: {
        trigger: link,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      ease: 'power2.out',
      delay: i * 0.1
    });
  });

  // Animate form elements
  gsap.from('.contact-form', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    },
    ease: 'power2.out'
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
      tags: ['React', 'CSS', 'E-commerce']
    },
    {
      title: 'CSS Reference Guide',
      description: 'Complete interactive guide to CSS properties and techniques for developers of all levels.',
      url: 'https://css-refrences-guide.vercel.app/',
      github: 'https://github.com/Mody-ctrl/css-reference-guide',
      icon: 'fa-palette',
      image: 'img/Css Website.png',
      tags: ['HTML', 'CSS', 'JavaScript']
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio showcasing projects, skills, and professional journey.',
      url: 'https://mody-ctrl.github.io/Portfolio/',
      github: 'https://github.com/Mody-ctrl/Portfolio',
      icon: 'fa-briefcase',
      image: 'img/photo_2025-12-24_18-27-29.jpg',
      tags: ['HTML', 'CSS', 'Responsive']
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
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-btn[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
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
        
        // Close menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        
       n
        setTimeout(() => {
          // Manually trigger the navigation with GSAP
          const targetElement = document.querySelector(href);
          if (targetElement) {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: {
                y: targetElement,
                offsetY: 80 
              },
              ease: "power2.inOut"
            });
          }
        }, 100); 
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
});

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