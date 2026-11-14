# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are students, educators, academic creators, and writers who need to convert digital text, homework, essays, and notes into authentic, organic handwritten documents (multi-page PDF and high-resolution JPEG) without paywalls, forced subscriptions, or intrusive watermarks.

## Product Purpose

Writify AI exists to eliminate the mechanical, repetitive friction of manually copying typed text onto lined paper. It transforms digital text into hyper-realistic human handwriting rendered directly onto custom notebook paper, preserving the nuance, human fatigue, baseline variation, and organic imperfections of real human penmanship.

## Positioning

Unlike generic font generators that stamp identical, mechanical letterforms across a canvas, Writify AI features in-browser physical penmanship simulation:
- 120+ natural handwriting and cursive fonts with HarfBuzz script shaping (Latin, Devanagari, Arabic, Cyrillic, Greek, East Asian).
- Organic letter-to-letter character variance, natural baseline wobble, and progressive paper fatigue.
- Auto-mistake and typo scratching simulation.
- 4-corner perspective calibration and ruled-line snapping to custom camera photos of physical notebook paper.
- 100% free, client-side rendering with instant vector PDF compilation.

## Operating Context

- **Academic & Educational Workflows**: Preparing handwritten assignments, lab reports, homework submissions, and study guides.
- **Correspondence & Stationery**: Creating handwritten letters, invitations, and parchment correspondence.
- **Physical Integration**: Users frequently photograph real notebook paper or ruled binders on mobile phones and upload them as canvas templates.
- **Output Requirements**: Documents are exported as 300 DPI multi-page print-ready PDFs or JPEGs for physical printing or online submission portals.

## Capabilities and Constraints

- **Rendering Engine**: Client-side HTML5 Canvas and Konva with SVG vector paths and OpenType.js glyph extraction.
- **Realism Controls**: Neatness level slider, progressive page fatigue, ink flow simulation (Ballpoint, Gel Pen, Fountain Pen), auto-mistake strikeout styles (single, double, wavy, scribble).
- **Page Management**: Multi-page text flow, automatic pagination, diagram placement, margin padding, and vertical shift nudging.
- **Architectural Constraints**:
  - Strictly 4-color palette for UI chrome (`#F8FAFC`, `#FFFFFF`, `#09090B`, `#71717A`).
  - Standard structured rectangular geometry (`rounded-lg` / 8px radius) with strictly no pill-shaped buttons.
  - Zero fake metrics, zero fake reviews, zero em dashes (`—`), zero emoji icons.
  - 100% free with no paywalled feature gates or replica claims.

## Brand Commitments

- **Name**: Writify AI (Realistic Handwriting Studio)
- **Visual Identity**: Minimalist Swiss architectural cleanliness; cursive fountain-pen "W" monogram logo.
- **Developer & Support**: Handcrafted by Vitesh with direct community support on WhatsApp and Instagram (`@vitesh_07_02`).
- **Tone**: Professional, understated, functional, and honest.

## Evidence on Hand

- Production Next.js 14 web application (`https://writify-ai.vercel.app/`).
- 120+ open-source TrueType font files in `public/fonts/`.
- Curated collection of default paper templates and realistic scanner filters.
- Functional client-side PDF compiler (`pdf-vendor`).

## Product Principles

1. **Physical Authenticity Over Mechanical Perfection**: Real human writing has slight baseline jitter, ink density shifts, and natural variance; the output must never look like a computer font.
2. **Respect the User's Privacy**: Document processing and canvas rendering happen locally in the user's browser session.
3. **Restraint and Functional Clarity**: The UI chrome recedes into clean monochrome tones so the user's writing and paper textures take center stage.
4. **Honest and Unrestricted**: Full capability is accessible without artificial paywalls, watermarks, or deceptive marketing counters.

## Accessibility & Inclusion

- Keyboard navigability for editor controls, sliders, and page navigation.
- High-contrast text compliance (deep `#09090B` ink on `#FFFFFF` surfaces).
- Support for multiple writing systems and Right-to-Left (RTL) scripts including Arabic and Devanagari.

