// =====================================
// 🐦 Помоги Скворчонку Тиме 6.0
// =====================================

// ------------ Вопросы ------------

const questions = [
{
question:"Что такое простое предложение?",
answers:[
"Предложение с одной грамматической основой",
"Любое длинное предложение",
"Предложение с двумя грамматическими основами"
],
correct:0,
explanation:"Простое предложение имеет одну грамматическую основу."
},
{
question:"Что является грамматической основой?",
answers:[
"Подлежащее и сказуемое",
"Дополнение и определение",
"Любые слова"
],
correct:0,
explanation:"Грамматическая основа состоит из подлежащего и сказуемого."
},
{
question:"Выбери сложное предложение.",
answers:[
"Солнце светит.",
"Солнце светит, и птицы поют.",
"Весна."
],
correct:1,
explanation:"В сложном предложении две грамматические основы."
},
{
question:"Какое предложение является вопросительным?",
answers:[
"Весна пришла.",
"Когда прилетят птицы?",
"Берегите птиц!"
],
correct:1,
explanation:"Вопросительное предложение содержит вопрос."
},
{
question:"Найди грамматическую основу: «Птицы поют».",
answers:[
"Птицы",
"Поют",
"Птицы поют"
],
correct:2,
explanation:"Основа состоит из подлежащего и сказуемого."
},
{
question:"Что обозначает сказуемое?",
answers:[
"Предмет",
"Действие",
"Признак"
],
correct:1,
explanation:"Сказуемое обозначает действие."
},
{
question:"Найди подлежащее.",
answers:[
"летят",
"птицы",
"весной"
],
correct:1,
explanation:"Подлежащее отвечает на вопрос «кто?»."
},
{
question:"Как называется предложение с второстепенными членами?",
answers:[
"Распространённое",
"Нераспространённое",
"Сложное"
],
correct:0,
explanation:"Распространённое предложение содержит второстепенные члены."
},
{
question:"Что изучает синтаксис?",
answers:[
"Предложения",
"Звуки",
"Буквы"
],
correct:0,
explanation:"Синтаксис изучает словосочетания и предложения."
},
{
question:"Какой знак ставится в конце вопросительного предложения?",
answers:[
".",
"!",
"?"
],
correct:2,
explanation:"Вопросительное предложение заканчивается знаком вопроса."
},
{
question:"Что обозначает подлежащее?",
answers:[
"Предмет речи",
"Действие",
"Признак"
],
correct:0,
explanation:"Подлежащее обозначает предмет речи."
},
{
question:"Какое предложение является побудительным?",
answers:[
"Закрой окно!",
"Окно закрыто.",
"Когда закрыть окно?"
],
correct:0,
explanation:"Побудительное предложение выражает просьбу или приказ."
},
{
question:"Сколько грамматических основ в простом предложении?",
answers:[
"Одна",
"Две",
"Три"
],
correct:0,
explanation:"В простом предложении одна грамматическая основа."
},
{
question:"Найди простое предложение.",
answers:[
"Птицы прилетели.",
"Птицы прилетели, и деревья зазеленели.",
"Солнце выглянуло, ветер стих."
],
correct:0,
explanation:"В простом предложении одна основа."
},
{
question:"Сколько вопросов в этой игре?",
answers:[
"15",
"20",
"10"
],
correct:0,
explanation:"В игре 15 вопросов."
}
];

const phrases=[
"🐦 Отлично!",
"🌸 Молодец!",
"🌿 Замечательно!",
"🪺 Гнездо становится крепче!",
"⭐ Великолепно!",
"🍃 Продолжаем!",
"🐤 Тима рад!",
"🌼 Так держать!"
];

const nestStages=[
"🪹",
"🪹🌿",
"🪹🌿🌿",
"🪺",
"🪺🥚",
"🪺🥚🥚",
"🪺🐦"
];

let currentQuestion=0;
let score=0;
let gameQuestions=[];

// =====================================
// Служебные функции
// =====================================

// Перемешивание массива (Fisher–Yates)

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}

// Перемешивание ответов с сохранением правильного

function prepareQuestions(){

gameQuestions=questions.map(q=>{

let answers=q.answers.map((text,index)=>({

text:text,

correct:index===q.correct

}));

shuffle(answers);

return{

question:q.question,

answers:answers,

correct:answers.findIndex(a=>a.correct),

explanation:q.explanation

};

});

shuffle(gameQuestions);

}

