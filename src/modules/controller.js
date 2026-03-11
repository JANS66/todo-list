import { Todo } from '../models/todo'
import { renderProjects, renderTodos } from './dom';
import { getCurrentProject, addProject, getProjects, switchProject } from './state';
import { Project } from '../models/project';

export const handleTodoSubmission = formData => {
    const data = Object.fromEntries(formData.entries());
    const newTodo = new Todo(data.title, data.description, data.dueDate, data.priority);

    const activeProject = getCurrentProject();
    activeProject.addTodo(newTodo);

    renderTodos(getCurrentProject());
};

export const handleProjectCreation = name => {
    if (!name) return;
    const newProject = new Project(name);
    addProject(newProject);
    renderProjects(getProjects());
}

export const handleProjectSwitch = index => {
    switchProject(index);
    renderTodos(getCurrentProject());
}