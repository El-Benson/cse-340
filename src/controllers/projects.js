import {
  getUpcomingProjects,
  getProjectDetails,
  getCategoriesByProject,
} from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res, next) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

    res.render("projects", {
      title: "Upcoming Service Projects",
      projects,
    });
  } catch (error) {
    next(error);
  }
};

const showProjectDetailsPage = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    if (!project) {
      return res.status(404).render("error", {
        title: "Page Not Found",
        message: "The project you requested could not be found.",
      });
    }

    const categories = await getCategoriesByProject(projectId);

    res.render("project", {
      title: project.title,
      project,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export { showProjectsPage, showProjectDetailsPage };
