import { Project } from './project';
import { Todo } from './todo';

export const AppState = {
    projects: [],
    activeProjectIndex: 0,

    toggleTodoStatus(pIndex, todoId) {
        const project = this.projects[pIndex];
        const todo = project.todos.find(t => t.id === todoId);
        if (todo) {
            todo.toggleComplete();
            this.saveData();
        }
    },

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.saveData();
    },

    saveData() {
        localStorage.setItem('todoListData', JSON.stringify(this.projects));
    },

    loadData() {
        const rawData = localStorage.getItem('todoListData');
        if (!rawData) {
            this.projects = [new Project("General")];
            return;
        }

        const parsedData = JSON.parse(rawData);

        // HYDRATION: Turn dumb objects back into Class instances
        this.projects = parsedData.map(projData => {
            const project = new Project(projData.name);
            project.todos = projData.todos.map(t => {
                const todo = new Todo(t.title, t.description, t.dueDate, t.priority);
                todo.id = t.id;
                todo.isComplete = t.isComplete;
                return todo;
            });
            return project;
        });
    },

    addTodoToProject(pIndex, todo) {
        this.projects[pIndex].addTodo(todo);
        this.saveData();
    },

    deleteTodoFromProject(pIndex, todoId) {
        this.projects[pIndex].removeTodo(todoId);
        this.saveData();
    }
};