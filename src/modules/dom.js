// Helper to create a standard label/input pair safely
const createField = (labelTitle, type, name, value = '') => {
  const label = document.createElement('label');
  label.textContent = labelTitle;
  const input = document.createElement(
    type === 'textarea' ? 'textarea' : 'input'
  );
  if (type !== 'textarea') input.type = type;
  input.name = name;
  input.value = value;
  label.appendChild(input);
  return label;
};

const createSelectField = (
  labelTitle,
  name,
  options,
  currentValue = 'Medium'
) => {
  const label = document.createElement('label');
  label.textContent = labelTitle;

  const select = document.createElement('select');
  select.name = name;

  options.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    if (opt === currentValue) option.selected = true;
    select.appendChild(option);
  });

  label.appendChild(select);
  return label;
};

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

    projectButton.dataset.id = project.id;
    deleteButton.dataset.id = project.id;

    li.appendChild(projectButton);
    li.appendChild(deleteButton);
    projectsList.appendChild(li);
  });
};

export const renderTodos = (project) => {
  const projectName = document.querySelector('#project-name');
  projectName.textContent = project.name;

  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = '';

  project.todos.forEach((todo) => {
    const li = document.createElement('li');
    li.classList.add('todo-card');
    li.dataset.id = todo.id;

    li.innerHTML = `
      <div class="todo-header">
        <input class="todo-complete" type="checkbox" ${todo.complete ? 'checked' : ''}>
        <span class="todo-title"></span>
        <span class="todo-dueDate">${todo.dueDate}</span>
        <span class="expand-icon">▼</span>
      </div>
      <div class="todo-details">
        <div class="details-grid">
          <div class="description-section">
            <p class="todo-priority-badge ${todo.priority.toLowerCase()}">${todo.priority}</p>
            <p class="todo-description"></p>
          </div>
          <div class="todo-actions">
            <button class="todo-edit">Edit</button>
            <button class="todo-delete">Delete</button>
          </div>
    `;

    li.querySelector('.todo-title').textContent = todo.title;
    li.querySelector('.todo-description').textContent =
      todo.description || 'No description provided.';

    todoList.appendChild(li);
  });
};

export const renderDialog = (type, data = null) => {
  const container = document.querySelector('#dialog-content');
  const dialog = document.querySelector('#main-dialog');
  container.innerHTML = '';

  const form = document.createElement('form');
  form.id = 'dynamic-form';

  const title = document.createElement('h2');
  title.textContent =
    type === 'Alert' ? 'Notice' : data ? `Edit ${type}` : `New ${type}`;
  form.appendChild(title);

  if (type === 'Alert') {
    const message = document.createElement('p');
    message.textContent = data.message;
    form.appendChild(message);

    const okButton = document.createElement('button');
    okButton.type = 'button';
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => dialog.close());
    form.appendChild(okButton);
  } else if (type === 'Task') {
    form.appendChild(createField('Title', 'text', 'title', data?.title));
    form.appendChild(
      createField('Description', 'textarea', 'description', data?.description)
    );
    form.appendChild(createField('Due Date', 'date', 'dueDate', data?.dueDate));
    form.appendChild(
      createSelectField(
        'Priority',
        'priority',
        ['Low', 'Medium', 'High'],
        data?.priority
      )
    );
    if (data) form.dataset.editId = data.id;
  } else if (type === 'Project') {
    form.appendChild(createField('Project Name', 'text', 'name', data?.name));
  } else if (type === 'Delete Confirmation') {
    title.textContent = 'Are you sure?';
    const message = document.createElement('p');
    message.textContent = `Delete this ${data.target}?`;
    form.appendChild(message);
    form.dataset.deleteId = data.id;
  }

  if (type !== 'Alert') {
    const actions = document.createElement('div');
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Confirm';
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.id = 'cancel-button';
    cancelButton.textContent = 'Cancel';

    actions.append(submitButton, cancelButton);
    form.appendChild(actions);
  }

  container.appendChild(form);
  dialog.showModal();
};

export const closeDialog = () => {
  document.querySelector('#main-dialog').close();
};
