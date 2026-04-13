"use strict";

// ---------------------------------------------------------------------------
// Song Library — 20 drum patterns across 6 genres
// Each song uses the existing addBeat / finalizeSong helpers from app.js.
// Songs are built by buildSongLibrary() which returns an array of song objects.
// ---------------------------------------------------------------------------

const SONG_LIBRARY_META = {
  genres: ["Rock", "Jazz", "Hip-Hop", "Electronic", "Latin", "Funk", "Metal"],
  genreColors: {
    "Rock": "#ff5f73",
    "Jazz": "#8b9cff",
    "Hip-Hop": "#ffcf49",
    "Electronic": "#72d8ff",
    "Latin": "#20d9b5",
    "Funk": "#ff9e3d",
    "Metal": "#ff5f73"
  }
};

function buildSongLibrary() {
  return [
    buildBasicRock(),
    buildRockAnthem(),
    buildHardRock(),
    buildShuffle(),
    buildSwingRide(),
    buildJazzWaltz(),
    buildBebop(),
    buildBoomBap(),
    buildTrap(),
    buildLoFi(),
    buildFourFloor(),
    buildDnB(),
    buildSynthwave(),
    buildBossaNova(),
    buildSamba(),
    buildReggaeton(),
    buildFunkyDrummer(),
    buildDisco(),
    buildBlastBeat(),
    buildDoubleBass()
  ];
}

// ---------------------------------------------------------------------------
// ROCK
// ---------------------------------------------------------------------------

// Basic Rock — 120 BPM, easy, ~60s
// Classic 4/4: kick on 1 & 3, snare on 2 & 4, 8th-note hihats
function buildBasicRock() {
  const bpm = 120;
  const totalBeats = 120; // 30 bars = 60s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    // Crash every 8 bars
    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // 8th-note hihats
    for (let i = 0; i < 8; i++) {
      addBeat(notes, bpm, b + i * 0.5, "hihat");
    }

    // Kick on 1 & 3
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 2, "bass");

    // Snare on 2 & 4
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Simple fill every 8 bars
    if (bar % 8 === 7) {
      addBeat(notes, bpm, b + 3.5, "hightom");
      addBeat(notes, bpm, b + 3.75, "lowtom");
    }
  }

  return finalizeSongWithMeta({
    id: "basic-rock", title: "Basic Rock", bpm, totalBeats,
    genre: "Rock", difficulty: 1,
    description: "Kick-snare-hat. The foundation of all drumming.",
    notes
  });
}

// Rock Anthem — 130 BPM, medium, ~65s
// Driving rock with open hihats, ride sections, tom fills
function buildRockAnthem() {
  const bpm = 130;
  const totalBeats = 140; // 35 bars ~65s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // Hihats first half, ride second half
    const cymbal = bar < 18 ? "hihat" : "ride";
    for (let i = 0; i < 8; i++) {
      addBeat(notes, bpm, b + i * 0.5, cymbal);
    }

    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 2, "bass");
    // Extra kick on & of 3 for drive
    if (bar % 2 === 1) addBeat(notes, bpm, b + 2.5, "bass");

    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Tom fills every 4 bars
    if (bar % 4 === 3) {
      addBeat(notes, bpm, b + 3, "hightom");
      addBeat(notes, bpm, b + 3.25, "hightom");
      addBeat(notes, bpm, b + 3.5, "lowtom");
      addBeat(notes, bpm, b + 3.75, "lowtom");
    }
  }

  return finalizeSongWithMeta({
    id: "rock-anthem", title: "Rock Anthem", bpm, totalBeats,
    genre: "Rock", difficulty: 3,
    description: "Driving beat with ride transitions and tom fills.",
    notes
  });
}

