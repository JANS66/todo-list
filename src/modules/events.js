import * as Controller from './controller';

export function setupEventListeners() {
  const uiElements = {
    dialog: document.querySelector('#main-dialog'),
    sidebar: document.querySelector('sidebar'),
    menuToggle: document.querySelector('#menu-toggle'),
    projectsList: document.querySelector('#projects-list'),
    todoList: document.querySelector('#todo-list'),
    appBody: document.body,
  };

  // --- 1. Global / Navigation Actions ---
  uiElements.appBody.addEventListener('click', (e) => {
    const target = e.target;

    // Toggle Sidebar
    if (target.closest('#menu-toggle')) {
      uiElements.sidebar.classList.toggle('active');
    }

    // Close sidebar when clicking outside
    if (
      uiElements.sidebar.classList.contains('active') &&
      !uiElements.sidebar.contains(target) &&
      !target.closest('#menu-toggle')
    ) {
      uiElements.sidebar.classList.remove('active');
    }

    // Creator Buttons
    if (target.closest('#create-project')) Controller.requestDialog('Project');
    if (target.closest('#add-todo')) Controller.requestDialog('Task');
  });

  // --- 2. Dialog Management ---
  uiElements.dialog.addEventListener('click', (event) => {
    const dialogDimensions = uiElements.dialog.getBoundingClientRect();

    // Check if the click was outside the dialog boundaries
    const isOutside =
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom;

    if (isOutside || event.target.id === 'cancel-button') {
      uiElements.dialog.close();
    }
  });

  uiElements.dialog.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { deleteId, editId, createId } = form.dataset;

    if (deleteId) return Controller.handleProjectDelete(deleteId);
    if (editId) return Controller.handleTodoSubmission(formData, editId);
    if (createId) return Controller.handleTodoSubmission(formData);

    Controller.handleProjectCreation(formData);
  });

  // --- 3. Project List (Delegation) ---
  uiElements.projectsList.addEventListener('click', (e) => {
    const projectBtn = e.target.closest('.project-button');
    const deleteBtn = e.target.closest('.delete-project-button');

    if (projectBtn) {
      Controller.handleProjectSwitch(projectBtn.dataset.id);
      uiElements.sidebar.classList.remove('active');
    } else if (deleteBtn) {
      Controller.requestDialog('Delete Confirmation', {
        id: deleteBtn.dataset.id,
        target: 'Project',
      });
    }
  });

  // --- 4. Todo List (Delegation) ---
  uiElements.todoList.addEventListener('click', (e) => {
    const target = e.target;
    const todoCard = target.closest('.todo-card');
    if (!todoCard) return;

    const id = todoCard.dataset.id;

    if (target.classList.contains('todo-edit'))
      return Controller.handleEditRequest(id);
    if (target.classList.contains('todo-delete'))
      return Controller.handleTodoDelete(id);
    if (target.classList.contains('todo-complete'))
      return Controller.handleTodoToggle(id);

    // Default action: Expansion
    if (!target.closest('.todo-actions')) {
      handleCardExpansion(todoCard);
    }
  });
}

function handleCardExpansion(card) {
  card.classList.toggle('expanded');
  const icon = card.querySelector('.expand-icon');
  if (icon) icon.textContent = card.classList.contains('expanded') ? '▲' : '▼';
}
