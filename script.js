// ========================================
// BIOS SERVICES - Main JavaScript
// ========================================

// === DOM LOADED ===
document.addEventListener('DOMContentLoaded', function() {
    
    // === LOADER ===
    const loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });
    
    // === NAVBAR SCROLL EFFECT ===
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // === HAMBURGER MENU ===
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // === SCROLL ANIMATIONS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.service-card, .why-card, .pricing-card, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // === FLOATING BUTTONS ===
    const floatingButtons = document.getElementById('floatingButtons');
    if (floatingButtons) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                floatingButtons.classList.add('visible');
            } else {
                floatingButtons.classList.remove('visible');
            }
        });
    }
    
    // === SCROLL TO TOP BUTTON ===
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // === FAQ ACCORDION ===
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // === CONTACT FORM ===
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Validate
            if (!data.name || !data.email || !data.phone || !data.message) {
                showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Simulate form submission
            showMessage('Envoi en cours...', 'info');
            
            setTimeout(() => {
                showMessage('Message envoyé avec succès ! Nous vous répondrons dans les 24h.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // === DEVIS FORM - MULTI-STEP ===
    const devisForm = document.getElementById('devisForm');
    const devisMessage = document.getElementById('devisMessage');
    
    if (devisForm) {
        devisForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(devisForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Validate
            if (!data.entreprise || !data.secteur || !data.nom || !data.email || !data.telephone || !data.description) {
                showDevisMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showDevisMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }
            
            // Simulate form submission
            showDevisMessage('Envoi de votre demande de devis...', 'info');
            
            setTimeout(() => {
                showDevisMessage('Demande envoyée avec succès ! Nous vous contacterons sous 24h avec un devis détaillé.', 'success');
                devisForm.reset();
                goToStep(1);
            }, 2000);
        });
    }
    
    function showDevisMessage(message, type) {
        devisMessage.textContent = message;
        devisMessage.className = 'form-message ' + type;
        devisMessage.style.display = 'block';
        
        window.scrollTo({
            top: devisMessage.offsetTop - 100,
            behavior: 'smooth'
        });
        
        if (type === 'success') {
            setTimeout(() => {
                devisMessage.style.display = 'none';
            }, 8000);
        } else {
            setTimeout(() => {
                devisMessage.style.display = 'none';
            }, 5000);
        }
    }
});

// === MULTI-STEP FORM NAVIGATION ===
function goToStep(stepNumber) {
    // Hide all steps
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    // Show target step
    const targetStep = document.getElementById('step' + stepNumber);
    if (targetStep) {
        targetStep.classList.add('active');
    }
    
    // Update step indicators
    const stepIndicators = document.querySelectorAll('.step');
    stepIndicators.forEach((indicator, index) => {
        if (index + 1 === stepNumber) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Scroll to top of form
    window.scrollTo({
        top: document.querySelector('.devis-section').offsetTop - 100,
        behavior: 'smooth'
    });
}

function nextStep(stepNumber) {
    // Validate current step before moving
    const currentStep = document.querySelector('.form-step.active');
    const inputs = currentStep.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = '#dc3545';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    });
    
    // Check radio buttons in step 2
    if (stepNumber === 3) {
        const typeProjet = document.querySelector('input[name="typeProjet"]:checked');
        if (!typeProjet) {
            isValid = false;
            alert('Veuillez sélectionner un type de projet');
            return;
        }
    }
    
    if (isValid) {
        goToStep(stepNumber);
    } else {
        alert('Veuillez remplir tous les champs obligatoires');
    }
}

function prevStep(stepNumber) {
    goToStep(stepNumber);
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === ANIMATE NUMBERS ON SCROLL ===
function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe stat numbers
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const value = parseInt(entry.target.textContent);
            animateNumber(entry.target, value);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item h3').forEach(stat => {
    statObserver.observe(stat);
});

// === UTILITIES ===

// Format phone number as user types
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('225')) {
            // Format: +225 XX XX XX XX XX
            if (value.length > 3) {
                value = '+225 ' + value.substring(3);
            }
        }
        
        e.target.value = value;
    });
});

// Auto-resize textarea
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// === PERFORMANCE OPTIMIZATION ===

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === CONSOLE MESSAGE ===
console.log('%cBIOS SERVICES', 'font-size: 24px; font-weight: bold; color: #ff6b35;');
console.log('%cVotre partenaire digital pour des solutions innovantes', 'font-size: 14px; color: #0A2540;');
console.log('%c🌐 Site développé avec passion', 'font-size: 12px; color: #6c757d;');
console.log('%c📱 Contact: +225 05 03 00 96 40', 'font-size: 12px; color: #25D366;');
console.log('%c📧 Email: mawhaye.ndri@uvci.edu.ci', 'font-size: 12px; color: #ff6b35;');