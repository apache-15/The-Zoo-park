const quizData = [
    {
        question: "А когда с человеком может произойти дрожемент?",
        answers: [
            { text: "Когда он влюбляется", correct: false },
            { text: "Когда он идет шопиться", correct: false },
            { text: "Когда он слышит смешную шутку", correct: false },
            { text: "Когда он боится, пугается", correct: true }
        ],
        explanation: "Лексема «дрожемент» имплицирует состояние крайнего напряжения и страха: «У меня всегда дрожемент в ногах, когда копы подходят»."
    },
    {
        question: "Говорят, Антон заовнил всех. Это еще как понимать?",
        answers: [
            { text: "Как так, заовнил? Ну и хамло. Кто с ним теперь дружить-то будет?", correct: false },
            { text: "Антон очень надоедливый и въедливый человек, всех задолбал", correct: false },
            { text: "Молодец, Антон, всех победил!", correct: true },
            { text: "Нет ничего плохого в том, что Антон тщательно выбирает себе друзей", correct: false }
        ],
        explanation: "Термин «заовнить» заимствован из английского языка, он происходит от слова own и переводится как «победить», «завладеть», «получить»."
    },
    {
        question: "А фразу «заскамить мамонта» как понимать?",
        answers: [
            { text: "Разозлить кого-то из родителей", correct: false },
            { text: "Увлекаться археологией", correct: false },
            { text: "Развести недотепу на деньги", correct: true },
            { text: "Оскорбить пожилого человека", correct: false }
        ],
        explanation: "Заскамить мамонта — значит обмануть или развести на деньги. Почему мамонта? Потому что мошенники часто выбирают в жертвы пожилых людей (древних, как мамонты), которых легко обвести вокруг пальца."
    },
    {
        question: "Кто такие бефефе?",
        answers: [
            { text: "Вши?", correct: false },
            { text: "Милые котики, такие милые, что бефефе", correct: false },
            { text: "Лучшие друзья", correct: true },
            { text: "Люди, которые не держат слово", correct: false }
        ],
        explanation: "Бефефе — это лучшие друзья. Этакая аббревиатура от английского выражения best friends forever."
    },
    {
        question: "Что из перечисленного можно назвать крашем, если ты чиллишь в компании и вдруг залипаешь на кого-то?",
        answers: [
            { text: "Человек, который тебе очень нравится и вызывает симпатию.", correct: true },
            { text: "Тот, на кого приятно смотреть и хочется общаться.", correct: true },
            { text: "Твоя сильно накрашенная подруга, которая переоценила свой макияж.", correct: false },
            { text: "Трэш в более мягкой интерпретации.", correct: false }
        ],
        explanation: "«Краш» — это объект симпатии; «чиллить» — расслабляться, отдыхать; «залипать» — засматриваться или задумываться."
    }
];

const questionsArea = document.getElementById('questions-area');
const endTitle = document.getElementById('end-title');
const statsElement = document.getElementById('stats');

let currentQuestionIndex = 0;
let score = 0;

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffle(quizData);

for (var i = 0; i < quizData.length; i++) {
    shuffle(quizData[i].answers);
}

function renderQuestion() {
   if (currentQuestionIndex >= quizData.length) {
        finishQuiz();
        return;
    }
    
    var currentQ = quizData[currentQuestionIndex];
    
    //Ищем правильный ответ чтобы сохранить его в атрибут
    var correctTexts = [];
    for (var c = 0; c < currentQ.answers.length; c++) {
        if (currentQ.answers[c].correct === true) {
            correctTexts.push(currentQ.answers[c].text);
        }
    }
    var allCorrectAnswersText = correctTexts.join(' ИЛИ '); 

    var questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    
    questionBlock.setAttribute('data-correct-answer', allCorrectAnswersText);

    // Шапка вопроса
    var header = document.createElement('div');
    header.className = 'question-header';
    
    var text = document.createElement('p');
    text.className = 'question-text';
    text.innerText = (currentQuestionIndex + 1) + ". " + currentQ.question;
    
    var marker = document.createElement('div');
    marker.className = 'marker';
    
    header.appendChild(text);
    header.appendChild(marker);
    questionBlock.appendChild(header);

    // Обертка для ответов
    var answersWrapper = document.createElement('div');
    answersWrapper.className = 'answers-wrapper';

    var answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';

    var radioGroupName = 'question_' + currentQuestionIndex;

    for (var i = 0; i < currentQ.answers.length; i++) {
        var answerObj = currentQ.answers[i];
        
        var label = document.createElement('label');
        label.className = 'answer-label';

        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = radioGroupName;
        radio.className = 'answer-radio';

        var btnText = document.createElement('span');
        btnText.className = 'answer-text';
        btnText.innerText = answerObj.text;

        radio.onchange = function() {
            handleAnswerClick(this, currentQ, questionBlock, answersContainer);
        };

        label.appendChild(radio);
        label.appendChild(btnText);
        answersContainer.appendChild(label);
    }

    answersWrapper.appendChild(answersContainer);
    questionBlock.appendChild(answersWrapper);
    questionsArea.appendChild(questionBlock);
}

