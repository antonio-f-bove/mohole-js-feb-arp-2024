async function fetchAll(resource) {
  const res = await fetch(`https://swapi.dev/api/${resource}/`);
  const json = await res.json();
  const count = json.count;

  const promises = [];
  for (let i = 1; i <= count; i++) {
    promises.push(fetch(`https://swapi.dev/api/${resource}/${i}/`));
  }
  const response = (await Promise.all(
    promises
      .map(p => p.then(r => r.json())))
  ).filter(el => el.name);

  return response;
}

function injectAnswer(answer, questionNumber) {
  const cardEl = document.getElementById(`card-id-${questionNumber}`)
  const buttonEl = cardEl.querySelector('a')
  const answerEl = cardEl.querySelector('em')

  // buttonEl.addEventListener('click', () => {
  answerEl.innerHTML = answer
  // answerEl.classList.add('bg-success')
  // })
}

export { fetchAll, injectAnswer };
