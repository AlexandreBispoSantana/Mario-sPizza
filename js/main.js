/**
 * MARIO'S PIZZA - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('overlay');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        overlay.classList.toggle('show');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.navbar-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 4. Toast Notifications & Add to Cart
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');
    const addButtons = document.querySelectorAll('.add-to-cart-btn, .featured-btn');
    let toastTimeout;

    function showToast(message) {
        if (!toast) return;
        
        toastText.textContent = message;
        toast.classList.add('show');
        
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    addButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const pizzaName = this.getAttribute('data-pizza');
            showToast(`${pizzaName} adicionada ao carrinho! 🍕`);
            
            // Add a little pop animation to the button
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // 5. Form Validation and Submit Animation
    const form = document.getElementById('cadastroForm');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic HTML5 validation check
            if (!this.checkValidity()) {
                // If invalid, let the browser show default tooltips
                // Or you can implement custom error messages here
                
                // Add a shake effect to invalid inputs
                const invalidInputs = this.querySelectorAll(':invalid');
                invalidInputs.forEach(input => {
                    input.style.border = '1px solid #E63946';
                    setTimeout(() => {
                        input.style.border = '';
                    }, 2000);
                });
                
                return;
            }

            // Simulate form submission API call
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                // Hide form, show success message
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                // Scroll slightly up to see the message clearly
                window.scrollTo({
                    top: form.parentElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }, 1500);
        });
    }

});
