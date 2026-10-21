import { useState } from "react";
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
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    console.log("formData:", formData);
    console.log("errors:", errors);
  }

  return (
    <main className="page">
      <section className="card" aria-labelledby="form-title">
        <header className="card__header">
          <h1 id="form-title">Create your account</h1>
          <p>Fill in the fields below to register.</p>
        </header>

        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="form__field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form__field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form__field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form__field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
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