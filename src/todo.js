export class Todo {
    constructor(title, description = "", dueDate = "No Date", priority = "Medium", notes = "") {
        this.id = Date.now() + Math.floor(Math.random() * 1000);
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = [];
        this.isComplete = false;
    }

    toggleComplete() {
        this.complete = !this.complete;
    }

    addSubTask(taskName) {
        this.checklist.push({ name: taskName, done: false });
    }
}