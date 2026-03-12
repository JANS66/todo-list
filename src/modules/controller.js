import * as DOM from './dom';
import * as State from './state';

export const handleTodoSubmission = (formData) => {
  const data = Object.fromEntries(formData.entries());

  if (!data.title.trim()) {
    alert('Task title is required!');
    return;
  }

  const editId = document.querySelector('#task-form').dataset.editId;

  if (editId) {
    const existingTodo = State.getTodoById(editId);
    if (!existingTodo) {
      console.error('Attempted to update a non-existent todo.');
      return;
    }
    State.updateTodo(editId, data);
  } else {
    State.createTodo(data);
  }

  DOM.renderTodos(State.getCurrentProject());
};

export const handleProjectCreation = (formData) => {
  const data = Object.fromEntries(formData.entries());
  const title = data.title.trim();

  if (!title) {
    alert('Project name cannot be empty!');
    return;
  }

  const duplicate = State.getProjects().some(
    (project) => project.name.toLowerCase() === title.toLowerCase()
  );
  if (duplicate) {
    alert('A project with this name already exists!');
    return;
  }

  State.createProject(data);
  DOM.renderProjects(State.getProjects());
};

export const handleProjectSwitch = (id) => {
  if (!id) return;

  State.switchProject(id);
  DOM.renderTodos(State.getCurrentProject());
};

export const handleTodoToggle = (id) => {
  if (!id) return;

  State.toggleTodo(id);
  DOM.renderTodos(State.getCurrentProject());
};

export const handleEditTodo = (id) => {
  const todo = State.getTodoById(id);

  if (!todo) {
    alert('This task no longer exists.');
    return;
  }

  DOM.fillTaskForm(todo);

  document.querySelector('#task-dialog').showModal();
};

export const handleProjectDelete = (id) => {
  State.deleteProject(id);
  DOM.renderProjects(State.getProjects());
  DOM.renderTodos(State.getCurrentProject());
};

export const handleTodoDelete = (id) => {
  State.deleteTodo(id);
  DOM.renderTodos(State.getCurrentProject());
};
