// Biblioteca Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeBiblioteca();
});

// Sample book data - In a real application, this would come from an API
const booksData = [
    {
        id: 1,
        title: "A Aventura dos Números Mágicos",
        author: "Maria Silva",
        cover: "https://via.placeholder.com/280x200/00983f/ffffff?text=Matemática",
        rating: 4.8,
        pages: 156,
        level: "fundamental1",
        subject: "1ano",
        language: "portugues",
        difficulty: "basico",
        category: "digitais",
        description: "Uma jornada fascinante através do mundo dos números, onde cada página revela segredos matemáticos de forma divertida e interativa.",
        tags: ["Matemática", "Aventura", "Infantil"],
        isNew: true,
        isHighRated: true
    },
    {
        id: 2,
        title: "Chronicles of the Ancient World",
        author: "John Smith",
        cover: "https://via.placeholder.com/280x200/046a84/ffffff?text=História",
        rating: 4.5,
        pages: 234,
        level: "medio",
        subject: "2ano-medio",
        language: "ingles",
        difficulty: "intermediario",
        category: "todos",
        description: "Explore the mysteries of ancient civilizations through interactive storytelling and immersive historical narratives.",
        tags: ["História", "Civilização", "Aventura"],
        isNew: false,
        isHighRated: true
    },
    {
        id: 3,
        title: "Ciências da Natureza",
        author: "Dr. Pedro Santos",
        cover: "https://via.placeholder.com/280x200/ece21c/192f21?text=Ciências",
        rating: 4.7,
        pages: 189,
        level: "fundamental2",
        subject: "8ano",
        language: "portugues",
        difficulty: "intermediario",
        category: "avaliados",
        description: "Descubra os segredos da natureza através de experimentos virtuais e explicações científicas claras e envolventes.",
        tags: ["Ciências", "Natureza", "Experimentos"],
        isNew: true,
        isHighRated: true
    },
    {
        id: 4,
        title: "El Mundo de las Palabras",
        author: "Carmen López",
        cover: "https://via.placeholder.com/280x200/c66320/ffffff?text=Español",
        rating: 4.3,
        pages: 145,
        level: "fundamental1",
        subject: "3ano",
        language: "espanhol",
        difficulty: "basico",
        category: "digitais",
        description: "Un viaje emocionante por el idioma español, lleno de juegos, actividades y historias que harán que aprender sea divertido.",
        tags: ["Espanhol", "Idiomas", "Gramática"],
        isNew: false,
        isHighRated: false
    },
    {
        id: 5,
        title: "Programação para Jovens",
        author: "Ana Costa",
        cover: "https://via.placeholder.com/280x200/192f21/ece21c?text=Código",
        rating: 4.9,
        pages: 312,
        level: "superior",
        subject: "exatas",
        language: "portugues",
        difficulty: "avancado",
        category: "novos",
        description: "Aprenda os fundamentos da programação de forma prática e divertida, com projetos reais e desafios interativos.",
        tags: ["Programação", "Tecnologia", "Jovens"],
        isNew: true,
        isHighRated: true
    },
    {
        id: 6,
        title: "Literatura Clássica Brasileira",
        author: "Prof. Roberto Lima",
        cover: "https://via.placeholder.com/280x200/00983f/ffffff?text=Literatura",
        rating: 4.6,
        pages: 278,
        level: "medio",
        subject: "3ano-medio",
        language: "portugues",
        difficulty: "avancado",
        category: "avaliados",
        description: "Uma análise profunda dos grandes clássicos da literatura brasileira, com interpretações modernas e contexto histórico.",
        tags: ["Literatura", "Brasil", "Clássicos"],
        isNew: false,
        isHighRated: true
    },
    // Adding more sample books to demonstrate pagination
    {
        id: 7,
        title: "English Grammar Adventures",
        author: "Sarah Johnson",
        cover: "https://via.placeholder.com/280x200/046a84/ffffff?text=Grammar",
        rating: 4.4,
        pages: 167,
        level: "fundamental2",
        subject: "7ano",
        language: "ingles",
        difficulty: "intermediario",
        category: "digitais",
        description: "Master English grammar through fun games and interactive exercises designed for young learners.",
        tags: ["Inglês", "Gramática", "Exercícios"],
        isNew: true,
        isHighRated: false
    },
    {
        id: 8,
        title: "Filosofia para Crianças",
        author: "Dr. Carlos Mendes",
        cover: "https://via.placeholder.com/280x200/c66320/ffffff?text=Filosofia",
        rating: 4.2,
        pages: 134,
        level: "fundamental1",
        subject: "5ano",
        language: "portugues",
        difficulty: "intermediario",
        category: "todos",
        description: "Introduza conceitos filosóficos de forma simples e divertida, estimulando o pensamento crítico desde cedo.",
        tags: ["Filosofia", "Pensamento", "Crianças"],
        isNew: false,
        isHighRated: false
    }
];

