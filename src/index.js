import './style.css';
import { getCurrentProject, initApp } from './modules/state';
import { renderProjects, renderTodos } from './modules/dom';
import { getProjects } from './modules/state';
import { setupEventListeners } from './modules/events';

setupEventListeners();
initApp();
renderProjects(getProjects());
renderTodos(getCurrentProject());