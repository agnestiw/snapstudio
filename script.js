    // Scroll Progress Indicator
    window.addEventListener('scroll', function() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById("scrollProgress").style.width = scrolled + "%";
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    }
    
    // Initial check on page load
    window.addEventListener('DOMContentLoaded', checkFade);
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);
    
    // Animate shapes on mousemove
    document.addEventListener('mousemove', (e) => {
      const shapes = document.querySelectorAll('.shape');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      shapes.forEach(shape => {
        const offsetX = (mouseX - 0.5) * 20;
        const offsetY = (mouseY - 0.5) * 20;
        shape.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${offsetX}deg)`;
      });
    });
    
    // Interactive image swap for studio images
    const studioImages = document.getElementById('studioImages');
    const imageFront = studioImages.querySelector('.image-front');
    const imageBack = studioImages.querySelector('.image-back');
    
    // Auto-swap images every few seconds
    let swapInterval;
    
    function startAutoSwap() {
      swapInterval = setInterval(() => {
        if (imageBack.style.zIndex === '3') {
          imageBack.style.zIndex = '1';
          imageBack.style.transform = 'translateZ(-10px) scale(0.95)';
          imageFront.style.zIndex = '2';
          imageFront.style.transform = 'translateZ(10px) scale(1.05)';
        } else {
          imageBack.style.zIndex = '3';
          imageBack.style.transform = 'translateZ(20px) scale(1.05)';
          imageFront.style.zIndex = '1';
          imageFront.style.transform = 'translateZ(-20px) scale(0.95)';
        }
      }, 3000);
    }
    
    function stopAutoSwap() {
      clearInterval(swapInterval);
    }
    
    // Start auto-swap on page load
    startAutoSwap();
    
    // Stop auto-swap when user interacts with images
    studioImages.addEventListener('mouseenter', stopAutoSwap);
    studioImages.addEventListener('touchstart', stopAutoSwap, { passive: true });
    
    // Manual image swap on click/touch
    studioImages.addEventListener('click', () => {
      if (imageBack.style.zIndex === '3') {
        imageBack.style.zIndex = '1';
        imageBack.style.transform = 'translateZ(-10px) scale(0.95)';
        imageFront.style.zIndex = '2';
        imageFront.style.transform = 'translateZ(10px) scale(1.05)';
      } else {
        imageBack.style.zIndex = '3';
        imageBack.style.transform = 'translateZ(20px) scale(1.05)';
        imageFront.style.zIndex = '1';
        imageFront.style.transform = 'translateZ(-20px) scale(0.95)';
      }
    });
    
    // Restart auto-swap when user leaves
    studioImages.addEventListener('mouseleave', startAutoSwap);
    studioImages.addEventListener('touchend', startAutoSwap);
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Update active nav link
      const sections = ['hero', 'fitur', 'layanan', 'tentang-studio', 'kontak'];
      let currentSection = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = section;
            break;
          }
        }
      }
      
      // Update nav links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
      
      // Show/hide scroll to top button
      const scrollToTopBtn = document.getElementById('scrollToTop');
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    // Scroll to top functionality
    document.getElementById('scrollToTop').addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Auto-scroll functionality
    function scrollToNextSection(currentSectionId) {
      const sections = ['hero', 'fitur', 'layanan', 'tentang-studio', 'kontak'];
      const currentIndex = sections.indexOf(currentSectionId);
      
      if (currentIndex < sections.length - 1) {
        const nextSection = document.getElementById(sections[currentIndex + 1]);
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    
    // Form validation with visual feedback
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const emailCheck = document.getElementById('emailCheck');
    const nameCheck = document.getElementById('nameCheck');
    const messageCheck = document.getElementById('messageCheck');
    
    // Email validation
    emailInput.addEventListener('input', () => {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
      if (isValid && emailInput.value.length > 0) {
        emailCheck.style.opacity = '1';
        emailInput.classList.add('border-green-500');
      } else {
        emailCheck.style.opacity = '0';
        emailInput.classList.remove('border-green-500');
      }
    });
    
    // Name validation
    nameInput.addEventListener('input', () => {
      if (nameInput.value.length > 2) {
        nameCheck.style.opacity = '1';
        nameInput.classList.add('border-green-500');
      } else {
        nameCheck.style.opacity = '0';
        nameInput.classList.remove('border-green-500');
      }
    });
    
    // Message validation
    messageInput.addEventListener('input', () => {
      if (messageInput.value.length > 10) {
        messageCheck.style.opacity = '1';
        messageInput.classList.add('border-green-500');
      } else {
        messageCheck.style.opacity = '0';
        messageInput.classList.remove('border-green-500');
      }
    });
    
    // Contact form handling with enhanced validation
    const contactForm = document.getElementById('contactForm');
    const successPopup = document.getElementById('successPopup');
    const closePopupBtn = document.getElementById('closePopup');
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Validate all fields
      const email = emailInput.value;
      const name = nameInput.value;
      const message = messageInput.value;
      
      let isValid = true;
      
      // Email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.classList.add('border-red-500');
        isValid = false;
      } else {
        emailInput.classList.remove('border-red-500');
      }
      
      // Name validation
      if (name.length < 3) {
        nameInput.classList.add('border-red-500');
        isValid = false;
      } else {
        nameInput.classList.remove('border-red-500');
      }
      
      if (isValid) {
        // Here you would typically send the data to your server
        console.log('Form submitted:', { email, name, message });
        
        // Show success popup with animation
        successPopup.classList.add('visible');
        
        // Reset form
        contactForm.reset();
        emailCheck.style.opacity = '0';
        nameCheck.style.opacity = '0';
        messageCheck.style.opacity = '0';
        emailInput.classList.remove('border-green-500');
        nameInput.classList.remove('border-green-500');
        messageInput.classList.remove('border-green-500');
      }
    });
    
    // Close popup
    closePopupBtn.addEventListener('click', () => {
      successPopup.classList.remove('visible');
    });
    
    // Close popup when clicking outside
    successPopup.addEventListener('click', (e) => {
      if (e.target === successPopup) {
        successPopup.classList.remove('visible');
      }
    }); 