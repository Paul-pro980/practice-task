'strict mode'



// create var 
const myAnswers = document.getElementById('answers'),
      myQuestion = document.getElementById('question'),
      counter = document.getElementById('counter'),
      nextBtn = document.getElementById('next-button'),
      restartBtn = document.getElementById('restart'),
      setTimer = document.getElementById('timer'),
      scoreModal = document.getElementById('scoreStorage'),
      themeBtn = document.querySelector('#theme');
  
      
// create arr with questions
const questions = [
{
    question : 'How many planets are in the solar system?',
    anwswers: [
        {block : '8', correct: true},
        {block : '9', correct: false},
        {block : '10', correct: false},
        {block : '7', correct: false}, 
    ]
},

{
    question : 'What is the freezing point of water?',
    anwswers: [
        {block : '-1', correct: false},
        {block : '0', correct: true},
        {block : '1', correct: false},
        {block : '-5', correct: false}, 
    ]
},

{
    question : 'What is the longest river in the world?',
    anwswers: [
        {block : 'Amazon', correct: false},
        {block : 'Yangtze', correct: false},
        {block : 'Nile', correct: true},
    ]
},

{
    question : 'How many chromosomes are in the human genome?',
    anwswers: [
        {block : '42', correct: false},
        {block : '43', correct: false},
        {block : '44', correct: false},
        {block : '46', correct: true}, 
    ]
} 
];


let currentQuestionIndex = 0,
    score = 0,
    timeCounter,
    time = 0,
    timeValue = 5;


//timer function 
function countDown(time){
    timeCounter = setInterval(timer, 1000);
    function timer(){
        setTimer.textContent = 'Time left:' + ' ' + time;
        time--;
        if(time < 0){
            clearInterval(timeCounter);
            Array.from(myAnswers.children).forEach(button =>{
                if(button.dataset.correct === 'true'){
                    button.classList.add('correct');
                }
                button.disabled = true;
            });
            nextBtn.style.display = 'block'; 
        }
    }

};


// there selftiteld functions(they are names are reflect what they do)
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
};


function showQuestion(){
    hideBtns();
    clearInterval(timeCounter)
    countDown(timeValue);
    const currentQuestion = questions[currentQuestionIndex],
          questionNumber = currentQuestionIndex + 1;
    counter.innerHTML = 'Question' + ' ' + questionNumber + '/' + questions.length;
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


function hideBtns(){
    setTimer.style.display = 'block';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    scoreModal.style.display = 'none';
    while(myAnswers.firstChild){
        myAnswers.removeChild(myAnswers.firstChild);
    }
};

import selectAnswer from "./helpers/functions.js";

/* function selectAnswer(e){
    const selectBtn = e.target,
          isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect){
        selectBtn.classList.add('correct');
        score++;
    }else{
        selectBtn.classList.add('incorrect');
    }
    Array.from(myAnswers.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBtn.style.display = 'block';
}; */

    
function showScore(){
    hideBtns();
    localStorageListener();
    clearInterval(timeCounter);
    setTimer.disabled = true;
    setTimer.style.display = 'none';
    nextBtn.style.display = 'none'; 
    restartBtn.style.display = 'block';
    scoreModal.style.display = 'block';
    myQuestion.innerHTML = `Вы ответили на ${score} из ${questions.length}`;
    counter.innerHTML = 'Вот ваш результат';
    scoreModal.addEventListener('click', openModal)
};


function nextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else showScore();
};


nextBtn.addEventListener('click', () =>{
    if(currentQuestionIndex < questions.length){
        nextButton();
    }else startQuiz();
});


restartBtn.addEventListener('click', () =>{
    startQuiz();
})


// switch themes

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('changeMode');
});

//storage window
const modalTrigger = document.querySelector('scoreStorage'),
      modalTab = document.querySelector('.storage'),
      closeModal = document.querySelector('[data-close]');


function openModal(){
    modalTab.classList.add('show');
    document.body.style.overflow = 'hidden';
};

function closeModalTab(){
    modalTab.classList.remove('show');
    document.body.style.overflow = '';
};

closeModal.addEventListener('click', closeModalTab)

modalTab.addEventListener('click', (e) => {
    if (e.target === modalTab){
        closeModalTab();
    };
});

document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape' && modalTab.classList.contains('show')){
        closeModalTab();
    };
});


//start of making localStorage
function localStorageListener(){

    /* let actualScore = [];
    const existingScore = localStorage.getItem('score');
    if (existingScore) {
        actualScore = JSON.parse(existingScore);
    }
    actualScore.push(score);
    localStorage.setItem('score', JSON.stringify(actualScore));
    //console.log(actualScore);

    showStorage(existingScore); */

    let actualScore = score;

    let ScoreCtorage = {
      score: actualScore,
    };

    let savedScores = localStorage.getItem("scores");
    if (savedScores) {
        savedScores = JSON.parse(savedScores);
        savedScores.push(ScoreCtorage); 
        if (savedScores.length > 5) {
            savedScores = savedScores.slice(-5); 
        }
    } else {
        savedScores = [ScoreCtorage]; 
    }
  localStorage.setItem("scores", JSON.stringify(savedScores));

  showStorage(savedScores);
}

function showStorage(resaults){
        let scoreList = document.getElementById("scores");
        scoreList.innerHTML = "";
      
        resaults.forEach(function(item) {
            let listItem = document.createElement("li");
            listItem.innerText = `Your score is - ${item.score}`;
            scoreList.appendChild(listItem);
        });
}


startQuiz(); 
