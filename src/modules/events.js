import { handleTodoSubmission, handleProjectCreation, handleProjectSwitch } from "./controller";

export function setupEventListeners() {
    const dialog = document.querySelector('#task-dialog');
    const addNewTask = document.querySelector('#open-modal');
    const cancelButton = document.querySelector('#cancel-button');
    const createProject = document.querySelector('#create-project')
    const taskForm = document.querySelector('form');
    const projectsList = document.querySelector('#projects-list');

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
            const projectIndex = clickedButton.dataset.index;
            handleProjectSwitch(projectIndex);
        }
    })
}