import { renderProjects, renderTodos, fillTaskForm } from './dom';
import { getCurrentProject, getProjects, switchProject, toggleTodo, getTodoById, updateTodo, createTodo, createProject, deleteProject, deleteTodo } from './state';

export const handleTodoSubmission = formData => {
    const data = Object.fromEntries(formData.entries());

    if (!data.title.trim()) {
        alert("Task title is required!");
        return;
    }

    const editId = document.querySelector('#task-form').dataset.editId;

    if (editId) {
        const existingTodo = getTodoById(editId);
        if (!existingTodo) {
            console.error("Attempted to update a non-existent todo.");
            return;
        }
        updateTodo(editId, data);
    } else {
        createTodo(data);
    }

    renderTodos(getCurrentProject());
};

export const handleProjectCreation = formData => {
    const data = Object.fromEntries(formData.entries());
    const title = data.title.trim();

    if (!title) {
        alert("Project name cannot be empty!");
        return;
    }

    const duplicate = getProjects().some(project => project.name.toLowerCase() === title.toLowerCase())
    if (duplicate) {
        alert("A project with this name already exists!")
        return;
    }

    createProject(data);
    renderProjects(getProjects());
}

export const handleProjectSwitch = id => {
    if (!id) return;

    switchProject(id);
    renderTodos(getCurrentProject());
}

export const handleTodoToggle = id => {
    if (!id) return;

    toggleTodo(id);
    renderTodos(getCurrentProject());
}

export const handleEditTodo = id => {
    const todo = getTodoById(id);

    if (!todo) {
        alert("This task no longer exists.")
        return;
    }

    fillTaskForm(todo);

    document.querySelector('#task-dialog').showModal();
}

export const handleProjectDelete = id => {
    deleteProject(id);
    renderProjects(getProjects());
    renderTodos(getCurrentProject());
}

export const handleTodoDelete = id => {
    deleteTodo(id);
    renderTodos(getCurrentProject());
}