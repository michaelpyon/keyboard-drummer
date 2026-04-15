"use strict";

const LANE_META = [
  { id: "hihat", label: "Hi-Hat" },
  { id: "snare", label: "Snare" },
  { id: "bass", label: "Bass" },
  { id: "lowtom", label: "Low Tom" },
  { id: "hightom", label: "High Tom" },
  { id: "ride", label: "Ride" },
  { id: "crash", label: "Crash" }
];

const LANE_BY_ID = new Map(LANE_META.map((lane) => [lane.id, lane]));
const LANE_VISUAL_INDEX = new Map(LANE_META.map((lane, index) => [lane.id, index]));

const KEYMAPS = {
  righty: {
    hihat: ["k"],
    snare: ["h", "j"],
    bass: ["space"],
    lowtom: ["i", "o"],
    hightom: ["y", "u"],
    ride: ["9", "0"],
    crash: ["7", "8"]
  },
  lefty: {
    hihat: ["d"],
    snare: ["g", "h"],
    bass: ["space"],
    lowtom: ["e", "r"],
    hightom: ["t", "y"],
    ride: ["3", "4"],
    crash: ["5", "6"]
  }
};

const DISPLAY_KEY = {
  space: "SPACE",
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9"
};

const DRUM_KITS = {
  studio: {
    label: "Studio Maple",
    lanes: {
      bass: [
        { kind: "tone", type: "triangle", startFreq: 148, endFreq: 52, duration: 0.18, gain: 0.9 },
        { kind: "noise", filterType: "bandpass", frequency: 2300, q: 1.1, duration: 0.035, gain: 0.12 }
      ],
      snare: [
        { kind: "noise", filterType: "bandpass", frequency: 1850, q: 0.8, duration: 0.14, gain: 0.72 },
        { kind: "tone", type: "triangle", startFreq: 320, endFreq: 190, duration: 0.09, gain: 0.14 }
      ],
      hihat: [
        { kind: "noise", filterType: "highpass", frequency: 6500, q: 0.6, duration: 0.06, gain: 0.34 },
        { kind: "noise", filterType: "bandpass", frequency: 9200, q: 0.8, duration: 0.03, gain: 0.16 }
      ],
      lowtom: [
        { kind: "tone", type: "triangle", startFreq: 200, endFreq: 88, duration: 0.22, gain: 0.56 },
        { kind: "noise", filterType: "bandpass", frequency: 1200, q: 0.9, duration: 0.05, gain: 0.08 }
      ],
      hightom: [
        { kind: "tone", type: "triangle", startFreq: 280, endFreq: 136, duration: 0.18, gain: 0.5 },
        { kind: "noise", filterType: "bandpass", frequency: 1700, q: 0.9, duration: 0.04, gain: 0.07 }
      ],
      ride: [
        { kind: "noise", filterType: "bandpass", frequency: 5200, q: 0.95, duration: 0.22, gain: 0.29 },
        { kind: "noise", filterType: "highpass", frequency: 7600, q: 0.7, duration: 0.09, gain: 0.15 }
      ],
      crash: [
        { kind: "noise", filterType: "highpass", frequency: 4300, q: 0.7, duration: 0.35, gain: 0.42 },
        { kind: "noise", filterType: "bandpass", frequency: 8500, q: 0.8, duration: 0.17, gain: 0.2 }
      ]
    }
  },
  arena: {
    label: "Arena Rock",
    lanes: {
      bass: [
        { kind: "tone", type: "sine", startFreq: 132, endFreq: 46, duration: 0.24, gain: 1.0 },
        { kind: "noise", filterType: "bandpass", frequency: 1800, q: 0.9, duration: 0.045, gain: 0.14 }
      ],
      snare: [
        { kind: "noise", filterType: "bandpass", frequency: 1650, q: 0.7, duration: 0.17, gain: 0.8 },
        { kind: "tone", type: "triangle", startFreq: 285, endFreq: 160, duration: 0.12, gain: 0.16 }
      ],
      hihat: [
        { kind: "noise", filterType: "highpass", frequency: 5800, q: 0.55, duration: 0.08, gain: 0.35 }
      ],
      lowtom: [
        { kind: "tone", type: "triangle", startFreq: 180, endFreq: 78, duration: 0.26, gain: 0.62 }
      ],
      hightom: [
        { kind: "tone", type: "triangle", startFreq: 260, endFreq: 120, duration: 0.22, gain: 0.57 }
      ],
      ride: [
        { kind: "noise", filterType: "bandpass", frequency: 4900, q: 0.92, duration: 0.28, gain: 0.34 }
      ],
      crash: [
        { kind: "noise", filterType: "highpass", frequency: 3900, q: 0.65, duration: 0.45, gain: 0.5 }
      ]
    }
  },
  electronic: {
    label: "Electronic",
    lanes: {
      bass: [
        { kind: "tone", type: "sine", startFreq: 112, endFreq: 44, duration: 0.13, gain: 0.95 },
        { kind: "tone", type: "square", startFreq: 220, endFreq: 90, duration: 0.05, gain: 0.08 }
      ],
      snare: [
        { kind: "noise", filterType: "bandpass", frequency: 2300, q: 0.9, duration: 0.1, gain: 0.75 },
        { kind: "tone", type: "square", startFreq: 420, endFreq: 190, duration: 0.06, gain: 0.09 }
      ],
      hihat: [
        { kind: "noise", filterType: "highpass", frequency: 7800, q: 0.5, duration: 0.04, gain: 0.37 }
      ],
      lowtom: [
        { kind: "tone", type: "sine", startFreq: 170, endFreq: 74, duration: 0.15, gain: 0.56 }
      ],
      hightom: [
        { kind: "tone", type: "sine", startFreq: 240, endFreq: 110, duration: 0.13, gain: 0.52 }
      ],
      ride: [
        { kind: "noise", filterType: "bandpass", frequency: 6100, q: 1.1, duration: 0.16, gain: 0.32 }
      ],
      crash: [
        { kind: "noise", filterType: "highpass", frequency: 6100, q: 0.7, duration: 0.24, gain: 0.45 }
      ]
    }
  }
};

const APPROACH_TIME = 2.2;
const HIT_WINDOW = 0.16;
const GOOD_WINDOW = 0.1;
const PERFECT_WINDOW = 0.05;
const MISS_WINDOW = 0.2;
const LEAD_IN = 1.9;
const HIT_LINE_OFFSET = 86;
const NOTE_HEIGHT = 18;

