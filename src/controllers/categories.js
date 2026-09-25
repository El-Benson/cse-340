import { body, validationResult } from "express-validator";

import {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategory,
  getCategoriesByProject,
  createCategory,
  updateCategory,
  updateCategoryAssignments,
} from "../models/categories.js";

import { getProjectDetails } from "../models/projects.js";

// Validation rules for creating and editing a category
const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Category name must be between 3 and 100 characters."
    ),
];

const showCategoriesPage = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);

    if (!category) {
      return res.status(404).render("error", {
        title: "Page Not Found",
        message: "The category you requested could not be found.",
      });
    }

    const projects = await getProjectsByCategory(categoryId);

    res.render("category", {
      title: category.name,
      category,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// Show create category form
const showNewCategoryForm = (req, res) => {
  res.render("new-category", {
    title: "Create New Category",
  });
};

// Process create category form
const processNewCategoryForm = async (req, res, next) => {
  const { name } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect("/new-category");
  }

  try {
    const newCategoryId = await createCategory(name);

    req.flash(
      "success",
      "Category added successfully!"
    );

    res.redirect(`/category/${newCategoryId}`);
  } catch (error) {
    next(error);
  }
};

// Show edit category form
const showEditCategoryForm = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);

    if (!category) {
      return res.status(404).render("error", {
        title: "Page Not Found",
        message: "The category you requested could not be found.",
      });
    }

    res.render("edit-category", {
      title: `Edit ${category.name}`,
      category,
    });
  } catch (error) {
    next(error);
  }
};

// Process edit category form
const processEditCategoryForm = async (req, res, next) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect(`/edit-category/${categoryId}`);
  }

  try {
    await updateCategory(categoryId, name);

    req.flash(
      "success",
      "Category updated successfully!"
    );

    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    next(error);
  }
};

// Show category assignment form for a project
const showAssignCategoriesForm = async (
  req,
  res,
  next
) => {
  try {
    const projectId = req.params.projectId;

    const projectDetails =
      await getProjectDetails(projectId);

    if (!projectDetails) {
      return res.status(404).render("error", {
        title: "Page Not Found",
        message: "The project you requested could not be found.",
      });
    }

    const categories = await getAllCategories();

    const assignedCategories =
      await getCategoriesByProject(projectId);

    res.render("assign-categories", {
      title: `Edit Categories - ${projectDetails.title}`,
      projectId,
      projectDetails,
      categories,
      assignedCategories,
    });
  } catch (error) {
    next(error);
  }
};

// Process category assignments
const processAssignCategoriesForm = async (
  req,
  res,
  next
) => {
  const projectId = req.params.projectId;

  let categoryIds = req.body.categoryIds || [];

  if (!Array.isArray(categoryIds)) {
    categoryIds = [categoryIds];
  }

  try {
    await updateCategoryAssignments(
      projectId,
      categoryIds
    );

    req.flash(
      "success",
      "Project categories updated successfully!"
    );

    res.redirect(`/project/${projectId}`);
  } catch (error) {
    next(error);
  }
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  categoryValidation,
};
