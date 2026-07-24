const questions = [
  {
    q: "Что такое простое предложение?",
    answers: [
      "Предложение с одной грамматической основой",
      "Предложение с двумя основами",
      "Любое длинное предложение"
    ],
    correct: 0
  },
  {
    q: "Что является грамматической основой?",
    answers: [
      "Подлежащее и сказуемое",
      "Только дополнение",
      "Любые слова"
    ],
    correct: 0
  },
  {
    q: "Выбери сложное предложение.",
    answers: [
      "Солнце светит.",
      "Солнце светит, и птицы поют.",
      "Весна."
    ],
    correct: 1
  }
];

let current = 0;
let score = 0;

function startGame() {
  document.getElementById("start").style.display = "none";
  document.getElementById("game").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = questions[current];

  document.getElementById("question").textContent = q.q;
  document.getElementById("score").textContent = score;
  document.getElementById("bar").style.width =
      (current / questions.length * 100) + "%";

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.answers.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = text;
    btn.onclick = () => check(index);
    answers.appendChild(btn);
  });
}

function check(index) {
  if (index === questions[current].correct) {
    score++;
  }

  current++;

  if (current >= questions.length) {
    document.getElementById("game").innerHTML =
      "<h2>🎉 Игра окончена!</h2><h3>Ваш результат: " +
      score + " из " + questions.length + "</h3>";
  } else {
    showQuestion();
  }
}
