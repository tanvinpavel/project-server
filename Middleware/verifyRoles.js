require("dotenv").config();

const verifyRoles = (...allowRoles) => {
  return (req, res, next) => {
    const requestedUserRole = req.headers.role || req.headers.role;
    if (!requestedUserRole)
      return res.status(401).json({
        error: "Access Denied",
      });

    const rolesHasAccess = [...allowRoles];

    const hasAccess = rolesHasAccess.findIndex((role) => role === parseInt(requestedUserRole)) > -1 ? true : false;

    if (!hasAccess)
      return res.status(401).json({
        error: "Access Denied",
      });

    if (req.userEmail !== process.env.ADMIN_USER_ID)
      return res.status(401).json({
        error: "Access Denied",
      });

    next();
  };
};

module.exports = verifyRoles;