// Hard Rock — 140 BPM, hard, ~65s
// Aggressive: double kicks, crash accents, rapid fills
function buildHardRock() {
  const bpm = 140;
  const totalBeats = 152; // 38 bars ~65s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 4 === 0) addBeat(notes, bpm, b, "crash");

    for (let i = 0; i < 8; i++) {
      addBeat(notes, bpm, b + i * 0.5, "hihat");
    }

    // Double kick patterns
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 0.5, "bass");
    addBeat(notes, bpm, b + 2, "bass");
    if (bar % 2 === 0) {
      addBeat(notes, bpm, b + 2.5, "bass");
      addBeat(notes, bpm, b + 2.75, "bass");
    }

    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Accent snare
    if (bar % 4 === 2) addBeat(notes, bpm, b + 1.5, "snare");

    // Tom fills every 4 bars
    if (bar % 4 === 3) {
      addBeat(notes, bpm, b + 2.5, "hightom");
      addBeat(notes, bpm, b + 2.75, "hightom");
      addBeat(notes, bpm, b + 3, "lowtom");
      addBeat(notes, bpm, b + 3.25, "lowtom");
      addBeat(notes, bpm, b + 3.5, "hightom");
      addBeat(notes, bpm, b + 3.75, "lowtom");
    }
  }

  return finalizeSongWithMeta({
    id: "hard-rock", title: "Hard Rock", bpm, totalBeats,
    genre: "Rock", difficulty: 4,
    description: "Double kicks, crash accents, rapid fills. Buckle up.",
    notes
  });
}

// Shuffle — 115 BPM, medium, ~70s
// Triplet feel: swing hihats, shuffle kick pattern
function buildShuffle() {
  const bpm = 115;
  const totalBeats = 136; // 34 bars ~71s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // Shuffle hihats: triplet feel (beat + beat+0.67)
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat, "hihat");
      addBeat(notes, bpm, b + beat + 0.67, "hihat");
    }

    // Shuffle kick: 1, &-of-2, 3
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 1.67, "bass");
    addBeat(notes, bpm, b + 2, "bass");

    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Ghost snares every other bar
    if (bar % 2 === 1) {
      addBeat(notes, bpm, b + 0.67, "snare");
      addBeat(notes, bpm, b + 2.67, "snare");
    }

    // Ride on last 8 bars
    if (bar >= totalBeats / 4 - 8) {
      addBeat(notes, bpm, b + 0.5, "ride");
      addBeat(notes, bpm, b + 2.5, "ride");
    }
  }

  return finalizeSongWithMeta({
    id: "shuffle", title: "Shuffle", bpm, totalBeats,
    genre: "Rock", difficulty: 3,
    description: "Triplet-feel shuffle. Swing those hihats.",
    notes
  });
}

// ---------------------------------------------------------------------------
// JAZZ
// ---------------------------------------------------------------------------

// Swing Ride — 140 BPM, medium, ~60s
// Classic swing: ride pattern, hihat on 2&4, comping snare
function buildSwingRide() {
  const bpm = 140;
  const totalBeats = 140; // 35 bars = 60s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    // Swing ride: downbeat + triplet skip
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat, "ride");
      addBeat(notes, bpm, b + beat + 0.67, "ride");
    }

    // Hihat foot on 2 & 4
    addBeat(notes, bpm, b + 1, "hihat");
    addBeat(notes, bpm, b + 3, "hihat");

    // Bass on 1 and 3 (walking feel)
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 2, "bass");

    // Comping snare accents (jazz style, varies bar to bar)
    if (bar % 4 === 0) addBeat(notes, bpm, b + 3.67, "snare");
    if (bar % 4 === 1) addBeat(notes, bpm, b + 1.67, "snare");
    if (bar % 4 === 2) {
      addBeat(notes, bpm, b + 2.67, "snare");
      addBeat(notes, bpm, b + 3.67, "snare");
    }
    if (bar % 4 === 3) addBeat(notes, bpm, b + 0.67, "snare");

    // Bass walk-up every 4 bars
    if (bar % 4 === 3) {
      addBeat(notes, bpm, b + 2.5, "bass");
      addBeat(notes, bpm, b + 3.5, "bass");
    }
  }

  return finalizeSongWithMeta({
    id: "swing-ride", title: "Swing Ride", bpm, totalBeats,
    genre: "Jazz", difficulty: 3,
    description: "Classic swing. Ride the cymbal, comp on snare.",
    notes
  });
}

