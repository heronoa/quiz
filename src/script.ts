// INITIAL DATA
let currentQuestion = 0,
correctAnswer = 0;


//EVENTS
(document.querySelector('.scoreArea button') as HTMLButtonElement)
    .addEventListener('click', resetEvent)
    
// FUNCTIONS
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion],
        pct = Math.floor( (currentQuestion / questions.length) * 100 ); 

        (document.querySelector('.progress--bar') as HTMLDivElement)
        .style.width = `${pct}%`;

        (document.querySelector('.scoreArea') as HTMLDivElement)
        .style.display = 'none';

        (document.querySelector('.questionArea') as HTMLDivElement)
        .style.display = 'block';

        (document.querySelector('.question') as HTMLDivElement)
        .innerHTML = q.question;

        let optionsHTML = '';
        for(let i in q.options) {
            optionsHTML += 
            `<div class="option" data-op="${i}"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickElement);
        })

    } else {
        finishQuiz();
    }
}

function optionClickElement(e:any) {
    let clickedOption = parseInt( e.target.getAttribute('data-op') );

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswer++;
    }

    currentQuestion++;

    showQuestion();
}

function finishQuiz() {
    let points = Math.floor( ( correctAnswer / questions.length) *100);

    if(points < 30) {
        (document.querySelector('.scoreText1') as HTMLDivElement)
            .innerHTML = 'Tá ruim em?';
        (document.querySelector('.scorePct') as HTMLDivElement)
            .style.color = '#FF0000';
    } else if(points >= 30 && points < 70) {
        (document.querySelector('.scoreText1') as HTMLDivElement)
            .innerHTML = 'Muito bom!';
        (document.querySelector('.scorePct') as HTMLDivElement)
            .style.color = '#FFFF00';
    } else if(points >= 70) {
        (document.querySelector('.scoreText1') as HTMLDivElement)
            .innerHTML = 'Parabéns';
        (document.querySelector('.scorePct') as HTMLDivElement)
            .style.color = '#0D630D';
    }


    (document.querySelector('.scorePct') as HTMLDivElement)
        .innerHTML = `Acertou ${points}%`;

    (document.querySelector('.scoreArea') as HTMLDivElement)
        .style.display = 'block';

    (document.querySelector('.scoreText2') as HTMLDivElement)
        .innerHTML = `Você responde ${questions.length} questões e acertou ${correctAnswer}!`;    

    (document.querySelector('.questionArea') as HTMLDivElement)
        .style.display = 'none';

    (document.querySelector('.progress--bar') as HTMLDivElement)
        .style.width = '100%';
}

function resetEvent() {
    correctAnswer = 0;
    currentQuestion = 0;

    showQuestion();
}

// CALLS 
showQuestion();