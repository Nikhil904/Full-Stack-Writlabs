export const sendResponse = (res,status, message, success, data) => {
  return res.status(status).json({
    status,
    success,
    message,
    data,
  });
};
