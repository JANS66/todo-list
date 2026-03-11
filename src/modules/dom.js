export const renderProjects = projects => {
    const projectsList = document.querySelector('#projects-list');
    projectsList.innerHTML = '';

    projects.forEach(project => {
        const li = document.createElement('li');
        const button = document.createElement('button');

        button.textContent = project.name;
        button.classList.add('project-button');

        button.dataset.id = project.id;

        li.appendChild(button);
        projectsList.appendChild(li);
    })
}

export const renderTodos = project => {
    const projectName = document.querySelector('#project-name');

    projectName.textContent = project.name;

    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    project.todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <span class="todo-title"></span>
                <span class="todo-description"></span>
                <span class="todo-dueDate"></span>
                <span class="todo-priority"></span>
            </div>
        `;

        li.querySelector(".todo-title").textContent = todo.title;
        li.querySelector(".todo-description").textContent = todo.description;
        li.querySelector(".todo-dueDate").textContent = todo.dueDate;
        li.querySelector(".todo-priority").textContent = todo.priority;

        todoList.appendChild(li);
    });
}