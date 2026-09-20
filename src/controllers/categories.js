import {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategory,
} from "../models/categories.js";

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

export { showCategoriesPage, showCategoryDetailsPage };
