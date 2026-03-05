import { AppState } from "./logic/manager";
import { UI } from "./ui/domLoader";
import { Todo } from "./logic/todo";
import './ui/styles.css';

const def = AppState.projects[0];
def.addTodo(new Todo("High Task", "Serious stuff", "March 10", "High"));
def.addTodo(new Todo("Low Task", "Chilled stuff", "March 12", "Low"));

UI.render();