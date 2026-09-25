import { body, validationResult } from "express-validator";

import {
  getUpcomingProjects,
  getProjectDetails,
  getCategoriesByProject,
  createProject,
  updateProject,
} from "../models/projects.js";

import { getAllOrganizations } from "../models/organizations.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Validation rules for creating and editing a project
const projectValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required.")
    .isLength({ min: 3, max: 200 })
    .withMessage("Project title must be between 3 and 200 characters."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Project description is required.")
    .isLength({ max: 1000 })
    .withMessage("Project description cannot exceed 1000 characters."),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Project location is required.")
    .isLength({ max: 200 })
    .withMessage("Project location cannot exceed 200 characters."),

  body("date")
    .notEmpty()
    .withMessage("Project date is required.")
    .isISO8601()
    .withMessage("Please enter a valid date."),

  body("organizationId")
    .notEmpty()
    .withMessage("Please select an organization.")
    .isInt()
    .withMessage("Please select a valid organization."),
];

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

// Show the create project form
const showNewProjectForm = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("new-project", {
      title: "Create New Service Project",
      organizations,
    });
  } catch (error) {
    next(error);
  }
};

// Process the create project form
const processNewProjectForm = async (req, res, next) => {
  const { title, description, location, date, organizationId } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect("/new-project");
  }

  try {
    const newProjectId = await createProject(
      title,
      description,
      location,
      date,
      organizationId
    );

    req.flash("success", "Service project added successfully!");

    res.redirect(`/project/${newProjectId}`);
  } catch (error) {
    next(error);
  }
};

// Show the edit project form
const showEditProjectForm = async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    if (!project) {
      return res.status(404).render("error", {
        title: "Page Not Found",
        message: "The project you requested could not be found.",
      });
    }

    const organizations = await getAllOrganizations();

    res.render("edit-project", {
      title: `Edit ${project.title}`,
      project,
      organizations,
    });
  } catch (error) {
    next(error);
  }
};

// Process the edit project form
const processEditProjectForm = async (req, res, next) => {
  const projectId = req.params.id;
  const { title, description, location, date, organizationId } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect(`/edit-project/${projectId}`);
  }

  try {
    await updateProject(
      projectId,
      title,
      description,
      location,
      date,
      organizationId
    );

    req.flash("success", "Service project updated successfully!");

    res.redirect(`/project/${projectId}`);
  } catch (error) {
    next(error);
  }
};

export {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
  projectValidation,
};
