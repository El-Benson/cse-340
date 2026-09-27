import bcrypt from "bcrypt";
import db from "./db.js";

const createUser = async (name, email, passwordHash) => {
  const query = `
    INSERT INTO public.users
      (name, email, password_hash, role_id)
    VALUES (
      $1,
      $2,
      $3,
      (SELECT role_id FROM roles WHERE role_name = 'user')
    )
    RETURNING user_id;
  `;

  const result = await db.query(query, [
    name,
    email,
    passwordHash,
  ]);

  if (result.rows.length === 0) {
    throw new Error("Failed to create user");
  }

  return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT
      u.user_id,
      u.name,
      u.email,
      u.password_hash,
      r.role_name
    FROM public.users u
    JOIN public.roles r
      ON u.role_id = r.role_id
    WHERE LOWER(u.email) = LOWER($1);
  `;

  const result = await db.query(query, [email]);

  return result.rows[0] || null;
};

const verifyPassword = async (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const passwordValid = await verifyPassword(
    password,
    user.password_hash
  );

  if (!passwordValid) {
    return null;
  }

  return {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    role_name: user.role_name,
  };
};

const getAllUsers = async () => {
  const query = `
    SELECT
      u.user_id,
      u.name,
      u.email,
      r.role_name
    FROM public.users u
    JOIN public.roles r
      ON u.role_id = r.role_id
    ORDER BY u.name ASC;
  `;

  const result = await db.query(query);

  return result.rows;
};

export {
  createUser,
  authenticateUser,
  getAllUsers,
};
