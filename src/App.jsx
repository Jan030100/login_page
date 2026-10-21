import "./App.css";

function App() {
  return (
    <main className="page">
      <section className="card" aria-labelledby="form-title">
        <header className="card__header">
          <h1 id="form-title">Create your account</h1>
          <p>Fill in the fields below to register.</p>
        </header>

        <form className="form" noValidate>
          <div className="form__field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
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