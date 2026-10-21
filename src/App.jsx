import { useState } from "react";
import { validateForm } from "./validation";
import "./App.css";

const INITIAL_FORM_DATA = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_ERRORS = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "password" && errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (message) => message !== ""
    );

    if (hasErrors) {
      return;
    }

    console.log("Submitted:", formData);
  }

  return (
    <main className="page">
      <section className="card" aria-labelledby="form-title">
        <header className="card__header">
          <h1 id="form-title">Create your account</h1>
          <p>Fill in the fields below to register.</p>
        </header>

        <form className="form" noValidate onSubmit={handleSubmit}>
          <div
            className={`form__field${errors.fullName ? " form__field--error" : ""}`}
          >
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="form__error" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>

          <div
            className={`form__field${errors.email ? " form__field--error" : ""}`}
          >
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="form__error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div
            className={`form__field${errors.password ? " form__field--error" : ""}`}
          >
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p id="password-error" className="form__error" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <div
            className={`form__field${errors.confirmPassword ? " form__field--error" : ""}`}
          >
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword ? "confirmPassword-error" : undefined
              }
            />
            {errors.confirmPassword && (
              <p
                id="confirmPassword-error"
                className="form__error"
                role="alert"
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button type="submit" className="form__submit">
            Create account
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;