// Jazz Waltz — 120 BPM, easy, ~60s (3/4 time)
// Waltz: ride on 1, hihat on 2&3, bass on 1
function buildJazzWaltz() {
  const bpm = 120;
  const totalBeats = 120; // 40 bars of 3 = 60s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 3; bar++) {
    const b = bar * 3;

    // Ride on beat 1
    addBeat(notes, bpm, b, "ride");
    // Ride skip notes
    addBeat(notes, bpm, b + 0.67, "ride");
    addBeat(notes, bpm, b + 1, "ride");
    addBeat(notes, bpm, b + 2, "ride");

    // Hihat on 2 & 3
    addBeat(notes, bpm, b + 1, "hihat");
    addBeat(notes, bpm, b + 2, "hihat");

    // Bass on 1
    addBeat(notes, bpm, b, "bass");

    // Snare brush on 3 every other bar
    if (bar % 2 === 0) addBeat(notes, bpm, b + 2, "snare");

    // Crash every 8 bars
    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // Walk-up bass every 4 bars
    if (bar % 4 === 3) addBeat(notes, bpm, b + 2.5, "bass");
  }

  return finalizeSongWithMeta({
    id: "jazz-waltz", title: "Jazz Waltz", bpm, totalBeats,
    genre: "Jazz", difficulty: 2,
    description: "3/4 time. Light ride, gentle brush strokes.",
    notes
  });
}

// Bebop — 180 BPM, expert, ~67s
// Fast swing: rapid ride, trading comps, kick bombs
function buildBebop() {
  const bpm = 180;
  const totalBeats = 200; // 50 bars = 67s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    // Fast swing ride
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat, "ride");
      addBeat(notes, bpm, b + beat + 0.67, "ride");
    }

    // Hihat foot on 2 & 4
    addBeat(notes, bpm, b + 1, "hihat");
    addBeat(notes, bpm, b + 3, "hihat");

    // Kick bombs (unpredictable accents)
    if (bar % 3 === 0) addBeat(notes, bpm, b + 2.67, "bass");
    if (bar % 3 === 1) addBeat(notes, bpm, b + 0.67, "bass");
    if (bar % 3 === 2) {
      addBeat(notes, bpm, b + 1.67, "bass");
      addBeat(notes, bpm, b + 3.67, "bass");
    }
    addBeat(notes, bpm, b, "bass");

    // Comping snare (heavy)
    if (bar % 2 === 0) {
      addBeat(notes, bpm, b + 1.67, "snare");
      addBeat(notes, bpm, b + 3.67, "snare");
    } else {
      addBeat(notes, bpm, b + 0.67, "snare");
      addBeat(notes, bpm, b + 2.67, "snare");
    }

    // Crash accents
    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // Trading: tom fills every 4 bars
    if (bar % 4 === 3) {
      addBeat(notes, bpm, b + 2, "hightom");
      addBeat(notes, bpm, b + 2.33, "hightom");
      addBeat(notes, bpm, b + 2.67, "lowtom");
      addBeat(notes, bpm, b + 3, "lowtom");
      addBeat(notes, bpm, b + 3.33, "hightom");
      addBeat(notes, bpm, b + 3.67, "lowtom");
    }
  }

  return finalizeSongWithMeta({
    id: "bebop", title: "Bebop", bpm, totalBeats,
    genre: "Jazz", difficulty: 5,
    description: "180 BPM swing. Kick bombs and comping chaos. Good luck.",
    notes
  });
}

// ---------------------------------------------------------------------------
// HIP-HOP
// ---------------------------------------------------------------------------

// Boom Bap — 90 BPM, easy, ~67s
// Classic: heavy kick, snare on 2&4, 8th hihats
function buildBoomBap() {
  const bpm = 90;
  const totalBeats = 100; // 25 bars ~67s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // 8th-note hihats
    for (let i = 0; i < 8; i++) {
      addBeat(notes, bpm, b + i * 0.5, "hihat");
    }

    // Heavy kicks
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 2, "bass");
    if (bar % 2 === 1) addBeat(notes, bpm, b + 3.5, "bass");

    // Snare on 2 & 4
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");
  }

  return finalizeSongWithMeta({
    id: "boom-bap", title: "Boom Bap", bpm, totalBeats,
    genre: "Hip-Hop", difficulty: 1,
    description: "Head-nod groove. Heavy kick, crisp snare.",
    notes
  });
}

