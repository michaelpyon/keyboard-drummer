# Keyboard Drummer: Design Token Reference

Last updated: 2026-04-07

## Overview

Dark/neon rhythm game aesthetic. All tokens live in `:root` in `styles.css`. The palette is purpose-built for a Guitar Hero-style drum game with 7 color-coded lanes, high-contrast readability, and glow/flash effects for hit feedback.

## Typography

| Token | Value | Usage |
|---|---|---|
| `--font-display` | Bungee, Trebuchet MS, sans-serif | Headings, judgement text, modal titles |
| `--font-body` | Space Grotesk, Segoe UI, sans-serif | Body text, buttons, labels |
| `--font-mono` | JetBrains Mono, ui-monospace, monospace | Stats, countdown timer |

Fonts loaded via Google Fonts in `index.html`.

## Color Tokens

### Backgrounds

| Token | Hex | Usage |
|---|---|---|
| `--bg-0` | `#09131c` | Page background base (deep navy/black) |
| `--bg-1` | `#12283a` | Secondary background, gradient endpoint |
| `--panel` | `rgba(8, 21, 32, 0.92)` | Frosted glass panels (with backdrop-filter) |
| `--panel-border` | `rgba(169, 206, 224, 0.24)` | Panel borders, subtle dividers |

### Text

| Token | Hex | Usage |
|---|---|---|
| `--text-main` | `#f3f8fb` | Primary text (near-white with blue tint) |
| `--text-soft` | `#c4dae8` | Secondary text, labels, descriptions |

### Accents

| Token | Hex | Usage |
|---|---|---|
| `--accent-1` | `#20d9b5` | Primary accent (teal/mint). CTA buttons, hit line, active states |
| `--accent-2` | `#ff9e3d` | Secondary accent (warm orange). Hit line gradient endpoint |
| `--accent-3` | `#72d8ff` | Tertiary accent (sky blue). Status text, focus rings, eyebrow |
| `--danger` | `#ff5f73` | Error/miss state (coral red). Recording indicator, miss judgement |

### Lane Colors

Each drum piece has a dedicated color used for lane tints, note gradients, pressed flash effects, and glow.

| Token | Hex | Drum Piece |
|---|---|---|
| `--lane-hihat` | `#3cb7ff` | Hi-hat (bright blue) |
| `--lane-snare` | `#20d9b5` | Snare (teal, same as accent-1) |
| `--lane-bass` | `#ffcf49` | Bass drum (gold) |
| `--lane-lowtom` | `#ff9e3d` | Low tom (orange, same as accent-2) |
| `--lane-hightom` | `#ffa54d` | High tom (amber) |
| `--lane-ride` | `#8b9cff` | Ride cymbal (periwinkle) |
| `--lane-crash` | `#ff5f73` | Crash cymbal (coral, same as danger) |

### Layout Token

| Token | Value | Usage |
|---|---|---|
| `--hit-line-offset` | `86px` | Vertical position of the hit/judgement line from bottom of game area |

## Intentional Hardcoded Colors

These hex values appear outside `:root` and are deliberate design decisions, not oversights. They serve as glow variants, gradient endpoints, or state-specific shades that don't warrant their own token.

### Mode Readout States

| Selector | Color | Reason |
|---|---|---|
| `.mode-readout` | `#d9ebf5` | Default state, brighter than --text-soft for readability |
| `.mode-readout.playing` | `#7fdaff` | Slightly warmer than --accent-3, tuned for this context |
| `.mode-readout.jam` | `#87f4c9` | Bright mint, lighter than --accent-1 for glow feel |
| `.mode-readout.recording` | `#ffb1b8` | Soft pink (lighter --danger) with text-shadow |

### Streak Readout States

| Selector | Color | Reason |
|---|---|---|
| `.streak-readout` | `#b4cad7` | Muted blue-gray, dimmer than --text-soft |
| `.streak-readout.hot` | `#ffd884` | Warm gold with text-shadow |
| `.streak-readout.fire` | `#ffb18a` | Warm coral with text-shadow |

### Judgement Flash Colors

| Selector | Color | Reason |
|---|---|---|
| `.judgement.perfect` | `#57f6ca` | Bright mint flash (lighter than --accent-1) |
| `.judgement.good` | `#7fdaff` | Bright blue flash (lighter than --accent-3) |
| `.judgement.ok` | `#ffd77f` | Warm gold flash |
| `.judgement.miss` | Uses `var(--danger)` | Already tokenized |

### Countdown

