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
});