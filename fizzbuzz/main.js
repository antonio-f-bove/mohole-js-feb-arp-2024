

const configForm = document.getElementById('config-form');
const grid = document.getElementById('grid');
const button = document.getElementById('fizzbuzz-button');

button.addEventListener('click', () => {
  const { N, fizz, buzz } = getParams();
  fizzbuzz(N, fizz, buzz);
  grid.classList.remove('d-none');
  configForm.classList.add('d-none');
});

function getParams() {
  const inputs = document.querySelectorAll('input.form-control');
  return Object.fromEntries([...inputs].map(({ name, value }) => [name, value]))
  // return {
  //   N: inputs[0].value,
  //   fizz: inputs[1].value,
  //   buzz: inputs[2].value,
  // };
}

function fizzbuzz(N, fizz, buzz) {
  // const N = 25, fizz = 3, buzz = 5;

  for (let i = 1; i <= N; i++) {
    const result = getFizzbuzz(i, fizz, buzz);

    const cell = document.createElement('div');
    cell.textContent = result;
    cell.className = 'cell';
    if (typeof result == 'string') {
      cell.classList.add(result);
    }

    grid.appendChild(cell);
  }
}

function getFizzbuzz(i, fizz, buzz) {
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
