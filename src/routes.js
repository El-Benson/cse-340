import express from "express";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
} from "./controllers/organizations.js";

import {
  showProjectsPage,
  showProjectDetailsPage,
} from "./controllers/projects.js";

import {
  showCategoriesPage,
  showCategoryDetailsPage,
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

// PROJECTS
router.get("/projects", showProjectsPage);
router.get("/project/:id", showProjectDetailsPage);

// CATEGORIES
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);

// 404
router.use((req, res) => {
  res.status(404).render("error", {
    title: "Page Not Found",
    message: "The page you requested could not be found.",
  });
});

export default router;
