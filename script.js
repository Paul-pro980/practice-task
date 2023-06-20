'strict mode'


// create var 
const myAnswers = document.getElementById('answers'),
      myQuestion = document.getElementById('question'),
      counter = document.getElementById('counter'),
      nextBtn = document.getElementById('next-button'),
      restartBtn = document.getElementById('restart'),
      setTimer = document.getElementById('timer'),
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
    timeValue = 5;


//timer function 
function countDown(time){
    timeCounter = setInterval(timer, 1000);
    function timer(){
        setTimer.textContent = time;
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
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
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
    while(myAnswers.firstChild){
        myAnswers.removeChild(myAnswers.firstChild);
    }
};


function selectAnswer(e){
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
};

    
function showScore(){
    hideBtns();
    showStorage();
    clearInterval(timeCounter);
    setTimer.disabled = true;
    setTimer.style.display = 'none';
    nextBtn.style.display = 'none'; 
    restartBtn.style.display = 'block';
    myQuestion.innerHTML = `Вы ответили на ${score} из ${questions.length}`;
    counter.innerHTML = 'Вот ваш результат';
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
themeBtn.onclick = function(){
    document.body.classList.toggle('changeMode');
}


//start of making localStorage
function showStorage(){
    let storageScore = score;
    let saveScore = {
        score: storageScore
    }
    localStorage.setItem('score', JSON.stringify(storageScore));
    let takescore = localStorage.getItem('score');

    for(let i = 0; i < 5; i++){
        if(takescore){
            saveScore[takescore];
        }
        i++;
    }
    console.log(takescore);

}


startQuiz(); 
