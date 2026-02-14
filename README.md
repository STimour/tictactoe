# Futuristic Tic Tac Toe

A React + TypeScript Vite project with offline-first PWA support and three AI difficulties.

## Features
- PWA installable with auto-update service worker
- Offline ready with cached static assets
- Player vs Player and Player vs AI modes
- Easy, Medium, and Hard AI (Minimax)
- Persistent score tracking (localStorage)
- Futuristic neon UI with glassmorphism

## Tech Stack
- Vite
- React 19
- TypeScript (strict)
- vite-plugin-pwa

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview the production build:
   ```bash
   npm run preview
   ```

## Offline and Install
- Open the app once online to cache assets.
- Install from your browser's install prompt.
- The app runs fully offline after caching.

## Attribution
This project uses **Workbox** for service worker generation and asset caching, distributed under the Apache 2.0 license.
- Service Worker: `sw.js`
- Workbox Runtime: `workbox-d2f107b2.js`

See [Google Workbox](https://developers.google.com/web/tools/workbox) for details.
