import { Project } from './project';

export const projectList = [];

const defaultProject = new Project("General");
projectList.push(defaultProject);

export const createProject = (name) => {
    const newProject = new Project(name);
    projectList.push(newProject);
    return newProject;
};