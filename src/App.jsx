import { useEffect, useRef, useState } from "react";
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

const FIELD_ORDER = ["fullName", "email", "password", "confirmPassword"];

function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusTarget, setFocusTarget] = useState(null);

  const fullNameRef = useRef(null);
  const successHeadingRef = useRef(null);

  useEffect(() => {
    if (focusTarget === "success") {
      successHeadingRef.current?.focus();
    } else if (focusTarget === "form") {
      fullNameRef.current?.focus();
    }
  }, [focusTarget]);

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

    const firstInvalidField = FIELD_ORDER.find(
      (field) => validationErrors[field] !== ""
    );

    if (firstInvalidField) {
      document.getElementById(firstInvalidField)?.focus();
      return;
    }

    setFormData(INITIAL_FORM_DATA);
    setErrors(INITIAL_ERRORS);
    setIsSubmitted(true);
    setFocusTarget("success");
  }

  function handleReset() {
    setIsSubmitted(false);
    setFocusTarget("form");
  }

  return (
    <main className="page">
      <section className="card" aria-labelledby="form-title">
        {isSubmitted ? (
          <div role="status">
            <header className="card__header card__header--success">
              <h1 id="form-title" ref={successHeadingRef} tabIndex={-1}>
                Account created successfully
              </h1>
              <p>
                This is a front-end demonstration — no data was sent to any
                server.
              </p>
            </header>

            <button
              type="button"
              className="form__submit"
              onClick={handleReset}
            >
              Register another account
            </button>
          </div>
        ) : (
          <>
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
                  ref={fullNameRef}
                  aria-invalid={errors.fullName ? "true" : undefined}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
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
                  aria-invalid={errors.email ? "true" : undefined}
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
                  aria-invalid={errors.password ? "true" : undefined}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
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
                  aria-invalid={errors.confirmPassword ? "true" : undefined}
                  aria-describedby={
                    errors.confirmPassword
                      ? "confirmPassword-error"
                      : undefined
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
          </>
        )}

        <p className="card__note">
          Demo project — no data is submitted or stored.
        </p>
      </section>
    </main>
  );
}

export default App;