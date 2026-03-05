import { Project } from './project';

export const AppState = {
    projects: [new Project("Default")],

    addProject(name) {
        const newProj = new Project(name);
        this.projects.push(newProj)
    }
};