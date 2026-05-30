# Keyboard Drummer: Suggestions

Generated: 2026-05-30

---

## Evangelist Persona

The most likely person to both love and share this is a 20-to-28-year-old bedroom producer or music student who browses r/WeAreTheMusicMakers, r/drumming, and production Discord servers like "We Make Beats." They currently use GarageBand or a DAW with a MIDI pad to sketch drum patterns, but this loads in 2 seconds with no install and no gear. They screenshot it when they hit a 24+ combo streak and the "ON FIRE" readout appears, then post it like a high score. They bounce in 5 seconds if the audio does not fire on the first keypress (browser unlock friction) or if the key layout is confusing before they hit a single note.

---

## Ground-Truth Findings (repo HEAD)

**Status: Working and honest. No fabricated data found.**

- No external API calls. All drum samples are Web Audio synthesis, no fake "live" or "real-time" claims.
- No example.com links, no Census or OSM or SEC references.
- No stale "updated daily" text or hardcoded-as-live values.
- No invented claims about real people or places.
- The 20 songs are declared as hand-built patterns, not real recordings. No false authority claimed.
- OG meta, canonical URL, og:url, og:image, and the mobile "copy link" button all correctly reference `https://keyboard-drummer.vercel.app/`.

**Remaining bug in HEAD (now fixed in this pass):**

The two "Share on X" tweet intent URLs in app.js (jam session share modal, results screen share button) still embedded the old GitHub Pages host (`michaelpyon.github.io/keyboard-drummer/`) instead of the Vercel host. This meant shared tweets linked to the wrong (dead or different) URL.

Fixed: both URLs updated to `https://keyboard-drummer.vercel.app/`.

**Live vs repo:**

The live URL at `https://keyboard-drummer.vercel.app` serves an older build. It shows lefty defaults (Hi-Hat: A, Snare: S) while HEAD has correct righty defaults (Hi-Hat: K, Snare: H/J). The persistent key-map strip, the stale-label fix, and the key reference strip above lanes are all in HEAD but NOT yet live. This is a deploy-needed item, not a code fix.

---

## Prioritized Plan

### Quick Wins (S effort, no deploy needed for code, deploy needed to see live)

1. **Fix share tweet URL** (DONE this pass): Both "Share on X" buttons now link to the correct Vercel host. Cost: 2-line fix. Impact: every share tweet from the app now points to the real live URL.

2. **Add score/grade to tweet text**: The current tweet text is generic ("I just jammed out on Keyboard Drummer"). A small improvement: include the grade letter and accuracy in the tweet body (e.g. "S rank, 98% accuracy") so shared tweets have a concrete hook. Effort S. File: `app.js` in the two `resultsShareBtn` / `shareXBtn` handlers.

3. **Jam Mode share text is wrong**: The jam mode share (session complete modal) always says "jammed out" with no stats. After a recording session, the share could say how many hits were recorded over how many seconds. Effort S. File: `app.js`, `showShareModal()`.

4. **Song count in subtitle is wrong**: `index.html` line 133 says "20 patterns across 6 genres" but `SONG_LIBRARY_META.genres` lists 7 genres (Rock, Jazz, Hip-Hop, Electronic, Latin, Funk, Metal). Change to "7 genres". Effort XS. File: `index.html`.

5. **No `package.json` / no build step**: this is static HTML. The deploy pipeline needs a push-to-Vercel trigger to flush HEAD. Flag as deploy-mismatch.

### Medium Effort (M)

6. **BPM difficulty pacing feedback**: After finishing a song, the results modal could show a "try next" suggestion pointing to the next-hardest song in the same genre. This keeps players progressing rather than looping the same pattern. Files: `app.js`, `songs.js`. Effort M.

7. **Keyboard visual on start screen**: Add a simple ASCII or CSS keyboard diagram on the song library screen (below the hero) showing which keys map to which drums, so new players understand before clicking a song. Effort M. Files: `index.html`, `styles.css`.

8. **Metronome toggle**: A checkbox to disable the metronome click during play. Some players find it helpful; others find it distracting on songs with dense hihat patterns. Effort M. Files: `index.html`, `app.js`.

### Bigger Bets (L, requires rethink)

9. **Tempo adjust slider**: Let players slow a song to 75% or 80% BPM for practice. This is the single most requested feature in rhythm game communities for skill progression. Requires changing how `songNotes` are recomputed. Effort L. Files: `app.js`, `songs.js`.

10. **Persistent best scores**: Store per-song best score and grade in `localStorage` and display it on each song card. Makes returning players feel progress. Effort L. Files: `app.js`, `songs.js`, `styles.css`.

---

## Deploy Mismatch Flag

HEAD is ahead of the live build by at least 3 commits. The live site still shows the old key layout. A Vercel deploy flush is needed to make all prior fixes (stale key labels, key reference strip, persistent key map, and now the share URL fix) visible to users.
