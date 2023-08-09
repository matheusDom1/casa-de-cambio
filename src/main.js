import './style.css';
import Swal from 'sweetalert2';

const input = document.querySelector('input');
const button = document.querySelector('#btn-verify');
const tabelaDiv = document.querySelector('#tabela');
const moeda = document.querySelector('h3');

const criaTabela = () => {
  const LINK_API = `https://api.exchangerate.host/latest?base=${input.value}`;

  fetch(LINK_API).then((res) => res.json()).then((data) => {
    if (data.base !== input.value || input.value === '') {
      moeda.innerHTML = '';
      throw new Error('erro');
    }

    const arr = Object.entries(data.rates);
    arr.forEach((elemento) => {
      const newP = document.createElement('p');
      newP.classList.add('format-text');
      newP.innerHTML = `${elemento[0]} - ${elemento[1]}`;
      tabelaDiv.appendChild(newP);
    });
  }).catch(() => Swal.fire({
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool',
  }));
};

button.addEventListener('click', (event) => {
  event.preventDefault();
  tabelaDiv.innerHTML = '';
  const inputTransform = input.value.toUpperCase();
  moeda.innerText = `Valor referente a 1 ${inputTransform}`;

  const API_SYMBOLS = 'https://api.exchangerate.host/symbols';

  fetch(API_SYMBOLS).then((res) => res.json).then();

  criaTabela();
});
