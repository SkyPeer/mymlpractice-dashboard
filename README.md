# Forecast Frontend

A modern React + TypeScript application built with Vite, featuring a beautiful dark theme and smooth user experience.

## Features

- ⚡ **Fast Development** - Powered by Vite for instant HMR
- 🎨 **Dark Theme** - Carefully crafted dark theme with modern UI
- 🚀 **Production Ready** - Optimized builds and best practices
- 📱 **Responsive** - Works seamlessly on all devices
- 🔷 **TypeScript** - Full type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

This will type-check the code and then build for production.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx          # Main app component
│   ├── App.css          # Component styles
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles and theme
│   └── vite-env.d.ts    # Vite type definitions
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # TypeScript config for Node files
└── package.json         # Dependencies
```

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS variables for theming

## Customization

The dark theme colors can be customized in `src/index.css` by modifying the CSS variables:

```css
:root {
  --bg-primary: #0a0e27;
  --accent-primary: #6366f1;
  /* ... */
}
```

## TypeScript

The project uses strict TypeScript configuration for maximum type safety. All React components are properly typed, and the build process includes type checking.
