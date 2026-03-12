import { Project } from '../models/project';

const projects = [];
let currentProject = null;

export const initApp = () => {
    const defaultProject = new Project("General");
    projects.push(defaultProject);
    currentProject = defaultProject;
};

export const getCurrentProject = () => currentProject;
export const addProject = project => projects.push(project);
export const getProjects = () => projects;
export const switchProject = projectId => currentProject = projects.find(project => project.id === projectId);

export const toggleTodo = todoId => {
    const todo = currentProject.todos.find(todo => todo.id === todoId);
    todo.toggleComplete();
}

export const getTodoById = todoId => currentProject.todos.find(todo => todo.id === todoId);

export const updateTodo = (todoId, newData) => {
    const todo = getTodoById(todoId);

    Object.assign(todo, newData);
}