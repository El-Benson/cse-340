import "dotenv/config";
import bcrypt from "bcrypt";
import db from "./src/models/db.js";

try {
  await db.query(`
    CREATE TABLE IF NOT EXISTS roles (
      role_id SERIAL PRIMARY KEY,
      role_name VARCHAR(50) UNIQUE NOT NULL,
      role_description TEXT
    );

    INSERT INTO roles (role_name, role_description)
    VALUES
      ('user', 'Standard user with basic access'),
      ('admin', 'Administrator with full system access')
    ON CONFLICT (role_name) DO NOTHING;

    CREATE TABLE IF NOT EXISTS users (
      user_id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role_id INTEGER REFERENCES roles(role_id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const passwordHash = await bcrypt.hash("cse340!", 10);

  await db.query(
    `
      INSERT INTO users
        (name, email, password_hash, role_id)
      VALUES
        (
          'Admin User',
          'admin@example.com',
          $1,
          (SELECT role_id FROM roles WHERE role_name = 'admin')
        )
      ON CONFLICT (email)
      DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        role_id = EXCLUDED.role_id;
    `,
    [passwordHash]
  );

  console.log("Authentication tables are ready.");
  console.log("Grading admin account is ready.");
} catch (error) {
  console.error("Authentication database setup failed:", error);
  process.exit(1);
} finally {
  await db.end();
}