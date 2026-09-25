import db from "./db.js";

const getAllCategories = async () => {
  const query = `
    SELECT
      category_id,
      name
    FROM public.category
    ORDER BY category_id;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getCategoryDetails = async (id) => {
  const query = `
    SELECT
      category_id,
      name
    FROM public.category
    WHERE category_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

const getProjectsByCategory = async (categoryId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id
    FROM public.project p
    INNER JOIN public.project_category pc
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date ASC, p.project_id ASC;
  `;

  const result = await db.query(query, [categoryId]);
  return result.rows;
};

const getCategoriesByProject = async (projectId) => {
  const query = `
    SELECT
      c.category_id,
      c.name
    FROM public.category c
    INNER JOIN public.project_category pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name ASC;
  `;

  const result = await db.query(query, [projectId]);
  return result.rows;
};

const createCategory = async (name) => {
  const query = `
    INSERT INTO public.category (name)
    VALUES ($1)
    RETURNING category_id;
  `;

  const result = await db.query(query, [name]);

  if (result.rows.length === 0) {
    throw new Error("Failed to create category");
  }

  return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE public.category
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id;
  `;

  const result = await db.query(query, [
    name,
    categoryId,
  ]);

  if (result.rows.length === 0) {
    throw new Error("Failed to update category");
  }

  return result.rows[0].category_id;
};

const assignCategoryToProject = async (
  categoryId,
  projectId
) => {
  const query = `
    INSERT INTO public.project_category
      (project_id, category_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING;
  `;

  await db.query(query, [
    projectId,
    categoryId,
  ]);
};

const updateCategoryAssignments = async (
  projectId,
  categoryIds
) => {
  const deleteQuery = `
    DELETE FROM public.project_category
    WHERE project_id = $1;
  `;

  await db.query(deleteQuery, [projectId]);

  for (const categoryId of categoryIds) {
    await assignCategoryToProject(
      categoryId,
      projectId
    );
  }
};

export {
  getAllCategories,
  getCategoryDetails,
  getProjectsByCategory,
  getCategoriesByProject,
  createCategory,
  updateCategory,
  updateCategoryAssignments,
};
