var startquiz = document.getElementById("startquiz")
var savescore = document.getElementById("savescore")
var viewscores = document.getElementById("viewscores")
var playagain = document.getElementById("playagain")

var welcome = document.getElementById("welcome")
var quiz = document.getElementById("quiz")
var result = document.getElementById("result")

var options = document.getElementById("options")
var message = document.getElementById("message")
var timer = document.getElementById("timer")
var summary = document.getElementById("summary")

var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;

var start = true;

// Getting the question
const question = document.getElementById("question");

var questions = [
    {
        id: 0, 
        titles: 'Commonly used data types DO NOT include:',
        choices: ['stings', 'booleans', 'alerts', 'numbers'], 
        answer: 'alerts',
    }, 
    {
        id: 1, 
        titles: 'The condition in an if/else statement is enclosed within ____',
        choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'], 
        answer: 'parentheses',
    }, 
    {
        id: 2,
        titles: 'Arrays in Javascript can be used to store ____',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'], 
        answer: 'all of the above',
    }, 
    {
        id: 3, 
        titles: 'String values must be enclosed within ____ when being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'parentheses'], 
        answer: 'quotes',
    }, 
    {
        id: 4, 
        titles: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['Javascript', 'terminal/bash', 'for loops', 'console.log'], 
        answer: 'console.log',
    }, 
]
function onStartGame() {

    // Set the timer at 75 seconds 
    secondsLeft = 75;

    // Start at the first questions 
    currentQuestion = 0;

    // Reset the score 
    score = 0;

    // Start tht timer 
    countdownTimer = setInterval(function () {

        if (secondsLeft > 0) {
            timer.textContent = secondsLeft;
        } else {
            // Stop the counter and end the game 
            stopGame();
        }
        secondsLeft--;
    }, 1000);

    // Hide the welcome section 
    welcomne.style.display = 'none';
    result.style.display = 'none';
    quiz.style.display = 'flex';

    // Display the first question
    displayQuestion();
}

function stopGame() {

    // Stop the timer 
    clearInterval(countdownTimer);

    // Clear the timer
    timer.textContent = ""

    // Hide the questions and show the result
    quiz.style.display = 'none';
    result.style.display = 'flex'
    
    // Display the Score
    summary.textContent = "Your Score is: " + score;
}

function onSaveScore(e) {
    var initials = document.getElementById("initials").value

    // If we have valid initials, save the score to local storage 
    if (initials !== "") {
        localStorage.setItem(initals, score);
        document.getElementById("initals").value = "";
    }
}

function onViewScores(e) {
    window.location.href = 'index.html';
}

function onSelectAnswer(e) {
    var correctAnswer = questions[currentQuestion].answer;
    var userAnswer = e.target.textContent;

    if (correctAnswer === userAnswer) {
        score++;

        displayMessage('Correct!')
    } else {
        score--;
        displayMessage('Wrong!')
    }

    // Call up the next question
    displayQuestion();
}

function displayMessage(msg) {

    // Display the message
    message.textContent = msg;

    // Clear the message after 1 second
    setTimeout(function () {
        message.textContent = " ";
    }, 1000);
}

function displayQuestion() {

    // Increment to get the next question 
    currentQuestion++;

    console.log('current question is' + currentQuestion);

    // Have we ran out of question
    if (currentQuestion >= questions.length){
        stopGame();
        return;
    }

    // Load question information from the question array 
    var question = question[currentQuestion];
    document.getElementById("question").textContent = question.title
   
    // Clear any existing options
    options.innerHTML = "";

    // Load through the choices and output the new possible options 
    for (var i = 0; i < question.choices.length; i++){

        var option = document.createElement("div");
        option.textContent = question.choices[i];
        option.onclick = onSelectAnswer;
        option.classList.add("option");
        options.appendChild(option);
    }
}

startquiz.addEventListener("click", onStartGame);
savescore.addEventListener("click", onSaveScore);
viewscores.addEventListener("click", onViewScores);
playagain.addEventListener("click", onStartGame);