// Trap — 140 BPM, medium, ~65s
// Rapid hihats (16th + rolls), 808 kick, snare on 3
function buildTrap() {
  const bpm = 140;
  const totalBeats = 152; // 38 bars ~65s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // 16th-note hihats with rolls
    for (let i = 0; i < 16; i++) {
      addBeat(notes, bpm, b + i * 0.25, "hihat");
    }
    // Hihat rolls (32nd-note bursts) every 4 bars
    if (bar % 4 === 2) {
      for (let i = 0; i < 8; i++) {
        addBeat(notes, bpm, b + 3 + i * 0.125, "hihat");
      }
    }

    // 808 kick pattern
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 0.75, "bass");
    if (bar % 2 === 0) addBeat(notes, bpm, b + 2.5, "bass");
    if (bar % 2 === 1) addBeat(notes, bpm, b + 2, "bass");

    // Snare on 2 & 4 (clap)
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");
  }

  return finalizeSongWithMeta({
    id: "trap", title: "Trap", bpm, totalBeats,
    genre: "Hip-Hop", difficulty: 3,
    description: "Rapid hihats, 808 kicks, clap snares. Flex your speed.",
    notes
  });
}

// Lo-Fi — 85 BPM, easy, ~70s
// Chill: light kick, soft snare, sparse hihats with swing
function buildLoFi() {
  const bpm = 85;
  const totalBeats = 100; // 25 bars ~70s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    // Sparse swing hihats
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat, "hihat");
      if (beat % 2 === 0) addBeat(notes, bpm, b + beat + 0.67, "hihat");
    }

    // Light kick
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 2, "bass");

    // Soft snare on 2 & 4
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Vinyl crackle feel: ride taps
    if (bar % 4 === 2) {
      addBeat(notes, bpm, b + 1.5, "ride");
      addBeat(notes, bpm, b + 3.5, "ride");
    }

    // Crash very sparse
    if (bar % 12 === 0) addBeat(notes, bpm, b, "crash");
  }

  return finalizeSongWithMeta({
    id: "lo-fi", title: "Lo-Fi", bpm, totalBeats,
    genre: "Hip-Hop", difficulty: 1,
    description: "Chill beats. Swing hihats, soft touches. Study mode.",
    notes
  });
}

// ---------------------------------------------------------------------------
// ELECTRONIC
// ---------------------------------------------------------------------------

// Four on the Floor — 128 BPM, easy, ~60s
// House: kick every beat, hihat on upbeats, snare/clap on 2&4
function buildFourFloor() {
  const bpm = 128;
  const totalBeats = 128; // 32 bars = 60s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // Four-on-the-floor kick
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat, "bass");
    }

    // Open hihat on upbeats
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat + 0.5, "hihat");
    }

    // Clap/snare on 2 & 4
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");
  }

  return finalizeSongWithMeta({
    id: "four-floor", title: "Four on the Floor", bpm, totalBeats,
    genre: "Electronic", difficulty: 1,
    description: "House beat. Kick every quarter, hats on upbeats.",
    notes
  });
}

// DnB — 170 BPM, hard, ~65s
// Fast breakbeat: kick syncopation, snare on 2&4, rapid hihats
function buildDnB() {
  const bpm = 170;
  const totalBeats = 184; // 46 bars ~65s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // 16th hihats (fast)
    for (let i = 0; i < 16; i++) {
      addBeat(notes, bpm, b + i * 0.25, "hihat");
    }

    // DnB kick pattern: syncopated
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 1.5, "bass");
    addBeat(notes, bpm, b + 2.75, "bass");
    if (bar % 2 === 1) addBeat(notes, bpm, b + 3.5, "bass");

    // Snare on 2 & 4
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Ghost snares
    if (bar % 4 === 1) addBeat(notes, bpm, b + 0.75, "snare");
    if (bar % 4 === 3) addBeat(notes, bpm, b + 2.75, "snare");

    // Ride accents
    if (bar % 2 === 0) {
      addBeat(notes, bpm, b + 0.5, "ride");
      addBeat(notes, bpm, b + 2.5, "ride");
    }
  }

  return finalizeSongWithMeta({
    id: "dnb", title: "Drum & Bass", bpm, totalBeats,
    genre: "Electronic", difficulty: 4,
    description: "170 BPM breakbeat. Syncopated kicks, 16th hihats.",
    notes
  });
}

