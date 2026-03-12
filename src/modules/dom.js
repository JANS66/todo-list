export const renderProjects = (projects) => {
  const projectsList = document.querySelector('#projects-list');
  projectsList.innerHTML = '';

  projects.forEach((project) => {
    const li = document.createElement('li');
    const projectButton = document.createElement('button');
    const deleteButton = document.createElement('button');

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
    li.innerHTML = `
            <div>
                <span class="todo-title"></span>
                <span class="todo-description"></span>
                <span class="todo-dueDate"></span>
                <span class="todo-priority"></span>
                <input class="todo-complete" type="checkbox" ${todo.complete ? 'checked' : ''}>
                <button class="todo-edit">Edit</button>
                <button class="todo-delete">x</button>
            </div>
        `;

    li.classList.add('todo-card');
    li.dataset.id = todo.id;

    li.querySelector('.todo-title').textContent = todo.title;
    li.querySelector('.todo-description').textContent = todo.description;
    li.querySelector('.todo-dueDate').textContent = todo.dueDate;
    li.querySelector('.todo-priority').textContent = todo.priority;

    todoList.appendChild(li);
  });
};

export const fillTaskForm = (todo) => {
  const form = document.querySelector('#task-form');
  const title = form.querySelector('h2');

  form.title.value = todo.title;
  form.description.value = todo.description;
  form.dueDate.value = todo.dueDate;
  form.priority.value = todo.priority;

  form.dataset.editId = todo.id;
  title.textContent = 'Edit Task';
};