const songSelect = document.getElementById("songSelect");
const handMode = document.getElementById("handMode");
const kitSelect = document.getElementById("kitSelect");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const jamBtn = document.getElementById("jamBtn");
const recordBtn = document.getElementById("recordBtn");
const statusText = document.getElementById("statusText");
const modeReadout = document.getElementById("modeReadout");
const scoreValue = document.getElementById("scoreValue");
const comboValue = document.getElementById("comboValue");
const maxComboValue = document.getElementById("maxComboValue");
const accuracyValue = document.getElementById("accuracyValue");
const streakReadout = document.getElementById("streakReadout");
const keyMapGrid = document.getElementById("keyMapGrid");
const judgementEl = document.getElementById("judgement");
const countdownEl = document.getElementById("countdown");
const gameArea = document.getElementById("gameArea");
const beatGuideLayer = document.getElementById("beatGuideLayer");
const flashLayer = document.getElementById("flashLayer");
const shareModal = document.getElementById("shareModal");
const shareStatsEl = document.getElementById("shareStats");
const shareXBtn = document.getElementById("shareXBtn");
const sharePlayAgainBtn = document.getElementById("sharePlayAgainBtn");

// Song library elements
const songLibrary = document.getElementById("songLibrary");
const gameScreen = document.getElementById("gameScreen");
const songGrid = document.getElementById("songGrid");
const genreTabs = document.getElementById("genreTabs");
const diffSortBtn = document.getElementById("diffSortBtn");
const jamModeLibBtn = document.getElementById("jamModeLibBtn");
const backToLibBtn = document.getElementById("backToLibBtn");

// Progress bar elements
const songProgressBar = document.getElementById("songProgressBar");
const songProgressFill = document.getElementById("songProgressFill");
const songProgressLabel = document.getElementById("songProgressLabel");

// Results modal elements
const resultsModal = document.getElementById("resultsModal");
const resultsTitle = document.getElementById("resultsTitle");
const resultsSummary = document.getElementById("resultsSummary");
const resultsLanes = document.getElementById("resultsLanes");
const resultsRetryBtn = document.getElementById("resultsRetryBtn");
const resultsLibraryBtn = document.getElementById("resultsLibraryBtn");
const resultsShareBtn = document.getElementById("resultsShareBtn");

const laneEls = {};
for (const lane of document.querySelectorAll(".lane")) {
  laneEls[lane.dataset.lane] = lane;
}

const songs = buildSongLibrary();

let activeSong = songs[0];
let activeMapping = KEYMAPS.righty;
let activeKitId = "studio";
let keyToLane = new Map();

// Song library state
let libraryGenreFilter = "all";
let librarySortMode = "default"; // "default", "asc", "desc"

// Per-lane hit tracking for results screen
let laneHits = {};
let laneMisses = {};
let perfectCount = 0;
let goodCount = 0;
let okCount = 0;

let isRunning = false;
let jamModeActive = true;
let isRecording = false;
let recordingStartMs = 0;
let recordedHits = [];
let recordingCount = 0;

let rafId = null;
let startTimeMs = 0;
let nextSpawnIndex = 0;
let songNotes = [];
let activeNotes = [];
let beatGuideSchedule = [];
let nextGuideIndex = 0;
let activeBeatGuides = [];

// Metronome lookahead scheduler: uses AudioContext.currentTime as master clock
// instead of RAF frame timing so clicks fire at precise beat boundaries.
const METRO_LOOKAHEAD_SEC = 0.1;  // schedule this many seconds ahead
const METRO_INTERVAL_MS  = 25;    // how often the scheduler polls (ms)
let metronomeSchedulerId  = null;
let nextMetronomeTime     = 0;
let metronomeBeatIndex    = 0;
let metronomeBpm          = 120;

let score = 0;
let combo = 0;
let maxCombo = 0;
let hits = 0;
let misses = 0;

let judgementTimer = null;
let perfectPulseTimer = null;
const laneReleaseTimers = {};
let audioEngine = null;
let audioReady = false;
let audioUnlockPromise = null;

init();

