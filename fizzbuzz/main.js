function fizzbuzz() {
  const N = 25, fizz = 3, buzz = 5;

  const grid = document.getElementById('grid');

  for (let i = 1; i <= N; i++) {
    const result = getFizzbuzz(i);

    const cell = document.createElement('div');
    cell.textContent = result;
    cell.className = 'cell';
    if (typeof result == 'string') {
      cell.classList.add(result);
    }

    grid.appendChild(cell);
  }


  function getFizzbuzz(i) {
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
}