let currentFilters = {
    search: '',
    categories: ['todos'], // Array to support multiple selections
    levels: [], // Array to support multiple selections
    subjects: [], // Array to support multiple selections
    languages: ['portugues'], // Array to support multiple selections
    difficulties: ['intermediario'] // Array to support multiple selections
};

let currentPage = 1;
const booksPerPage = 6;
let isLoading = false;

function initializeBiblioteca() {
    // Initialize search functionality
    initializeSearch();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize dropdown menus
    initializeDropdowns();
    
    // Initialize view options
    initializeViewOptions();
    
    // Initialize modal
    initializeModal();
    
    // Initialize sidebar toggle
    initializeSidebarToggle();
    
    // Load initial books
    loadBooks();
    
    // Initialize load more functionality
    initializeLoadMore();
    
    console.log('Biblioteca initialized successfully! 📚');
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    // const searchBtn = document.querySelector('.search-btn');
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentFilters.search = this.value.toLowerCase();
            currentPage = 1;
            loadBooks(true);
        }, 300);
    });
    
    // searchBtn.addEventListener('click', function() {
    //     currentFilters.search = searchInput.value.toLowerCase();
    //     currentPage = 1;
    //     loadBooks(true);
    // });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            currentFilters.search = this.value.toLowerCase();
            currentPage = 1;
            loadBooks(true);
        }
    });
}

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const filterType = this.getAttribute('data-filter');
            const isCurrentlyActive = this.classList.contains('active');
            
            // Handle "todos" special case
            if (filterType === 'todos') {
                // Clear all other category filters when "todos" is selected
                const categoryBtns = this.parentElement.querySelectorAll('.filter-btn');
                categoryBtns.forEach(catBtn => {
                    if (catBtn !== this) {
                        catBtn.classList.remove('active');
                    }
                });
                this.classList.add('active');
                currentFilters.categories = ['todos'];
            } else {
                // Toggle the filter
                if (isCurrentlyActive) {
                    this.classList.remove('active');
                } else {
                    this.classList.add('active');
                    // If selecting another filter, remove "todos"
                    const todosBtn = this.parentElement.querySelector('[data-filter="todos"]');
                    if (todosBtn) {
                        todosBtn.classList.remove('active');
                    }
                }
                
                updateMultipleFilters(filterType, !isCurrentlyActive);
            }
            
            currentPage = 1;
            loadBooks(true);
        });
    });
    
    // Clear filters button
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    clearFiltersBtn.addEventListener('click', clearAllFilters);
}

function initializeDropdowns() {
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const dropdownId = this.getAttribute('data-dropdown');
            const dropdownContent = document.getElementById(dropdownId);
            const isActive = dropdownContent.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-btn').forEach(button => {
                button.classList.remove('active');
            });
            
            // Toggle current dropdown
            if (!isActive) {
                dropdownContent.classList.add('active');
                this.classList.add('active');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-filter')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.dropdown-btn').forEach(button => {
                button.classList.remove('active');
            });
        }
    });
}

function initializeViewOptions() {
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const viewType = this.getAttribute('data-view');
            changeView(viewType);
        });
    });
}

function initializeModal() {
    const modal = document.getElementById('bookModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        loadBooks(false);
    });
}

function initializeSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const filtersSection = document.querySelector('.filters-section');
    
    if (sidebarToggle && filtersSection) {
        sidebarToggle.addEventListener('click', function() {
            filtersSection.classList.toggle('active');
            
            // Update icon
            const icon = this.querySelector('i');
            if (filtersSection.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-filter';
            }
        });
        
        // Close sidebar when clicking outside (mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                if (!filtersSection.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    filtersSection.classList.remove('active');
                    sidebarToggle.querySelector('i').className = 'fas fa-filter';
                }
            }
        });
    }
}

