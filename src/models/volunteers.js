import db from "./db.js";

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO volunteer
      (user_id, project_id)
    VALUES
      ($1, $2)
    ON CONFLICT (user_id, project_id)
    DO NOTHING
    RETURNING volunteer_id;
  `;

  const result = await db.query(query, [userId, projectId]);

  return result.rows[0] || null;
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM volunteer
    WHERE user_id = $1
      AND project_id = $2;
  `;

  const result = await db.query(query, [userId, projectId]);

  return result.rowCount;
};

const isVolunteer = async (userId, projectId) => {
  const query = `
    SELECT volunteer_id
    FROM volunteer
    WHERE user_id = $1
      AND project_id = $2;
  `;

  const result = await db.query(query, [userId, projectId]);

  return result.rows.length > 0;
};

const getVolunteeredProjects = async (userId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      o.name AS organization_name
    FROM volunteer v
    INNER JOIN project p
      ON v.project_id = p.project_id
    INNER JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE v.user_id = $1
    ORDER BY p.date ASC, p.project_id ASC;
  `;

  const result = await db.query(query, [userId]);

  return result.rows;
};

export {
  addVolunteer,
  removeVolunteer,
  isVolunteer,
  getVolunteeredProjects,
};
