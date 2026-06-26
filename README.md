# HobbyTrack

HobbyTrack is a hobby agenda built with Next.js, TypeScript, Tailwind CSS, and SQLite. It lets users plan hobby activities, filter them by category, switch between agenda and calendar views, and manage activity details.

## Features

- View planned activities in an agenda/list view.
- Switch between an agenda/list view and a weekly calendar view.
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
hobby-track/
├─ app/
│  ├─ api/
│  │  └─ activities/
│  │     ├─ route.ts
│  │     └─ [id]/
│  │        └─ route.ts
│  └─ page.tsx
├─ components/
│  └─ activity/
│     ├─ ActivityCalendar.tsx
│     ├─ ActivityDashboard.tsx
│     ├─ ActivityDetailModal.tsx
│     ├─ ActivityForm.tsx
│     ├─ ActivityOverview.tsx
│     └─ ActivitySummary.tsx
├─ lib/
│  ├─ activities/
│  │  ├─ activityData.ts
│  │  └─ activityRepository.ts
│  ├─ api/
│  │  └─ activityClient.ts
│  ├─ categories/
│  │  └─ categoryData.ts
│  └─ db.ts
├─ types/
│  └─ activity.ts
└─ data/
   └─ hobbytrack.db        Created locally, ignored by Git
```

## Architecture Notes

`app/page.tsx` loads the initial activities from the SQLite-backed repository and passes them to `ActivityDashboard`.

`ActivityDashboard` owns the live client-side activity state. Add, edit, and delete actions go through the frontend API client, then through Next.js API routes, then into the SQLite repository.

The activity overview, summary, agenda list, calendar, form, and detail modal are split into activity-specific components under `components/activity/`.

## Technical Choices

Next.js API routes with SQLite persistence were chosen to demonstrate a small fullstack flow without adding external infrastructure. SQLite keeps the project easy to run locally while still showing real create, read, update, and delete behavior through an API and repository layer.

UI state is kept in `ActivityDashboard` because the overview, agenda view, calendar view, filters, and modal all need to stay in sync after add, edit, and delete actions.

A custom React calendar component is used instead of a calendar library because the assignment only needs a simple week overview, and a small custom component keeps the implementation easier to understand.

## Scope

The focus of this version is the required assignment flow: viewing, filtering, adding, editing, and deleting hobby activities.

The calendar view is intentionally kept simple and weekly instead of becoming a full scheduling system with recurring activities, reminders, or drag-and-drop planning. Those would be natural next steps, but they are outside the core scope.

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
