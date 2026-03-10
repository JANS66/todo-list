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
    const formData = new FormData(taskForm);
    const data = Object.fromEntries(formData.entries());
    console.log("Success! Task Data:", data);
    taskForm.reset();
});

dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
});