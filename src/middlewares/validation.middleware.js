module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        error: error.details.map(detail => detail.message).join(", "),
        success: false
      });
    }
    next();
  };
};
