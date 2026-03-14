import { format, parseISO, isValid } from 'date-fns';

export const renderProjects = (projects, currentId) => {
  const projectsList = document.querySelector('#projects-list');
  projectsList.innerHTML = '';

  projects.forEach((project) => {
    const li = document.createElement('li');
    const projectButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    if (project.id === currentId) {
      li.classList.add('active-project');
    }

    projectButton.textContent = project.name;
    projectButton.classList.add('project-button');
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete-project-button');
    deleteButton.setAttribute('aria-label', `Delete ${project.name} project`);

    projectButton.dataset.id = project.id;
    deleteButton.dataset.id = project.id;

    li.appendChild(projectButton);
    li.appendChild(deleteButton);
    projectsList.appendChild(li);
  });
};

export const renderTodos = (project) => {
  const projectName = document.querySelector('#project-name');
  const todoList = document.querySelector('#todo-list');

  projectName.textContent = project.name;
  todoList.innerHTML = '';

  // Use document fragment for better performance when appending many items
  const fragment = document.createDocumentFragment();

  project.todos.forEach((todo) => {
    fragment.appendChild(createTodoElement(todo));
  });

  todoList.appendChild(fragment);
};

export const renderDialog = (type, data = null) => {
  const dialog = document.querySelector('#main-dialog');
  const container = document.querySelector('#dialog-content');
  container.innerHTML = ''; // Clear old content

  // 1. Create the Form Wrapper
  const form = document.createElement('form');
  form.id = 'dynamic-form';

  // 2. Select and CLone the correct Template
  const templateId = {
    Task: '#task-form-template',
    Project: '#project-form-template',
    'Delete Confirmation': '#delete-confirmation-template',
    Alert: null,
  }[type];

  if (templateId) {
    const template = document.querySelector(templateId);
    form.appendChild(template.content.cloneNode(true));
  }

  // 3. Populate Data
  if (type === 'Task') {
    form.querySelector('h2').textContent = data ? 'Edit Task' : 'New Task';
    if (data) {
      form.dataset.editId = data.id;
      form.elements.title.value = data.title;
      form.elements.description.value = data.description;
      form.elements.dueDate.value = data.dueDate;
      form.elements.priority.value = data.priority;
    } else {
      form.dataset.createId = 'true';
    }
  } else if (type === 'Delete Confirmation') {
    form.dataset.deleteId = data.id;
    form.querySelector('.delete-message').textContent =
      `Delete ${data.target}?`;
  }

  // 4. Add Buttons (Footer is the same for all except Alert)
  if (type !== 'Alert') {
    const actions = document.createElement('div');
    actions.innerHTML = `
      <button type="submit">Confirm</button>
      <button type="button" id="cancel-button">Cancel</button>
    `;
    form.appendChild(actions);
  }

  container.appendChild(form);
  dialog.showModal();
};

export const closeDialog = () => {
  document.querySelector('#main-dialog').close();
};

const getFormattedDate = (dateString) => {
  if (!dateString) return 'No date';
  const date = parseISO(dateString);
  return isValid(date) ? format(date, 'MMM do') : 'Invalid date';
};

const createTodoElement = (todo) => {
  const template = document.querySelector('#todo-card-template');
  const clone = template.content.cloneNode(true);

  const li = clone.querySelector('.todo-card');
  li.dataset.id = todo.id;

  // 1. Handle Header
  const checkbox = li.querySelector('.todo-complete');
  checkbox.checked = todo.complete;

  li.querySelector('.todo-title').textContent = todo.title;
  li.querySelector('.todo-dueDate').textContent = getFormattedDate(
    todo.dueDate
  );

  // 2. Handle Details
  const badge = li.querySelector('.todo-priority-badge');
  badge.textContent = todo.priority;
  badge.classList.add(todo.priority.toLowerCase());

  li.querySelector('.todo-description').textContent =
    todo.description || 'No description provided.';

  return li;
};
