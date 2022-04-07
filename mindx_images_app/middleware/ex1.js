const middlewareEx1 = (req, res, next) => {
  const { byPast } = req.query;
  console.log(byPast);
  if (Number(byPast) === 1) {
    next();
  } else {
    res.send({ success: 0, message: "Invalid params" });
  }
};

module.exports = middlewareEx1;
