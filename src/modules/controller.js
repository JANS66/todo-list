import * as DOM from './dom';
import * as State from './state';

export const handleTodoSubmission = (formData, editId = '') => {
  const data = Object.fromEntries(formData.entries());
  const selectedDate = new Date(data.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to compare only the calendar date

  if (selectedDate < today) {
    DOM.renderDialog('Alert', {
      message: 'You cannot pick a date in the past!',
    });
    return;
  }

  if (!data.title.trim()) {
    DOM.renderDialog('Alert', { message: 'Task title is required!' });
    return;
  }

  if (editId) {
    const existingTodo = State.getTodoById(editId);
    if (!existingTodo) {
      DOM.renderDialog('Alert', {
        message: 'Attempted to update a non-existent todo.',
      });
      return;
    }
    State.updateTodo(editId, data);
  } else {
    State.createTodo(data);
  }

  DOM.closeDialog();
  DOM.renderTodos(State.getCurrentProject());
};

export const handleProjectCreation = (formData) => {
  const data = Object.fromEntries(formData.entries());
  const name = data.name ? data.name.trim() : '';

  if (!name) {
    DOM.renderDialog('Alert', { message: 'Project name cannot be empty!' });
    return;
  }

  const duplicate = State.getProjects().some(
    (project) => project.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    DOM.renderDialog('Alert', {
      message: 'A project with this name already exists!',
    });
    return;
  }

  State.createProject(data);
  DOM.closeDialog();
  DOM.renderProjects(State.getProjects(), State.getCurrentProject().id);
};

export const handleProjectSwitch = (id) => {
  if (!id) return;

  State.switchProject(id);
  DOM.renderProjects(State.getProjects(), State.getCurrentProject().id);
  DOM.renderTodos(State.getCurrentProject());
};

export const handleTodoToggle = (id) => {
  if (!id) return;

  State.toggleTodo(id);
  DOM.renderTodos(State.getCurrentProject());
};

export const requestDialog = (type, data) => {
  DOM.renderDialog(type, data);
};

export const handleEditRequest = (id) => {
  const todo = State.getTodoById(id);
  DOM.renderDialog('Task', todo);
};

export const handleTodoDelete = (id) => {
  State.deleteTodo(id);
  DOM.renderTodos(State.getCurrentProject());
};

export const handleProjectDelete = (id) => {
  const success = State.deleteProject(id);

  if (!success) {
    // If state returned false, we know it's the last project
    DOM.renderDialog('Alert', {
      message:
        'Cannot delete the last project! You need at least one to stay organized.',
    });
    return;
  }

  // If successful, proceed as normal
  DOM.closeDialog();
  DOM.renderProjects(State.getProjects(), State.getCurrentProject().id);
  DOM.renderTodos(State.getCurrentProject());
};
