# Writify AI

> **The Next-Generation Digital Text to Hyper-Realistic Handwriting AI Studio**  
> Convert essays, assignments, code notes, and letters into authentic, human-like cursive handwriting on realistic ruled notebooks, textured stationery, and custom uploaded paper backgrounds. 100% Free & Open-Access.

---

## Features at a Glance

- **Hyper-Realistic Human Penmanship**: Natural cursive curves, baseline variations, and organic character-to-character slant variations.
- **Perfect Ruled Notebook Snapping**: Automatic line row alignment on ruled notebook paper so handwriting sits directly on physical blue lines without drift or crossing.
- **Academic Realism Suite**:
  - **Multi-Pen Heading & Colors**: Automatically formats section titles/headings in deep graphite black, questions & tricks in academic crimson red, and body text in classic royal ballpoint blue.
  - **Academic Student Header**: Auto-formats Name, Roll Number, Subject, and Submission Date directly inside the page header box.
- **Handwriting Fatigue Dynamics**: Mimics how human hands naturally write faster or slightly looser toward the bottom of long pages.
- **Custom Font Synthesizer & Scanner**: Upload photos of your own handwritten alphabet samples to clone and generate your personal handwriting style in seconds.
- **Multi-Page Export**: Download crisp, high-resolution PDFs or JPG images ready for digital homework submission or printing.
- **Interactive Hand-Drawn Diagrams**: Insert flowcharts, Venn diagrams, math graphs, and custom hand-drawn sketches.

---

## Quick Start

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** or **yarn**

### 2. Installation
```bash
# Clone or navigate to the repository
cd writify-ai

# Install dependencies
npm install
```

### 3. Run Locally (Development)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## Recommended Optimal Deployment (100% Free & Fast)

### Option 1: Vercel (Recommended: 2-minute instant deployment)
Vercel is the creator of Next.js and provides the fastest, zero-config global edge hosting with free SSL and automatic CDN caching:
1. Push your repository to **GitHub** (public or private):
   ```bash
   git init
   git add .
   git commit -m "feat: initial production release of Writify AI"
   git branch -M main
   git remote add origin https://github.com/<your-username>/writify-ai.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New Project"** and select `writify-ai`.
4. Click **"Deploy"**. Vercel will automatically detect Next.js, run `next build`, and deploy your live site with an automatic `.vercel.app` domain and free SSL certificate.

### Option 2: Netlify (Alternative Free Host)
1. Go to [netlify.com](https://netlify.com) and log in.
2. Select **"Import an existing project from GitHub"**.
3. Set build command to `npm run build` and publish directory to `.next`.
4. Click **"Deploy Site"**.

---

## Project Architecture

```
writify-ai/
├── public/                 # Static assets, fonts, icons, canvas engine
│   ├── assets/             # Studio bundles and styling
│   ├── handwritingScanner.js # Client-side handwriting scanner
│   ├── opentype.min.js     # Typography & TTF generator
│   └── index.html          # HTML entry shell
├── src/
│   ├── app/                # Next.js App Router (pages & API routes)
│   ├── components/         # UI components, dropdowns, preview modals
│   └── lib/                # Engine helpers, fonts, presets, math formulas
├── package.json            # Project manifest & build scripts
└── tailwind.config.ts      # Tailwind CSS design system configuration
```

---

## License & Community

Created with by **Vitesh**.  
Connect:  
- **Instagram**: [@vitesh_07_02](https://instagram.com/vitesh_07_02)  
- **WhatsApp**: [+91 9494006022](https://wa.me/919494006022)  
- **Email**: [viteshpallapothu07@gmail.com](mailto:viteshpallapothu07@gmail.com)

