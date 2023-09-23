//validation middleware

const validateRequest = (validationSchema) => async (req, res, next) => {
  try {
    const result = await validationSchema.validate(req.body);

    if (result) {
      req.body = result;
    }

    next();
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export default validateRequest;
