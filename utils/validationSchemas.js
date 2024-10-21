export const getUserValidationSchema = {
  filter: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Should be between 5-32 characters",
    },
    notEmpty: { errorMessage: "Should not be empty" },
    isString: { errorMessage: "Should be a string" },
  },
};

export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Should be between 5-32 characters",
    },
    notEmpty: { errorMessage: "Should not be empty" },
    isString: { errorMessage: "Should be a string" },
  },
  displayName: {
    notEmpty: { errorMessage: "Should not be empty" },
  },
  password: {
    notEmpty: { errorMessage: "Should not be empty" },
  },
};
