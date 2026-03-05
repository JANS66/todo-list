import { Todo } from './todo';
import { projectList, createProject } from './appLogic';

const workProject = createProject("Work");

const task1 = new Todo("Finish Project Logic", "Coding", "2026-03-10", "High");

workProject.addTodo(task1);

console.log("All Projects:", projectList);
console.log("Work Todos:", workProject.getTodos());