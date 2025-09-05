// JavaScript para Navegação do Livro de Poluição dos Mares

let currentPage = 0;
const totalPages = 4;
const pages = ['coverPage', 'page1', 'page2', 'page3', 'page4', 'finalPage'];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
    updatePageIndicator();
});

// Função para ir para a próxima página
function nextPage() {
    if (currentPage < pages.length - 1) {
        // Esconder página atual
        const currentPageElement = document.getElementById(pages[currentPage]);
        if (currentPageElement) {
            currentPageElement.style.display = 'none';
        }
        
        // Ir para próxima página
        currentPage++;
        
        // Mostrar nova página
        const nextPageElement = document.getElementById(pages[currentPage]);
        if (nextPageElement) {
            nextPageElement.style.display = 'block';
            
            // Scroll para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Animação de entrada
            nextPageElement.style.opacity = '0';
            nextPageElement.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                nextPageElement.style.opacity = '1';
                nextPageElement.style.transform = 'translateX(0)';
                nextPageElement.style.transition = 'all 0.5s ease-out';
            }, 50);
        }
        
        updateNavigation();
        updatePageIndicator();
        
        // Tocar som de virar página (se disponível)
        playPageTurnSound();
    }
}

// Função para ir para a página anterior
function prevPage() {
    if (currentPage > 0) {
        // Esconder página atual
        const currentPageElement = document.getElementById(pages[currentPage]);
        if (currentPageElement) {
            currentPageElement.style.display = 'none';
        }
        
        // Ir para página anterior
        currentPage--;
        
        // Mostrar página anterior
        const prevPageElement = document.getElementById(pages[currentPage]);
        if (prevPageElement) {
            prevPageElement.style.display = 'block';
            
            // Scroll para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Animação de entrada
            prevPageElement.style.opacity = '0';
            prevPageElement.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                prevPageElement.style.opacity = '1';
                prevPageElement.style.transform = 'translateX(0)';
                prevPageElement.style.transition = 'all 0.5s ease-out';
            }, 50);
        }
        
        updateNavigation();
        updatePageIndicator();
        
        // Tocar som de virar página (se disponível)
        playPageTurnSound();
    }
}

// Atualizar botões de navegação
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        // Botão anterior
        if (currentPage === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }
        
        // Botão próximo
        if (currentPage === pages.length - 1) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'flex';
            
            // Texto do botão muda na última página de conteúdo
            if (currentPage === totalPages) {
                nextBtn.innerHTML = '<i class="fas fa-trophy"></i> Finalizar';
            } else {
                nextBtn.innerHTML = 'Próxima Página <i class="fas fa-chevron-right"></i>';
            }
        }
    }
}

// Atualizar indicador de página
function updatePageIndicator() {
    const currentPageNum = document.getElementById('currentPageNum');
    const totalPagesElement = document.getElementById('totalPages');
    
    if (currentPageNum && totalPagesElement) {
        if (currentPage === 0) {
            // Capa do livro
            currentPageNum.textContent = 'Capa';
            totalPagesElement.textContent = '';
        } else if (currentPage === pages.length - 1) {
            // Página final
            currentPageNum.textContent = 'Final';
            totalPagesElement.textContent = '';
        } else {
            // Páginas normais
            currentPageNum.textContent = currentPage;
            totalPagesElement.textContent = totalPages;
        }
    }
}

// Reiniciar livro
function restartBook() {
    // Esconder página atual
    const currentPageElement = document.getElementById(pages[currentPage]);
    if (currentPageElement) {
        currentPageElement.style.display = 'none';
    }
    
    // Voltar para a capa
    currentPage = 0;
    const coverPage = document.getElementById('coverPage');
    if (coverPage) {
        coverPage.style.display = 'block';
    }
    
    updateNavigation();
    updatePageIndicator();
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Mostrar mensagem de reinício
    showMessage('📚 Vamos ler novamente!', 'success');
}

// Voltar ao início (página principal)
function goHome() {
    // Confirmar se quer sair
    const confirmExit = confirm('Você quer voltar à página principal? O progresso da leitura será perdido.');
    
    if (confirmExit) {
        window.location.href = 'index.html';
    }
}

// Função para tocar som de virar página (opcional)
function playPageTurnSound() {
    try {
        // Criar um som simples usando Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        // Se não conseguir tocar o som, apenas continue silenciosamente
        console.log('Audio not available');
    }
}

// Função para mostrar mensagens
function showMessage(message, type = 'info') {
    // Criar elemento de mensagem
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;
    
    // Estilos da mensagem
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#32CD32' : '#FFD700'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInMessage 0.3s ease-out;
    `;
    
    // Adicionar ao documento
    document.body.appendChild(messageElement);
    
    // Remover após 3 segundos
    setTimeout(() => {
        messageElement.style.animation = 'slideOutMessage 0.3s ease-out';
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 300);
    }, 3000);
}

// Adicionar animações CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInMessage {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutMessage {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Controles de teclado
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ': // Barra de espaço
            event.preventDefault();
            nextPage();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            prevPage();
            break;
        case 'Home':
            event.preventDefault();
            restartBook();
            break;
        case 'Escape':
            event.preventDefault();
            goHome();
            break;
    }
});

// Navegação por gestos em dispositivos touch
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Distância mínima para considerar um swipe
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe para a esquerda - próxima página
            nextPage();
        } else {
            // Swipe para a direita - página anterior
            prevPage();
        }
    }
}

// Animações extras para elementos SVG
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animação de "respiração" para peixes felizes
    const happyFish = document.querySelectorAll('ellipse[fill="#FFD700"], ellipse[fill="#32CD32"]');
    happyFish.forEach((fish, index) => {
        fish.style.animation = `fishBreathe ${2 + index * 0.5}s ease-in-out infinite`;
    });
    
    // Adicionar animação de tremor para elementos poluídos
    const pollutedElements = document.querySelectorAll('rect[fill="#8B4513"]');
    pollutedElements.forEach((element) => {
        element.style.animation = 'shake 3s ease-in-out infinite';
    });
});

// CSS para animações adicionais
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes fishBreathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        75% { transform: translateX(2px); }
    }
`;
document.head.appendChild(additionalStyles);