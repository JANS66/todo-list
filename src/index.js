import './style.css';
import * as State from './modules/state';
import * as DOM from './modules/dom';
import * as Events from './modules/events';

Events.setupEventListeners();

State.subscribe((projects, current) => {
  DOM.renderProjects(projects, current.id);
  DOM.renderTodos(current);
});

State.initApp();
