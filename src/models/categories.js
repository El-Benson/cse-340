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

export { getAllCategories, getCategoryDetails, getProjectsByCategory };