function updateMultipleFilters(filterType, isAdding) {
    // Determine which filter category this belongs to
    const categories = ['todos', 'digitais', 'novos', 'avaliados'];
    const levels = ['infantil', '1ano', '2ano', '3ano', '4ano', '5ano', '6ano', '7ano', '8ano', '9ano', '1ano-medio', '2ano-medio', '3ano-medio', 'exatas', 'humanas'];
    const languages = ['portugues', 'ingles', 'espanhol'];
    const difficulties = ['iniciante', 'basico', 'intermediario', 'avancado', 'fluente'];
    
    if (categories.includes(filterType)) {
        if (isAdding) {
            if (!currentFilters.categories.includes(filterType)) {
                currentFilters.categories.push(filterType);
            }
            // Remove 'todos' if other categories are selected
            if (filterType !== 'todos') {
                currentFilters.categories = currentFilters.categories.filter(cat => cat !== 'todos');
            }
        } else {
            currentFilters.categories = currentFilters.categories.filter(cat => cat !== filterType);
            // If no categories selected, default to 'todos'
            if (currentFilters.categories.length === 0) {
                currentFilters.categories = ['todos'];
                document.querySelector('[data-filter="todos"]').classList.add('active');
            }
        }
    } else if (levels.includes(filterType)) {
        if (isAdding) {
            if (!currentFilters.subjects.includes(filterType)) {
                currentFilters.subjects.push(filterType);
            }
        } else {
            currentFilters.subjects = currentFilters.subjects.filter(subj => subj !== filterType);
        }
    } else if (languages.includes(filterType)) {
        if (isAdding) {
            if (!currentFilters.languages.includes(filterType)) {
                currentFilters.languages.push(filterType);
            }
        } else {
            currentFilters.languages = currentFilters.languages.filter(lang => lang !== filterType);
            // Ensure at least one language is selected
            if (currentFilters.languages.length === 0) {
                currentFilters.languages = ['portugues'];
                document.querySelector('[data-filter="portugues"]').classList.add('active');
            }
        }
    } else if (difficulties.includes(filterType)) {
        if (isAdding) {
            if (!currentFilters.difficulties.includes(filterType)) {
                currentFilters.difficulties.push(filterType);
            }
        } else {
            currentFilters.difficulties = currentFilters.difficulties.filter(diff => diff !== filterType);
            // Ensure at least one difficulty is selected
            if (currentFilters.difficulties.length === 0) {
                currentFilters.difficulties = ['intermediario'];
                document.querySelector('[data-filter="intermediario"]').classList.add('active');
            }
        }
    }
}

function updateFilter(filterType) {
    // Determine which filter category this belongs to
    const categories = ['todos', 'digitais', 'novos', 'avaliados'];
    const levels = ['infantil', '1ano', '2ano', '3ano', '4ano', '5ano', '6ano', '7ano', '8ano', '9ano', '1ano-medio', '2ano-medio', '3ano-medio', 'exatas', 'humanas'];
    const languages = ['portugues', 'ingles', 'espanhol'];
    const difficulties = ['iniciante', 'basico', 'intermediario', 'avancado', 'fluente'];
    
    if (categories.includes(filterType)) {
        currentFilters.categories = [filterType];
    } else if (levels.includes(filterType)) {
        currentFilters.subjects = [filterType];
    } else if (languages.includes(filterType)) {
        currentFilters.languages = [filterType];
    } else if (difficulties.includes(filterType)) {
        currentFilters.difficulties = [filterType];
    }
    
    currentPage = 1;
    loadBooks(true);
}

function clearAllFilters() {
    // Reset filters to default
    currentFilters = {
        search: '',
        categories: ['todos'],
        levels: [],
        subjects: [],
        languages: ['portugues'],
        difficulties: ['intermediario']
    };
    
    // Reset UI
    document.getElementById('searchInput').value = '';
    
    // Reset active buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Set default active buttons
    document.querySelector('[data-filter="todos"]').classList.add('active');
    document.querySelector('[data-filter="portugues"]').classList.add('active');
    document.querySelector('[data-filter="intermediario"]').classList.add('active');
    
    // Close all dropdowns
    document.querySelectorAll('.dropdown-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.classList.remove('active');
    });
    
    currentPage = 1;
    loadBooks(true);
}

