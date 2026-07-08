# BRAND.md - Keyboard Drummer

## Positioning line (in Dez's language)

**"Your keyboard is a drum kit. No install, no controller - just see if your hands are still clean."**

Shorter cut for OG/social: "Play drums with your keyboard. 20 patterns, 7 genres, instant sound."

## What this brand is

An **instrument that happens to be a game**, styled like arcade hardware you'd want on your desk. Teenage Engineering panel discipline plus Clone Hero juice. Every surface should read as either a drum, a key, or a scoreboard - nothing should read as a website.

## Palette direction

Keep the current deep-ink base; it is correct. Sharpen it toward "arcade instrument at night":

- **Base**: near-black blue-greens (current `#09131c` family). Dark stage, not dark-mode SaaS gray.
- **Primary accent**: hot cyan (`#72d8ff` family) for interactive chrome, key labels, hit line.
- **Performance accent**: teal-green (`#20d9b5` family) reserved for success states - Perfect judgements, combo growth.
- **Heat ramp**: a dedicated amber-to-red ramp that ONLY appears with streaks and the ON FIRE state, so warmth = you are cooking. Never use warm hues for decoration.
- Per-lane identity tints on the 7 lanes (subtle, desaturated until hit-flash) so screenshots are instantly parseable as a drum kit.
- Backgrounds stay matte; glow is earned by gameplay, not ambient.

## Type system

- **Display / score numerals**: Bungee (already loaded) - arcade cabinet voice for the H1, letter grades, combo counter, ON FIRE. Use it big and rarely.
- **UI / body**: Space Grotesk 400-700 for controls, song cards, instructions.
- **Data / key labels**: JetBrains Mono for key caps, accuracy %, timing tiers, BPM - anything that is a readout. Key labels should look like keycaps (mono, boxed, uppercase).
- Scale contrast is the move: giant Bungee grade next to small mono stats. No mid-size mush.

## Spacing and motion personality

- Spacing: panel-based, generous but tight to the play area. The lanes own the viewport during play; chrome shrinks or gets out of the way. 8px base grid.
- Motion is **percussive**: hits are instant-attack, fast-decay (scale/flash in under 80ms, decay 150-250ms). Nothing eases in slowly during gameplay.
- Menu/library motion can breathe (200-300ms reveals) but game-screen motion must never lag the audio. Audio is the metronome; visuals snap to it.
- Combo milestones escalate: 8 = tick, 16 = pulse, 24+ = ON FIRE screen state. Escalation should be visible in a still screenshot, not just in motion.
- Respect `prefers-reduced-motion` by dropping shakes/particles but never dropping hit-flash feedback.

## Voice and tone rules

- Talk like a drummer, not a product. "Locked in", "clean run", "full combo", "pocket". Never "gamified", "experience", "unleash", "elevate".
- Second person, present tense, short. "Hit the line." not "Notes should be struck when they reach the hit line."
- Grades and numbers do the bragging; copy stays deadpan. Results screen headline is the grade, not an exclamation.
- Honest about limits: the mobile gate says plainly this needs a physical keyboard, and offers the copy-link. No fake mobile support.
- Share text is written as the player's flex, first person, with receipts: grade, accuracy, song, link.

## 3 reference products to measure taste against

1. **Clone Hero** - lane readability, judgement feedback, results-screen flex quality.
2. **Ableton Learning Music** - browser music toy that feels premium: restraint, instant audio, zero clutter.
3. **Teenage Engineering EP-133 K.O. II** - panel layout, labeled-control aesthetic, playful-industrial hardware feel.

## 3 anti-references (never look like this)

1. **Generic AI-template slop**: purple-to-blue gradient hero, glassmorphism cards, emoji-bullet feature grid, "Built with love" footer, Inter-on-dark SaaS shell. If it could be a landing page for an API product, it is wrong.
2. **Flash-era free game portals (Friv/Kongregate skins)**: clipart drums, bevel buttons, ad-shaped empty boxes, comic fonts. Playful must not mean cheap.
3. **DAW chrome (FL Studio / Logic mixer skeuomorphism)**: knob-and-rack realism, dense gray toolbars, tiny hit targets. This is an arcade instrument, not production software - if it looks like work, Dez closes it.
