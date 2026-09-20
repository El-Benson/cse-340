import db from "./db.js";

const getAllOrganizations = async () => {
  const query = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM public.organization
    ORDER BY organization_id;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getOrganizationDetails = async (id) => {
  const query = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM public.organization
    WHERE organization_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

const getProjectsByOrganization = async (id) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      date,
      location
    FROM public.project
    WHERE organization_id = $1
    ORDER BY date ASC, project_id ASC;
  `;

  const result = await db.query(query, [id]);
  return result.rows;
};

export {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganization,
};
