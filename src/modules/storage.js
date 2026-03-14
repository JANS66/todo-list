import { Project } from '../models/project';
import { Todo } from '../models/todo';

export const saveToLocalStorage = (projects) => {
  localStorage.setItem('todoAppData', JSON.stringify(projects));
};

export const loadFromLocalStorage = () => {
  const data = localStorage.getItem('todoAppData');
  if (!data || data === 'undefined') {
    return null;
  }

  const parsedProjects = JSON.parse(data);

  // REHYDRATION: Convert plain objects back into Class instances
  return parsedProjects.map((projectData) => {
    const project = new Project(projectData.name);
    project.id = projectData.id;

    project.todos = projectData.todos.map((todoData) => {
      const todo = new Todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority
      );
      todo.id = todoData.id;
      todo.complete = todoData.complete;
      return todo;
    });

    return project;
  });
};
