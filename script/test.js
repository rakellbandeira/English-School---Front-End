document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    let isMenuOpen = false;

    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            isMenuOpen = false;
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (isMenuOpen) {
                    navMenu.classList.remove('active');
                    isMenuOpen = false;
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }

                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });


    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Check if current item is already active
            const isActive = item.classList.contains('active');
            
            // Close all items first
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, activate it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Keyboard accessibility
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        const answer = item.querySelector('.faq-answer');
        const answerId = `faq-answer-${Math.random().toString(36).substr(2, 9)}`;
        answer.setAttribute('id', answerId);
        question.setAttribute('aria-controls', answerId);
        
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        question.addEventListener('click', () => {
            const isExpanded = item.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);
        });
    });


   

    // Form submission handler with popup message
const contactForm = document.getElementById('contactForm');
const popupMessage = document.getElementById('popup-message');

if (contactForm) {
  // Use FormSubmit's AJAX submission approach
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission
    
    // Get form data
    const formData = new FormData(this);
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // Get the form action URL (your FormSubmit email)
    const actionURL = this.getAttribute('action');
    
    // Send the form data using fetch
    fetch(actionURL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Show success popup
        popupMessage.classList.add('show');
        
        // Reset the form
        contactForm.reset();
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      
      // Show error message (you could create another popup for errors)
      alert('Sorry, there was a problem submitting your request. Please try again.');
      
      // Reset button
      button.textContent = originalText;
      button.disabled = false;
    });
  });
}

// Close popup when clicking the X
if (popupMessage) {
  const closePopup = popupMessage.querySelector('.close-popup');
  
  closePopup.addEventListener('click', () => {
    popupMessage.classList.remove('show');
  });
  
  // Also close popup when clicking outside the popup content
  popupMessage.addEventListener('click', (e) => {
    if (e.target === popupMessage) {
      popupMessage.classList.remove('show');
    }
  });
  
  // Close popup with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupMessage.classList.contains('show')) {
      popupMessage.classList.remove('show');
    }
  });
}
});