import bcrypt from "bcrypt";
import { getVolunteeredProjects } from "../models/volunteers.js";
import {
  createUser,
  authenticateUser,
  getAllUsers,
} from "../models/users.js";

const showUserRegistrationForm = async (req, res) => {
  res.render("register", {
    title: "Register",
  });
};

const processUserRegistrationForm = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    await createUser(
      name.trim(),
      email.trim().toLowerCase(),
      passwordHash
    );

    req.flash(
      "success",
      "Registration successful. You can now log in."
    );

    res.redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);

    if (error.code === "23505") {
      req.flash(
        "error",
        "An account with that email already exists."
      );
      return res.redirect("/register");
    }

    req.flash(
      "error",
      "Registration failed. Please try again."
    );

    res.redirect("/register");
  }
};

const showLoginForm = async (req, res) => {
  res.render("login", {
    title: "Login",
  });
};

const processLoginForm = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(
      email.trim().toLowerCase(),
      password
    );

    if (!user) {
      req.flash(
        "error",
        "Invalid email or password."
      );
      return res.redirect("/login");
    }

    req.session.user = user;

    req.flash(
      "success",
      `Welcome, ${user.name}!`
    );

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);

    req.flash(
      "error",
      "Unable to log in. Please try again."
    );

    res.redirect("/login");
  }
};

const processLogout = async (req, res) => {
  req.session.user = null;

  req.flash(
    "success",
    "You have been logged out."
  );

  res.redirect("/login");
};

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    req.flash(
      "error",
      "Please log in to access that page."
    );

    return res.redirect("/login");
  }

  next();
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.session.user) {
      req.flash(
        "error",
        "Please log in to access that page."
      );

      return res.redirect("/login");
    }

    if (req.session.user.role_name !== role) {
      req.flash(
        "error",
        "You do not have permission to access that page."
      );

      return res.redirect("/");
    }

    next();
  };
};

const showDashboard = async (req, res, next) => {
  try {
    const volunteeredProjects = await getVolunteeredProjects(
      req.session.user.user_id
    );

    res.render("dashboard", {
      title: "Dashboard",
      user: req.session.user,
      volunteeredProjects,
    });
  } catch (error) {
    next(error);
  }
};

const showUsersPage = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.render("users", {
      title: "Users",
      users,
    });
  } catch (error) {
    console.error("Users page error:", error);

    req.flash(
      "error",
      "Unable to load users."
    );

    res.redirect("/dashboard");
  }
};

export {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  requireRole,
  showDashboard,
  showUsersPage,
};

