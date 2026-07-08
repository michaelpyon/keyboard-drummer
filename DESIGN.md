# DESIGN.md - Keyboard Drummer (source of truth)

Core concept and name are fixed: **Keyboard Drummer**, a falling-note browser rhythm game played on a physical keyboard, with jam mode, recording mode, 3 synthesized kits, and 20 hand-built patterns across 7 genres. Do not re-architect (static vanilla HTML/JS/CSS, Web Audio synthesis, no build step). Build skills honor PERSONA.md and BRAND.md.

## Layout / IA intent

3 surfaces, 1 spine:

1. **Song Library (landing)** - the arcade cabinet front. Hero + genre tabs + song grid + Jam Mode. This is the only marketing surface; there is no separate landing page and there should not be one.
2. **Game Screen** - the instrument. Lanes dominate; controls collapse to a slim toolbar; key reference strip always visible above lanes. Stats live beside/below the play area, never over it.
3. **Results Modal** - the scoreboard. Grade-first composition designed to be screenshotted.

IA rules:
- First playable sound within 10 seconds of page load: audio-unlock overlay doubles as the start CTA, and after unlock, keyboard focus is guaranteed on the game area (first keypress must always make a drum sound, even before a song starts).
- A **keyboard diagram on the library screen** (carried-forward M bet) so a first-timer knows the mapping before clicking any song. Show righty by default with a lefty toggle mirroring the in-game handedness setting.
- Jam Mode is a first-class entry (library toolbar), not buried in the game screen.
- Mobile gets the honest gate (needs a physical keyboard) with OG preview image and copy-link button. Keep it; polish it; never fake touch support.

## Hero / landing concept

The library hero IS the pitch: "Keyboard Drummer" in Bungee, one-line subtitle ("Pick a song, or jam freestyle. 20 patterns across 7 genres."), and directly beneath it the keycap-styled keyboard diagram that visibly reacts if you press the mapped keys while on the library screen (instant proof the instrument is real before any song starts). No feature grid, no testimonial section, no scrolling marketing page. Song cards show genre, BPM, difficulty pips, and (bet) per-song best grade from localStorage.

## Key screens list

1. Audio-unlock / start overlay (tap to arm audio)
2. Song Library: hero, genre tabs (All + 7), sort control, song grid, Jam Mode button, keyboard diagram
3. Game Screen - song mode: countdown, lanes with falling notes, hit line, judgement popups, key reference strip, score/combo/accuracy readouts, song progress bar
4. Game Screen - jam mode (free play) and recording mode (capture + replay-as-chart)
5. Results Modal: grade, accuracy, max combo, per-lane breakdown, Retry / Library / Share on X
6. Session Complete (jam/recording share) - currently orphaned code path; either wire `showShareModal()` into jam-mode exit with real stats (hits, duration) or delete it. Do not ship a dead modal.
7. Mobile gate

## Empty / loading / error state intent

- **Loading**: static assets only; there is no spinner-worthy load. The audio-unlock overlay is the de facto loading gate - it must render instantly with styled text even before fonts land (font-display swap; system fallback tuned so Bungee swap does not reflow the H1 badly).
- **Empty genre tab**: never show a blank grid; if a genre filter yields nothing (should not happen with current data), show a one-line "No patterns here yet - try All" in voice.
- **No recordings yet**: recording-mode replay list states "Record a take and it shows up here as a playable chart."
- **Audio failure / locked context**: if the Web Audio context fails to resume, show an inline "Audio is blocked - click here to arm it" recovery, never silent dead keys (this is bounce trigger #1).
- **Lost focus during play**: if the game area loses keyboard focus mid-song, auto-refocus or pause with a "Click to resume" scrim - never eat keypresses silently.

## Metadata / OG intent (X-readiness mandatory)

- Keep title "Keyboard Drummer: Play Drums With Your Keyboard", description mentioning no-install instant play; canonical + og:url stay on https://keyboard-drummer.vercel.app/.
- `summary_large_image` card with a purpose-designed 1200x630 og.png: dark stage, lane colors, big Bungee wordmark, keycap row visual - it should look like a screenshot of the ON FIRE state, not a logo card. Refresh og.png to match the relaunch visual pass.
- Share intents (results + jam) must point at the vercel.app URL (fixed at HEAD; live is stale - see honesty note) and pre-fill the flex tweet: grade, accuracy %, song title, link.
- Verify with a card preview before calling X-ready; the OG image is half the launch.

## The screenshot-worthy moment to engineer

**The results screen at S rank.** Composition: giant Bungee letter grade with the streak-flame treatment if max combo hit 24+, accuracy % and max combo in mono beneath, song title, subtle per-lane bar chart. It must look like a trophy at 1200px wide with zero cropping effort. Secondary GIF moment: the 24+ combo **ON FIRE** state mid-run - heat ramp bleeds into the lane edges so even a still frame reads as "he was cooking". Share on X button sits inside the trophy frame so the flex path is one click.

## Data honesty

The product claims no real data and makes no live/API claims: all drums are Web Audio synthesis, all 20 songs are hand-built patterns (verified in SUGGESTIONS.md ground-truth pass, 2026-05-30). Nothing to disclose beyond what is already honest. Two integrity items to respect at build time:

1. **Deploy mismatch (current)**: the live vercel.app build is stale versus repo HEAD - verified 2026-07-08: live still shows "6 genres", old lefty defaults (Hi-Hat: A), no key reference strip, and share tweets still link dead github.io URLs. HEAD fixes all of this. The relaunch is not X-ready until Michael triggers a Vercel flush; do not announce from the stale build.
2. **Orphaned share modal**: `showShareModal()` in app.js is defined but never called; if kept, it must share real jam stats, not the stat-less "jammed out" text.

## Carried-forward bets the design must leave room for

- Tempo slider (75-80% practice mode) in the game toolbar - reserve space, do not cram later.
- Per-song best score/grade badges on library song cards (localStorage).
- "Try next" harder-song suggestion slot in the results modal.
