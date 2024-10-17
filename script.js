//Displays the current question.
const questionsElement = document.getElementById('para');
//shows the possible answers
const answersElement = document.getElementById('answers');
//show weather the user answer is correct or not
const resultElement = document.getElementById('result');
//previous and next questions
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');



let questions = [];//this will hold the questions that will be fetched in array
let currentQuestionIndex = 0; //index of the current question displayed

fetch('https://opentdb.com/api.php?amount=5&category=18') // fetching the question and options from this API endpoint
    .then(response => response.json())
    .then(data => {
        questions = data.results; //the data fetched from the API endpoint is stored in here
        displayQuestion(currentQuestionIndex); //display the first question
    });

//Retrieves the question at the given index and updates the questionsElement to display it.
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


        //increase user score is correct
        if(selectedAnswer === correctAnswer){
            increaseUserScore();
            FinalScore();
            element.disabled;
        }
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

// Create a score variable
let score = 0;

// Assuming you have a container in your HTML
const scoreCon = document.getElementById('scoreContainer');

//Function to check answers
function increaseUserScore() {

  // Update the score display
  score += 1
  scoreCon.innerText = score;
}



//Call this function when the quiz is complete or after each answer


const previewFinalScore = documnet.getElementById('finalScore')
const preview = documnet.getElementById('preview')

function FinalScore () {
    previewFinalScore.innerText = scoreCon;
    preview.style.display = 'block';
}
