# 🍮 PUDDING Website

Informational landing page for the [PUDDING framework](https://github.com/madswitchman/pudding).

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
git clone https://github.com/madswitchman/pudding-website.git
cd pudding-website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Deployment

This site is static-friendly and can be deployed to:

- **Vercel** - `npx vercel` (zero config for Next.js)
- **GitHub Pages** - Add `output: 'export'` to `next.config.js`, then `npm run build` and deploy the `out/` folder
- **Netlify** - Connect the repo and set build command to `npm run build`

## Project Structure

```
pudding-website/
├── src/
│   └── app/
│       ├── layout.js      - Root layout, fonts, metadata
│       ├── page.js         - Main landing page
│       ├── globals.css     - Global styles + Tailwind
│       └── components/     - Page sections (Hero, Features, etc.)
├── public/                 - Static assets
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Related Repos

- [pudding](https://github.com/madswitchman/pudding) - Core framework
- [pudding-docs](https://github.com/madswitchman/pudding-docs) - Internal docs and planning (private)

---

*10X Foundation - Huntsville, AL*
