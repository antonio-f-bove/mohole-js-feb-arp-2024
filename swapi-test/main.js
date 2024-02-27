import { solveQuestion1, solveQuestion2, solveQuestion3, solveQuestion4, solveQuestion5, solveQuestion6 } from "./modules/solve.js";

/*
  Fate una funzione per rispondere a ciiascuna domanda
    - fetchare della risorsa
    - manipolare il dato per arrivare alla risposta
    - inserire la risposta dentro al footer della carta
  
*/

window.addEventListener('DOMContentLoaded', () => {
  main();
});

function main() {
  const qFunctions = {
    1: solveQuestion1,
    2: solveQuestion2,
    3: solveQuestion3,
    4: solveQuestion4,
    5: solveQuestion5,
    6: solveQuestion6,
  };

  Object.keys(qFunctions).forEach((qId) => {
    // console.log({ qId })
    const card = document.querySelector(`#card-id-${qId}`);
    const button = card.querySelector('a');
    button.addEventListener('click', async (ev) => {
      const b = ev.target;
      b.classList.add('disabled');
      b.innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span class="visually-hidden" role="status">Loading...</span>
      `;
      await qFunctions[qId]();
      b.innerHTML = 'Done!';
      b.classList.add('btn-success')
    });
  });
}

