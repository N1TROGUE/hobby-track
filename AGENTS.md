# Repository Guidelines

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Structure & Module Organization

HobbyTrack is a Next.js + TypeScript app using the App Router.

- `app/`: route files, root layout, global styles, and API routes.
- `components/activity/`: activity-specific UI components such as dashboard, form, and detail modal.
- `lib/`: shared data, category metadata, and backend/repository helpers.
- `types/`: shared TypeScript domain types.
- `public/`: static assets.
- `data/`: local SQLite database files when persistence is enabled; database files should be ignored by Git.

## Build, Test, and Development Commands

Run commands from the repository root.

```bash
npm run dev
```

Starts the local development server.

```bash
npm run lint
```

Runs ESLint and should pass before commits.

```bash
npm run build
```

Creates a production build and catches compile-time issues.

## Coding Style & Naming Conventions

Use TypeScript for application code. Prefer small, focused modules and keep feature UI grouped under `components/activity/`. Use PascalCase for React components, camelCase for variables/functions, and descriptive file names such as `ActivityForm.tsx`.

Use Tailwind classes directly for styling, but keep class lists readable and avoid duplicating domain metadata in UI code. Shared types belong in `types/`; category display metadata belongs in `lib/categories.ts`.

## Testing Guidelines

No automated test framework is currently configured. For now, validate changes with:

```bash
npm run lint
npm run build
```

Also manually test core flows in the browser: filtering, adding activities, opening details, and deleting activities.

## Commit & Pull Request Guidelines

The history uses short, imperative commit messages, for example:

- `add new activity form`
- `add activity deletion`
- `move category styling to metadata`

Keep commits scoped to one logical change. For pull requests, include a short summary, validation steps, screenshots for UI changes, and any known limitations.

## Agent-Specific Instructions

This project uses a Next.js version with breaking changes. Before writing Next.js-specific code, read the relevant local guide in `node_modules/next/dist/docs/` and follow current conventions/deprecation notices.
