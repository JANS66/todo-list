import { handleTodoSubmission, handleProjectCreation, handleProjectSwitch, handleTodoToggle } from "./controller";

export function setupEventListeners() {
    const dialog = document.querySelector('#task-dialog');
    const addNewTask = document.querySelector('#open-modal');
    const cancelButton = document.querySelector('#cancel-button');
    const createProject = document.querySelector('#create-project')
    const taskForm = document.querySelector('form');
    const projectsList = document.querySelector('#projects-list');
    const todoList = document.querySelector('#todo-list');

    addNewTask.addEventListener('click', () => dialog.showModal());
    cancelButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close() });

    taskForm.addEventListener('submit', () => {
        const formData = new FormData(taskForm);

        handleTodoSubmission(formData);

        taskForm.reset();
    });

    createProject.addEventListener('click', () => {
        const name = prompt('Enter new project name', '');
        handleProjectCreation(name);
    })

    projectsList.addEventListener('click', event => {
        const clickedButton = event.target.closest('.project-button');

        if (clickedButton) {
            const projectId = clickedButton.dataset.id;
            handleProjectSwitch(projectId);
        }
    })

    todoList.addEventListener('change', event => {
        const toggledTodo = event.target.closest('.todo-card');

        if (toggledTodo) {
            const todoId = toggledTodo.dataset.id;
            handleTodoToggle(todoId);
        }
    })
}