import { todos } from './data/todos.js';

const showCompleted = document.getElementById('show-completed');
const badges = document.querySelectorAll('header .badge');
const [leftTodos, totTodos] = badges;
const todoList = document.querySelector('main ul');
const addTodoInput = document.querySelector('footer input');
const addTodoBtn = document.querySelector('footer button');

renderTodos();

addTodoBtn.addEventListener('click', () => {
  addTodo();
});
addTodoInput.addEventListener('keydown', (e) => {
  if (e.key != 'Enter') {
    return;
  }
  addTodo();
});

showCompleted.addEventListener('change', () => {
  renderTodos();
});

function addTodo() {
  const newTodo = {
    description: addTodoInput.value,
    done: false,
  };

  if (!newTodo.description || todos.map(({description}) => description).includes(newTodo.description)) {
    addTodoInput.classList.add('is-invalid');
    return;
  }

  todos.push(newTodo);

  renderTodos();

  addTodoInput.value = '';
  addTodoInput.classList.remove('is-invalid')
}

function renderTodos() {
  totTodos.textContent = todos.length;
  leftTodos.textContent = todos.filter(({done}) => !done).length;

  todoList.innerHTML = '';

  for (const todo of todos) {
    if (!showCompleted.checked && todo.done) {
      continue;
    }

    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `
      <span></span>
      <div>
	<input type="checkbox" class="me-2" />
	<i class="bi bi-trash3" style="cursor: pointer;"></i>
      </div>
      `;
    li.querySelector('span').textContent = todo.description;
    li.querySelector('input').checked = todo.done;

    li.querySelector('input').addEventListener('change', (e) => {
      todo.done = e.target.checked;
      setTimeout(renderTodos, 500);
    });

    li.querySelector('i').addEventListener('click', () => {
      todos.splice(todos.indexOf(todo), 1);
      renderTodos();
    });

    todoList.appendChild(li);
  }
}
