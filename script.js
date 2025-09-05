// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const faqItems = document.querySelectorAll('.faq-item');
const carouselNext = document.querySelector('.carousel-btn.next');
const carouselPrev = document.querySelector('.carousel-btn.prev');
const bookSlides = document.querySelectorAll('.book-slide');

// Variables
let currentSlide = 0;
let isScrolling = false;

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

//Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');

        if (!targetId.startsWith('#')) return;
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            

            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    });
}

// FAQ functionality
function initFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Carousel functionality
function initCarousel() {
    if (!carouselNext || !carouselPrev || bookSlides.length === 0) return;
    
    function showSlide(index) {
        bookSlides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
    }
    
    carouselNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % bookSlides.length;
        showSlide(currentSlide);
    });
    
    carouselPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + bookSlides.length) % bookSlides.length;
        showSlide(currentSlide);
    });
    
    // Auto-play carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % bookSlides.length;
        showSlide(currentSlide);
    }, 5000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add stagger effect for grid items
                if (entry.target.classList.contains('benefit-card') || 
                    entry.target.classList.contains('plan-card')) {
                    const siblings = entry.target.parentElement.children;
                    Array.from(siblings).forEach((sibling, index) => {
                        setTimeout(() => {
                            sibling.style.animationDelay = `${index * 0.1}s`;
                            sibling.classList.add('fade-in-up');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .plan-card, .faq-item, .section-title, .section-subtitle'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Hero background interactive animation
function initInteractiveBackground() {
    const animatedBg = document.querySelector('.animated-bg');
    let mouseX = 0;
    let mouseY = 0;
    let isMouseInside = false;
    
    function updateBackground() {
        if (animatedBg && isMouseInside) {
            const x = (mouseX / window.innerWidth - 0.5) * 20;
            const y = (mouseY / window.innerHeight - 0.5) * 20;
            
            animatedBg.style.transform = `translate(${x}px, ${y}px)`;
        } else if (animatedBg) {
            animatedBg.style.transform = 'translate(0px, 0px)';
        }
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseInside = true;
        updateBackground();
    });
    
    document.addEventListener('mouseleave', () => {
        isMouseInside = false;
        updateBackground();
    });
}

// Button interactions
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation to CSS
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Plan selection highlighting
function initPlanSelection() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        const button = card.querySelector('.btn-plan');
        
        button.addEventListener('click', () => {
            // Remove active class from all cards
            planCards.forEach(c => c.classList.remove('selected'));
            
            // Add active class to clicked card
            card.classList.add('selected');
            
            // Add loading state to button
            const originalText = button.textContent;
            button.innerHTML = '<span class="loading"></span> Processando...';
            button.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                card.classList.remove('selected');
                
                // Show success message (you can replace with actual functionality)
                showNotification('Plano selecionado! Redirecionando para pagamento...', 'success');
            }, 2000);
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4ade80, #22c55e);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let index = 0;
    let isTag = false;
    let tagBuffer = '';
    
    function typeChar() {
        if (index < originalText.length) {
            const char = originalText[index];
            
            if (char === '<') {
                isTag = true;
                tagBuffer = char;
            } else if (char === '>' && isTag) {
                isTag = false;
                tagBuffer += char;
                heroTitle.innerHTML += tagBuffer;
                tagBuffer = '';
            } else if (isTag) {
                tagBuffer += char;
            } else {
                heroTitle.innerHTML += char;
            }
            
            index++;
            setTimeout(typeChar, isTag ? 0 : 50);
        }
    }
    typeChar();
    // setTimeout(typeChar, 100);
}

// Parallax effect for gems
function initParallax() {
    const gems = document.querySelectorAll('.gem');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        gems.forEach((gem, index) => {
            const multiplier = (index + 1) * 0.3;
            gem.style.transform = `translateY(${rate * multiplier}px)`;
        });
    });
}

// Performance optimization - throttle scroll events
function throttle(func, wait) {
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

// USP CIETEC section animations
function initUSPAnimations() {
    const uspStats = document.querySelectorAll('.stat-number');
    const uspBadge = document.querySelector('.usp-badge');
    const uspFeatures = document.querySelectorAll('.usp-feature');
    
    // Animate statistics counters when in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target;
                const finalValue = parseInt(statElement.textContent);
                console.log(finalValue);
                let currentValue = 0;
                const increment = Math.ceil(finalValue / 50);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(counter);
                    }
                    statElement.textContent = currentValue + '+';
                }, 50);
                
                statsObserver.unobserve(statElement);
            }
        });
    }, { threshold: 0.7 });
    
    uspStats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Badge interaction
    if (uspBadge) {
        uspBadge.addEventListener('mouseenter', () => {
            uspBadge.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        uspBadge.addEventListener('mouseleave', () => {
            uspBadge.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Feature cards staggered animation
    uspFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.2}s`;
        
        feature.addEventListener('mouseenter', () => {
            const icon = feature.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        });
        
        feature.addEventListener('mouseleave', () => {
            const icon = feature.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Enhanced wave animation for USP section
function initWaveAnimations() {
    const wavePaths = document.querySelectorAll('.wave-svg path');
    
    wavePaths.forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        // Animate stroke drawing
        setTimeout(() => {
            path.style.animation = `drawWave 3s ease-in-out forwards`;
        }, index * 500);
    });
}

// Add wave drawing animation to CSS
function addWaveAnimationCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes drawWave {
            to {
                stroke-dashoffset: 0;
            }
        }
        
        .wave-svg path {
            stroke: rgba(255, 255, 255, 0.2);
            stroke-width: 2;
            fill: rgba(255, 255, 255, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functionality
function init() {
    // Core functionality
    initSmoothScrolling();
    initMobileMenu();
    initFAQ();
    initCarousel();
    
    // Visual enhancements
    initScrollAnimations();
    initInteractiveBackground();
    initButtonInteractions();
    initPlanSelection();
    initScrollProgress();
    initTypingEffect();
    initUSPAnimations();
    initWaveAnimations();
    
    // Performance optimized scroll handlers
    const throttledNavbarScroll = throttle(handleNavbarScroll, 16);
    const throttledParallax = throttle(initParallax, 16);
    
    window.addEventListener('scroll', throttledNavbarScroll);
    
    // Add CSS for enhanced interactions
    addRippleCSS();
    addWaveAnimationCSS();
    
    // Add loading states and enhanced UX
    setTimeout(() => {
        document.body.classList.add('loaded');
        
    }, 500);
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('paused');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Close FAQ items
        faqItems.forEach(item => item.classList.remove('active'));
    }
});

// Add focus management for accessibility
function initAccessibility() {
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focused');
        });
        
        element.addEventListener('blur', () => {
            element.classList.remove('focused');
        });
    });
}

// Initialize accessibility features
initAccessibility();

// Export functions for potential external use
window.ArkosLanding = {
    showNotification,
    initScrollAnimations,
    initCarousel,
    initUSPAnimations,
    initWaveAnimations
};