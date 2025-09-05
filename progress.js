// Progress Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress page functionality
    initializeProgressPage();
});

function initializeProgressPage() {
    // Add navbar scroll effect
    initializeNavbar();
    
    // Initialize interactive elements
    initializePlayButton();
    initializeQuickActions();
    initializeRankingCards();
    initializeStatCards();
    initializeAchievements();
    
    // Add welcome animation
    initializeWelcomeAnimation();
    
    // Initialize tooltips and hover effects
    initializeTooltips();
}

// Navbar functionality
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();
    
    // Note: Mobile menu functionality is handled by script.js
    // No need to duplicate mobile menu code here
}

// Play button interactions
function initializePlayButton() {
    const playButton = document.getElementById('playButton');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-8px) scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.05)';
            }, 150);
            
            // Simulate starting game
            showNotification('🎮 Iniciando sua aventura...', 'success');
            
            // Could redirect to game page or open game modal
            setTimeout(() => {
                console.log('Redirecting to game...');
                // window.location.href = 'game.html';
            }, 1500);
        });
        
        // Add hover sound effect simulation
        playButton.addEventListener('mouseenter', function() {
            // Could play hover sound here
            console.log('Play button hovered');
        });
    }
}

// Quick action buttons
function initializeQuickActions() {
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
            
            // Add click animation
            this.style.transform = 'translateY(-8px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 150);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'daily-quiz':
            showNotification('📚 Abrindo quiz diário...', 'info');
            // Remove notification badge
            const dailyBadge = document.querySelector('[data-action="daily-quiz"] .notification-badge');
            if (dailyBadge) {
                dailyBadge.style.display = 'none';
            }
            break;
            
        case 'continue-reading':
            showNotification('📖 Continuando sua leitura...', 'info');
            break;
            
        case 'challenges':
            showNotification('🏆 Abrindo desafios...', 'info');
            break;
            
        default:
            console.log('Unknown action:', action);
    }
}

// Ranking card interactions
function initializeRankingCards() {
    const rankingCards = document.querySelectorAll('.ranking-card');
    
    rankingCards.forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('current-player')) {
                showPlayerProfile(this);
            }
        });
    });
    
    // Challenge button
    const challengeBtn = document.querySelector('.btn-mini.challenge');
    if (challengeBtn) {
        challengeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotification('⚔️ Desafio enviado para Maria Santos!', 'success');
            
            // Animate button
            this.innerHTML = '<i class="fas fa-check"></i> Enviado';
            this.style.background = 'linear-gradient(135deg, #00983f 0%, #046a84 100%)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sword"></i> Desafiar';
                this.style.background = 'linear-gradient(135deg, #00983f 0%, #046a84 100%)';
            }, 3000);
        });
    }
}

function showPlayerProfile(card) {
    const playerName = card.querySelector('.player-details h4').textContent;
    showNotification(`👤 Visualizando perfil de ${playerName}`, 'info');
    
    // Could open a modal with player details
    console.log('Show player profile for:', playerName);
}

