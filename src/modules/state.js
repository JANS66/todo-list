import { Project } from '../models/project';
import { Todo } from '../models/todo';

const projects = [];
let currentProject = null;

export const initApp = () => {
    const defaultProject = new Project("General");
    projects.push(defaultProject);
    currentProject = defaultProject;
};

export const getCurrentProject = () => currentProject;
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

export const createTodo = data => {
    const newTodo = new Todo(data.title, data.description, data.dueDate, data.priority);
    currentProject.addTodo(newTodo);
}

export const createProject = data => {
    const newProject = new Project(data.title);
    projects.push(newProject);
}

export const deleteProject = id => {
    const index = projects.findIndex(project => project.id === id);

    if (projects.length > 1 && index !== -1) {
        if (currentProject.id === id) {
            currentProject = projects[index === 0 ? 1 : 0];
        }
        projects.splice(index, 1);
    }
};