// Synthwave — 110 BPM, medium, ~65s
// Retro: gated snare, steady kick, arpeggiated hihats
function buildSynthwave() {
  const bpm = 110;
  const totalBeats = 120; // 30 bars ~65s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // Steady 8th hihats
    for (let i = 0; i < 8; i++) {
      addBeat(notes, bpm, b + i * 0.5, "hihat");
    }

    // Kick: four-on-the-floor base with extra on & of 3
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat, "bass");
    }
    if (bar % 2 === 0) addBeat(notes, bpm, b + 2.5, "bass");

    // Gated snare on 2 & 4
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Ride arpeggios second half
    if (bar >= 15) {
      addBeat(notes, bpm, b + 0.5, "ride");
      addBeat(notes, bpm, b + 2.5, "ride");
    }

    // Tom fills every 8 bars
    if (bar % 8 === 7) {
      addBeat(notes, bpm, b + 3, "hightom");
      addBeat(notes, bpm, b + 3.25, "hightom");
      addBeat(notes, bpm, b + 3.5, "lowtom");
      addBeat(notes, bpm, b + 3.75, "lowtom");
    }
  }

  return finalizeSongWithMeta({
    id: "synthwave", title: "Synthwave", bpm, totalBeats,
    genre: "Electronic", difficulty: 3,
    description: "Retro 80s pulse. Gated snares and steady kicks.",
    notes
  });
}

// ---------------------------------------------------------------------------
// LATIN
// ---------------------------------------------------------------------------

// Bossa Nova — 130 BPM, medium, ~65s
// Brazilian: cross-stick snare, bass on 1&3, ride pattern
function buildBossaNova() {
  const bpm = 130;
  const totalBeats = 140; // 35 bars ~65s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // Bossa ride pattern: beats 1, &-of-1, &-of-2, 3, &-of-3, &-of-4
    addBeat(notes, bpm, b, "ride");
    addBeat(notes, bpm, b + 0.5, "ride");
    addBeat(notes, bpm, b + 1.5, "ride");
    addBeat(notes, bpm, b + 2, "ride");
    addBeat(notes, bpm, b + 2.5, "ride");
    addBeat(notes, bpm, b + 3.5, "ride");

    // Cross-stick snare: syncopated
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 2.5, "snare");

    // Hihat foot on 2 & 4
    addBeat(notes, bpm, b + 1, "hihat");
    addBeat(notes, bpm, b + 3, "hihat");

    // Bass: 1 and 3
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 2, "bass");
  }

  return finalizeSongWithMeta({
    id: "bossa-nova", title: "Bossa Nova", bpm, totalBeats,
    genre: "Latin", difficulty: 3,
    description: "Brazilian groove. Syncopated ride and cross-stick.",
    notes
  });
}

// Samba — 100 BPM, hard, ~72s
// Fast Brazilian: surdo bass, 16th hihats, heavy syncopation
function buildSamba() {
  const bpm = 100;
  const totalBeats = 120; // 30 bars ~72s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // 16th-note hihats
    for (let i = 0; i < 16; i++) {
      addBeat(notes, bpm, b + i * 0.25, "hihat");
    }

    // Surdo bass: syncopated
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 0.75, "bass");
    addBeat(notes, bpm, b + 1.5, "bass");
    addBeat(notes, bpm, b + 2, "bass");
    addBeat(notes, bpm, b + 2.75, "bass");
    addBeat(notes, bpm, b + 3.5, "bass");

    // Snare accents
    addBeat(notes, bpm, b + 0.5, "snare");
    addBeat(notes, bpm, b + 1.25, "snare");
    addBeat(notes, bpm, b + 2.5, "snare");
    addBeat(notes, bpm, b + 3.25, "snare");

    // Ride accents
    if (bar % 2 === 0) {
      addBeat(notes, bpm, b + 1, "ride");
      addBeat(notes, bpm, b + 3, "ride");
    }

    // Tom fills every 4 bars
    if (bar % 4 === 3) {
      addBeat(notes, bpm, b + 3, "hightom");
      addBeat(notes, bpm, b + 3.25, "lowtom");
      addBeat(notes, bpm, b + 3.5, "hightom");
      addBeat(notes, bpm, b + 3.75, "lowtom");
    }
  }

  return finalizeSongWithMeta({
    id: "samba", title: "Samba", bpm, totalBeats,
    genre: "Latin", difficulty: 4,
    description: "16th hihats over heavy syncopation. Carnival energy.",
    notes
  });
}

