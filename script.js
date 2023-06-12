'strict mode'

window.addEventListener('DOMContentLoaded', () =>{

    let myAnswers = document.querySelector('answers'),
        myQuestion = document.querySelector('question'),
        counter = document.querySelector('counter'),
        nextBtn = document.getElementById('next-button');
        

let questions = [
    {
        question : 'sdfsdfsdf',
        anwswers: [
            {block : '1', correct: false},
            {block : '2', correct: false},
            {block : '3', correct: true},
            {block : '4', correct: false}, 
        ]
    },
    {
        question : 'tyuiop',
        anwswers: [
            {block : '5', correct: true},
            {block : '3', correct: false},
            {block : '1', correct: false},
            {block : '9', correct: false}, 
        ]
    }
];

let currentQuestionIndex = 0,
    score = 0;
    

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    myQuestion.innerHTML = questionNumber + '. ' + currentQuestion.question;

    currentQuestion.anwswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.block;
        button.classList.add('btn');
        myAnswers.appendChild(button);
    })
}

startQuiz();

});