| Selector | Color | Reason |
|---|---|---|
| `.countdown` | `#d9f4ff` | Near-white cyan for high visibility |

### Note Gradients

Each note type uses a 2-stop gradient. The first stop is a saturated version of the lane color; the second is a lighter/desaturated highlight. These create the 3D pill effect on falling notes.

| Class | Gradient | Base Lane Token |
|---|---|---|
| `.note-hihat` | `#2ea9ff` to `#60e4ff` | --lane-hihat |
| `.note-snare` | `#16c6a2` to `#62ffd6` | --lane-snare |
| `.note-bass` | `#f5bd36` to `#ffe781` | --lane-bass |
| `.note-lowtom` | `#ff8b2b` to `#ffca66` | --lane-lowtom |
| `.note-hightom` | `#ff9f45` to `#ffd06f` | --lane-hightom |
| `.note-ride` | `#7388ff` to `#aeb8ff` | --lane-ride |
| `.note-crash` | `var(--lane-crash)` to `#ff8a66` | --lane-crash |

### UI Detail Colors

| Selector | Color | Reason |
|---|---|---|
| `.keymap > summary` | `#d8edf9` | Bright soft text for expandable headers |
| `.keymap > summary::-webkit-details-marker` | `#9dd9f3` | Subtle marker tint |
| `.lane-key` | `#ffffff` | Pure white for key labels (max contrast) |
| `.btn-share-x` | `#000` / `#fff` | Twitter/X brand colors (external brand, not themeable) |
| `.btn-share-x:hover` | `#1a1a1a` | Hover lift on X share button |

## Glow and Flash System

The game uses `rgba()` versions of lane colors extensively for pressed states, hit flashes, and particle effects. These use the same RGB values as the lane tokens but with varying alpha channels:

- **Lane pressed flash**: `rgba([lane-rgb], 0.28)` background + `rgba([lane-rgb], 0.25)` inset box-shadow
- **Hit flash radials**: `rgba([judgement-rgb], 0.75-0.85)` center to transparent
- **Note glow**: `rgba([lane-rgb], 0.6)` box-shadow
- **Streak lines**: Multi-stop linear gradients using judgement-tier colors
- **Beat guides**: Subtle horizontal lines using `rgba` blues and greens

## Background Composition

The page background layers 3 effects:
1. Radial gradient (top-left): `rgba(114, 216, 255, 0.22)` (accent-3 glow)
2. Radial gradient (bottom-right): `rgba(255, 158, 61, 0.18)` (accent-2 glow)
3. Linear gradient: `var(--bg-0)` to `var(--bg-1)`

Two floating `.bg-shape` elements add animated ambient glow (accent-1 and danger colors).

## Animation Tokens

No animation tokens in `:root`. Timing is hardcoded per animation:

| Animation | Duration | Easing | Purpose |
|---|---|---|---|
| `reveal` | 350ms | cubic-bezier(0.16, 1, 0.3, 1) | Page load stagger (6 stages, 80ms intervals) |
| `driftA` / `driftB` | 11s / 12s | ease-in-out | Ambient background shape float |
| `noteBurst` | 280ms | ease-out | Note hit explosion |
| `hitFlash` | 240ms | ease-out | Lane flash on hit |
| `streakDrop` | 320ms | ease-out | Vertical streak particle |
| `pulseFade` | 220ms | ease-out | Perfect hit screen pulse |
| `particleBurst` | 400ms | ease-out | Hit particle scatter |

## Breakpoints

| Breakpoint | Changes |
|---|---|
| `max-width: 900px` | 3-column controls, 2-column stats, 3-column keymap |
| `max-width: 640px` | 2-column controls, 2-column keymap, smaller lane labels |
| `max-height: 830px` | Hide eyebrow/subtitle, tighter spacing, smaller game area |

## Accessibility

- `prefers-reduced-motion: reduce` disables all decorative animations, hides flash/particle effects, reduces beat guide opacity
- Skip nav link (`.skip-nav`) for keyboard users
- `focus-visible` outlines on interactive elements using accent-3

## Architecture Notes

- Vanilla CSS, no preprocessor. All custom properties in a single `:root` block.
- `rgba()` glow values are manually tuned (not derived from tokens). A future improvement could use `color-mix()` to derive alpha variants from lane tokens.
- The `--hit-line-offset` is the only layout token. It syncs CSS positioning with `HIT_LINE_OFFSET` in `app.js`.
- Panel styling uses `backdrop-filter: blur(7px)` for the frosted glass effect.
