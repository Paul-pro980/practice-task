export const myAnswers = document.getElementById('answers'),
      myQuestion = document.getElementById('question'),
      counter = document.getElementById('counter'),
      nextBtn = document.getElementById('next-button'),
      restartBtn = document.getElementById('restart'),
      setTimer = document.getElementById('timer'),
      scoreModal = document.getElementById('scoreStorage'),
      themeBtn = document.querySelector('#theme');
  
      
export const questions = [
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


 export const variables = {
            currentQuestionIndex: 0,
            score: 0,
            timeCounter: 0,
            timeValue: 5
        };


export const modalTab = document.querySelector('.storage'),
             closeModal = document.querySelector('[data-close]');
