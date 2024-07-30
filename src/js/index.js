// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';
import { riddles } from './advinance';

const advinanceElement = document.getElementById('advinance-title');
const solutionElement = document.getElementById('advinance-solution');
const hintElement = document.getElementById('hint');
const changeElement = document.getElementById('change');
const sendElement = document.getElementById('send');
const inputElement = document.getElementById('advinance-answer');
const buttonSolutionElement = document.getElementById('solution');

let randomIndex;

function initializeRiddle() {
  randomIndex = Math.floor(Math.random() * riddles.length);
  advinanceElement.textContent = riddles[randomIndex].advinance;
  solutionElement.textContent = '';
  toggleElements(false);
}

function updateHint() {
  const hints = riddles[randomIndex].hints;
  const randomHint = hints[Math.floor(Math.random() * hints.length)];
  solutionElement.textContent = randomHint;
}

function checkAnswer() {
  const userAnswer = inputElement.value.toLowerCase();
  const correctAnswer = riddles[randomIndex].answer.toLowerCase();

  solutionElement.textContent =
    userAnswer === correctAnswer ? `¡Correcto! La respuesta es ${correctAnswer}.` : 'Incorrecto. Inténtalo de nuevo.';

  if (userAnswer === correctAnswer) {
    toggleElements(true);
  }

  inputElement.value = '';
}

function filterInput() {
  inputElement.value = inputElement.value.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g, '');
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    checkAnswer();
  }
}

function toggleElements(disabled) {
  inputElement.disabled = disabled;
  sendElement.disabled = disabled;
  hintElement.disabled = disabled;
  buttonSolutionElement.disabled = disabled;
}

function showSolution() {
  const correctAnswer = riddles[randomIndex].answer;
  solutionElement.textContent = `La respuesta correcta es ${correctAnswer}.`;
  toggleElements(true);
}

changeElement.addEventListener('click', initializeRiddle);
hintElement.addEventListener('click', updateHint);
sendElement.addEventListener('click', checkAnswer);
inputElement.addEventListener('input', filterInput);
inputElement.addEventListener('keydown', handleKeyDown);
buttonSolutionElement.addEventListener('click', showSolution);

initializeRiddle();
