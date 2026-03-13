import './style.css';
import * as State from './modules/state';
import * as DOM from './modules/dom';
import * as Events from './modules/events';

Events.setupEventListeners();
State.initApp();
DOM.renderProjects(State.getProjects(), State.getCurrentProject().id);
DOM.renderTodos(State.getCurrentProject());
