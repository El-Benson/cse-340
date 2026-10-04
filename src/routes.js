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

import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  requireRole,
  showDashboard,
  showUsersPage,
} from "./controllers/users.js";

import {
  processAddVolunteer,
  processRemoveVolunteer,
} from "./controllers/volunteers.js";

const router = express.Router();

// HOME
router.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

// AUTHENTICATION
router.get("/register", showUserRegistrationForm);
router.post("/register", processUserRegistrationForm);

router.get("/login", showLoginForm);
router.post("/login", processLoginForm);

router.get("/logout", processLogout);

// DASHBOARD
router.get("/dashboard", requireLogin, showDashboard);

// USERS - ADMIN ONLY
router.get(
  "/users",
  requireRole("admin"),
  showUsersPage
);

// ORGANIZATIONS
router.get("/organizations", showOrganizationsPage);
router.get("/organization/:id", showOrganizationDetailsPage);

// CREATE ORGANIZATION - ADMIN ONLY
router.get(
  "/new-organization",
  requireRole("admin"),
  showNewOrganizationForm
);

router.post(
  "/new-organization",
  requireRole("admin"),
  organizationValidation,
  processNewOrganizationForm
);

// EDIT ORGANIZATION - ADMIN ONLY
router.get(
  "/edit-organization/:id",
  requireRole("admin"),
  showEditOrganizationForm
);

router.post(
  "/edit-organization/:id",
  requireRole("admin"),
  organizationValidation,
  processEditOrganizationForm
);


// VOLUNTEERING - LOGGED-IN USERS
router.post(
  "/volunteer/:projectId",
  requireLogin,
  processAddVolunteer
);

router.post(
  "/remove-volunteer/:projectId",
  requireLogin,
  processRemoveVolunteer
);

// PROJECTS
router.get("/projects", showProjectsPage);
router.get("/project/:id", showProjectDetailsPage);

// CREATE PROJECT - ADMIN ONLY
router.get(
  "/new-project",
  requireRole("admin"),
  showNewProjectForm
);

router.post(
  "/new-project",
  requireRole("admin"),
  projectValidation,
  processNewProjectForm
);

// EDIT PROJECT - ADMIN ONLY
router.get(
  "/edit-project/:id",
  requireRole("admin"),
  showEditProjectForm
);

router.post(
  "/edit-project/:id",
  requireRole("admin"),
  projectValidation,
  processEditProjectForm
);

// CATEGORY ASSIGNMENTS - ADMIN ONLY
router.get(
  "/assign-categories/:projectId",
  requireRole("admin"),
  showAssignCategoriesForm
);

router.post(
  "/assign-categories/:projectId",
  requireRole("admin"),
  processAssignCategoriesForm
);

// CATEGORIES
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);

// CREATE CATEGORY - ADMIN ONLY
router.get(
  "/new-category",
  requireRole("admin"),
  showNewCategoryForm
);

router.post(
  "/new-category",
  requireRole("admin"),
  categoryValidation,
  processNewCategoryForm
);

// EDIT CATEGORY - ADMIN ONLY
router.get(
  "/edit-category/:id",
  requireRole("admin"),
  showEditCategoryForm
);

router.post(
  "/edit-category/:id",
  requireRole("admin"),
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




