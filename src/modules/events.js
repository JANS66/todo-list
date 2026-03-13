import * as Controller from './controller';

export function setupEventListeners() {
  const dialog = document.querySelector('#main-dialog');

  // Open Project Creator
  document.querySelector('#create-project').addEventListener('click', () => {
    Controller.requestDialog('Project');
  });

  // Open Task Creator
  document.querySelector('#add-todo').addEventListener('click', () => {
    Controller.requestDialog('Task');
  });

  // Handle Form Submissions (Delegation)
  dialog.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Determine which action to take based on form state
    if (form.dataset.deleteId) {
      Controller.handleProjectDelete(form.dataset.deleteId);
    } else if (form.dataset.editId) {
      Controller.handleTodoSubmission(formData, form.dataset.editId);
    } else if (form.querySelector('h2').textContent.includes('Task')) {
      Controller.handleTodoSubmission(formData);
    } else {
      Controller.handleProjectCreation(formData);
    }
  });

  // Close logic
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.id === 'cancel-button') {
      dialog.close();
    }
  });

  // Project List Clicks
  document
    .querySelector('#projects-list')
    .addEventListener('click', (event) => {
      const projectButton = event.target.closest('.project-button');
      const deleteButton = event.target.closest('.delete-project-button');

      if (projectButton)
        Controller.handleProjectSwitch(projectButton.dataset.id);
      if (deleteButton)
        Controller.requestDialog('Delete Confirmation', {
          id: deleteButton.dataset.id,
          target: 'Project',
        });
    });

  // Todo List Clicks & Changes
  document.querySelector('#todo-list').addEventListener('click', (event) => {
    const todoCard = event.target.closest('.todo-card');
    if (!todoCard) return; // Exit if we didn't click inside a card

    const id = todoCard.dataset.id;

    // 1. Handle Edit Button
    if (event.target.classList.contains('todo-edit')) {
      Controller.handleEditRequest(id);
      return;
    }

    // 2. Handle Delete Button
    if (event.target.classList.contains('todo-delete')) {
      Controller.handleTodoDelete(id);
      return;
    }

    // 3. Handle Checkbox Toggle
    if (event.target.classList.contains('todo-complete')) {
      Controller.handleTodoToggle(id);
    }
  });
}
