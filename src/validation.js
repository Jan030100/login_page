const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export function validateForm(formData) {
  const errors = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!formData.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  const trimmedEmail = formData.email.trim();
  if (!trimmedEmail) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}