import CustomErrorHandler from "../services/CustomErrorHandler";
import { ValidationError } from "joi";
import { DEBUG_MODE } from "../configs";

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: "Internal Server Error!",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      massage: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }
  return res.status(statusCode).json(data);
};

export default errorHandler;
