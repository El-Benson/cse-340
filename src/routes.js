import express from "express";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
  organizationValidation,
} from "./controllers/organizations.js";

import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  showEditProjectForm,
  processEditProjectForm,
  projectValidation,
} from "./controllers/projects.js";

import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  categoryValidation,
} from "./controllers/categories.js";

const router = express.Router();

// HOME
router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

// ORGANIZATIONS
router.get("/organizations", showOrganizationsPage);
router.get("/organization/:id", showOrganizationDetailsPage);

// CREATE ORGANIZATION
router.get("/new-organization", showNewOrganizationForm);

router.post(
  "/new-organization",
  organizationValidation,
  processNewOrganizationForm
);

// EDIT ORGANIZATION
router.get(
  "/edit-organization/:id",
  showEditOrganizationForm
);

router.post(
  "/edit-organization/:id",
  organizationValidation,
  processEditOrganizationForm
);

// PROJECTS
router.get("/projects", showProjectsPage);
router.get("/project/:id", showProjectDetailsPage);

// CREATE PROJECT
router.get("/new-project", showNewProjectForm);

router.post(
  "/new-project",
  projectValidation,
  processNewProjectForm
);

// EDIT PROJECT
router.get(
  "/edit-project/:id",
  showEditProjectForm
);

router.post(
  "/edit-project/:id",
  projectValidation,
  processEditProjectForm
);

// CATEGORY ASSIGNMENTS
router.get(
  "/assign-categories/:projectId",
  showAssignCategoriesForm
);

router.post(
  "/assign-categories/:projectId",
  processAssignCategoriesForm
);

// CATEGORIES
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);

// CREATE CATEGORY
router.get("/new-category", showNewCategoryForm);

router.post(
  "/new-category",
  categoryValidation,
  processNewCategoryForm
);

// EDIT CATEGORY
router.get(
  "/edit-category/:id",
  showEditCategoryForm
);

router.post(
  "/edit-category/:id",
  categoryValidation,
  processEditCategoryForm
);

// 404
router.use((req, res) => {
  res.status(404).render("error", {
    title: "Page Not Found",
    message: "The page you requested could not be found.",
  });
});

export default router;
