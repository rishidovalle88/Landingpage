// Progress Page JavaScript Functionality

// Phase data with masters and details
const phaseData = {
    1: {
        title: "Fase 1 - Iniciante",
        masterName: "Mestre Gaia",
        masterRole: "Guardiã da Terra",
        masterImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=master1&backgroundColor=c0aede",
        description: "Bem-vindo à sua jornada de aprendizagem! Nesta primeira fase, você irá aprender os fundamentos básicos sobre meio ambiente e sustentabilidade. É hora de descobrir como pequenas ações podem fazer uma grande diferença!",
        requirements: [
            "Ler 3 livros sobre meio ambiente",
            "Completar 5 quizzes básicos",
            "Participar de 1 atividade prática"
        ],
        rewards: [
            "Badge de Iniciante",
            "250 pontos de experiência",
            "Acesso à Fase 2"
        ],
        completed: true
    },
    2: {
        title: "Fase 2 - Explorador",
        masterName: "Mestre Aqua",
        masterRole: "Guardião dos Oceanos",
        masterImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=master2&backgroundColor=b6e3f4",
        description: "Agora que você domina o básico, é hora de explorar mais profundamente! Nesta fase, você irá mergulhar nos oceanos do conhecimento e descobrir os mistérios da vida marinha.",
        requirements: [
            "Ler 5 livros sobre oceanos",
            "Completar 8 quizzes intermediários",
            "Realizar 2 experimentos científicos"
        ],
        rewards: [
            "Badge de Explorador",
            "450 pontos de experiência",
            "Equipamento especial",
            "Acesso à Fase 3"
        ],
        completed: true
    },
    3: {
        title: "Fase 3 - Aventureiro",
        masterName: "Mestre Flora",
        masterRole: "Guardiã das Florestas",
        masterImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=master3&backgroundColor=c6f6d5",
        description: "Você está se tornando um verdadeiro aventureiro! Nesta fase, você irá explorar as florestas do conhecimento e aprender sobre biodiversidade, conservação e como proteger nosso planeta.",
        requirements: [
            "Ler 7 livros sobre biodiversidade",
            "Completar 10 quizzes avançados",
            "Liderar 1 projeto ambiental",
            "Mentor 2 novos estudantes"
        ],
        rewards: [
            "Badge de Aventureiro",
            "600 pontos de experiência",
            "Ferramentas avançadas",
            "Acesso à Fase 4"
        ],
        completed: false,
        current: true
    },
    4: {
        title: "Fase 4 - Guardião",
        masterName: "Mestre Ignis",
        masterRole: "Guardião da Energia",
        masterImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=master4&backgroundColor=fed7d7",
        description: "Como Guardião, você terá a responsabilidade de proteger e ensinar outros sobre sustentabilidade. Aprenda sobre energias renováveis e como liderar mudanças positivas.",
        requirements: [
            "Ler 10 livros especializados",
            "Completar 15 desafios complexos",
            "Criar 1 projeto inovador",
            "Formar uma equipe de conservação"
        ],
        rewards: [
            "Badge de Guardião",
            "800 pontos de experiência",
            "Título de Liderança",
            "Acesso à Fase Final"
        ],
        completed: false,
        current: false
    },
    5: {
        title: "Fase 5 - Mestre",
        masterName: "Mestre Cosmos",
        masterRole: "Guardião Universal",
        masterImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=master5&backgroundColor=e9d5ff",
        description: "Parabéns por chegar até aqui! Como Mestre, você se tornará um verdadeiro líder ambiental, capaz de inspirar e guiar outros em sua jornada de conservação.",
        requirements: [
            "Completar todas as fases anteriores",
            "Ler 15 livros de mestrado",
            "Liderar 5 projetos ambientais",
            "Formar 10 novos guardiões"
        ],
        rewards: [
            "Badge de Mestre Supremo",
            "1000 pontos de experiência",
            "Certificado de Liderança Ambiental",
            "Acesso a conteúdo exclusivo"
        ],
        completed: false,
        current: false
    }
};

// Player data simulation
const playerData = {
    name: "João Silva",
    fullName: "João Silva Santos",
    school: "Escola Estadual Santos Dumont",
    age: 15,
    grade: "9º Ano - Ensino Fundamental",
    registrationDate: "15 de março de 2024",
    level: 15,
    booksRead: 12,
    totalScore: 2450,
    playerAhead: "Maria Costa",
    playerBehind: "Pedro Oliveira"
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressPage();
});

// Main initialization function
function initializeProgressPage() {
    setupPlayerProfile();
    setupControlButtons();
    setupPhaseNodes();
    setupModals();
    animateElements();
}

// Setup player profile interactions
function setupPlayerProfile() {
    const playerProfile = document.getElementById('playerProfile');
    const playerModal = document.getElementById('playerModal');
    
    if (playerProfile && playerModal) {
        playerProfile.addEventListener('click', function() {
            openModal('playerModal');
        });
    }
}

// Setup control buttons functionality
function setupControlButtons() {
    const settingsBtn = document.getElementById('settingsBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            showNotification('Configurações em desenvolvimento!', 'info');
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja sair da plataforma?')) {
                showNotification('Fazendo logout...', 'info');
                // Simulate logout - in real app would redirect to login
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }
        });
    }
}

