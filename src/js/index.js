import '../scss/styles.scss';
import { riddles } from './advinance';

const advinanceElement = document.getElementById('advinance-title');
const solutionElement = document.getElementById('advinance-solution');
const hintElement = document.getElementById('hint');
const hintContainer = document.getElementById('hint-container');
const changeElement = document.getElementById('change');
const sendElement = document.getElementById('send');
const inputElement = document.getElementById('advinance-answer');
const buttonSolutionElement = document.getElementById('solution');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('img__modal');
const modalButton = document.getElementById('modal-button');

const regex = /[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g;
let randomIndex;
let hintIndex = 0;

const initializeRiddle = () => {
  randomIndex = Math.floor(Math.random() * riddles.length);
  advinanceElement.textContent = riddles[randomIndex].advinance;
  resetUI();
  hideModal();
};

const resetUI = () => {
  solutionElement.textContent = '';
  hintElement.classList.remove('d-none');
  buttonSolutionElement.classList.add('d-none');
  toggleElements(false);
  hintIndex = 0;
  hintContainer.innerHTML = '';
};

const updateHint = () => {
  const hints = riddles[randomIndex].hints;
  if (hintIndex < hints.length) {
    const hintSpan = createHintSpan(hints[hintIndex]);
    hintContainer.append(hintSpan);
    hintIndex++;
  }
  toggleHintAndSolutionButtons(hints);
};

const createHintSpan = hint => {
  const hintSpan = document.createElement('span');
  hintSpan.classList.add('hint__text', 'hint__title');
  hintSpan.textContent = hint;
  return hintSpan;
};

const toggleHintAndSolutionButtons = hints => {
  if (hintIndex >= hints.length) {
    hintElement.classList.add('d-none');
    buttonSolutionElement.classList.remove('d-none');
  }
};

const checkAnswer = () => {
  const userAnswer = inputElement.value.toLowerCase();
  const correctAnswer = riddles[randomIndex].answer.toLowerCase();
  const isCorrect = userAnswer === correctAnswer;
  showModal(isCorrect ? `¡HAS ACERTADO! La respuesta es ${correctAnswer}` : 'RESPUESTA INCORRECTA', isCorrect);
  if (isCorrect) toggleElements(true);
  inputElement.value = '';
};

const filterInput = () => {
  inputElement.value = inputElement.value.replace(regex, '');
};

const handleKeyDown = event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    checkAnswer();
  }
};

const toggleElements = disabled => {
  inputElement.disabled = disabled;
  sendElement.disabled = disabled;
  hintElement.disabled = disabled;
};

const showModal = (message, isCorrect) => {
  modalText.innerHTML = '';
  modalImage.src = isCorrect ? './assets/images/check_small.png' : './assets/images/cancel.png';

  const fragment = document.createDocumentFragment();

  if (isCorrect) {
    fragment.append(createModalDiv('¡HAS ACERTADO! '), createModalDiv(`La respuesta es ${message.split(' ').pop()}`));
    modalButton.textContent = 'Probar con otra adivinanza';
    modalButton.removeEventListener('click', hideModal);
    modalButton.addEventListener('click', initializeRiddle);
  } else {
    fragment.append(createModalDiv(message));
    modalButton.textContent = 'Intentar de nuevo';
    modalButton.removeEventListener('click', initializeRiddle);
    modalButton.addEventListener('click', hideModal);
  }

  modalText.append(fragment);
  modal.classList.remove('d-none');
  modal.classList.add('d-flex');
};

const createModalDiv = text => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  span.textContent = text;
  div.append(span);
  return div;
};

const hideModal = () => {
  modal.classList.add('d-none');
  modal.classList.remove('d-flex');
};

const showSolution = () => {
  const correctAnswer = riddles[randomIndex].answer;
  showModal(`La respuesta correcta es ${correctAnswer}.`, true);
  toggleElements(true);
  buttonSolutionElement.classList.add('d-none');
  hintElement.classList.add('d-none');
};

changeElement.addEventListener('click', initializeRiddle);
hintElement.addEventListener('click', updateHint);
sendElement.addEventListener('click', checkAnswer);
inputElement.addEventListener('input', filterInput);
inputElement.addEventListener('keydown', handleKeyDown);
buttonSolutionElement.addEventListener('click', showSolution);
modalClose.addEventListener('click', hideModal);
window.addEventListener('click', event => {
  if (event.target === modal) {
    hideModal();
  }
});

initializeRiddle();
