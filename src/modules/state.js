import { Project } from '../models/project';
import { Todo } from '../models/todo';
import * as Storage from './storage';

let projects = [];
let currentProject = null;
const listeners = [];

export const subscribe = (callback) => listeners.push(callback);

const notify = () => {
  Storage.saveToLocalStorage(projects);
  listeners.forEach((callback) => callback(projects, currentProject));
};

export const initApp = () => {
  const savedData = Storage.loadFromLocalStorage();

  if (savedData && savedData.length > 0) {
    projects = savedData;
    currentProject = projects[0];
    notify();
  } else {
    const defaultProject = new Project('General');
    projects.push(defaultProject);
    currentProject = defaultProject;
    notify();
  }
};

export const getCurrentProject = () => currentProject;
export const getProjects = () => projects;
export const switchProject = (projectId) => {
  currentProject = projects.find((project) => project.id === projectId);
  notify();
};

export const toggleTodo = (todoId) => {
  const todo = currentProject.todos.find((todo) => todo.id === todoId);
  todo.toggleComplete();
  notify();
};

export const getTodoById = (todoId) =>
  currentProject.todos.find((todo) => todo.id === todoId);

export const updateTodo = (todoId, newData) => {
  const todo = getTodoById(todoId);
  Object.assign(todo, newData);
  notify();
};

export const createTodo = (data) => {
  const newTodo = new Todo(
    data.title,
    data.description,
    data.dueDate,
    data.priority
  );
  currentProject.addTodo(newTodo);
  notify();
};

export const createProject = (data) => {
  const newProject = new Project(data.name);
  projects.push(newProject);
  notify();
};

export const deleteProject = (projectId) => {
  if (projects.length <= 1) {
    return false;
  }

  const index = projects.findIndex((project) => project.id === projectId);
  if (index !== -1) {
    if (currentProject.id === projectId) {
      currentProject = projects[index === 0 ? 1 : 0];
    }
    projects.splice(index, 1);
    notify();
    return true;
  }
  return false;
};

export const deleteTodo = (todoId) => {
  currentProject.todos = currentProject.todos.filter(
    (todo) => todo.id !== todoId
  );
  notify();
};
