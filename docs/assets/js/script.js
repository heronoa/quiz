// INITIAL DATA
var currentQuestion = 0, correctAnswer = 0;
//EVENTS
document.querySelector('.scoreArea button')
    .addEventListener('click', resetEvent);
// FUNCTIONS
function showQuestion() {
    if (questions[currentQuestion]) {
        var q = questions[currentQuestion], pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar')
            .style.width = "".concat(pct, "%");
        document.querySelector('.scoreArea')
            .style.display = 'none';
        document.querySelector('.questionArea')
            .style.display = 'block';
        document.querySelector('.question')
            .innerHTML = q.question;
        var optionsHTML = '';
        for (var i in q.options) {
            optionsHTML +=
                "<div class=\"option\" data-op=\"".concat(i, "\"><span>").concat(parseInt(i) + 1, "</span>").concat(q.options[i], "</div>");
        }
        document.querySelector('.options').innerHTML = optionsHTML;
        document.querySelectorAll('.options .option').forEach(function (item) {
            item.addEventListener('click', optionClickElement);
        });
    }
    else {
        finishQuiz();
    }
}
function optionClickElement(e) {
    var clickedOption = parseInt(e.target.getAttribute('data-op'));
    if (questions[currentQuestion].answer === clickedOption) {
        correctAnswer++;
    }
    currentQuestion++;
    showQuestion();
}
function finishQuiz() {
    var points = Math.floor((correctAnswer / questions.length) * 100);
    if (points < 30) {
        document.querySelector('.scoreText1')
            .innerHTML = 'Tá ruim em?';
        document.querySelector('.scorePct')
            .style.color = '#FF0000';
    }
    else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1')
            .innerHTML = 'Muito bom!';
        document.querySelector('.scorePct')
            .style.color = '#FFFF00';
    }
    else if (points >= 70) {
        document.querySelector('.scoreText1')
            .innerHTML = 'Parabéns';
        document.querySelector('.scorePct')
            .style.color = '#0D630D';
    }
    document.querySelector('.scorePct')
        .innerHTML = "Acertou ".concat(points, "%");
    document.querySelector('.scoreArea')
        .style.display = 'block';
    document.querySelector('.scoreText2')
        .innerHTML = "Voc\u00EA responde ".concat(questions.length, " quest\u00F5es e acertou ").concat(correctAnswer, "!");
    document.querySelector('.questionArea')
        .style.display = 'none';
    document.querySelector('.progress--bar')
        .style.width = '100%';
}
function resetEvent() {
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestion();
}
// CALLS 
showQuestion();
