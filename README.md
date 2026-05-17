# Faculty Portal

A single-page faculty dashboard built with **React 19**, **Vite 6**, **Tailwind CSS 3**, and **React Router 7**. Manage courses, post grades, view a weekly schedule, and edit a profile — all persisted to `localStorage`.

## Features

- Email/password login with route-level protection
- Dashboard with summary stats and recent activity
- Course catalogue
- Grade entry with validation
- Weekly schedule table
- Editable profile
- Responsive layout with a mobile menu
- Code-split routes via `React.lazy` + `Suspense`

## Tech stack

| Layer        | Library                       |
| ------------ | ----------------------------- |
| UI           | React 19, react-icons         |
| Routing      | React Router 7                |
| Styling      | Tailwind CSS 3, PostCSS       |
| Build / dev  | Vite 6                        |
| Linting      | ESLint 9                      |

## Getting started

```bash
npm install
npm run dev      # start dev server on http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Demo credentials

```
Email:    u.khan@pu.edu.pk
Password: pu@cs2024
```

Defined in [`src/constants/faculty.js`](src/constants/faculty.js). The app is frontend-only; "auth" is a localStorage flag — **do not ship this as-is for production**. Replace `AuthContext.login` with a real API call before deploying.

## Project layout

```
src/
├── components/
│   ├── Auth/Login.jsx
│   ├── Courses/{CoursesList,CourseCard}.jsx
│   ├── Dashboard/{Dashboard,StatsCard,RecentActivity}.jsx
│   ├── Grades/GradeForm.jsx
│   ├── Profile/Profile.jsx
│   ├── Schedule/ScheduleView.jsx
│   ├── common/{NotFound,PageSpinner}.jsx
│   ├── Layout.jsx
│   └── Navbar.jsx
├── constants/faculty.js       # seed data + demo credentials
├── context/AuthContext.jsx    # auth state + login/logout
├── lib/storage.js             # safe localStorage wrapper
├── routes/ProtectedRoute.jsx  # route guards
├── App.jsx                    # routes + lazy loading
├── main.jsx                   # entry: BrowserRouter + AuthProvider
└── index.css                  # Tailwind directives + base styles
```

Import from `src/` with the `@` alias:

```jsx
import { useAuth } from '@/context/AuthContext';
```

## Notes

- All persistence goes through `src/lib/storage.js`, which safely parses JSON and merges objects with their default shape so adding a new field never breaks existing users.
- Route guards live in `src/routes/ProtectedRoute.jsx` (`ProtectedRoute` and `PublicOnlyRoute`) — no per-route `Navigate` boilerplate.
- Logout is a state update, not a `window.location.reload()`.
