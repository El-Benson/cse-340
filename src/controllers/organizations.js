import {
  getAllOrganizations,
  getOrganizationDetails,
  getProjectsByOrganization,
} from "../models/organizations.js";

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

    const organization = await getOrganizationDetails(organizationId);

    if (!organization) {
      return res.status(404).render("error", {
        title: "Page Not Found",
        message: "The organization you requested could not be found.",
      });
    }

    const projects = await getProjectsByOrganization(organizationId);

    res.render("organization", {
      title: organization.name,
      organization,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export { showOrganizationsPage, showOrganizationDetailsPage };
