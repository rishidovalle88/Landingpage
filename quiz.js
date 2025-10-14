// Quiz data
const quizData = [
    {
        question: "Qual é o maior animal marinho do mundo?",
        answers: [
            "Tubarão-branco",
            "Baleia-azul",
            "Polvo-gigante",
            "Tartaruga-marinha"
        ],
        correct: 1,
        explanation: "A baleia-azul é o maior animal marinho e também o maior animal que já existiu na Terra!"
    },
    {
        question: "Quantos oceanos existem no mundo?",
        answers: [
            "3",
            "4",
            "5",
            "6"
        ],
        correct: 2,
        explanation: "Existem 5 oceanos no mundo: Pacífico, Atlântico, Índico, Ártico e Antártico."
    },
    {
        question: "Qual é a maior profundidade registrada no oceano?",
        answers: [
            "1.000 metros",
            "5.000 metros",
            "11.000 metros",
            "20.000 metros"
        ],
        correct: 2,
        explanation: "A Fossa das Marianas atinge aproximadamente 11.000 metros de profundidade, sendo o ponto mais profundo da Terra."
    },
    {
        question: "Qual desses animais NÃO vive nos oceanos?",
        answers: [
            "Peixe-palhaço",
            "Pinguim",
            "Camelo",
            "Estrela-do-mar"
        ],
        correct: 2,
        explanation: "Camelos vivem em desertos e não são encontrados nos oceanos."
    },
    {
        question: "Qual porcentagem da superfície da Terra é coberta por oceanos?",
        answers: [
            "50%",
            "60%",
            "70%",
            "80%"
        ],
        correct: 2,
        explanation: "Aproximadamente 70% da superfície da Terra é coberta por oceanos."
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let correctAnswers = 0;

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const quizArea = document.getElementById('quizArea');
const completionScreen = document.getElementById('completionScreen');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const feedbackContainer = document.getElementById('feedbackContainer');
const feedbackText = document.getElementById('feedbackText');
const feedbackIcon = document.getElementById('feedbackIcon');
const submitBtn = document.getElementById('submitBtn');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const totalQuestionsFinal = document.getElementById('totalQuestionsFinal');
const scoreEl = document.getElementById('score');
const finalScore = document.getElementById('finalScore');
const correctAnswersEl = document.getElementById('correctAnswers');
const progressFill = document.getElementById('progressFill');

// Initialize quiz
function initQuiz() {
    totalQuestionsEl.textContent = quizData.length;
    totalQuestionsFinal.textContent = quizData.length;
}

// Start quiz
function startQuiz() {
    welcomeScreen.style.display = 'none';
    quizArea.style.display = 'block';
    loadQuestion();
}

// Load question
function loadQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    currentQuestionEl.textContent = currentQuestion + 1;
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Add answers
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.classList.add('answer-option');
        answerElement.textContent = answer;
        answerElement.addEventListener('click', () => selectAnswer(index, answerElement));
        answersContainer.appendChild(answerElement);
    });
    
    // Reset state
    selectedAnswer = null;
    feedbackContainer.style.display = 'none';
    submitBtn.style.display = 'block';
    submitBtn.disabled = true;
    
    // Update progress bar
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// Select answer
function selectAnswer(index, element) {
    // Remove selected class from all answers
    document.querySelectorAll('.answer-option').forEach(answer => {
        answer.classList.remove('selected');
    });
    
    // Add selected class to clicked answer
    element.classList.add('selected');
    selectedAnswer = index;
    submitBtn.disabled = false;
}

// Check answer
function checkAnswer() {
    if (selectedAnswer === null) return;
    
    const question = quizData[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    // Show feedback
    feedbackContainer.style.display = 'block';
    submitBtn.style.display = 'none';
    
    if (isCorrect) {
        // Correct answer
        feedbackIcon.innerHTML = '🎉';
        feedbackIcon.className = 'feedback-icon correct';
        feedbackText.textContent = 'Parabéns! Você acertou!';
        score += 100;
        correctAnswers++;
        scoreEl.textContent = score;
        
        // Highlight correct answer
        document.querySelectorAll('.answer-option')[selectedAnswer].classList.add('correct');
    } else {
        // Incorrect answer
        feedbackIcon.innerHTML = '😢';
        feedbackIcon.className = 'feedback-icon incorrect';
        feedbackText.textContent = `Resposta incorreta. ${question.explanation}`;
        
        // Highlight incorrect and correct answers
        document.querySelectorAll('.answer-option')[selectedAnswer].classList.add('incorrect');
        document.querySelectorAll('.answer-option')[question.correct].classList.add('correct');
    }
}

// Next question
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showCompletion();
    }
}

// Show completion screen
function showCompletion() {
    quizArea.style.display = 'none';
    completionScreen.style.display = 'block';
    
    correctAnswersEl.textContent = correctAnswers;
    finalScore.textContent = score;
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;
    selectedAnswer = null;
    
    scoreEl.textContent = score;
    completionScreen.style.display = 'none';
    quizArea.style.display = 'block';
    
    loadQuestion();
}

// Go to library
function goToLibrary() {
    window.location.href = 'biblioteca.html';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initQuiz);