// =====================================
// Запуск игры
// =====================================

function startGame(){

prepareQuestions();

currentQuestion=0;

score=0;

document.getElementById("score").textContent=0;

document.getElementById("total").textContent=
gameQuestions.length;

document.getElementById("start").style.display="none";

document.getElementById("finish").style.display="none";

document.getElementById("game").style.display="block";

showQuestion();

}

// =====================================
// Показ вопроса
// =====================================

function showQuestion(){

const q=gameQuestions[currentQuestion];

document.getElementById("current").textContent=
currentQuestion+1;

document.getElementById("question").textContent=
q.question;

document.getElementById("bar").style.width=
(currentQuestion/gameQuestions.length*100)+"%";

const answers=document.getElementById("answers");

answers.innerHTML="";

document.getElementById("message").style.display="none";

document.getElementById("explanation").style.display="none";

document.getElementById("nextButton").style.display="none";

q.answers.forEach((answer,index)=>{

const btn=document.createElement("button");

btn.className="answer";

btn.textContent=answer.text;

btn.onclick=()=>checkAnswer(index);

answers.appendChild(btn);

});

updateNest();

}

// =====================================
// Проверка ответа
// =====================================

function checkAnswer(index){

const q=gameQuestions[currentQuestion];

const buttons=document.querySelectorAll(".answer");

// защита от повторного нажатия

buttons.forEach(button=>button.disabled=true);

const message=document.getElementById("message");

const explanation=document.getElementById("explanation");

if(index===q.correct){

buttons[index].classList.add("correct");

score+=10;

document.getElementById("score").textContent=score;

message.textContent=

phrases[Math.floor(Math.random()*phrases.length)];

}else{

buttons[index].classList.add("wrong");

buttons[q.correct].classList.add("correct");

message.textContent=

"🐦 Ничего страшного! Продолжаем!";

}

message.style.display="block";

explanation.textContent=

"📖 "+q.explanation;

explanation.style.display="block";

document.getElementById("nextButton").style.display="block";

}
// =====================================
// Следующий вопрос
// =====================================

function nextQuestion(){

currentQuestion++;

if(currentQuestion<gameQuestions.length){

showQuestion();

}else{

finishGame();

}

}

// =====================================
// Обновление гнезда
// =====================================

function updateNest(){

const nest=document.getElementById("nest");

const progress=currentQuestion/(gameQuestions.length-1);

const stage=Math.min(

Math.floor(progress*nestStages.length),

nestStages.length-1

);

nest.textContent=nestStages[stage];

}

// =====================================
// Завершение игры
// =====================================

function finishGame(){

document.getElementById("game").style.display="none";

document.getElementById("finish").style.display="block";

document.getElementById("bar").style.width="100%";

const medal=document.getElementById("medal");

const result=document.getElementById("result");

const maxScore=gameQuestions.length*10;

const percent=Math.round(score/maxScore*100);

if(percent>=90){

medal.textContent="🥇";

result.innerHTML=
"🐦 Скворчонок Тима построил прекрасное гнездо!<br><br>"+
"⭐ Ты набрал <b>"+score+"</b> из "+maxScore+" баллов.<br>"+
"🏆 Правильных ответов: <b>"+percent+"%</b><br><br>"+
"🌸 Великолепный результат!";

}else if(percent>=70){

medal.textContent="🥈";

result.innerHTML=
"🐦 Гнездо почти готово!<br><br>"+
"⭐ Ты набрал <b>"+score+"</b> из "+maxScore+" баллов.<br>"+
"🏆 Правильных ответов: <b>"+percent+"%</b><br><br>"+
"🍃 Очень хороший результат!";

}else{

medal.textContent="🥉";

result.innerHTML=
"🐦 Тима благодарит тебя за помощь!<br><br>"+
"⭐ Ты набрал <b>"+score+"</b> из "+maxScore+" баллов.<br>"+
"🏆 Правильных ответов: <b>"+percent+"%</b><br><br>"+
"🌱 Попробуй пройти игру ещё раз!";

}

}

// =====================================
// Играть ещё
// =====================================

function restartGame(){

currentQuestion=0;

score=0;

document.getElementById("finish").style.display="none";

document.getElementById("start").style.display="block";

}
