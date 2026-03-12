import { renderProjects, renderTodos, fillTaskForm } from './dom';
import { getCurrentProject, getProjects, switchProject, toggleTodo, getTodoById, updateTodo, createTodo, createProject } from './state';

export const handleTodoSubmission = formData => {
    const data = Object.fromEntries(formData.entries());
    const editId = document.querySelector('#task-form').dataset.editId;

    if (editId) {
        updateTodo(editId, data);
    } else {
        createTodo(data);
    }

    renderTodos(getCurrentProject());
};

export const handleProjectCreation = formData => {
    const data = Object.fromEntries(formData.entries());
    createProject(data);
    renderProjects(getProjects());
}

export const handleProjectSwitch = id => {
    switchProject(id);
    renderTodos(getCurrentProject());
}

export const handleTodoToggle = id => {
    toggleTodo(id);
    renderTodos(getCurrentProject());
}

export const handleEditTodo = id => {
    const todo = getTodoById(id);

    fillTaskForm(todo);

    const taskDialog = document.querySelector('#task-dialog');
    taskDialog.showModal();
}