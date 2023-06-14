'strict mode'

window.addEventListener('DOMContentLoaded', () =>{

    let myAnswers = document.getElementById('answers'),
        myQuestion = document.getElementById('question'),
        counter = document.getElementById('counter'),
        nextBtn = document.getElementById('next-button');
        

 let questions = [
    {
        question : 'ответ 1',
        anwswers: [
            {block : '1', correct: true},
            {block : '2', correct: false},
            {block : '3', correct: false},
            {block : '4', correct: false}, 
        ]
    },
    {
        question : 'ответ 2',
        anwswers: [
            {block : '5', correct: false},
            {block : '3', correct: true},
            {block : '1', correct: false},
            {block : '9', correct: false}, 
        ]
    },
    {
        question : 'ответ 3',
        anwswers: [
            {block : '1', correct: false},
            {block : '2', correct: false},
            {block : '3', correct: true},
            {block : '4', correct: false}, 
        ]
    },
    {
        question : 'ответ 4',
        anwswers: [
            {block : '1', correct: false},
            {block : '2', correct: false},
            {block : '3', correct: false},
            {block : '4', correct: true}, 
        ]
    },
    ];

    let currentQuestionIndex = 0,
    score = 0;

    startQuiz();  

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



    function hideQuestion(){
        nextBtn.style.display = 'none';
        while(myAnswers.firstChild){
            myAnswers.removeChild(myAnswers.firstChild);
        }
    }
   

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
    }

    function showScore(){
        hideQuestion();
        myQuestion.innerHTML = `Вы ответили на ${score} из ${questions.length}`;
    }

    function nextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else showScore();
    }

    nextBtn.addEventListener('click', () =>{
        if(currentQuestionIndex < questions.length){
            nextButton();
        }else startQuiz();
    })
});
