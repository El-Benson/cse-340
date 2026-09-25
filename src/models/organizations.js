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

const createOrganization = async (
  name,
  description,
  contactEmail
) => {
  const query = `
    INSERT INTO public.organization
      (name, description, contact_email, logo_filename)
    VALUES ($1, $2, $3, $4)
    RETURNING organization_id;
  `;

  const queryParams = [
    name,
    description,
    contactEmail,
    "",
  ];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to create organization");
  }

  return result.rows[0].organization_id;
};

const updateOrganization = async (
  organizationId,
  name,
  description,
  contactEmail
) => {
  const query = `
    UPDATE public.organization
    SET
      name = $1,
      description = $2,
      contact_email = $3
    WHERE organization_id = $4
    RETURNING organization_id;
  `;

  const queryParams = [
    name,
    description,
    contactEmail,
    organizationId,
  ];

  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error("Failed to update organization");
  }

  return result.rows[0].organization_id;
};

export {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganization,
  createOrganization,
  updateOrganization,
};
