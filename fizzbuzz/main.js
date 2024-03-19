

const config = document.getElementById('config');
const grid = document.getElementById('grid');
const button = document.getElementById('fizzbuzz-button');
const backButton = document.getElementById('back-button');

button.addEventListener('click', () => {
  const { N, fizz, buzz } = getParams();
  fizzbuzz(N, fizz, buzz);
  toggleSections();
});

backButton.addEventListener('click', () => {
  toggleSections();
});

function getParams() {
  const inputs = document.querySelectorAll('input.form-control');
  // return Object.fromEntries([...inputs].map(({ name, value }) => [name, value]))

  const params = {};
  inputs.forEach(input => {
    params[input.name] = input.value;
  });

  return params;
}

function fizzbuzz(N, fizz, buzz) {
  // const N = 25, fizz = 3, buzz = 5;

  for (let i = 1; i <= N; i++) {
    const result = getStringFromIndex(i, fizz, buzz);

    const cell = document.createElement('div');
    cell.textContent = result;
    cell.className = 'cell';
    if (typeof result == 'string') {
      cell.classList.add(result);
    }

    grid.appendChild(cell);
  }
}

function getStringFromIndex(i, fizz, buzz) {
  let str = '';

  if (i % fizz === 0) {
    str += 'fizz';
  }
  if (i % buzz === 0) {
    str += 'buzz';
  }
  if (str === '') {
    str = i;
  }

  return str;
}

function toggleSections() {
  grid.parentElement.classList.toggle('d-none');
  config.classList.toggle('d-none');
}

