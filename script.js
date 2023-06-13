'strict mode'

window.addEventListener('DOMContentLoaded', () =>{

    //take dom elements
    let myAnswers = document.getElementById('answers'),
        myQuestion = document.getElementById('question'),
        counter = document.getElementById('counter'),
        nextBtn = document.getElementById('next-button');
        
// object initialisation
let questions = [
    {
        question : 'How?',
        anwswers: [
            {block : '1', correct: true},
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
    
// selftiteld functions
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    hideQuestion();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    counter.innerHTML = 'Question' + ' ' + questionNumber + '/4';
    myQuestion.innerHTML = currentQuestion.question;

    currentQuestion.anwswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.block;
        button.classList.add('btn');
        myAnswers.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    });
};

startQuiz();

function hideQuestion(){
    nextBtn.style.display = 'none';
    while(myAnswers.firstChild){
        myAnswers.removeChild(myAnswers.firstChild);
    }
}
});

function selectAnswer(e){
    const selectBtn = e.target,
          isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect){
        selectBtn.classList.add('correct');
    }else{
        selectBtn.classList.add('incorrect');
    }
    Array.from(myAnswers.firstChild).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBtn.style.display = 'block';
};

