<div align="center">

# Maison Rouge
### A Scroll-Driven Luxury Cosmetics Experience

A cinematic, scroll-scrubbed landing page concept built to explore high-end front-end motion design — frame-by-frame canvas animation, a custom WebGL shader, and GSAP-powered storytelling.

[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/Animation-GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![WebGL](https://img.shields.io/badge/Graphics-WebGL-990000?style=flat-square&logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Live Demo](#) · [Report a Bug](#) · [Request a Feature](#)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)

## Overview

Maison Rouge is a concept landing page for a fictional French luxury lipstick house. It was built as a front-end motion design showcase rather than a production storefront, with the goal of recreating the kind of "scroll as narrative" experience seen on premium product sites (think Apple product pages).

The centerpiece is a 233-frame image sequence drawn to an HTML canvas and scrubbed frame-by-frame in sync with the scrollbar, layered with section-by-section reveal animations, a hand-written WebGL shader, and a magnetic custom cursor.

## Features

- **Scroll-scrubbed hero animation** — a 233-frame JPEG sequence rendered to canvas and tied directly to scroll position using GSAP ScrollTrigger, with frame snapping and a subtle scrub lag for a smooth, cinematic feel
- **Custom WebGL shader** — a hand-written GLSL fragment shader powers an animated, mouse-reactive gradient background in the Virtual Try-On section
- **Scroll-triggered reveals** — every section animates in on scroll using GSAP, with staggered timing for a polished entrance
- **Magnetic custom cursor** — a dual-layer cursor (dot + ring) that reacts to hover states on buttons and links
- **Dynamic navbar theme** — the header automatically switches between light and dark styling as the user scrolls past the hero
- **Responsive mobile navigation** — a full-screen overlay menu for smaller viewports
- **Custom design system** — a Material Design 3 inspired token set (color, type, spacing) configured directly into Tailwind
- **Loading experience** — a branded preloader with a live progress ring tied to actual frame-loading progress

## Tech Stack

| Category | Technology |
|---|---|
| Build Tool | Vite 5 |
| Animation | GSAP 3.12 + ScrollTrigger |
| Styling | Tailwind CSS (CDN, with `forms` and `container-queries` plugins) |
| Graphics | Native WebGL with a custom GLSL fragment shader |
| Fonts | Playfair Display, Cinzel, Montserrat, Material Symbols (Google Fonts) |
| Language | Vanilla JavaScript (ES Modules) |

## Getting Started

### Prerequisites

- Node.js 16 or later
- npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ZohaAshraf/maison-rouge.git
   cd maison-rouge
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the dev server
   ```bash
   npm run dev
   ```

4. Build for production
   ```bash
   npm run build
   ```
   Output is generated in the `dist/` folder. Preview the production build locally with:
   ```bash
   npm run preview
   ```

## Project Structure

```
maison-rouge/
├── index.html          # Page markup, all sections, Tailwind config, inline shader
├── main.js              # GSAP scroll logic, canvas rendering, UI interactions
├── style.css            # Design tokens and custom component styles
├── public/
│   └── frames/           # 233-frame JPEG sequence for the scroll-scrub hero
├── package.json
└── package-lock.json
```

## Customization

- **Frame sequence** — to swap in a different animation, update `TOTAL_FRAMES` in `main.js` and replace the images in `public/frames/` (naming pattern: `ezgif-frame-001.jpg`, zero-padded to 3 digits)
- **Color and typography tokens** — edit the `tailwind.config` block inside the `<head>` of `index.html`
- **Shader appearance** — the GLSL fragment shader inside the Virtual Try-On section of `index.html` controls the animated background colors and motion

## Roadmap

- Connect the shade selection and "Reserve" buttons to a real waitlist or backend
- Replace placeholder imagery with original photography
- Build out a functional AR try-on experience in place of the current placeholder

## Author

**Zoha Ashraf**

- GitHub: [@ZohaAshraf](https://github.com/ZohaAshraf)
- LinkedIn: [zohashraf](https://linkedin.com/in/zohashraf/)
- Portfolio: [zohaashraf.github.io/Portfolio](https://zohaashraf.github.io/Portfolio/)
- Email: zoha14ashraf@gmail.com

## License

This project is intended for portfolio and educational use. If you want to formally open-source it, add an MIT `LICENSE` file to the repository root.
