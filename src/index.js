import './style.css';
import { Todo } from './models/todo';

const dialog = document.querySelector('#task-dialog');
const openButton = document.querySelector('#open-modal');
const cancelButton = document.querySelector('#cancel-button');
const taskForm = dialog.querySelector('form');

openButton.addEventListener('click', () => {
    dialog.showModal();
});


cancelButton.addEventListener('click', () => {
    dialog.close();
});


taskForm.addEventListener('submit', () => {
    // Gather data
    const formData = new FormData(taskForm);
    const data = Object.fromEntries(formData.entries());

    // Create todo
    const todo = new Todo(data.title, data.description, data.dueDate, data.priority);

    // Call function for displaying todo
    displayTodo(todo);

    taskForm.reset();
});

dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
});

const displayTodo = todo => {
    const todoList = document.querySelector('#todo-list');

    const card = document.createElement('li');

    card.innerHTML = `
        <div>
            <span>${todo.title}</span>
            <span>${todo.description}</span>
            <span>${todo.priority}</span>
            <span>${todo.dueDate}</span>
        </div>
    `

    todoList.appendChild(card);
}