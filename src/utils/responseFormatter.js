const success = (
  res,
  data = null,
  message = null,
  code = 200,
  pagination = null
) => {
  const response = {
    meta: {
      code: code,
      status: "success",
      message: message,
    },
    data: data,
    pagination: pagination || null,
    errors: null,
  };

  return res.status(code).json(response);
};

const error = (res, errors = null, message = null, code = 400) => {
  const response = {
    meta: {
      code: code,
      status: "error",
      message: message,
    },
    data: null,
    pagination: null,
    errors: errors,
  };

  return res.status(code).json(response);
};

const validationError = (res, errors) => {
  const response = {
    meta: {
      code: 422,
      status: "error",
      message: "Validation error",
    },
    data: null,
    pagination: null,
    errors: errors,
  };

  return res.status(422).json(response);
};

module.exports = { success, error, validationError };
