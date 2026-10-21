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

function FormField({
  id,
  label,
  type,
  autoComplete,
  placeholder,
  value,
  error,
  onChange,
}) {
  return (
    <div className={`form__field${error ? " form__field--error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="form__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusTarget, setFocusTarget] = useState(null);

  const successHeadingRef = useRef(null);

  useEffect(() => {
    if (focusTarget === "success") {
      successHeadingRef.current?.focus();
    } else if (focusTarget === "form") {
      document.getElementById("fullName")?.focus();
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
              <FormField
                id="fullName"
                label="Full Name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={formData.fullName}
                error={errors.fullName}
                onChange={handleChange}
              />
              <FormField
                id="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={formData.email}
                error={errors.email}
                onChange={handleChange}
              />
              <FormField
                id="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={formData.password}
                error={errors.password}
                onChange={handleChange}
              />
              <FormField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                error={errors.confirmPassword}
                onChange={handleChange}
              />

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