// Reggaeton — 95 BPM, easy, ~63s
// Dembow: kick on 1 & 3, snare on & of 2 and & of 4
function buildReggaeton() {
  const bpm = 95;
  const totalBeats = 100; // 25 bars ~63s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // 8th hihats
    for (let i = 0; i < 8; i++) {
      addBeat(notes, bpm, b + i * 0.5, "hihat");
    }

    // Dembow kick pattern
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 1.75, "bass");
    addBeat(notes, bpm, b + 2.5, "bass");

    // Dembow snare: on & of 2 and & of 4
    addBeat(notes, bpm, b + 1.5, "snare");
    addBeat(notes, bpm, b + 3.5, "snare");
    // Extra snare on 3 for bounce
    addBeat(notes, bpm, b + 3, "snare");
  }

  return finalizeSongWithMeta({
    id: "reggaeton", title: "Reggaeton", bpm, totalBeats,
    genre: "Latin", difficulty: 2,
    description: "Dembow riddim. That unmistakable bounce.",
    notes
  });
}

// ---------------------------------------------------------------------------
// FUNK
// ---------------------------------------------------------------------------

// Funky Drummer — 100 BPM, medium, ~72s
// Clyde Stubblefield-inspired: syncopated kick, ghost snares, 16th hihats
function buildFunkyDrummer() {
  const bpm = 100;
  const totalBeats = 120; // 30 bars ~72s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // 16th-note hihats
    for (let i = 0; i < 16; i++) {
      addBeat(notes, bpm, b + i * 0.25, "hihat");
    }

    // Syncopated funk kick
    addBeat(notes, bpm, b, "bass");
    addBeat(notes, bpm, b + 0.75, "bass");
    addBeat(notes, bpm, b + 2, "bass");
    addBeat(notes, bpm, b + 2.75, "bass");
    if (bar % 2 === 1) addBeat(notes, bpm, b + 3.5, "bass");

    // Backbeat snare on 2 & 4
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Ghost snares
    addBeat(notes, bpm, b + 0.5, "snare");
    addBeat(notes, bpm, b + 1.75, "snare");
    addBeat(notes, bpm, b + 2.5, "snare");
    addBeat(notes, bpm, b + 3.75, "snare");

    // Open hihat accents
    if (bar % 4 === 2) {
      addBeat(notes, bpm, b + 1.5, "ride");
      addBeat(notes, bpm, b + 3.5, "ride");
    }
  }

  return finalizeSongWithMeta({
    id: "funky-drummer", title: "Funky Drummer", bpm, totalBeats,
    genre: "Funk", difficulty: 3,
    description: "Ghost snares over 16th hihats. The most sampled beat ever.",
    notes
  });
}

// Disco — 120 BPM, easy, ~60s
// Four-on-the-floor, open hihats on upbeats, snare on 2&4
function buildDisco() {
  const bpm = 120;
  const totalBeats = 120; // 30 bars = 60s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 8 === 0) addBeat(notes, bpm, b, "crash");

    // Four-on-the-floor
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat, "bass");
    }

    // Open hihat on upbeats (ride for open hat sound)
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat + 0.5, "ride");
    }

    // Closed hihat on downbeats
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, b + beat, "hihat");
    }

    // Snare on 2 & 4
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Tom fills every 8 bars
    if (bar % 8 === 7) {
      addBeat(notes, bpm, b + 3, "hightom");
      addBeat(notes, bpm, b + 3.25, "hightom");
      addBeat(notes, bpm, b + 3.5, "lowtom");
      addBeat(notes, bpm, b + 3.75, "lowtom");
    }
  }

  return finalizeSongWithMeta({
    id: "disco", title: "Disco", bpm, totalBeats,
    genre: "Funk", difficulty: 2,
    description: "Four-on-the-floor with open hats. Get on the dance floor.",
    notes
  });
}

