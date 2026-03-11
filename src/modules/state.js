import { Project } from '../models/project';

const projects = [];
let currentProject = null;

export const initApp = () => {
    const defaultProject = new Project("General");
    projects.push(defaultProject);
    currentProject = defaultProject;
};

export const getCurrentProject = () => currentProject;
export const addProject = project => projects.push(project);
export const getProjects = () => projects;
export const switchProject = index => currentProject = projects[index];