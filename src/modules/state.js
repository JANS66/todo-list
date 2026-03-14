import { Project } from '../models/project';
import { Todo } from '../models/todo';
import * as Storage from './storage';

let projects = [];
let currentProject = null;

export const initApp = () => {
  const savedData = Storage.loadFromLocalStorage();

  if (savedData && savedData.length > 0) {
    projects = savedData;
    currentProject = projects[0];
  } else {
    const defaultProject = new Project('General');
    projects.push(defaultProject);
    currentProject = defaultProject;
    Storage.saveToLocalStorage(projects);
  }
};

export const getCurrentProject = () => currentProject;
export const getProjects = () => projects;
export const switchProject = (projectId) =>
  (currentProject = projects.find((project) => project.id === projectId));

export const toggleTodo = (todoId) => {
  const todo = currentProject.todos.find((todo) => todo.id === todoId);
  todo.toggleComplete();
  Storage.saveToLocalStorage(projects);
};

export const getTodoById = (todoId) =>
  currentProject.todos.find((todo) => todo.id === todoId);

export const updateTodo = (todoId, newData) => {
  const todo = getTodoById(todoId);
  Object.assign(todo, newData);
  Storage.saveToLocalStorage(projects);
};

export const createTodo = (data) => {
  const newTodo = new Todo(
    data.title,
    data.description,
    data.dueDate,
    data.priority
  );
  currentProject.addTodo(newTodo);
  Storage.saveToLocalStorage(projects);
};

export const createProject = (data) => {
  const newProject = new Project(data.name);
  projects.push(newProject);
  Storage.saveToLocalStorage(projects);
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
    Storage.saveToLocalStorage(projects);
    return true;
  }
  return false;
};

export const deleteTodo = (todoId) => {
  currentProject.todos = currentProject.todos.filter(
    (todo) => todo.id !== todoId
  );
  Storage.saveToLocalStorage(projects);
};