// ---------------------------------------------------------------------------
// METAL
// ---------------------------------------------------------------------------

// Blast Beat — 200 BPM, expert, ~60s
// Extreme: alternating kick-snare 16ths, ride tremolo
function buildBlastBeat() {
  const bpm = 200;
  const totalBeats = 200; // 50 bars = 60s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 4 === 0) addBeat(notes, bpm, b, "crash");

    // Blast beat: alternating kick and snare on 16ths
    for (let i = 0; i < 16; i++) {
      if (i % 2 === 0) {
        addBeat(notes, bpm, b + i * 0.25, "bass");
      } else {
        addBeat(notes, bpm, b + i * 0.25, "snare");
      }
    }

    // Ride tremolo (every 8th note)
    for (let i = 0; i < 8; i++) {
      addBeat(notes, bpm, b + i * 0.5, "ride");
    }

    // Hihat accents on downbeats
    addBeat(notes, bpm, b, "hihat");
    addBeat(notes, bpm, b + 2, "hihat");

    // Double bass section every 4 bars
    if (bar % 4 === 2) {
      for (let i = 0; i < 16; i++) {
        addBeat(notes, bpm, b + i * 0.25, "bass");
      }
    }

    // Tom fills every 8 bars
    if (bar % 8 === 7) {
      addBeat(notes, bpm, b + 3, "hightom");
      addBeat(notes, bpm, b + 3.25, "lowtom");
      addBeat(notes, bpm, b + 3.5, "hightom");
      addBeat(notes, bpm, b + 3.75, "lowtom");
    }
  }

  return finalizeSongWithMeta({
    id: "blast-beat", title: "Blast Beat", bpm, totalBeats,
    genre: "Metal", difficulty: 5,
    description: "200 BPM. Alternating kick-snare 16ths. Pure endurance test.",
    notes
  });
}

// Double Bass — 160 BPM, hard, ~67s
// Constant double bass 16ths, snare on 2&4, ride
function buildDoubleBass() {
  const bpm = 160;
  const totalBeats = 180; // 45 bars ~67s
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const b = bar * 4;

    if (bar % 4 === 0) addBeat(notes, bpm, b, "crash");

    // Double bass: 16th notes throughout
    for (let i = 0; i < 16; i++) {
      addBeat(notes, bpm, b + i * 0.25, "bass");
    }

    // 8th-note ride
    for (let i = 0; i < 8; i++) {
      addBeat(notes, bpm, b + i * 0.5, "ride");
    }

    // Snare on 2 & 4
    addBeat(notes, bpm, b + 1, "snare");
    addBeat(notes, bpm, b + 3, "snare");

    // Extra snare accents
    if (bar % 4 === 2) {
      addBeat(notes, bpm, b + 1.5, "snare");
      addBeat(notes, bpm, b + 3.5, "snare");
    }

    // Hihat accent on 1 & 3
    addBeat(notes, bpm, b, "hihat");
    addBeat(notes, bpm, b + 2, "hihat");

    // Tom fills every 8 bars
    if (bar % 8 === 7) {
      addBeat(notes, bpm, b + 2.5, "hightom");
      addBeat(notes, bpm, b + 2.75, "hightom");
      addBeat(notes, bpm, b + 3, "lowtom");
      addBeat(notes, bpm, b + 3.25, "lowtom");
      addBeat(notes, bpm, b + 3.5, "hightom");
      addBeat(notes, bpm, b + 3.75, "lowtom");
    }
  }

  return finalizeSongWithMeta({
    id: "double-bass", title: "Double Bass", bpm, totalBeats,
    genre: "Metal", difficulty: 4,
    description: "Constant 16th kicks at 160 BPM. Feet of steel required.",
    notes
  });
}

// ---------------------------------------------------------------------------
// Helper: wraps finalizeSong with genre/difficulty metadata
// ---------------------------------------------------------------------------
function finalizeSongWithMeta(config) {
  const base = finalizeSong(config);
  base.genre = config.genre;
  base.difficulty = config.difficulty;
  return base;
}
