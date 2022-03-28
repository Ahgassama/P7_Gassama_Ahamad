//Non utilisé
module.exports = (req, res, next) => {
  const trueEmail = (email) => {
    let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let regexTrue = emailRegex.test(email);
    regexTrue
      ? next()
      : res.status(400).json({ message: "adresse mail non valide" });
  };
  trueEmail(req.body.email);
};