function loadBooks(reset = false) {
    if (isLoading) return;
    
    isLoading = true;
    const loadingContainer = document.getElementById('loadingContainer');
    const booksGrid = document.getElementById('booksGrid');
    
    if (reset) {
        booksGrid.innerHTML = '';
        currentPage = 1;
    }
    
    loadingContainer.style.display = 'block';
    
    // Simulate API delay
    setTimeout(() => {
        const filteredBooks = filterBooks();
        const startIndex = (currentPage - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        const booksToShow = filteredBooks.slice(startIndex, endIndex);
        
        if (reset) {
            renderBooks(booksToShow);
        } else {
            appendBooks(booksToShow);
        }
        
        updateResultsCount(filteredBooks.length);
        updateLoadMoreButton(filteredBooks.length);
        
        loadingContainer.style.display = 'none';
        isLoading = false;
    }, 800);
}

function filterBooks() {
    return booksData.filter(book => {
        // Search filter
        if (currentFilters.search && 
            !book.title.toLowerCase().includes(currentFilters.search) &&
            !book.author.toLowerCase().includes(currentFilters.search) &&
            !book.tags.some(tag => tag.toLowerCase().includes(currentFilters.search))) {
            return false;
        }
        
        // Category filter - check if book matches any selected categories
        if (!currentFilters.categories.includes('todos')) {
            let matchesCategory = false;
            
            for (let category of currentFilters.categories) {
                if (category === 'novos' && book.isNew) {
                    matchesCategory = true;
                    break;
                }
                if (category === 'avaliados' && book.isHighRated) {
                    matchesCategory = true;
                    break;
                }
                if (category === 'digitais' && book.category === 'digitais') {
                    matchesCategory = true;
                    break;
                }
            }
            
            if (!matchesCategory) return false;
        }
        
        // Language filter - check if book matches any selected languages
        if (currentFilters.languages.length > 0 && !currentFilters.languages.includes(book.language)) {
            return false;
        }
        
        // Difficulty filter - check if book matches any selected difficulties
        if (currentFilters.difficulties.length > 0 && !currentFilters.difficulties.includes(book.difficulty)) {
            return false;
        }
        
        // Subject filter - check if book matches any selected subjects
        if (currentFilters.subjects.length > 0 && !currentFilters.subjects.includes(book.subject)) {
            return false;
        }
        
        return true;
    });
}

function renderBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    booksGrid.innerHTML = books.map(book => createBookCard(book)).join('');
    addBookCardListeners();
}

function appendBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    booksGrid.innerHTML += books.map(book => createBookCard(book)).join('');
    addBookCardListeners();
}

function createBookCard(book) {
    return `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}">
                <div class="book-overlay">
                    <button class="play-btn">
                        <i class="fas fa-play"></i>
                    </button>
                </div>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">por ${book.author}</p>
                <div class="book-meta">
                    <span class="book-rating">
                        <i class="fas fa-star"></i>
                        ${book.rating}
                    </span>
                    <span class="book-pages">${book.pages} páginas</span>
                    <span class="book-level">${getDifficultyLabel(book.difficulty)}</span>
                </div>
                <div class="book-tags">
                    ${book.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function addBookCardListeners() {
    const bookCards = document.querySelectorAll('.book-card:not([data-listener])');
    bookCards.forEach(card => {
        card.setAttribute('data-listener', 'true');
        card.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-book-id'));
            const book = booksData.find(b => b.id === bookId);
            if (book) {
                openBookModal(book);
            }
        });
    });
}

function openBookModal(book) {
    const modal = document.getElementById('bookModal');
    
    // Populate modal with book data
    document.getElementById('modalBookCover').src = book.cover;
    document.getElementById('modalBookTitle').textContent = book.title;
    document.getElementById('modalBookAuthor').textContent = `por ${book.author}`;
    document.getElementById('modalBookRating').textContent = book.rating;
    document.getElementById('modalBookPages').textContent = `${book.pages} páginas`;
    document.getElementById('modalBookLevel').textContent = getDifficultyLabel(book.difficulty);
    document.getElementById('modalBookDescription').textContent = book.description;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add action button listeners
    const readBtn = modal.querySelector('.action-btn.primary');
    const quizBtn = modal.querySelector('.action-btn.secondary');
    
    readBtn.onclick = () => {
        showNotification(`📖 Abrindo "${book.title}" para leitura...`, 'success');
        closeModal();
    };
    
    quizBtn.onclick = () => {
        showNotification(`🎮 Iniciando quiz de "${book.title}"...`, 'info');
        closeModal();
    };
}

function closeModal() {
    const modal = document.getElementById('bookModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeView(viewType) {
    const booksGrid = document.getElementById('booksGrid');
    
    if (viewType === 'list') {
        booksGrid.classList.add('list-view');
    } else {
        booksGrid.classList.remove('list-view');
    }
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    resultsCount.textContent = `Mostrando ${count} livros`;
}

function updateLoadMoreButton(totalBooks) {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const currentlyShown = currentPage * booksPerPage;
    
    if (currentlyShown >= totalBooks) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'flex';
        const remaining = totalBooks - currentlyShown;
        loadMoreBtn.querySelector('span') = `Carregar Mais ${Math.min(remaining, booksPerPage)} Livros`;
    }
}

function getDifficultyLabel(difficulty) {
    const labels = {
        'iniciante': 'Iniciante',
        'basico': 'Básico',
        'intermediario': 'Intermediário',
        'avancado': 'Avançado',
        'fluente': 'Fluente'
    };
    return labels[difficulty] || difficulty;
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
        z-index: 20000;
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

// Export functions for potential external use
window.BibliotecaArkos = {
    loadBooks,
    updateFilter,
    clearAllFilters,
    showNotification
};

console.log('Biblioteca Arkos initialized! 📚✨');