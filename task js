window.addEventListener('DOMContentLoaded', () =>{

    //dinamic questions
    //const element = document.createElement('div');

class Questions{
    constructor(counter, question, button1, button2, button3, button4, corect,parentSelector){
        this.counter = counter;
        this.question = question;
        this.button1 = button1;
        this.button2 = button2;
        this.button3 = button3;
        this.button4 = button4;
        this.corect = corect;
        this.parent = document.querySelector(parentSelector)
    }

    render(){
       const element = document.createElement('div');
        element.innerHTML = `
        <div class="counter"> Question ${this.counter}</div>
            <div class="question"> ${this.question} </div>
            <div class="answers">
                <button class="button1"> ${this.button1} </button>
                <button class="button2"> ${this.button2} </button>
                <button class="button3"> ${this.button3} </button>
                <button class="button4"> ${this.button4} </button>
            </div>
        `
        this.parent.append(element);
    }
}

    let question1 = new Questions(
        1,
        'How many planets are in the solar system?',
        1,
        2,
        3,
        4,
        2,
        ".container .content"
    ).render();

     let question2 = new Questions(
        2,
        'Which group would you to join by js practice',
        0,
        1,
        2,
        3,
        3,
        ".container .content"
    ).render();


    /* let question3 = new Questions(
        3,
        'How many letters are in the russian alphabet',
        21,
        30,
        32,
        29,
        32,
        ".container .content"
    ).render(); */


   /*  let question4 = new Questions(
        4,
        'How many planets are in the solar system?',
        1,
        2,
        3,
        4,
        2,
        ".container .content"
    ).render();  */

    //question swicher
/* 
    function hideQuestion(){
        element.style.display = 'none';
    }

    hideQuestion(); */

    element.addEventListener('click', (e) =>{
       const target = e.target;
       console.log(target);
       if(question1.this.corect == target){
        console.log('its works')
       } else console.log('its doesnt work')
    })
});
