const questionsElement = document.getElementById('para');
const answersElement = document.getElementById('answers');
const resultElement = document.getElementById('result');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let questions = [];
let currentQuestionIndex = 0;

fetch('https://opentdb.com/api.php?amount=20')
    .then(response => response.json())
    .then(data => {
        questions = data.results;
        displayQuestion(currentQuestionIndex);
    });

function displayQuestion(index) {
    const question = questions[index];
    questionsElement.innerHTML = `<p>${question.question}</p>`;
    const answers = [...question.incorrect_answers, question.correct_answer];
    // Shuffle answers
    answers.sort(() => Math.random() - 0.5);

    answersElement.innerHTML = answers.map(answer => 
        `<div class="answer">${answer}</div>`
    ).join('');

    resultElement.innerHTML = ''; // Clear previous result
    prevBtn.disabled = index === 0; // Disable Previous button if on the first question
    nextBtn.disabled = index === questions.length - 1; // Disable Next button if on the last question

    // Add click event listeners to the answers
    document.querySelectorAll('.answer').forEach((element) => {
        element.addEventListener('click', () => checkAnswer(element.innerText, question.correct_answer));
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    resultElement.innerHTML = selectedAnswer === correctAnswer 
        ? 'Correct!' 
        : 'Incorrect. The correct answer is: ' + correctAnswer;

    // Highlight the answers
    document.querySelectorAll('.answer').forEach((element) => {
        if (element.innerText === correctAnswer) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
        }
    });
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
});