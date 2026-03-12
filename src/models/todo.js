export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.id = crypto.randomUUID();
    }

    toggleComplete() {
        this.complete = !this.complete;
    }
}