//ex2

function checkRole(role) {
  console.log("checkRole");
  return (req, res, next) => {
    const user = res.user;
    const roleOfUser = user.role;
    if (roleOfUser !== role) {
      res.send({ success: 0, message: "role not true" });
    }
    next();
  };
}

module.exports = checkRole;
