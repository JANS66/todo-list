import { Todo } from '../models/todo'
import { renderProjects, renderTodos, fillTaskForm } from './dom';
import { getCurrentProject, addProject, getProjects, switchProject, toggleTodo, getTodoById, updateTodo } from './state';
import { Project } from '../models/project';

export const handleTodoSubmission = formData => {
    const data = Object.fromEntries(formData.entries());
    const editId = document.querySelector('#task-form').dataset.editId;

    if (editId) {
        updateTodo(editId, data);
    } else {
        const newTodo = new Todo(data.title, data.description, data.dueDate, data.priority);
        getCurrentProject().addTodo(newTodo);
    }

    renderTodos(getCurrentProject());
};

export const handleProjectCreation = formData => {
    const data = Object.fromEntries(formData.entries());
    const newProject = new Project(data.title);

    addProject(newProject);
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