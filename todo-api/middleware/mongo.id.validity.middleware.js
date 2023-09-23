import mongoose from "mongoose";
import MSG from "../constants/validation.message.js";

export const checkMongoIdValidity = (req, res, next) => {
  const id = req.params.id;

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return res.status(400).send({ message: MSG.INVALID_MONGO_ID });
  }

  next();
};
