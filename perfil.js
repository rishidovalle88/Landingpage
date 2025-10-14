// Function to handle the "Continue Adventure" button click
function continuePlaying() {
    // For now, we'll just show an alert
    // In a real application, this would redirect to the library or continue reading
    alert("Continuando sua aventura! Vamos ler mais um livro?");
    
    // Example of what could be implemented:
    // window.location.href = "biblioteca.html";
}

// Function to initialize the profile page
document.addEventListener('DOMContentLoaded', function() {
    // Here you could fetch real player data from a server or localStorage
    // For now, we're using static data as shown in the HTML
    
    console.log("Página de perfil carregada");
    
    // Example of dynamic data update (if connected to a backend)
    /*
    fetch('/api/player-data')
        .then(response => response.json())
        .then(data => {
            document.querySelector('.player-details h2').textContent = data.name;
            document.querySelector('.level-value').textContent = data.level;
            document.querySelector('.stat-value.points').textContent = data.points;
            document.querySelector('.stat-value.books').textContent = data.booksRead;
            document.querySelector('.stat-value.quizzes').textContent = data.quizzesPlayed;
            document.querySelector('.stat-value.accuracy').textContent = data.accuracy + '%';
        })
        .catch(error => {
            console.error('Erro ao carregar dados do jogador:', error);
        });
    */
});

// Add animation to stat cards when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        // Add a delay for each card to create a staggered animation effect
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
    
    // Add animation to table rows
    const tableRows = document.querySelectorAll('.quiz-table tbody tr');
    
    tableRows.forEach((row, index) => {
        // Add a delay for each row to create a staggered animation effect
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            row.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Add animation to ranking cards
    const rankingCards = document.querySelectorAll('.ranking-card');
    
    rankingCards.forEach((card, index) => {
        // Add a delay for each card to create a staggered animation effect
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 * index);
    });
    
    // Animate progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // Store the final width
        const finalWidth = progressFill.style.width;
        
        // Reset width to 0 for animation
        progressFill.style.width = '0';
        
        // Animate to final width after a short delay
        setTimeout(() => {
            progressFill.style.transition = 'width 1.5s ease-in-out';
            progressFill.style.width = finalWidth;
        }, 300);
    }
});