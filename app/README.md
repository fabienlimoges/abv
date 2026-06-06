# ABV Reserve Club App

React proof of concept for the ABV Reserve Club member experience, built with Vite, Tailwind CSS, and local shadcn/ui-style components.

## Run Locally

```sh
npm run dev
```

Then open `http://127.0.0.1:5174`.

## Build

```sh
npm run build
```

## Project Structure

- `index.html` loads the Vite React app shell.
- `src/main.jsx` contains the POC state, routing, mock content, Markdown loading, and interactions.
- `src/index.css` contains the Tailwind entrypoint and app-level base styles.
- `src/components/ui/` stores local shadcn/ui-style primitives.
- `assets/` stores app imagery.
- `content/events/` stores Markdown event content used by the app.

## Authentication

Authentication is mocked for the POC. Any non-empty email and password opens the member dashboard.
