import * as Controller from './controller';

export function setupEventListeners() {
  const addNewTask = document.querySelector('#open-modal');
  const createProject = document.querySelector('#create-project');

  const taskForm = document.querySelector('#task-form');
  const projectForm = document.querySelector('#project-form');
  const taskDialog = document.querySelector('#task-dialog');
  const projectDialog = document.querySelector('#project-dialog');
  const dialogs = document.querySelectorAll('dialog');

  const projectsList = document.querySelector('#projects-list');
  const todoList = document.querySelector('#todo-list');

  addNewTask.addEventListener('click', () => {
    taskForm.reset();
    delete taskForm.dataset.editId;
    taskDialog.querySelector('h2').textContent = 'New Task';
    taskDialog.showModal();
  });

  taskForm.addEventListener('submit', () => {
    const formData = new FormData(taskForm);

    Controller.handleTodoSubmission(formData);

    taskForm.reset();
  });

  projectForm.addEventListener('submit', () => {
    const formData = new FormData(projectForm);

    Controller.handleProjectCreation(formData);

    projectForm.reset();
  });

  dialogs.forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      // Close if clicking the backdrop or a button with id 'cancel-button'
      if (event.target === dialog || event.target.id === 'cancel-button') {
        dialog.close();
      }
    });
  });

  createProject.addEventListener('click', () => projectDialog.showModal());

  projectsList.addEventListener('click', (event) => {
    const projectButton = event.target.closest('.project-button');

    if (projectButton) {
      Controller.handleProjectSwitch(projectButton.dataset.id);
    }

    const deleteButton = event.target.closest('.delete-project-button');

    if (deleteButton) {
      if (confirm('Are you sure you want to delete this project?')) {
        Controller.handleProjectDelete(deleteButton.dataset.id);
      }
    }
  });

  todoList.addEventListener('change', (event) => {
    const toggledTodo = event.target.closest('.todo-card');

    if (toggledTodo) {
      const todoId = toggledTodo.dataset.id;
      Controller.handleTodoToggle(todoId);
    }
  });

  todoList.addEventListener('click', (event) => {
    const editButton = event.target.closest('.todo-edit');

    if (editButton) {
      Controller.handleEditTodo(editButton.closest('.todo-card').dataset.id);
      return;
    }

    const deleteButton = event.target.closest('.todo-delete');

    if (deleteButton) {
      Controller.handleTodoDelete(
        deleteButton.closest('.todo-card').dataset.id
      );
    }
  });
}