function init() {
  gameArea.tabIndex = 0;

  populateSongSelect();
  populateKitSelect();
  applyHandMode("righty");
  resetScoreboard();
  setStatus("Choose a song, or use Jam Mode to freestyle.");
  updateModeReadout();
  refreshRecordButton();
  bindAudioUnlock();
  renderSongLibrary();
  bindLibraryEvents();

  startBtn.addEventListener("click", () => {
    startSong();
  });

  restartBtn.addEventListener("click", () => {
    startSong();
  });

  if (shareXBtn) {
    shareXBtn.addEventListener("click", () => {
      const url = "https://twitter.com/intent/tweet?text=I+just+jammed+out+on+Keyboard+Drummer+%F0%9F%A5%81+Try+it+%E2%86%92&url=https%3A%2F%2Fmichaelpyon.github.io%2Fkeyboard-drummer%2F";
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  if (sharePlayAgainBtn) {
    sharePlayAgainBtn.addEventListener("click", () => {
      hideShareModal();
      startSong();
    });
  }

  jamBtn.addEventListener("click", () => {
    enterJamMode();
  });

  recordBtn.addEventListener("click", () => {
    toggleRecording();
  });

  songSelect.addEventListener("change", () => {
    const selected = songs.find((song) => song.id === songSelect.value);
    if (!selected) {
      return;
    }

    activeSong = selected;
    if (!isRunning && !isRecording) {
      setStatus(`${activeSong.title}: ${activeSong.description}`);
    }
  });

  handMode.addEventListener("change", () => {
    applyHandMode(handMode.value);
  });

  kitSelect.addEventListener("change", () => {
    if (DRUM_KITS[kitSelect.value]) {
      activeKitId = kitSelect.value;
    }
    if (!isRunning && !isRecording) {
      setStatus(`${activeSong.title}: ${activeSong.description} | Kit: ${getActiveKit().label}`);
    }
  });

  if (backToLibBtn) {
    backToLibBtn.addEventListener("click", () => {
      showLibrary();
    });
  }

  // Results modal buttons
  if (resultsRetryBtn) {
    resultsRetryBtn.addEventListener("click", () => {
      hideResultsModal();
      startSong();
    });
  }
  if (resultsLibraryBtn) {
    resultsLibraryBtn.addEventListener("click", () => {
      hideResultsModal();
      showLibrary();
    });
  }
  if (resultsShareBtn) {
    resultsShareBtn.addEventListener("click", () => {
      const url = "https://twitter.com/intent/tweet?text=I+just+jammed+out+on+Keyboard+Drummer+%F0%9F%A5%81+Try+it+%E2%86%92&url=https%3A%2F%2Fmichaelpyon.github.io%2Fkeyboard-drummer%2F";
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  window.addEventListener("keydown", onKeyDown, { capture: true });
  gameArea.addEventListener("pointerdown", focusGameArea);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      focusGameArea();
    }
  });
}

function bindAudioUnlock() {
  const overlay = document.getElementById("audioOverlay");

  const unlock = () => {
    ensureAudioRunning();
    if (audioReady) {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
      dismissAudioOverlay(overlay);
    }
  };

  const dismissAndUnlock = () => {
    ensureAudioRunning();
    dismissAudioOverlay(overlay);
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("touchstart", unlock);
    window.removeEventListener("keydown", unlock);
  };

  if (overlay) {
    overlay.addEventListener("click", dismissAndUnlock);
  }

  window.addEventListener("pointerdown", unlock);
  window.addEventListener("touchstart", unlock, { passive: true });
  window.addEventListener("keydown", unlock);
}

function dismissAudioOverlay(overlay) {
  if (!overlay || overlay.classList.contains("dismissed")) {
    return;
  }

  overlay.classList.add("dismissed");
  overlay.addEventListener("transitionend", () => {
    overlay.remove();
  }, { once: true });
}

function populateSongSelect() {
  songSelect.innerHTML = "";
  for (const song of songs) {
    appendSongOption(song);
  }
  songSelect.value = songs[0].id;
}

function populateKitSelect() {
  kitSelect.innerHTML = "";
  const entries = Object.entries(DRUM_KITS);
  for (const [kitId, kit] of entries) {
    const option = document.createElement("option");
    option.value = kitId;
    option.textContent = kit.label;
    kitSelect.appendChild(option);
  }

  if (DRUM_KITS[activeKitId]) {
    kitSelect.value = activeKitId;
  } else if (entries.length > 0) {
    activeKitId = entries[0][0];
    kitSelect.value = activeKitId;
  }
}

function appendSongOption(song) {
  const option = document.createElement("option");
  option.value = song.id;
  option.textContent = `${song.title} (${song.bpm} BPM)`;
  songSelect.appendChild(option);
}

function applyHandMode(mode) {
  activeMapping = KEYMAPS[mode] || KEYMAPS.righty;
  keyToLane = new Map();

  for (const lane of LANE_META) {
    const keys = activeMapping[lane.id] || [];
    for (const key of keys) {
      keyToLane.set(key, lane.id);
    }

    const laneKeyEl = document.getElementById(`key-${lane.id}`);
    if (laneKeyEl) {
      laneKeyEl.textContent = formatLaneKeys(keys);
    }
  }

  renderKeyTiles();

  if (!isRunning && !isRecording) {
    setStatus(`${activeSong.title}: ${activeSong.description} | ${mode === "lefty" ? "Lefty" : "Righty"} mode | Kit: ${getActiveKit().label}`);
  }
}

function renderKeyTiles() {
  keyMapGrid.innerHTML = "";

  for (const lane of LANE_META) {
    const tile = document.createElement("article");
    tile.className = "key-tile";

    const name = document.createElement("span");
    name.textContent = lane.label;

    const key = document.createElement("strong");
    key.textContent = formatLaneKeys(activeMapping[lane.id] || []);

    tile.append(name, key);
    keyMapGrid.appendChild(tile);
  }
}

function startSong() {
  const selected = songs.find((song) => song.id === songSelect.value);
  if (selected) {
    activeSong = selected;
  }

  stopLoop();
  clearNotes();
  resetScoreboard();

  songNotes = activeSong.notes.map((note, index) => ({
    id: index,
    lane: note.lane,
    time: note.time,
    spawned: false,
    hit: false,
    missed: false,
    el: null
  }));
  buildBeatGuideSchedule(activeSong);

  nextSpawnIndex = 0;
  activeNotes = [];
  isRunning = true;
  jamModeActive = false;
  startTimeMs = performance.now();

  // Start the precise metronome scheduler. First beat fires after LEAD_IN seconds.
  const _startEngine = getAudioEngine();
  const _audioLeadIn = _startEngine ? _startEngine.ctx.currentTime + LEAD_IN : LEAD_IN;
  startMetronomeScheduler(activeSong.bpm, _audioLeadIn);

  setStatus(`Playing ${activeSong.title}...`);
  countdownEl.textContent = "Ready";
  updateModeReadout();
  focusGameArea();

  rafId = requestAnimationFrame(gameLoop);
}

function enterJamMode() {
  stopLoop();
  clearNotes();
  isRunning = false;
  jamModeActive = true;
  hideSongProgress();
  setStatus("Jam mode active. Play freely; drums are always live.");
  updateModeReadout();
  focusGameArea();
}

function toggleRecording() {
  if (isRecording) {
    stopRecording();
  } else {
    startRecording();
  }
}

function startRecording() {
  isRecording = true;
  recordingStartMs = performance.now();
  recordedHits = [];
  refreshRecordButton();
  updateModeReadout();

  if (isRunning) {
    setStatus(`Recording while playing ${activeSong.title}...`);
  } else {
    setStatus("Recording in Jam Mode. Hit your drum keys now.");
  }
}

function stopRecording() {
  isRecording = false;
  refreshRecordButton();

  if (recordedHits.length === 0) {
    setStatus("Recording stopped. No hits captured.");
    updateModeReadout();
    return;
  }

  const recordingSong = createRecordedSong(recordedHits);
  songs.push(recordingSong);
  appendSongOption(recordingSong);

  songSelect.value = recordingSong.id;
  activeSong = recordingSong;

  setStatus(`Saved ${recordingSong.title} with ${recordedHits.length} hits. Press Start Song to replay it.`);
  updateModeReadout();
}

function createRecordedSong(hits) {
  recordingCount += 1;
  const id = `my-take-${Date.now()}-${recordingCount}`;
  const title = `My Take ${recordingCount}`;

  const notes = hits
    .filter((hit) => LANE_BY_ID.has(hit.lane))
    .map((hit) => ({
      lane: hit.lane,
      time: hit.time + LEAD_IN
    }))
    .sort((a, b) => a.time - b.time);

  const maxTime = notes.length > 0 ? notes[notes.length - 1].time : LEAD_IN + 1;
  const playedSeconds = Math.max(0, maxTime - LEAD_IN);

  return {
    id,
    title,
    bpm: activeSong.bpm || 120,
    description: `Recorded ${hits.length} hits over ${playedSeconds.toFixed(1)}s.`,
    notes,
    duration: maxTime + 2.4
  };
}

function refreshRecordButton() {
  recordBtn.textContent = isRecording ? "Stop Recording" : "Start Recording";
  recordBtn.classList.toggle("recording", isRecording);
  recordBtn.setAttribute("aria-pressed", String(isRecording));
}

function updateModeReadout() {
  if (!modeReadout) {
    return;
  }

  modeReadout.classList.remove("playing", "jam", "recording");
  jamBtn.classList.toggle("active", jamModeActive && !isRunning);

  const audioLabel = getAudioStatusLabel();
  const suffix = ` | ${audioLabel}`;

  if (isRecording && isRunning) {
    modeReadout.textContent = `Mode: Recording + Playing${suffix}`;
    modeReadout.classList.add("recording");
    return;
  }

  if (isRecording && !isRunning) {
    modeReadout.textContent = `Mode: Recording + Jam${suffix}`;
    modeReadout.classList.add("recording");
    return;
  }

  if (isRunning) {
    modeReadout.textContent = `Mode: Playing${suffix}`;
    modeReadout.classList.add("playing");
    return;
  }

  if (jamModeActive) {
    modeReadout.textContent = `Mode: Jam${suffix}`;
    modeReadout.classList.add("jam");
    return;
  }

  modeReadout.textContent = `Mode: Idle${suffix}`;
}

function getAudioStatusLabel() {
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) {
    return "Audio Unavailable";
  }

  if (audioReady) {
    return "Audio On";
  }

  return "Audio Locked";
}

function onKeyDown(event) {
  const key = normalizeKey(event);
  const lane = keyToLane.get(key);
  if (!lane) {
    return;
  }

  event.preventDefault();
  if (event.repeat) {
    return;
  }

  handleLaneHit(lane);
}

function focusGameArea() {
  if (document.activeElement === gameArea) {
    return;
  }

  gameArea.focus({ preventScroll: true });
}

function gameLoop(now) {
  if (!isRunning) {
    return;
  }

  const elapsed = (now - startTimeMs) / 1000;

  renderCountdown(elapsed);

  spawnBeatGuides(elapsed);
  positionBeatGuides(elapsed);
  spawnNotes(elapsed);
  positionNotes(elapsed);
  updateSongProgress(elapsed);
  checkSongEnd(elapsed);

  rafId = requestAnimationFrame(gameLoop);
}

function renderCountdown(elapsed) {
  const remaining = LEAD_IN - elapsed;

  if (remaining > 1.2) {
    countdownEl.textContent = "Ready";
  } else if (remaining > 0.6) {
    countdownEl.textContent = "Set";
  } else if (remaining > 0) {
    countdownEl.textContent = "Go";
  } else {
    countdownEl.textContent = "";
  }
}

function buildBeatGuideSchedule(song) {
  beatGuideSchedule = [];
  nextGuideIndex = 0;
  activeBeatGuides = [];

  if (!song || !Number.isFinite(song.bpm) || song.bpm <= 0) {
    return;
  }

  const beatDuration = 60 / song.bpm;
  const halfStep = beatDuration / 2;
  const maxTime = Math.max(song.duration, LEAD_IN + beatDuration * 16);

  for (let idx = 0; ; idx += 1) {
    const time = LEAD_IN + idx * halfStep;
    if (time > maxTime) {
      break;
    }

    let tier = "half";
    if (idx % 2 === 0) {
      tier = "beat";
    }
    if (idx % 8 === 0) {
      tier = "bar";
    }

    beatGuideSchedule.push({
      id: idx,
      time,
      tier
    });
  }
}

function spawnBeatGuides(elapsed) {
  if (!beatGuideLayer) {
    return;
  }

  while (nextGuideIndex < beatGuideSchedule.length) {
    const guide = beatGuideSchedule[nextGuideIndex];
    if (guide.time - elapsed > APPROACH_TIME) {
      break;
    }

    const el = document.createElement("div");
    el.className = `beat-guide ${guide.tier}`;
    beatGuideLayer.appendChild(el);

    activeBeatGuides.push({
      id: guide.id,
      time: guide.time,
      tier: guide.tier,
      el
    });
    nextGuideIndex += 1;
  }
}

function positionBeatGuides(elapsed) {
  const hitLineY = gameArea.clientHeight - HIT_LINE_OFFSET;
  const keep = [];

  for (const guide of activeBeatGuides) {
    const delta = guide.time - elapsed;
    if (delta < -MISS_WINDOW) {
      if (guide.el && guide.el.parentNode) {
        guide.el.parentNode.removeChild(guide.el);
      }
      continue;
    }

    const progress = 1 - delta / APPROACH_TIME;
    const clamped = clamp(progress, -0.2, 1.4);
    const y = clamped * hitLineY;

    if (guide.el) {
      guide.el.style.transform = `translateY(${y}px)`;
    }

    keep.push(guide);
  }

  activeBeatGuides = keep;
}

function spawnNotes(elapsed) {
  while (nextSpawnIndex < songNotes.length) {
    const note = songNotes[nextSpawnIndex];
    if (note.time - elapsed > APPROACH_TIME) {
      break;
    }

    const laneEl = laneEls[note.lane];
    if (!laneEl) {
      nextSpawnIndex += 1;
      continue;
    }

    const el = document.createElement("div");
    el.className = `note note-${note.lane}`;
    laneEl.appendChild(el);

    note.spawned = true;
    note.el = el;
    activeNotes.push(note);
    nextSpawnIndex += 1;
  }
}

function positionNotes(elapsed) {
  // Notes (18px tall) need to land ON the outline (bottom: 86px, also 18px tall).
  // Without the offset, note.top lands at the outline's bottom edge at progress=1,
  // making "perfect" visually appear 18px too late. Subtracting NOTE_HEIGHT aligns them.
  const hitLineY = gameArea.clientHeight - HIT_LINE_OFFSET - NOTE_HEIGHT;
  const keep = [];

  for (const note of activeNotes) {
    if (note.hit || note.missed) {
      continue;
    }

    const delta = note.time - elapsed;

    if (delta < -MISS_WINDOW) {
      registerMiss(note);
      continue;
    }

    const progress = 1 - delta / APPROACH_TIME;
    const clamped = clamp(progress, -0.2, 1.4);
    const y = clamped * hitLineY;

    if (note.el) {
      note.el.style.transform = `translateY(${y}px)`;
    }

    keep.push(note);
  }

  activeNotes = keep;
}

function handleLaneHit(lane) {
  pressLane(lane);
  playLaneSound(lane);
  captureRecordedHit(lane);

  if (!isRunning) {
    return;
  }

  const elapsed = (performance.now() - startTimeMs) / 1000;
  if (elapsed < LEAD_IN - 0.2) {
    return;
  }

  const target = findBestTarget(lane, elapsed);

  if (!target) {
    registerGhostMiss(lane);
    return;
  }

  registerHit(target, elapsed);
}

function captureRecordedHit(lane) {
  if (!isRecording) {
    return;
  }

  const elapsed = (performance.now() - recordingStartMs) / 1000;
  if (elapsed < 0) {
    return;
  }

  recordedHits.push({ lane, time: elapsed });
}

function findBestTarget(lane, elapsed) {
  let best = null;
  let smallest = Number.POSITIVE_INFINITY;

  for (const note of activeNotes) {
    if (note.lane !== lane || note.hit || note.missed) {
      continue;
    }

    const diff = Math.abs(note.time - elapsed);
    if (diff < smallest) {
      smallest = diff;
      best = note;
    }
  }

  if (!best || smallest > HIT_WINDOW) {
    return null;
  }

  return best;
}

function registerHit(note, elapsed) {
  const error = Math.abs(note.time - elapsed);
  let points = 100;
  let text = "Ok";
  let css = "ok";

  if (error <= PERFECT_WINDOW) {
    points = 300;
    text = "Perfect";
    css = "perfect";
    perfectCount += 1;
  } else if (error <= GOOD_WINDOW) {
    points = 180;
    text = "Good";
    css = "good";
    goodCount += 1;
  } else {
    okCount += 1;
  }

  note.hit = true;
  removeNoteElement(note, css);

  combo += 1;
  maxCombo = Math.max(maxCombo, combo);
  hits += 1;
  score += points + combo * 3;

  // Track per-lane hits
  if (laneHits[note.lane] !== undefined) {
    laneHits[note.lane] += 1;
  }

  showJudgement(text, css);
  triggerHitFx(note.lane, css);
  if (css === "perfect") {
    pulsePerfect();
  }
  updateStats();
}

function registerMiss(note) {
  if (note && !note.missed && !note.hit) {
    note.missed = true;
    removeNoteElement(note);
  }

  combo = 0;
  misses += 1;

  // Track per-lane misses
  if (note && laneMisses[note.lane] !== undefined) {
    laneMisses[note.lane] += 1;
  }

  showJudgement("Miss", "miss");
  if (note) {
    triggerHitFx(note.lane, "miss");
  }
  updateStats();
}

function registerGhostMiss(lane) {
  combo = 0;
  misses += 1;

  showJudgement("Miss", "miss");
  triggerHitFx(lane, "miss");
  updateStats();
}

function removeNoteElement(note, quality) {
  if (note.el && note.el.parentNode) {
    if (quality && quality !== "miss") {
      // Burst animation instead of instant removal
      const el = note.el;
      el.classList.add("note-hit", `note-hit-${quality}`);
      el.addEventListener("animationend", () => {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    } else {
      note.el.parentNode.removeChild(note.el);
    }
  }
  note.el = null;
}

function checkSongEnd(elapsed) {
  const doneTime = elapsed > activeSong.duration;
  const doneNotes = nextSpawnIndex >= songNotes.length;

  if (!doneTime || !doneNotes || activeNotes.length > 0) {
    return;
  }

  isRunning = false;
  stopLoop();
  hideSongProgress();

  const accuracy = computeAccuracy();
  setStatus(`Finished ${activeSong.title}. Score ${score}, accuracy ${accuracy}%, max combo ${maxCombo}.`);
  updateModeReadout();
  showResultsModal();
}

function showShareModal() {
  if (!shareModal || !shareStatsEl) return;

  const accuracy = computeAccuracy();
  shareStatsEl.innerHTML =
    `<strong>${activeSong.title}</strong><br>` +
    `Score: <strong>${score}</strong> &nbsp;|&nbsp; ` +
    `Max Combo: <strong>${maxCombo}</strong> &nbsp;|&nbsp; ` +
    `Accuracy: <strong>${accuracy}%</strong>`;

  shareModal.classList.add("visible");
  // Focus trap: focus first button, trap Tab, close on Escape
  const firstBtn = shareModal.querySelector("button");
  if (firstBtn) firstBtn.focus();
  shareModal._trapHandler = function (e) {
    if (e.key === "Escape") { hideShareModal(); return; }
    if (e.key !== "Tab") return;
    const btns = shareModal.querySelectorAll("button");
    const first = btns[0], last = btns[btns.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  shareModal.addEventListener("keydown", shareModal._trapHandler);
}

function hideShareModal() {
  if (!shareModal) return;
  shareModal.classList.remove("visible");
  if (shareModal._trapHandler) {
    shareModal.removeEventListener("keydown", shareModal._trapHandler);
    shareModal._trapHandler = null;
  }
}

function stopLoop() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  stopMetronomeScheduler();
}

function updateStats() {
  scoreValue.textContent = String(score);
  comboValue.textContent = String(combo);
  maxComboValue.textContent = String(maxCombo);
  accuracyValue.textContent = `${computeAccuracy()}%`;
  updateStreakReadout();
}

function resetScoreboard() {
  score = 0;
  combo = 0;
  maxCombo = 0;
  hits = 0;
  misses = 0;
  perfectCount = 0;
  goodCount = 0;
  okCount = 0;
  laneHits = {};
  laneMisses = {};
  for (const lane of LANE_META) {
    laneHits[lane.id] = 0;
    laneMisses[lane.id] = 0;
  }
  updateStats();
}

function updateStreakReadout() {
  if (!streakReadout) {
    return;
  }

  streakReadout.classList.remove("hot", "fire");

  if (combo >= 24) {
    streakReadout.textContent = `ON FIRE x${combo}`;
    streakReadout.classList.add("fire");
    return;
  }

  if (combo >= 12) {
    streakReadout.textContent = `HOT STREAK x${combo}`;
    streakReadout.classList.add("hot");
    return;
  }

  if (combo >= 5) {
    streakReadout.textContent = `STREAK x${combo}`;
    streakReadout.classList.add("hot");
    return;
  }

  if (combo > 0) {
    streakReadout.textContent = `Combo x${combo}`;
    return;
  }

  streakReadout.textContent = "Build a streak!";
}

function computeAccuracy() {
  const attempts = hits + misses;
  if (attempts === 0) {
    return 100;
  }

  return Math.round((hits / attempts) * 100);
}

function setStatus(message) {
  statusText.textContent = message;
}

function showJudgement(text, css) {
  judgementEl.textContent = text;
  judgementEl.className = `judgement ${css} show`;

  if (judgementTimer !== null) {
    clearTimeout(judgementTimer);
  }

  judgementTimer = setTimeout(() => {
    judgementEl.className = "judgement";
  }, 260);
}

function triggerHitFx(lane, quality) {
  const laneEl = laneEls[lane];
  if (laneEl) {
    const flash = document.createElement("div");
    flash.className = `hit-flash ${quality}`;
    laneEl.appendChild(flash);
    flash.addEventListener("animationend", () => {
      flash.remove();
    });
  }

  spawnStreakLines(lane, quality);
  if (quality === "perfect" || (quality === "good" && combo >= 5)) {
    spawnParticles(lane, quality);
  }
}

function spawnParticles(lane, quality) {
  if (!flashLayer) return;
  const laneIdx = LANE_VISUAL_INDEX.get(lane);
  const centerX = laneIdx === undefined ? 50 : ((laneIdx + 0.5) / LANE_META.length) * 100;
  const hitY = gameArea.clientHeight - HIT_LINE_OFFSET;
  const count = quality === "perfect" ? 8 : 4;
  // Derive particle palettes from CSS tokens (cached after first call)
  if (!spawnParticles._colors) {
    const rs = getComputedStyle(document.documentElement);
    spawnParticles._colors = {
      perfect: [rs.getPropertyValue("--accent-1").trim(), rs.getPropertyValue("--particle-perfect-a").trim(), rs.getPropertyValue("--particle-perfect-b").trim()],
      good: [rs.getPropertyValue("--accent-3").trim(), rs.getPropertyValue("--particle-good-a").trim(), rs.getPropertyValue("--particle-good-b").trim()],
      ok: [rs.getPropertyValue("--accent-2").trim(), rs.getPropertyValue("--lane-bass").trim(), rs.getPropertyValue("--particle-ok").trim()]
    };
  }
  const palette = spawnParticles._colors[quality] || spawnParticles._colors.ok;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "hit-particle";
    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
    const dist = 40 + Math.random() * 60;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 30;
    const size = 3 + Math.random() * 4;
    p.style.cssText = `
      left: ${centerX}%;
      top: ${hitY}px;
      width: ${size}px;
      height: ${size}px;
      background: ${palette[Math.floor(Math.random() * palette.length)]};
      --dx: ${dx}px;
      --dy: ${dy}px;
    `;
    flashLayer.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
}

function spawnStreakLines(lane, quality) {
  if (!flashLayer) {
    return;
  }

  let count = 0;
  if (quality === "perfect") {
    if (combo >= 24) {
      count = 6;
    } else if (combo >= 12) {
      count = 4;
    } else if (combo >= 5) {
      count = 2;
    } else {
      count = 1;
    }
  } else if ((quality === "good" || quality === "ok") && combo >= 10) {
    count = 1;
  }

  if (count === 0) {
    return;
  }

  const laneIdx = LANE_VISUAL_INDEX.get(lane);
  const center = laneIdx === undefined ? 50 : ((laneIdx + 0.5) / LANE_META.length) * 100;
  const levelClass = combo >= 24 ? "fire" : combo >= 12 ? "hot" : "";

  for (let i = 0; i < count; i += 1) {
    const streak = document.createElement("div");
    streak.className = `streak-line ${levelClass}`.trim();
    const x = clamp(center + (Math.random() * 12 - 6), 3, 97);
    const height = 72 + Math.random() * 96;
    streak.style.setProperty("--x", `${x}%`);
    streak.style.setProperty("--h", `${height}px`);

    flashLayer.appendChild(streak);
    streak.addEventListener("animationend", () => {
      streak.remove();
    });
  }
}

function pulsePerfect() {
  gameArea.classList.remove("perfect-pulse");
  requestAnimationFrame(() => {
    gameArea.classList.add("perfect-pulse");
  });

  if (perfectPulseTimer !== null) {
    clearTimeout(perfectPulseTimer);
  }

  perfectPulseTimer = setTimeout(() => {
    gameArea.classList.remove("perfect-pulse");
  }, 260);
}

function pressLane(lane) {
  const laneEl = laneEls[lane];
  if (!laneEl) {
    return;
  }

  laneEl.classList.add("pressed");

  const timer = laneReleaseTimers[lane];
  if (timer) {
    clearTimeout(timer);
  }

  laneReleaseTimers[lane] = setTimeout(() => {
    laneEl.classList.remove("pressed");
  }, 120);
}

function clearNotes() {
  for (const note of document.querySelectorAll(".note, .beat-guide")) {
    note.remove();
  }

  for (const flash of document.querySelectorAll(".hit-flash, .streak-line")) {
    flash.remove();
  }

  gameArea.classList.remove("perfect-pulse");

  activeNotes = [];
  activeBeatGuides = [];
  beatGuideSchedule = [];
  nextSpawnIndex = 0;
  nextGuideIndex = 0;
  countdownEl.textContent = "";
  judgementEl.className = "judgement";
}

function normalizeKey(event) {
  if (event.code === "Space") {
    return "space";
  }

  const key = event.key.toLowerCase();
  if (key === " ") {
    return "space";
  }

  return key;
}

function formatLaneKeys(keys) {
  if (!keys || keys.length === 0) {
    return "-";
  }

  return keys.map((key) => formatKey(key)).join(" / ");
}

function formatKey(key) {
  return DISPLAY_KEY[key] || key.toUpperCase();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// ---------------------------------------------------------------------------
// Metronome lookahead scheduler
// Beats are scheduled METRO_LOOKAHEAD_SEC ahead of AudioContext.currentTime so
// the Web Audio engine receives precise timestamps instead of "play now" calls
// that arrive late due to RAF jitter. The setTimeout loop runs at METRO_INTERVAL_MS
// but audio events fire at exact beat boundaries regardless of JS timing noise.
// ---------------------------------------------------------------------------

function startMetronomeScheduler(bpm, audioStartTime) {
  stopMetronomeScheduler();
  metronomeBpm        = bpm;
  nextMetronomeTime   = audioStartTime;
  metronomeBeatIndex  = 0;
  runMetronomeScheduler();
}

function runMetronomeScheduler() {
  const engine = getAudioEngine();
  if (engine && audioReady) {
    const ctx         = engine.ctx;
    const beatDur     = 60 / metronomeBpm;

    // If we fell behind (e.g. audio was suspended at start), fast-forward
    // to the nearest upcoming beat rather than spamming every missed one.
    if (nextMetronomeTime < ctx.currentTime) {
      const behind       = Math.ceil((ctx.currentTime - nextMetronomeTime) / beatDur);
      nextMetronomeTime += behind * beatDur;
      metronomeBeatIndex += behind;
    }

    while (nextMetronomeTime < ctx.currentTime + METRO_LOOKAHEAD_SEC) {
      scheduleMetronomeClick(ctx, engine.output, nextMetronomeTime, metronomeBeatIndex % 4 === 0);
      nextMetronomeTime  += beatDur;
      metronomeBeatIndex += 1;
    }
  }
  metronomeSchedulerId = setTimeout(runMetronomeScheduler, METRO_INTERVAL_MS);
}

function stopMetronomeScheduler() {
  if (metronomeSchedulerId !== null) {
    clearTimeout(metronomeSchedulerId);
    metronomeSchedulerId = null;
  }
}

function scheduleMetronomeClick(ctx, output, when, isDownbeat) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type           = 'sine';
  osc.frequency.value = isDownbeat ? 1200 : 900;
  gain.gain.setValueAtTime(isDownbeat ? 0.18 : 0.1, when);
  gain.gain.exponentialRampToValueAtTime(0.001, when + 0.04);
  osc.connect(gain);
  gain.connect(output);
  osc.start(when);
  osc.stop(when + 0.05);
}

function playLaneSound(lane) {
  const ready = ensureAudioRunning(() => {
    playLaneSound(lane);
  });
  if (!ready) {
    return;
  }

  const engine = getAudioEngine();
  if (!engine) {
    return;
  }

  const kit = getActiveKit();
  const voices = (kit.lanes && kit.lanes[lane]) ? kit.lanes[lane] : [];
  if (voices.length === 0) {
    return;
  }

  for (const voice of voices) {
    if (voice.kind === "tone") {
      playTone(engine.ctx, {
        type: voice.type || "sine",
        startFreq: jitter(voice.startFreq, 0.02),
        endFreq: jitter(voice.endFreq, 0.02),
        duration: Math.max(0.02, jitter(voice.duration, 0.08)),
        gain: Math.max(0.01, jitter(voice.gain, 0.12))
      }, engine.output);
      continue;
    }

    if (voice.kind === "noise") {
      playNoise(engine, {
        filterType: voice.filterType || "highpass",
        frequency: jitter(voice.frequency, 0.02),
        duration: Math.max(0.02, jitter(voice.duration, 0.08)),
        gain: Math.max(0.01, jitter(voice.gain, 0.12)),
        q: voice.q || 0.7
      });
    }
  }
}

function getActiveKit() {
  if (DRUM_KITS[activeKitId]) {
    return DRUM_KITS[activeKitId];
  }

  return DRUM_KITS.studio;
}

function jitter(value, variance) {
  if (!Number.isFinite(value)) {
    return value;
  }

  return value * (1 + (Math.random() * 2 - 1) * variance);
}

function ensureAudioRunning(onReady) {
  const engine = getAudioEngine();
  if (!engine) {
    audioReady = false;
    updateModeReadout();
    return false;
  }

  if (engine.ctx.state === "running") {
    audioReady = true;
    updateModeReadout();
    return true;
  }

  if (!audioUnlockPromise) {
    audioUnlockPromise = engine.ctx.resume()
      .then(() => {
        audioUnlockPromise = null;
        audioReady = engine.ctx.state === "running";
        updateModeReadout();
      })
      .catch(() => {
        audioUnlockPromise = null;
        audioReady = false;
        updateModeReadout();
      });
  }

  if (onReady) {
    audioUnlockPromise.then(() => {
      if (audioReady) {
        onReady();
      }
    });
  }

  return false;
}

function getAudioEngine() {
  if (audioEngine) {
    return audioEngine;
  }

  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) {
    return null;
  }

  const ctx = new Context();
  const master = ctx.createGain();
  const compressor = ctx.createDynamicsCompressor();
  master.gain.value = 0.92;
  compressor.threshold.value = -14;
  compressor.knee.value = 10;
  compressor.ratio.value = 7;
  compressor.attack.value = 0.001;
  compressor.release.value = 0.18;
  master.connect(compressor);
  compressor.connect(ctx.destination);

  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.3), ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }

  audioEngine = { ctx, noiseBuffer: buffer, output: master };
  return audioEngine;
}

function playTone(ctx, config, output) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = config.type;
  osc.frequency.setValueAtTime(config.startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(config.endFreq, now + config.duration);

  gain.gain.setValueAtTime(config.gain, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + config.duration);

  osc.connect(gain);
  gain.connect(output || ctx.destination);

  osc.start(now);
  osc.stop(now + config.duration + 0.03);
}

function playNoise(engine, config) {
  const ctx = engine.ctx;
  const now = ctx.currentTime;
  const src = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  src.buffer = engine.noiseBuffer;
  filter.type = config.filterType;
  filter.frequency.setValueAtTime(config.frequency, now);
  filter.Q.setValueAtTime(config.q, now);

  gain.gain.setValueAtTime(config.gain, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + config.duration);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(engine.output || ctx.destination);

  src.start(now);
  src.stop(now + config.duration + 0.03);
}

// ---------------------------------------------------------------------------
// Song Library UI
// ---------------------------------------------------------------------------

function renderSongLibrary() {
  if (!songGrid) return;
  songGrid.innerHTML = "";

  let filtered = songs.filter(s => s.genre); // only library songs (not recorded)
  if (libraryGenreFilter !== "all") {
    filtered = filtered.filter(s => s.genre === libraryGenreFilter);
  }

  if (librarySortMode === "asc") {
    filtered.sort((a, b) => (a.difficulty || 0) - (b.difficulty || 0));
  } else if (librarySortMode === "desc") {
    filtered.sort((a, b) => (b.difficulty || 0) - (a.difficulty || 0));
  }

  for (const song of filtered) {
    const card = document.createElement("button");
    card.className = "song-card";
    card.type = "button";
    card.dataset.songId = song.id;
    card.setAttribute("aria-label", song.title + " (" + (song.genre || "Recorded") + ", " + song.bpm + " BPM)");

    const genreColor = (SONG_LIBRARY_META && SONG_LIBRARY_META.genreColors && SONG_LIBRARY_META.genreColors[song.genre]) || "var(--accent-3)";

    const stars = renderDifficultyStars(song.difficulty || 1);
    const durationSec = Math.round((song.duration || 60) - LEAD_IN - 2.4);

    card.innerHTML =
      `<span class="song-card-genre" style="background:${genreColor}">${song.genre || "Other"}</span>` +
      `<span class="song-card-title">${song.title}</span>` +
      `<span class="song-card-meta">${song.bpm} BPM &middot; ${durationSec}s</span>` +
      `<span class="song-card-diff">${stars}</span>` +
      `<span class="song-card-desc">${song.description || ""}</span>`;

    card.addEventListener("click", () => {
      selectSongFromLibrary(song.id);
    });

    songGrid.appendChild(card);
  }

  // Add recorded songs at the end
  const recorded = songs.filter(s => !s.genre);
  for (const song of recorded) {
    const card = document.createElement("button");
    card.className = "song-card song-card-recorded";
    card.type = "button";
    card.dataset.songId = song.id;
    card.setAttribute("aria-label", song.title + " (" + (song.genre || "Recorded") + ", " + song.bpm + " BPM)");

    card.innerHTML =
      `<span class="song-card-genre" style="background:var(--accent-2)">Recorded</span>` +
      `<span class="song-card-title">${song.title}</span>` +
      `<span class="song-card-meta">${song.bpm} BPM</span>` +
      `<span class="song-card-desc">${song.description || ""}</span>`;

    card.addEventListener("click", () => {
      selectSongFromLibrary(song.id);
    });

    songGrid.appendChild(card);
  }
}

function renderDifficultyStars(difficulty) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += i <= difficulty
      ? '<span class="star filled">&#9733;</span>'
      : '<span class="star empty">&#9734;</span>';
  }
  return html;
}

