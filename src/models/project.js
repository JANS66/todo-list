export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
        this.id = crypto.randomUUID();
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
}
