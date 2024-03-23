import { todos } from './data/todos.js';

const filterBtns = document.querySelectorAll('header button');
const todoList = document.querySelector('main ul');
const newTodo = document.querySelector('footer input');
const addTodoBtn = document.querySelector('footer button');

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