function bindLibraryEvents() {
  if (genreTabs) {
    genreTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".genre-tab");
      if (!tab) return;
      libraryGenreFilter = tab.dataset.genre;
      for (const t of genreTabs.querySelectorAll(".genre-tab")) {
        t.classList.toggle("active", t === tab);
      }
      renderSongLibrary();
    });
  }

  if (diffSortBtn) {
    diffSortBtn.addEventListener("click", () => {
      if (librarySortMode === "default") {
        librarySortMode = "asc";
        diffSortBtn.textContent = "Sort: Easy First";
      } else if (librarySortMode === "asc") {
        librarySortMode = "desc";
        diffSortBtn.textContent = "Sort: Hard First";
      } else {
        librarySortMode = "default";
        diffSortBtn.textContent = "Sort: Default";
      }
      renderSongLibrary();
    });
  }

  if (jamModeLibBtn) {
    jamModeLibBtn.addEventListener("click", () => {
      showGameScreen();
      enterJamMode();
    });
  }
}

function selectSongFromLibrary(songId) {
  const selected = songs.find(s => s.id === songId);
  if (!selected) return;
  activeSong = selected;
  songSelect.value = songId;
  showGameScreen();
  startSong();
}

function showLibrary() {
  stopLoop();
  clearNotes();
  isRunning = false;
  jamModeActive = false;
  updateModeReadout();
  hideSongProgress();
  renderSongLibrary();

  if (songLibrary) songLibrary.style.display = "";
  if (gameScreen) gameScreen.style.display = "none";
}