function handleAnswerClick(clickedRadio, currentQ, questionBlock, answersContainer) {
    var clickedLabel = clickedRadio.parentElement;
    clickedLabel.classList.add('active');

    var clickedText = clickedLabel.querySelector('.answer-text').innerText;
    var isCorrect = false;
    
    for (var i = 0; i < currentQ.answers.length; i++) {
        if (currentQ.answers[i].text === clickedText) {
            isCorrect = currentQ.answers[i].correct;
            break;
        }
    }

    var marker = questionBlock.querySelector('.marker');
    marker.style.display = 'block'; 

    if (isCorrect === true) {
        score++;
        marker.innerHTML = '<img src="../images/check.png">';
        
        var explanationDiv = document.createElement('div');
        explanationDiv.className = 'explanation';
        explanationDiv.innerText = currentQ.explanation;
        clickedLabel.appendChild(explanationDiv);
        
        clickedLabel.style.flex = "1 1 100%";
    } else {
        marker.innerHTML = '<img src="../images/cross.png">';
    }

    var allLabels = answersContainer.querySelectorAll('.answer-label');

    setTimeout(function() {
        flyAwayAnswers(allLabels, questionBlock, isCorrect, clickedLabel);
    }, 1000);
}

function flyAwayAnswers(allLabels, questionBlock, isCorrect, clickedLabel) {

    var correctLabel = isCorrect ? clickedLabel : null;

    var waitTime = 0;//переменная для разного времени уезда
    
    if (isCorrect === true) {waitTime = 2000;}

    for (var i = 0; i < allLabels.length; i++) {
        let label = allLabels[i];
        if (label !== correctLabel) {
            label.classList.add('fly-right');
        }
    }

    //Ждем waitTime и увозим ПРАВИЛЬНЫЙ ответ
    setTimeout(function() {

        if (correctLabel) {
            correctLabel.classList.add('fly-right');
        }
        
        setTimeout(function() {
            var answersWrapper = questionBlock.querySelector('.answers-wrapper');
            if (answersWrapper) {
                answersWrapper.style.display = 'none';
            }

            currentQuestionIndex++;
            questionBlock.classList.add('finished'); 
            renderQuestion();
        }, 500);

    }, waitTime); 
}

function finishQuiz() {
    endTitle.style.display = 'block';
    statsElement.style.display = 'block';
    statsElement.innerText = 'Правильных ответов: ' + score + ' из ' + quizData.length;

    var allQuestionBlocks = document.querySelectorAll('.question-block');

    for (var i = 0; i < allQuestionBlocks.length; i++) {
        let currentBlock = allQuestionBlocks[i]; 
        
        currentBlock.onclick = function() {
            //Скрываем все открытые правильные ответы
            var allOpenAnswers = document.querySelectorAll('.question-block .correct_ans');
            for (var j = 0; j < allOpenAnswers.length; j++) {
                allOpenAnswers[j].style.display = 'none';
            }
            
            var existingAnswer = currentBlock.querySelector('.correct_ans');
            var header = currentBlock.querySelector('.question-header');
            
            if (existingAnswer) {
                //Если правильный ответ уже есть, показываем/скрываем его
                if (existingAnswer.parentElement !== header) {
                    header.appendChild(existingAnswer);
                }
                
                if (existingAnswer.style.display === 'none') {
                    existingAnswer.style.display = 'block';
                } else {
                    existingAnswer.style.display = 'none';
                }
            } 
            else {
                //Создаем блок с правильным ответом
                var exp = document.createElement('div');
                exp.className = 'correct_ans';
                
                exp.innerText = 'Правильный ответ: ' + currentBlock.getAttribute('data-correct-answer');
                
                header.appendChild(exp);
            }
        };
    }
}
renderQuestion();