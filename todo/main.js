import { todos } from './data/todos.js';

const showCompleted = document.getElementById('show-completed');
const todosLeft = document.querySelector('header .badge');
const todoList = document.querySelector('main ul');
const addTodoInput = document.querySelector('footer input');
const addTodoBtn = document.querySelector('footer button');

renderTodos();

addTodoBtn.addEventListener('click', () => {
  if (!addTodoInput.value) {
    return;
  }
  addTodo();
});
addTodoInput.addEventListener('keydown', (e) => {
  if (e.key != 'Enter') {
    return;
  }
  addTodo();
});

showCompleted.addEventListener('change', (e) => {
  console.log(e.target.checked)
  renderTodos();
});

function addTodo() {
  const newTodo = {
    description: addTodoInput.value,
    done: false,
  };
  if (todos.map(({description}) => description).includes(newTodo.description)) {
    // give feedback!
    return;
  }
  todos.push(newTodo);
  renderTodos();
  addTodoInput.value = '';
}

function renderTodos() {
  todosLeft.textContent = todos.filter(({done}) => !done).length;
  todoList.innerHTML = '';

  for (const todo of todos) {
    if (!showCompleted.checked && todo.done) {
      continue;
    }

    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `
      <span></span>
      <input type="checkbox" />
      `;
    li.querySelector('span').textContent = todo.description;
    li.querySelector('input').checked = todo.done;

    li.querySelector('input').addEventListener('change', (e) => {
      const done = e.target.checked;
      todo.done = done;
      console.log(li.done)
      setTimeout(renderTodos, 500);
    });

    todoList.appendChild(li);
  }
}
