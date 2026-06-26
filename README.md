# HobbyTrack

HobbyTrack is a hobby agenda built with Next.js, TypeScript, Tailwind CSS, and SQLite. It lets users plan hobby activities, filter them by category, switch between agenda and calendar views, and manage activity details.

## Features

- View planned activities in an agenda/list view.
- Switch to a calendar view for a weekly overview.
- Filter activities by hobby category.
- Add new activities with form validation.
- Open activity details in a modal.
- Edit and delete existing activities.
- Persist activity data in a local SQLite database through Next.js API routes.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- SQLite with `better-sqlite3`
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

## Available Scripts

Run the local development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start the production server after building:

```bash
npm run start
```

## Data Persistence

HobbyTrack uses a local SQLite database stored in the `data/` folder. The database file is created automatically when the app first reads or writes activity data.

The app seeds the database with example activities only when the activity table is empty. Existing database data is not overwritten on restart.

Database files are ignored by Git:

```txt
data/*.db
data/*.db-*
```

## Project Structure

```txt
app/
  api/activities/          API routes for activity CRUD operations
  page.tsx                 Server-rendered page entry
components/activity/       Activity UI components
lib/
  activities/              Activity seed data and repository
  api/                     Frontend API client
  categories/              Category metadata
  db.ts                    SQLite connection and schema setup
types/                     Shared TypeScript domain types
data/                      Local SQLite database files
```

## Architecture Notes

`app/page.tsx` loads the initial activities from the SQLite-backed repository and passes them to `ActivityDashboard`.

`ActivityDashboard` owns the live client-side activity state. Add, edit, and delete actions go through the frontend API client, then through Next.js API routes, then into the SQLite repository.

The activity overview, summary, agenda list, calendar, form, and detail modal are split into activity-specific components under `components/activity/`.

## Validation Checklist

Before submitting or deploying, run:

```bash
npm run lint
npm run build
```

Manual checks:

- Add an activity.
- Edit an activity.
- Delete an activity.
- Filter by category.
- Switch between agenda and calendar views.
- Open an activity detail modal from both views.
- Refresh the page and confirm database changes persist.
