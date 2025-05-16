const questionsDB = {
  easy: [
    {q: "Que signifie HTML ?", answers: ["HyperText Markup Language", "Hyperlink Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"], correct: 0},
    {q: "Quel élément HTML est utilisé pour insérer un lien ?", answers: ["<a>", "<link>", "<href>", "<url>"], correct: 0},
    {q: "Quel attribut est utilisé pour définir une image ?", answers: ["src", "href", "alt", "link"], correct: 0},
    {q: "Quel élément représente un paragraphe ?", answers: ["<p>", "<para>", "<text>", "<paragraph>"], correct: 0},
    {q: "Comment insérer un commentaire HTML ?", answers: ["<!-- commentaire -->", "// commentaire", "/* commentaire */", "# commentaire"], correct: 0},
    {q: "Quel élément représente un titre de niveau 1 ?", answers: ["<h1>", "<head>", "<title>", "<header>"], correct: 0},
    {q: "Comment créer une liste à puces ?", answers: ["<ul>", "<ol>", "<li>", "<dl>"], correct: 0},
    {q: "Quel élément est vide (self-closing) ?", answers: ["<br>", "<p>", "<div>", "<span>"], correct: 0},
    {q: "Quel attribut ajoute un texte alternatif à une image ?", answers: ["alt", "title", "src", "text"], correct: 0},
    {q: "Quel élément est utilisé pour créer un bouton ?", answers: ["<button>", "<input>", "<form>", "<submit>"], correct: 0},
  ],
  medium: [
    {q: "Quel attribut HTML est utilisé pour spécifier une classe CSS ?", answers: ["class", "id", "style", "css"], correct: 0},
    {q: "Quel élément HTML sert à regrouper du contenu en ligne ?", answers: ["<span>", "<div>", "<section>", "<article>"], correct: 0},
    {q: "Quel élément définit une cellule dans un tableau ?", answers: ["<td>", "<th>", "<tr>", "<table>"], correct: 0},
    {q: "Quel élément HTML contient les métadonnées ?", answers: ["<head>", "<body>", "<meta>", "<title>"], correct: 0},
    {q: "Quelle balise permet d’intégrer une feuille de style CSS externe ?", answers: ["<link>", "<style>", "<css>", "<script>"], correct: 0},
    {q: "Quel attribut contrôle le comportement d’un lien hypertexte ?", answers: ["target", "href", "rel", "src"], correct: 0},
    {q: "Quel élément HTML représente un formulaire ?", answers: ["<form>", "<input>", "<fieldset>", "<button>"], correct: 0},
    {q: "Quel type d’input permet de sélectionner une date ?", answers: ["date", "text", "datetime", "calendar"], correct: 0},
    {q: "Quel élément HTML est utilisé pour afficher une image responsive ?", answers: ["<img srcset>", "<picture>", "<figure>", "<image>"], correct: 0},
    {q: "Quel attribut permet de rendre un champ obligatoire dans un formulaire ?", answers: ["required", "mandatory", "validate", "need"], correct: 0},
  ],
  hard: [
    {q: "Quel élément HTML5 est utilisé pour regrouper un contenu indépendant ?", answers: ["<article>", "<section>", "<div>", "<aside>"], correct: 0},
    {q: "Quelle balise permet d’intégrer un script JavaScript externe ?", answers: ["<script src='...'>", "<js>", "<script external>", "<source>"], correct: 0},
    {q: "Quel attribut ARIA améliore l’accessibilité des éléments ?", answers: ["aria-label", "role", "accesskey", "tabindex"], correct: 0},
    {q: "Quel élément permet de définir un conteneur multimédia ?", answers: ["<figure>", "<media>", "<video>", "<embed>"], correct: 0},
    {q: "Quel attribut indique la langue principale d’une page HTML ?", answers: ["lang", "xml:lang", "language", "locale"], correct: 0},
    {q: "Quel élément est utilisé pour inclure du contenu externe dans une page ?", answers: ["<iframe>", "<embed>", "<object>", "<include>"], correct: 0},
    {q: "Comment s’appelle le nouveau modèle de boîte CSS introduit ?", answers: ["box-sizing", "flexbox", "grid", "box-model"], correct: 1},
    {q: "Quel attribut permet de spécifier un texte de remplacement pour les vidéos ?", answers: ["alt", "aria-label", "title", "track"], correct: 3},
    {q: "Quel élément HTML5 représente un pied de page ?", answers: ["<footer>", "<bottom>", "<section>", "<aside>"], correct: 0},
    {q: "Quel attribut HTML5 permet la validation du type de fichier dans un input ?", answers: ["accept", "type", "pattern", "validate"], correct: 0},
  ]
};

const levelSelect = document.querySelectorAll("#level-select button");
const questionContainer = document.getElementById("question-container");
const questionEl = document.getElementById("question");
const answersEl = document.querySelector(".answers");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const restartBtn = document.getElementById("restart-btn");
const restartContainer = document.getElementById("restart-container");

let currentLevel = null;
let currentQuestionIndex = 0;
let quizEnded = false;

levelSelect.forEach(button => {
  button.addEventListener("click", () => {
    currentLevel = button.getAttribute("data-level");
    startQuiz();
  });
});

function startQuiz() {
  currentQuestionIndex = 0;
  quizEnded = false;

  // Cache le sélecteur de niveau et score, affiche la question
  document.getElementById("level-select").style.display = "none";
  questionContainer.style.display = "flex";
  scoreContainer.style.display = "none";
  restartContainer.style.display = "none";

  nextBtn.disabled = true;
  showQuestion();
}

function showQuestion() {
  nextBtn.disabled = true;
  clearAnswers();

  const question = questionsDB[currentLevel][currentQuestionIndex];
  questionEl.textContent = `Q${currentQuestionIndex + 1}: ${question.q}`;

  question.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.textContent = answer;
    li.dataset.index = index;
    li.addEventListener("click", selectAnswer);
    answersEl.appendChild(li);
  });
}

function clearAnswers() {
  answersEl.innerHTML = "";
}

function selectAnswer(e) {
  if (quizEnded) return;

  // Déselectionne les autres réponses
  document.querySelectorAll(".answers li").forEach(li => li.classList.remove("selected"));
  e.target.classList.add("selected");
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  if (quizEnded) return;

  const selected = document.querySelector(".answers li.selected");
  if (!selected) return;

  const selectedIndex = parseInt(selected.dataset.index);
  const question = questionsDB[currentLevel][currentQuestionIndex];

  if (selectedIndex === question.correct) {
    // Bonne réponse
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsDB[currentLevel].length) {
      showQuestion();
      nextBtn.disabled = true;
    } else {
      finishQuiz(true);
    }
  } else {
    // Mauvaise réponse => échec immédiat
    finishQuiz(false);
  }
});

function finishQuiz(success) {
  quizEnded = true;
  questionContainer.style.display = "none";
  scoreContainer.style.display = "block";
  restartContainer.style.display = "block";

  if (success) {
    scoreContainer.textContent = `Bravo ! Vous avez réussi le quiz.`;
  } else {
    scoreContainer.textContent = `Vous avez échoué au quiz. Essayez de nouveau.`;
  }
}

restartBtn.addEventListener("click", () => {
  document.getElementById("level-select").style.display = "block";
  scoreContainer.style.display = "none";
  restartContainer.style.display = "none";
  questionContainer.style.display = "none";
  currentLevel = null;
  currentQuestionIndex = 0;
  quizEnded = false;
  clearAnswers();
  questionEl.textContent = "";
  nextBtn.disabled = true;
});
