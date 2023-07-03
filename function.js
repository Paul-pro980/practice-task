import { myAnswers, variables, nextBtn, setTimer } from "./constAndVar.js";


export function selectAnswer(e){
    const selectBtn = e.target,
          isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect){
        selectBtn.classList.add('correct');
        variables.score++;
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

export function countDown(time) {
    variables.timeCounter = setInterval(timer, 1000);
    function timer() {
        setTimer.textContent = `Time left: ${time}`;
        time--;
        if (time < 0) {
            clearInterval(variables.timeCounter);
            Array.from(myAnswers.children).forEach(button => {
                if (button.dataset.correct === 'true') {
                    button.classList.add('correct');
                }
                button.disabled = true;
            });
            nextBtn.style.display = 'block';
        }
    }

};

export function localStorageListener() {
    const actualScore = variables.score;

    const ScoreCtorage = {
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

export function showStorage(resaults) {
    const scoreList = document.getElementById("scores");
    scoreList.innerHTML = "";

    resaults.forEach(function (item) {
        const listItem = document.createElement("li");
        listItem.innerText = `Your score is - ${item.score}`;
        scoreList.appendChild(listItem);
    });
};
