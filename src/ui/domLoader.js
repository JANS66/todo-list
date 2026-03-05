import './styles.css';

export const UI = {
    render(projects) {
        const root = document.querySelector('#content');
        root.innerHTML = '';

        projects.forEach((project) => {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-container';

            const projectHeader = document.createElement('h2');
            projectHeader.textContent = `Project: ${project.name}`;
            projectDiv.appendChild(projectHeader);

            const todoList = document.createElement('ul');

            project.todos.forEach((todo) => {
                const todoItem = document.createElement('li');
                todoItem.className = `todo-item ${todo.priority.toLowerCase()}`

                todoItem.innerHTML = `
                    <strong>${todo.title}</strong> - ${todo.dueDate}
                    <p>${todo.description}</p>
                    <span>Priority: ${todo.priority}</span>
                `;

                todoList.appendChild(todoItem);
            });

            projectDiv.appendChild(todoList);
            root.appendChild(projectDiv);
        });
    }
}