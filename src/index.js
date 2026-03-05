import { AppState } from "./logic/manager";
import { UI } from "./ui/domLoader";
import { Todo } from "./logic/todo";

const myProject = AppState.projects[0];
const task1 = new Todo("Clean the kitchen", "Do it now", "Today", "High");
const task2 = new Todo("Buy cat food", "The cat is hungry", "Tomorrow", "Medium");

myProject.addTodo(task1);
myProject.addTodo(task2);

UI.render(AppState.projects);

setTimeout(() => {
    console.log("Adding a third task automatically...");
    const task3 = new Todo("Modular code is cool", "Testing Webpack", "Later", "Low");
    myProject.addTodo(task3);
    UI.render(AppState.projects);
}, 3000);