// Achievements interactions
function initializeAchievements() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    achievementItems.forEach(item => {
        item.addEventListener('click', function() {
            const gemName = this.querySelector('h3').textContent;
            const isConquered = this.classList.contains('conquered');
            
            if (isConquered) {
                showAchievementDetails(this, gemName);
            } else {
                showAchievementProgress(this, gemName);
            }
        });
        
        // Add hover effect for gemstones
        const gemImage = item.querySelector('.gemstone-img');
        if (gemImage) {
            item.addEventListener('mouseenter', function() {
                if (this.classList.contains('conquered')) {
                    gemImage.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                gemImage.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
    
    // Animate achievement progress bars on scroll
    const progressBars = document.querySelectorAll('.achievement-progress .progress-fill');
    
    const animateAchievementBars = () => {
        progressBars.forEach(bar => {
            if (isElementInViewport(bar) && !bar.hasAttribute('data-animated')) {
                bar.setAttribute('data-animated', 'true');
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    };
    
    window.addEventListener('scroll', animateAchievementBars);
    animateAchievementBars();
}

function showAchievementDetails(item, gemName) {
    const date = item.querySelector('.achievement-date').textContent;
    showNotification(`🏆 ${gemName} conquistado! ${date}`, 'success');
    
    // Add celebration animation
    const glow = item.querySelector('.achievement-glow');
    if (glow) {
        glow.style.animation = 'glowPulse 0.5s ease-in-out 3';
        setTimeout(() => {
            glow.style.animation = 'glowPulse 2s ease-in-out infinite';
        }, 1500);
    }
}

function showAchievementProgress(item, gemName) {
    const progressText = item.querySelector('.progress-text');
    const statusText = item.querySelector('.achievement-status span').textContent;
    
    if (progressText) {
        const progress = progressText.textContent;
        showNotification(`📈 ${gemName}: ${progress} - ${statusText}`, 'info');
    } else {
        showNotification(`🔒 ${gemName} ainda não está disponível`, 'warning');
    }
    
    // Shake animation for locked achievements
    if (statusText === 'Bloqueado') {
        item.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            item.style.animation = 'none';
        }, 500);
    }
}

// Stat card animations
function initializeStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    // Animate numbers on scroll
    const animateNumbers = () => {
        statCards.forEach(card => {
            const numberElement = card.querySelector('.stat-number');
            const targetNumber = parseInt(numberElement.textContent.replace(/,/g, ''));
            
            if (isElementInViewport(card) && !card.hasAttribute('data-animated')) {
                card.setAttribute('data-animated', 'true');
                animateNumber(numberElement, 0, targetNumber, 2000);
            }
        });
    };
    
    // Animate progress bars
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.exp-fill, .mini-progress-fill');
        progressBars.forEach(bar => {
            if (isElementInViewport(bar) && !bar.hasAttribute('data-animated')) {
                bar.setAttribute('data-animated', 'true');
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        animateNumbers();
        animateProgressBars();
    });
    
    // Initial check
    animateNumbers();
    animateProgressBars();
}

// Welcome animation
function initializeWelcomeAnimation() {
    const dragon = document.querySelector('.dragon');
    const speechBubble = document.querySelector('.speech-bubble');
    
    if (dragon) {
        dragon.addEventListener('click', function() {
            // Dragon click animation
            this.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
            
            // Show special message
            showNotification('🐉 O dragão está feliz em vê-lo!', 'success');
        });
    }
    
    // Animate speech bubble on load
    if (speechBubble) {
        setTimeout(() => {
            speechBubble.style.animation = 'bubbleFloat 4s ease-in-out infinite, bubbleEntrance 1s ease-out';
        }, 500);
    }
}

// Tooltip system
function initializeTooltips() {
    // Add tooltips to various elements
    const tooltipElements = [
        { selector: '.level-badge', text: 'Seu nível atual baseado na experiência' },
        { selector: '.exp-fill', text: 'Barra de experiência - complete atividades para ganhar XP!' },
        { selector: '.streak-indicator', text: 'Sequência de dias jogando consecutivamente' },
        { selector: '.trend-positive', text: 'Tendência positiva - você está melhorando!' }
    ];
    
    tooltipElements.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        elements.forEach(element => {
            element.setAttribute('title', item.text);
            element.style.cursor = 'help';
        });
    });
}

// Utility functions
function animateNumber(element, start, end, duration) {
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        // Format number with commas
        const formatted = Math.floor(current).toLocaleString('pt-BR');
        element.textContent = formatted;
    }, 16);
}

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        backdrop-filter: blur(10px);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 4000);
}

function getNotificationColor(type) {
    const colors = {
        'success': 'linear-gradient(135deg, #00983f 0%, #046a84 100%)',
        'info': 'linear-gradient(135deg, #046a84 0%, #192f21 100%)',
        'warning': 'linear-gradient(135deg, #ece21c 0%, #c66320 100%)',
        'error': 'linear-gradient(135deg, #c66320 0%, #192f21 100%)'
    };
    return colors[type] || colors.info;
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'P' to start playing
    if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.altKey) {
        const playButton = document.getElementById('playButton');
        if (playButton) {
            playButton.click();
        }
    }
    
    // Press 'Q' for daily quiz
    if (e.key.toLowerCase() === 'q' && !e.ctrlKey && !e.altKey) {
        const quizBtn = document.querySelector('[data-action="daily-quiz"]');
        if (quizBtn) {
            quizBtn.click();
        }
    }
    
    // Press 'R' to continue reading
    if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.altKey) {
        const readBtn = document.querySelector('[data-action="continue-reading"]');
        if (readBtn) {
            readBtn.click();
        }
    }
    
    // Press 'A' for achievements
    if (e.key.toLowerCase() === 'a' && !e.ctrlKey && !e.altKey) {
        const achievementsSection = document.getElementById('conquistas');
        if (achievementsSection) {
            achievementsSection.scrollIntoView({ behavior: 'smooth' });
            showNotification('🏆 Navegando para Conquistas', 'info');
        }
    }
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-message {
        flex: 1;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s ease;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    @keyframes bubbleEntrance {
        0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

document.head.appendChild(notificationStyles);

// Performance optimization
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

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Any scroll-related functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Progress page initialized successfully! 🎮');
console.log('Keyboard shortcuts: P (Play), Q (Quiz), R (Read), A (Achievements)');