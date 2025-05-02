import { statusCodes } from "../config/constants.js";

export const success = (
  data,
  message = "Success",
  statusCode = statusCodes.SUCCESS
) => {
  return (res) =>
    res
      .response({
        statusCode,
        message,
        data,
      })
      .code(statusCode);
};

export const error = (
  data,
  message = "Error",
  statusCode = statusCodes.SERVER_ISSUE
) => {
  return (res) =>
    res
      .response({
        statusCode,
        message,
        data,
      })
      .code(statusCode);
};