// Setup phase node interactions
function setupPhaseNodes() {
    const phaseNodes = document.querySelectorAll('.phase-node');
    
    phaseNodes.forEach(node => {
        node.addEventListener('click', function() {
            const phaseNumber = parseInt(this.dataset.phase);
            openPhaseModal(phaseNumber);
        });
    });
}

// Setup modal functionality
function setupModals() {
    // Close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close on backdrop click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

// Open modal function
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add focus trap for accessibility
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }
}

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Open phase modal with specific phase data
function openPhaseModal(phaseNumber) {
    const phase = phaseData[phaseNumber];
    if (!phase) return;
    
    // Update modal content
    document.getElementById('phaseModalTitle').textContent = phase.title;
    document.getElementById('phaseModalMasterImg').src = phase.masterImg;
    document.getElementById('phaseModalMasterName').textContent = phase.masterName;
    document.getElementById('phaseModalMasterRole').textContent = phase.masterRole;
    document.getElementById('phaseModalDescription').textContent = phase.description;
    
    // Update requirements
    const requirementsList = document.getElementById('phaseModalRequirements');
    requirementsList.innerHTML = '';
    phase.requirements.forEach(requirement => {
        const li = document.createElement('li');
        li.textContent = requirement;
        requirementsList.appendChild(li);
    });
    
    // Update rewards
    const rewardsList = document.getElementById('phaseModalRewards');
    rewardsList.innerHTML = '';
    phase.rewards.forEach(reward => {
        const span = document.createElement('span');
        span.className = 'reward-item';
        span.textContent = reward;
        rewardsList.appendChild(span);
    });
    
    openModal('phaseModal');
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 2000;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            
            .notification-info {
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                color: white;
            }
            
            .notification-success {
                background: linear-gradient(135deg, #4ade80, #22c55e);
                color: white;
            }
            
            .notification-warning {
                background: linear-gradient(135deg, #fbbf24, #f59e0b);
                color: white;
            }
            
            .notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .notification-message {
                flex: 1;
                font-weight: 500;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                font-size: 1.2rem;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.3s ease;
            }
            
            .notification-close:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Animate elements on scroll
function animateElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.phase-node, .stat-item, .welcome-dialog');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Counter animation for statistics
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/,/g, ''));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas if needed
            if (target > 999) {
                counter.textContent = Math.floor(current).toLocaleString();
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Initialize number animation when the statistics section comes into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe the player stats section
document.addEventListener('DOMContentLoaded', function() {
    const playerStats = document.querySelector('.player-stats');
    if (playerStats) {
        statsObserver.observe(playerStats);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + P to open player profile
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        openModal('playerModal');
    }
    
    // Alt + S for settings
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('settingsBtn').click();
    }
    
    // Alt + L for logout
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        document.getElementById('logoutBtn').click();
    }
});

// Touch and drag support for trail on mobile
let isDragging = false;
let startX = 0;
let scrollLeft = 0;

const trailContainer = document.querySelector('.trail-container');
if (trailContainer) {
    trailContainer.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.pageX - trailContainer.offsetLeft;
        scrollLeft = trailContainer.scrollLeft;
        trailContainer.style.cursor = 'grabbing';
    });
    
    trailContainer.addEventListener('mouseleave', function() {
        isDragging = false;
        trailContainer.style.cursor = 'grab';
    });
    
    trailContainer.addEventListener('mouseup', function() {
        isDragging = false;
        trailContainer.style.cursor = 'grab';
    });
    
    trailContainer.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - trailContainer.offsetLeft;
        const walk = (x - startX) * 2;
        trailContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    trailContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX - trailContainer.offsetLeft;
        scrollLeft = trailContainer.scrollLeft;
    });
    
    trailContainer.addEventListener('touchmove', function(e) {
        const x = e.touches[0].pageX - trailContainer.offsetLeft;
        const walk = (x - startX) * 2;
        trailContainer.scrollLeft = scrollLeft - walk;
    });
}

// Welcome message personalization
function updateWelcomeMessage() {
    const welcomeTitle = document.querySelector('.dialog-bubble h2');
    const welcomeText = document.querySelector('.dialog-bubble p');
    
    if (welcomeTitle && welcomeText) {
        const currentHour = new Date().getHours();
        let greeting;
        
        if (currentHour < 12) {
            greeting = "Bom dia";
        } else if (currentHour < 18) {
            greeting = "Boa tarde";
        } else {
            greeting = "Boa noite";
        }
        
        welcomeTitle.textContent = `${greeting}, ${playerData.name}!`;
        
        const messages = [
            "Que bom ter você aqui novamente! Continue sua jornada épica de aprendizagem e conquiste novos desafios. Você está indo muito bem!",
            "Pronto para mais uma aventura de conhecimento? Seus progressos têm sido incríveis! Vamos continuar explorando juntos.",
            "Sua dedicação ao aprendizado é inspiradora! Que tal descobrir mais sobre nosso planeta hoje?",
            "Cada passo que você dá nos aproxima de um mundo mais sustentável. Continue assim, explorador!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        welcomeText.textContent = randomMessage;
    }
}

// Initialize welcome message when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateWelcomeMessage, 500);
});

console.log('Progress page initialized successfully!');