export class Todo {
    constructor(title, dueDate, priority = 'Low') {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
    }

    toggleStatus() {
        this.complete = !this.complete;
    }
}