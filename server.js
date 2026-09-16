import "dotenv/config";
import express from "express";

import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllProjects } from "./src/models/projects.js";
import { getAllCategories } from "./src/models/categories.js";
import { testConnection } from "./src/models/db.js";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));

// ============================================
// HOME
// ============================================

app.get("/", async (req, res) => {
  const title = "Home";

  res.render("index", {
    title,
  });
});

// ============================================
// ORGANIZATIONS
// ============================================

app.get("/organizations", async (req, res) => {
  try {
    const organizations = await getAllOrganizations();
    const title = "Our Partner Organizations";

    res.render("organizations", {
      title,
      organizations,
    });
  } catch (error) {
    console.error("Error retrieving organizations:", error);

    res.status(500).render("index", {
      title: "Server Error",
      error: "Unable to retrieve organizations.",
    });
  }
});

// ============================================
// PROJECTS
// ============================================

app.get("/projects", async (req, res) => {
  try {
    const projects = await getAllProjects();
    const title = "Service Projects";

    res.render("projects", {
      title,
      projects,
    });
  } catch (error) {
    console.error("Error retrieving projects:", error);

    res.status(500).render("index", {
      title: "Server Error",
      error: "Unable to retrieve projects.",
    });
  }
});

// ============================================
// CATEGORIES
// ============================================

app.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    const title = "Categories";

    res.render("categories", {
      title,
      categories,
    });
  } catch (error) {
    console.error("Error retrieving categories:", error);

    res.status(500).render("index", {
      title: "Server Error",
      error: "Unable to retrieve categories.",
    });
  }
});

// ============================================
// 404 PAGE
// ============================================

app.use(async (req, res) => {
  const title = "Page Not Found";

  res.status(404).render("index", {
    title,
    notFound: true,
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(port, async () => {
  try {
    await testConnection();

    console.log(`Server running on port ${port}`);
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    console.log(`Server running on port ${port}`);
  }
});

console.log("CSE 340 server file has started.");
