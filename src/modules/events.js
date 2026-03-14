import * as Controller from './controller';

export function setupEventListeners() {
  const dialog = document.querySelector('#main-dialog');
  const sidebar = document.querySelector('sidebar');
  const menuToggle = document.querySelector('#menu-toggle');

  // Toggle Sidebar
  menuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Close sidebar when clicking outside of it
  document.addEventListener('click', (event) => {
    if (
      sidebar.classList.contains('active') &&
      !sidebar.contains(event.target) &&
      event.target !== menuToggle
    ) {
      sidebar.classList.remove('active');
    }
  });

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
    } else if (form.dataset.createId) {
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
      if (projectButton) {
        Controller.handleProjectSwitch(projectButton.dataset.id);

        sidebar.classList.remove('active');
      }

      const deleteButton = event.target.closest('.delete-project-button');
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
    const target = event.target;

    // 1. Handle Edit Button
    if (target.classList.contains('todo-edit')) {
      Controller.handleEditRequest(id);
      return;
    }

    // 2. Handle Delete Button
    if (target.classList.contains('todo-delete')) {
      Controller.handleTodoDelete(id);
      return;
    }

    // 3. Handle Checkbox Toggle
    if (target.classList.contains('todo-complete')) {
      Controller.handleTodoToggle(id);
      return;
    }

    // 4. Handle Expansion (If we clicked the card but NOT a button/checkbox)
    const isInteractive =
      target.closest('.todo-actions') ||
      target.classList.contains('todo-complete');

    if (!isInteractive) {
      todoCard.classList.toggle('expanded');

      // Update the arrow icon
      const icon = todoCard.querySelector('.expand-icon');
      icon.textContent = todoCard.classList.contains('expanded') ? '▲' : '▼';
    }
  });
}
