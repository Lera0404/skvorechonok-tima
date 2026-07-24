// ===============================
// Помоги Скворчонку Тиме 3.0
// Часть 1
// ===============================

const questions = [

{
q:"Что такое простое предложение?",
answers:[
"Предложение с одной грамматической основой",
"Любое длинное предложение",
"Предложение с двумя грамматическими основами"
],
correct:0,
explanation:"Простое предложение имеет одну грамматическую основу."
},

{
q:"Что является грамматической основой?",
answers:[
"Подлежащее и сказуемое",
"Дополнение и определение",
"Любые два слова"
],
correct:0,
explanation:"Грамматическая основа состоит из подлежащего и сказуемого."
},

{
q:"Найди грамматическую основу: «Птицы поют».",
answers:[
"Птицы",
"Поют",
"Птицы поют"
],
correct:2,
explanation:"Основа состоит из двух главных членов: «птицы поют»."
},

{
q:"Какое предложение является вопросительным?",
answers:[
"Весна пришла.",
"Когда прилетят скворцы?",
"Берегите птиц!"
],
correct:1,
explanation:"Вопросительное предложение содержит вопрос."
},

{
q:"Выбери сложное предложение.",
answers:[
"Солнце светит.",
"Солнце светит, и птицы поют.",
"Весна."
],
correct:1,
explanation:"В сложном предложении две грамматические основы."
},

{
q:"Найди определение.",
answers:[
"зелёная трава",
"трава",
"растёт"
],
correct:0,
explanation:"Определение отвечает на вопросы какой? какая? какое?"
},

{
q:"Какое предложение является побудительным?",
answers:[
"Открой окно!",
"Окно открыто.",
"Когда открыть окно?"
],
correct:0,
explanation:"Побудительное предложение выражает просьбу или приказ."
},

{
q:"Какой знак поставить: «Как красиво весной»",
answers:[
".",
"!",
"?"
],
correct:1,
explanation:"Восклицательное предложение заканчивается знаком '!'."
},

{
q:"Сколько грамматических основ в простом предложении?",
answers:[
"Одна",
"Две",
"Три"
],
correct:0,
explanation:"В простом предложении всегда одна грамматическая основа."
},

{
q:"Что обозначает сказуемое?",
answers:[
"Предмет",
"Действие или состояние",
"Признак предмета"
],
correct:1,
explanation:"Сказуемое обозначает действие или состояние подлежащего."
},

{
q:"Найди подлежащее.",
answers:[
"летят",
"птицы",
"весной"
],
correct:1,
explanation:"Подлежащее отвечает на вопрос «кто?»."
},

{
q:"Что обозначает подлежащее?",
answers:[
"Действие",
"Предмет речи",
"Признак"
],
correct:1,
explanation:"Подлежащее обозначает предмет речи."
},

{
q:"Как называется предложение с второстепенными членами?",
answers:[
"Распространённое",
"Нераспространённое",
"Сложное"
],
correct:0,
explanation:"Распространённое предложение содержит второстепенные члены."
},

{
q:"Нераспространённое предложение — это...",
answers:[
"Только грамматическая основа",
"Любое короткое предложение",
"Предложение без сказуемого"
],
correct:0,
explanation:"Нераспространённое предложение состоит только из основы."
},

{
q:"Какой раздел языка изучает предложение?",
answers:[
"Синтаксис",
"Фонетика",
"Лексика"
],
correct:0,
explanation:"Предложения изучает раздел русского языка «Синтаксис»."
}

];

const phrases = [
"🐦 Спасибо! Ещё одна веточка!",
"🌸 Ты отлично справляешься!",
"🪺 Гнездо становится уютнее!",
"⭐ Молодец!",
"🌿 Скоро прилетит моя семья!",
"🍃 Замечательная работа!",
"🐦 Ты настоящий помощник!",
"🌼 Продолжаем!",
"🌞 Великолепно!",
"💚 Спасибо за помощь!"
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

let order=[];
let current=0;
let score=0;

// ===============================
// Часть 2 — логика игры
// ===============================

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}

function startGame(){

document.getElementById("start").style.display="none";

document.getElementById("game").style.display="block";

order=shuffle([...questions.keys()]);

current=0;

score=0;

document.getElementById("score").textContent=score;

showQuestion();

}

function showQuestion(){

document.getElementById("message").style.display="none";

document.getElementById("explanation").style.display="none";

document.getElementById("nextButton").style.display="none";

const q=questions[order[current]];

document.getElementById("counter").textContent=current+1;

document.getElementById("total").textContent=questions.length;

document.getElementById("bar").style.width=
((current)/questions.length*100)+"%";

document.getElementById("question").textContent=q.q;

const answers=document.getElementById("answers");

answers.innerHTML="";

q.answers.forEach((text,index)=>{

const btn=document.createElement("button");

btn.className="answer";

btn.textContent=text;

btn.onclick=()=>checkAnswer(index);

answers.appendChild(btn);

});

updateNest();

}

function checkAnswer(index){

const q=questions[order[current]];

const buttons=document.querySelectorAll(".answer");

buttons.forEach(b=>b.disabled=true);

if(index===q.correct){

buttons[index].classList.add("correct");

score+=10;

document.getElementById("score").textContent=score;

document.getElementById("message").textContent=
phrases[Math.floor(Math.random()*phrases.length)];

}else{

buttons[index].classList.add("wrong");

buttons[q.correct].classList.add("correct");

document.getElementById("message").textContent=
"🐦 Ничего страшного! Попробуем дальше!";

}

document.getElementById("message").style.display="block";

document.getElementById("explanation").textContent=
"📖 "+q.explanation;

document.getElementById("explanation").style.display="block";

document.getElementById("nextButton").style.display="block";

}

// ===============================
// Часть 3 — финал игры
// ===============================

function nextQuestion(){

current++;

if(current<questions.length){

showQuestion();

}else{

finishGame();

}

}

function updateNest(){

const stage=Math.floor(current/2);

const nest=document.getElementById("nest");

nest.textContent=nestStages[Math.min(stage,nestStages.length-1)];

}

function finishGame(){

document.getElementById("game").style.display="none";

document.getElementById("finish").style.display="block";

document.getElementById("bar").style.width="100%";

const medal=document.getElementById("medal");

const result=document.getElementById("result");

const percent=Math.round(score/(questions.length*10)*100);

if(score>=130){

medal.textContent="🥇";

result.innerHTML=

"🐦 Скворчонок Тима построил великолепное гнездо!<br><br>"+

"⭐ Ты набрал <b>"+score+"</b> баллов из 150.<br>"+

"🏆 Результат: <b>"+percent+"%</b><br><br>"+

"🌸 Отличный результат! Ты настоящий знаток синтаксиса!";

}

else if(score>=90){

medal.textContent="🥈";

result.innerHTML=

"🐦 Тима благодарит тебя за помощь!<br><br>"+

"⭐ Ты набрал <b>"+score+"</b> баллов из 150.<br>"+

"🏆 Результат: <b>"+percent+"%</b><br><br>"+

"🍃 Очень хороший результат!";

}

else{

medal.textContent="🥉";

result.innerHTML=

"🐦 Гнездо почти готово!<br><br>"+

"⭐ Ты набрал <b>"+score+"</b> баллов из 150.<br>"+

"🏆 Результат: <b>"+percent+"%</b><br><br>"+

"🌱 Попробуй пройти игру ещё раз и улучшить результат!";

}

}

function restartGame(){

location.reload();

}
