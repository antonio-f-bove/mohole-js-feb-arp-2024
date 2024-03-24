import { todos } from './data/todos.js';

const filterBtns = document.querySelectorAll('header button');
const todosLeft = document.querySelector('header .badge');
const todoList = document.querySelector('main ul');
const addTodoInput = document.querySelector('footer input');
const addTodoBtn = document.querySelector('footer button');

todosLeft.textContent = todos.length;
renderTodos();

addTodoBtn.addEventListener('click', () => {

});
addTodoInput.addEventListener('keydown', (e) => {
  if (e.key != 'Enter') {
    return;
  }
  console.log('enter!')
  todos.push({
    description: addTodoInput.value,
    done: false,
  });
  console.log(todos)
});

function renderTodos() {
  for (const todo of todos) {
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `
      <span></span>
      <input type="checkbox" />
      `;
    li.querySelector('span').textContent = todo.description;
    li.querySelector('input').checked = todo.done;

    todoList.appendChild(li);
  }
}
