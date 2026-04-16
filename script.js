document.addEventListener('DOMContentLoaded', () => {
    // Navbar shadow & Mobile Action Bar visibility
    const navbar = document.querySelector('.navbar');
    const mobileBar = document.querySelector('.mobile-action-bar');
    const footer = document.querySelector('footer');
    
    window.addEventListener('scroll', () => {
        // Navbar shadow
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }

        // Mobile Action Bar visibility (hide when footer is visible)
        if (mobileBar && footer) {
            const footerTop = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (footerTop < windowHeight) {
                mobileBar.style.transform = 'translate(-50%, 100px)';
                mobileBar.style.opacity = '0';
            } else {
                mobileBar.style.transform = 'translate(-50%, 0)';
                mobileBar.style.opacity = '1';
            }
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            // Simulate network delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                
                // Show success message
                formSuccess.classList.remove('d-none');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add('d-none');
                }, 5000);
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1000);
        });
    }

    // Advanced Reveal Animations (Mobile Friendly)
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .service-card, .section-title, .hero-content, .card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(el);
    });

    // Smooth scroll and mobile menu close
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Close mobile navbar if open
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }

                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
