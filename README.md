# Registration Form

A modern, responsive registration form with client-side validation, built with React and Vite.

> **Note:** This is a front-end demonstration. No data is sent to any server, and no passwords are stored or transmitted.

## Features

- **Four fields**: Full Name, Email Address, Password, Confirm Password.
- **Client-side validation**:
  - All fields required.
  - Email format check (basic but practical pattern).
  - Password minimum length (8 characters).
  - Password and confirmation must match.
- **Accessible by design**:
  - Semantic HTML with associated `<label>` elements.
  - `aria-invalid` and `aria-describedby` on invalid fields.
  - Error messages announced via `role="alert"`.
  - Focus moved to the first invalid field on failed submission.
  - Focus moved to the success heading on successful submission.
  - All actions reachable by keyboard.
- **Clear success state** with an option to register another account.
- **Responsive layout** for mobile and desktop.
- **Interactive states**: hover, focus, active, and disabled.

## Technologies

- React 19
- JavaScript (ES6+)
- Vite
- HTML5
- CSS3 (custom properties, no framework)

## Project structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx          # page layout, form state, submit handling
    ├── App.css          # card and form styles
    ├── index.css        # global resets and design tokens
    ├── main.jsx         # React entry point
    └── validation.js    # pure validation logic (no React)
```

## Setup

### Prerequisites

- [Node.js LTS](https://nodejs.org)
- npm (installed with Node.js)

### Install and run

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173/`.

### Build for production

```bash
npm run build
npm run preview
```

## Notes and limitations

- **No backend integration** — this is a front-end demo. Validation is not a substitute for server-side checks.
- **Password policy is intentionally minimal** (length ≥ 8). Real systems should enforce stronger rules and store hashed passwords on a server.
- **Email validation uses a simple regex** (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). This covers most common cases but is not a full RFC 5322 implementation.
- **`noValidate` on the form** disables native browser validation; all validation is handled in `src/validation.js`.
- **Passwords may contain leading/trailing spaces** — they are intentionally not trimmed, since spaces are valid password characters.