function showGameScreen() {
  if (songLibrary) songLibrary.style.display = "none";
  if (gameScreen) gameScreen.style.display = "";
  focusGameArea();
}

// ---------------------------------------------------------------------------
// Song Progress Bar
// ---------------------------------------------------------------------------

function updateSongProgress(elapsed) {
  if (!songProgressBar || !songProgressFill || !songProgressLabel) return;
  if (!activeSong || jamModeActive) {
    hideSongProgress();
    return;
  }

  songProgressBar.style.display = "";
  const totalDuration = activeSong.duration - LEAD_IN - 2.4;
  const songElapsed = Math.max(0, elapsed - LEAD_IN);
  const progress = Math.min(1, songElapsed / totalDuration);

  songProgressFill.style.width = (progress * 100) + "%";

  const remainSec = Math.max(0, Math.round(totalDuration - songElapsed));
  songProgressLabel.textContent = activeSong.title + ": " + remainSec + "s";
}

function hideSongProgress() {
  if (songProgressBar) songProgressBar.style.display = "none";
  if (songProgressFill) songProgressFill.style.width = "0%";
  if (songProgressLabel) songProgressLabel.textContent = "";
}

// ---------------------------------------------------------------------------
// Results Modal (per-lane stats, accuracy breakdown)
// ---------------------------------------------------------------------------

