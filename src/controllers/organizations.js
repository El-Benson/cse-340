import { body, validationResult } from "express-validator";

import {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganization,
  createOrganization,
  updateOrganization,
} from "../models/organizations.js";

// Validation rules for creating and editing an organization
const organizationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required.")
    .isLength({ min: 3, max: 150 })
    .withMessage(
      "Organization name must be between 3 and 150 characters."
    ),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Organization description is required.")
    .isLength({ max: 1000 })
    .withMessage(
      "Organization description cannot exceed 1000 characters."
    ),

  body("contactEmail")
    .trim()
    .notEmpty()
    .withMessage("Contact email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .isLength({ max: 255 })
    .withMessage(
      "Contact email cannot exceed 255 characters."
    ),
];

const showOrganizationsPage = async (req, res, next) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Our Partner Organizations",
      organizations,
    });
  } catch (error) {
    next(error);
  }
};

const showOrganizationDetailsPage = async (req, res, next) => {
  try {
    const organizationId = req.params.id;

    const organization =
      await getOrganizationDetails(organizationId);

    if (!organization) {
      return res.status(404).render("error", {
        title: "Page Not Found",
        message:
          "The organization you requested could not be found.",
      });
    }

    const projects =
      await getProjectsByOrganization(organizationId);

    res.render("organization", {
      title: organization.name,
      organization,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// Show create organization form
const showNewOrganizationForm = (req, res) => {
  res.render("new-organization", {
    title: "Create New Organization",
  });
};

// Process create organization form
const processNewOrganizationForm = async (req, res, next) => {
  const {
    name,
    description,
    contactEmail,
  } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect("/new-organization");
  }

  try {
    const newOrganizationId =
      await createOrganization(
        name,
        description,
        contactEmail
      );

    req.flash(
      "success",
      "Organization added successfully!"
    );

    res.redirect(
      `/organization/${newOrganizationId}`
    );
  } catch (error) {
    next(error);
  }
};

// Show edit organization form
const showEditOrganizationForm = async (
  req,
  res,
  next
) => {
  try {
    const organizationId = req.params.id;

    const organization =
      await getOrganizationDetails(organizationId);

    if (!organization) {
      return res.status(404).render("error", {
        title: "Page Not Found",
        message:
          "The organization you requested could not be found.",
      });
    }

    res.render("edit-organization", {
      title: `Edit ${organization.name}`,
      organization,
    });
  } catch (error) {
    next(error);
  }
};

// Process edit organization form
const processEditOrganizationForm = async (
  req,
  res,
  next
) => {
  const organizationId = req.params.id;

  const {
    name,
    description,
    contactEmail,
  } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    return res.redirect(
      `/edit-organization/${organizationId}`
    );
  }

  try {
    await updateOrganization(
      organizationId,
      name,
      description,
      contactEmail
    );

    req.flash(
      "success",
      "Organization updated successfully!"
    );

    res.redirect(
      `/organization/${organizationId}`
    );
  } catch (error) {
    next(error);
  }
};

export {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  showEditOrganizationForm,
  processEditOrganizationForm,
  organizationValidation,
};