'strict mode'

import { selectAnswer, countDown, localStorageListener } from "./function.js";
import { myAnswers, myQuestion, counter, nextBtn, restartBtn, setTimer, scoreModal, themeBtn, questions, variables, modalTab, closeModal } from "./constAndVar.js";

function startQuiz() {
    variables.currentQuestionIndex = 0;
    variables.score = 0;
    showQuestion();
};


function showQuestion() {
    hideBtns();
    clearInterval(variables.timeCounter)
    countDown(variables.timeValue);
    const currentQuestion = questions[variables.currentQuestionIndex],
        questionNumber = variables.currentQuestionIndex + 1;
    counter.innerHTML = `Question ${questionNumber} /${questions.length}`;
    myQuestion.innerHTML = currentQuestion.question;

    currentQuestion.anwswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.block;
        button.classList.add('btn');
        myAnswers.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    });
};


function hideBtns() {
    setTimer.style.display = 'block';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'none';
    scoreModal.style.display = 'none';
    while (myAnswers.firstChild) {
        myAnswers.removeChild(myAnswers.firstChild);
    }
};


function showScore() {
    hideBtns();
    localStorageListener();
    clearInterval(variables.timeCounter);
    setTimer.disabled = true;
    setTimer.style.display = 'none';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    scoreModal.style.display = 'block';
    myQuestion.innerHTML = `Вы ответили на ${variables.score} из ${questions.length}`;
    counter.innerHTML = 'Вот ваш результат';
    scoreModal.addEventListener('click', openModal)
};


function nextButton() {
    variables.currentQuestionIndex++;
    if (variables.currentQuestionIndex < questions.length) {
        showQuestion();
    } else showScore();
};


nextBtn.addEventListener('click', () => {
    if (variables.currentQuestionIndex < questions.length) {
        nextButton();
    } else startQuiz();
});


restartBtn.addEventListener('click', () => {
    startQuiz();
})


themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('changeMode');
});


function openModal() {
    modalTab.classList.add('show');
    document.body.style.overflow = 'hidden';
};


function closeModalTab() {
    modalTab.classList.remove('show');
    document.body.style.overflow = '';
};

closeModal.addEventListener('click', closeModalTab)

modalTab.addEventListener('click', (e) => {
    if (e.target === modalTab) {
        closeModalTab();
    };
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalTab.classList.contains('show')) {
        closeModalTab();
    };
});


startQuiz(); 