function showResultsModal() {
  if (!resultsModal) return;

  const accuracy = computeAccuracy();
  const totalNotes = hits + misses;

  // Grade
  let grade = "F";
  if (accuracy >= 98) grade = "S";
  else if (accuracy >= 90) grade = "A";
  else if (accuracy >= 80) grade = "B";
  else if (accuracy >= 70) grade = "C";
  else if (accuracy >= 60) grade = "D";

  if (resultsTitle) {
    resultsTitle.textContent = activeSong.title + " Complete";
  }

  if (resultsSummary) {
    resultsSummary.innerHTML =
      `<div class="results-grade grade-${grade.toLowerCase()}">${grade}</div>` +
      `<div class="results-stats-grid">` +
        `<div class="results-stat"><span>Score</span><strong>${score}</strong></div>` +
        `<div class="results-stat"><span>Accuracy</span><strong>${accuracy}%</strong></div>` +
        `<div class="results-stat"><span>Max Combo</span><strong>${maxCombo}</strong></div>` +
        `<div class="results-stat"><span>Perfect</span><strong>${perfectCount}</strong></div>` +
        `<div class="results-stat"><span>Good</span><strong>${goodCount}</strong></div>` +
        `<div class="results-stat"><span>Ok</span><strong>${okCount}</strong></div>` +
        `<div class="results-stat"><span>Misses</span><strong>${misses}</strong></div>` +
        `<div class="results-stat"><span>Total Notes</span><strong>${totalNotes}</strong></div>` +
      `</div>`;
  }

  if (resultsLanes) {
    let lanesHtml = '<div class="results-lane-grid">';
    for (const lane of LANE_META) {
      const h = laneHits[lane.id] || 0;
      const m = laneMisses[lane.id] || 0;
      const total = h + m;
      const pct = total > 0 ? Math.round((h / total) * 100) : 100;
      lanesHtml +=
        `<div class="results-lane-item">` +
          `<span class="results-lane-name">${lane.label}</span>` +
          `<div class="results-lane-bar"><div class="results-lane-fill" style="width:${pct}%;background:var(--lane-${lane.id})"></div></div>` +
          `<span class="results-lane-pct">${pct}%</span>` +
        `</div>`;
    }
    lanesHtml += '</div>';
    resultsLanes.innerHTML = lanesHtml;
  }

  resultsModal.classList.add("visible");

  // Focus trap
  const firstBtn = resultsModal.querySelector("button");
  if (firstBtn) firstBtn.focus();
  resultsModal._trapHandler = function (e) {
    if (e.key === "Escape") { hideResultsModal(); showLibrary(); return; }
    if (e.key !== "Tab") return;
    const btns = resultsModal.querySelectorAll("button");
    const first = btns[0], last = btns[btns.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  resultsModal.addEventListener("keydown", resultsModal._trapHandler);
}

function hideResultsModal() {
  if (!resultsModal) return;
  resultsModal.classList.remove("visible");
  if (resultsModal._trapHandler) {
    resultsModal.removeEventListener("keydown", resultsModal._trapHandler);
    resultsModal._trapHandler = null;
  }
}

// ---------------------------------------------------------------------------
// Song utility functions (used by songs.js)
// ---------------------------------------------------------------------------

function addBeat(notes, bpm, beat, lane) {
  notes.push({
    lane,
    time: beatToSeconds(beat, bpm) + LEAD_IN
  });
}

function beatToSeconds(beat, bpm) {
  return (beat * 60) / bpm;
}

function finalizeSong(config) {
  config.notes.sort((a, b) => a.time - b.time);

  return {
    id: config.id,
    title: config.title,
    bpm: config.bpm,
    description: config.description,
    notes: config.notes,
    duration: beatToSeconds(config.totalBeats, config.bpm) + LEAD_IN + 2.4
  };
}
