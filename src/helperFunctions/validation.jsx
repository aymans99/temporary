const validateUsername = (username) => {
  return username.trim().length > 0; // Ensures username is not empty
};

const validateOtp = (otp) => {
  const otpRegex = /^\d{4}$/; // Example: Ensures OTP is a 4-digit number
  return otpRegex.test(otp);
};

export const validateLoginForm = (formData) => {
  const { username, otp } = formData;
  const errors = {};

  // Validate username
  if (!validateUsername(username)) {
    errors.username = "Username is required";
  }

  // Validate OTP
  if (!validateOtp(otp)) {
    errors.otp = "OTP must be a 4-digit number";
  }

  return errors;
};
