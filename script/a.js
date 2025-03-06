        document.addEventListener('DOMContentLoaded', () => {
            // Mobile menu toggle
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            let isMenuOpen = false;

            hamburger.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                navMenu.classList.toggle('active');
                
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

            // Smooth scroll
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        if (isMenuOpen) {
                            navMenu.classList.remove('active');
                            isMenuOpen = false;
                            const spans = hamburger.querySelectorAll('span');
                            spans[0].style.transform = 'none';
                            spans[1].style.opacity = '1';
                            spans[2].style.transform = 'none';
                        }
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // FAQ functionality
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
            
            // Keyboard accessibility for FAQ
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
        });
