---
name: Writify AI Design System
description: Minimalist Swiss architectural design system strictly constrained to a 4-color palette, structured rectangular geometry, and authentic physical penmanship rendering.
colors:
  primary: "#09090b"
  surface: "#ffffff"
  background: "#f8fafc"
  muted: "#71717a"
  border: "rgba(9, 9, 11, 0.08)"
typography:
  display:
    fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif"
    fontWeight: 800
    letterSpacing: "-0.025em"
  heading:
    fontFamily: "Outfit, 'Plus Jakarta Sans', sans-serif"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  mono:
    fontFamily: "'JetBrains Mono', monospace"
    fontWeight: 500
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "8px 18px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
---

# Writify AI Design System

## Overview

Writify AI's visual identity rejects generated-UI slop (purple gradients, pill buttons, fake counters, vague marketing slogans). It follows a rigorous Swiss architectural philosophy: extreme clarity, functional restraint, high contrast, structured grid geometry, and respect for physical penmanship realism. The interface chrome recedes into pure white and deep black ink, allowing authentic paper textures and handwriting strokes to be the hero of the experience.

## Colors

The user interface chrome is strictly governed by exactly four colors:

| Token | Hex / Value | Role | Usage |
| :--- | :--- | :--- | :--- |
| `background` | `#F8FAFC` | Canvas Background | Page background, body canvas |
| `surface` | `#FFFFFF` | Surface & Container | Cards, modal panels, editor toolbars, header bar |
| `primary` | `#09090B` | Deep Ink & Primary Action | Primary buttons, page headings, active states |
| `muted` | `#71717A` | Muted Text & Edge | Secondary descriptions, captions, hairline borders (`rgba(9,9,11,0.08)`) |

*Functional Content Exception*: User-selected ink colors (e.g. Royal Blue ink, Black ink, Red ink) on canvas and their palette swatch pickers represent document customization choices and retain their physical ink pigment values.

## Typography

- **Headings (`Outfit`)**: Clean, authoritative, geometric, rendered with `text-wrap: balance` to prevent awkward line breaks and orphan words.
- **Body & UI Controls (`Plus Jakarta Sans`)**: Highly legible, open apertures, rendered with `text-wrap: pretty`.
- **Code & Status Tokens (`JetBrains Mono`)**: Technical readouts, coordinates, and precision sliders.
- **Legibility Floor**: Functional interactive text and badges must never drop below 11px (12px / `text-xs` standard).

## Layout

- **Header**: Fixed, pure white (`#FFFFFF`) with bottom hairline border (`rgba(9, 9, 11, 0.08)`).
- **Navigation Links**: Transparent ghost buttons with subtle `#F4F4F5` hover feedback. Never solid black blocks.
- **Grid Structure**: 12-column responsive layout with structured horizontal spacing and clean gutters.
- **Rhythm**: Generous vertical white space separating sections. Zero intrusive overlays or auto-opening popups.

## Elevation & Depth

- **Hairline Borders**: Soft 1px hairline edges (`border border-zinc-200/80` or `rgba(9, 9, 11, 0.08)`).
- **Subtle Ambient Shadows**: Minimal, diffuse drop shadows (`0 1px 2px rgba(0, 0, 0, 0.03)`).
- **Zero Saturated Glows**: Strictly no purple, neon green, or cyan drop shadows.

## Shapes

- **Buttons & CTAs**: Standard structured rectangular radius (`8px` / `rounded-lg`).
- **Cards & Containers**: Structured `10px` or `12px` rounded corners.
- **Strictly No Pill Buttons**: Absolutely no `rounded-full` or `rounded-[9999px]` buttons. Rounded-full is restricted exclusively to circular avatars and tiny status indicator dots.

## Components

### Primary Button
- Background: `#09090B`
- Text: `#FFFFFF`
- Radius: `8px` (`rounded-lg`)
- Hover: Subtle opacity change or `#18181B` transition.

### Ghost / Secondary Button
- Background: Transparent or `#FFFFFF`
- Text: `#18181B` / `#3F3F46`
- Border: 1px hairline `rgba(9, 9, 11, 0.1)`
- Hover: `#F4F4F5`

### Badges & Chips
- Background: `#F4F4F5`
- Text: `#18181B`
- Border: 1px solid `#E4E4E7`
- Radius: `6px`

## Do's and Don'ts

### Do
- Use high-contrast `#09090B` typography on `#FFFFFF` surfaces (WCAG AAA compliant).
- Use `text-wrap: balance` for headings and `text-wrap: pretty` for body paragraphs.
- Keep interactive text legible with a strict 11px floor.
- Maintain responsive, quiet, rectangular button geometry.

### Don't
- Never introduce a 5th color into the UI chrome (no purple, violet, indigo, or teal gradients).
- Never use pill-shaped buttons (`rounded-full`).
- Never introduce fake customer counters, fake review badges, or vague AI buzzwords.
- Never use em dashes (`—`) or emoji icons.
- Never show intrusive onboarding popups that block the workspace canvas.

