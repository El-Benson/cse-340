const flash = (req, res, next) => {
  res.locals.flash = () => {
    const messages = {
      success: req.session.success || [],
      error: req.session.error || [],
      warning: req.session.warning || [],
      info: req.session.info || [],
    };

    req.session.success = [];
    req.session.error = [];
    req.session.warning = [];
    req.session.info = [];

    return messages;
  };

  req.flash = (type, message) => {
    if (!req.session[type]) {
      req.session[type] = [];
    }

    req.session[type].push(message);
  };

  next();
};

export default flash;
