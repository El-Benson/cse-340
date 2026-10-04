import {
  addVolunteer,
  removeVolunteer,
} from "../models/volunteers.js";

const processAddVolunteer = async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.session.user.user_id;

  try {
    await addVolunteer(userId, projectId);

    req.flash(
      "success",
      "You are now volunteering for this service project!"
    );

    res.redirect(`/project/${projectId}`);
  } catch (error) {
    next(error);
  }
};

const processRemoveVolunteer = async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.session.user.user_id;

  try {
    await removeVolunteer(userId, projectId);

    req.flash(
      "success",
      "You are no longer volunteering for this service project."
    );

    res.redirect(`/project/${projectId}`);
  } catch (error) {
    next(error);
  }
};

export {
  processAddVolunteer,
  processRemoveVolunteer,
};
