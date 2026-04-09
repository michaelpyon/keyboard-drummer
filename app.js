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

const laneEls = {};
for (const lane of document.querySelectorAll(".lane")) {
  laneEls[lane.dataset.lane] = lane;
}

const songs = buildSongs();

let activeSong = songs[0];
let activeMapping = KEYMAPS.righty;
let activeKitId = "studio";
let keyToLane = new Map();

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

// Metronome lookahead scheduler — uses AudioContext.currentTime as master clock
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

  window.addEventListener("keydown", onKeyDown, { capture: true });
  gameArea.addEventListener("pointerdown", focusGameArea);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      focusGameArea();
    }
  });

  focusGameArea();
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
  } else if (error <= GOOD_WINDOW) {
    points = 180;
    text = "Good";
    css = "good";
  }

  note.hit = true;
  removeNoteElement(note, css);

  combo += 1;
  maxCombo = Math.max(maxCombo, combo);
  hits += 1;
  score += points + combo * 3;

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

  const accuracy = computeAccuracy();
  setStatus(`Finished ${activeSong.title}. Score ${score}, accuracy ${accuracy}%, max combo ${maxCombo}.`);
  updateModeReadout();
  showShareModal();
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
  // Derive particle palettes from CSS tokens so they stay in sync with the theme
  const rs = getComputedStyle(document.documentElement);
  const colors = {
    perfect: [rs.getPropertyValue("--accent-1").trim(), "#48ffd9", "#87ffdb"],
    good: [rs.getPropertyValue("--accent-3").trim(), "#60c8ff", "#a0e0ff"],
    ok: [rs.getPropertyValue("--accent-2").trim(), rs.getPropertyValue("--lane-bass").trim(), "#ffe680"]
  };
  const palette = colors[quality] || colors.ok;

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

function buildSongs() {
  return [
    buildNeonStarter(),
    buildBrooklynSwagger(),
    buildStadiumStomp(),
    buildDiscoInferno(),
    buildMetroFunk(),
    buildJazzCafe(),
    buildDoubleKickRush(),
    buildPunkBlitz()
  ];
}

// ---------------------------------------------------------------------------
// Brooklyn Swagger — 87 BPM, 48 beats (12 bars)
// Classic boom-bap hip-hop: heavy kick on 1 & 3, snare on 2 & 4, 8th-note hats.
// Ghost snares every 4th bar, crash on bar 1 and every 8 bars.
// ---------------------------------------------------------------------------
function buildBrooklynSwagger() {
  const bpm = 87;
  const totalBeats = 48;
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const base = bar * 4;

    // Crash on bar 0 and every 8 bars (bar 8)
    if (bar === 0 || bar % 8 === 0) {
      addBeat(notes, bpm, base, "crash");
    }

    // 8th-note hi-hats: every 0.5 beats across the bar
    for (let i = 0; i < 8; i++) {
      const pos = base + i * 0.5;
      // Occasional open-hat feel on the "and" of beat 2 (pos base+2.5): use ride
      if (i === 5) {
        addBeat(notes, bpm, pos, "ride");
      } else {
        addBeat(notes, bpm, pos, "hihat");
      }
    }

    // Kick on beat 1 and beat 3
    addBeat(notes, bpm, base, "bass");
    addBeat(notes, bpm, base + 2, "bass");

    // Snare on beat 2 and beat 4
    addBeat(notes, bpm, base + 1, "snare");
    addBeat(notes, bpm, base + 3, "snare");

    // Ghost snare hits on the "and" of beats 1 and 3 every 4th bar
    if (bar % 4 === 3) {
      addBeat(notes, bpm, base + 0.5, "snare");
      addBeat(notes, bpm, base + 2.5, "snare");
    }

    // Subtle extra kick on the "and" of beat 3 every 2 bars for laid-back feel
    if (bar % 2 === 1) {
      addBeat(notes, bpm, base + 3.5, "bass");
    }
  }

  return finalizeSong({
    id: "brooklyn-swagger",
    title: "Brooklyn Swagger",
    bpm,
    totalBeats,
    description: "Boom-bap groove with ghost snares. Head nod required.",
    notes
  });
}

// ---------------------------------------------------------------------------
// Stadium Stomp — 120 BPM, 80 beats (20 bars)
// Stomp-stomp-clap pattern that builds to a full anthem kit.
// Phase 1 (bars 0-7): bass-bass-snare only.
// Phase 2 (bars 8-15): add hi-hats.
// Phase 3 (bars 16-19): full kit with tom fills every 4 bars.
// ---------------------------------------------------------------------------
function buildStadiumStomp() {
  const bpm = 120;
  const totalBeats = 80;
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const base = bar * 4;

    // Crash on bar 0 and every 8 bars for anthem moments
    if (bar === 0 || bar % 8 === 0) {
      addBeat(notes, bpm, base, "crash");
    }

    // Core stomp-stomp-clap: bass on 1 & 1.5, snare on 2, bass on 3 & 3.5, snare on 4
    addBeat(notes, bpm, base,       "bass");
    addBeat(notes, bpm, base + 0.5, "bass");
    addBeat(notes, bpm, base + 1,   "snare");
    addBeat(notes, bpm, base + 2,   "bass");
    addBeat(notes, bpm, base + 2.5, "bass");
    addBeat(notes, bpm, base + 3,   "snare");

    // Phase 2 (bars 8+): layer in 8th-note hi-hats
    if (bar >= 8) {
      for (let i = 0; i < 8; i++) {
        addBeat(notes, bpm, base + i * 0.5, "hihat");
      }
    }

    // Phase 3 (bars 16+): extra snare accent and ride
    if (bar >= 16) {
      addBeat(notes, bpm, base + 1.5, "snare");
      addBeat(notes, bpm, base + 3.5, "ride");
    }

    // Tom fills every 4 bars starting from bar 4
    if (bar % 4 === 3 && bar >= 4) {
      addBeat(notes, bpm, base + 2.5, "hightom");
      addBeat(notes, bpm, base + 2.75, "hightom");
      addBeat(notes, bpm, base + 3.25, "lowtom");
      addBeat(notes, bpm, base + 3.5,  "lowtom");
    }
  }

  return finalizeSong({
    id: "stadium-stomp",
    title: "Stadium Stomp",
    bpm,
    totalBeats,
    description: "Builds from stomp-clap to full kit anthem. Play it loud.",
    notes
  });
}

// ---------------------------------------------------------------------------
// Disco Inferno — 110 BPM, 64 beats (16 bars)
// Four-on-the-floor: bass every quarter, ride on upbeats, snare on 2 & 4.
// Second half adds 16th-note hi-hat runs. Tom fills every 8 bars.
// ---------------------------------------------------------------------------
function buildDiscoInferno() {
  const bpm = 110;
  const totalBeats = 64;
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const base = bar * 4;
    const inSecondHalf = bar >= totalBeats / 8; // bar 8 onward

    // Crash on bar 0 and bar 8
    if (bar === 0 || bar === 8) {
      addBeat(notes, bpm, base, "crash");
    }

    // Four-on-the-floor bass drum
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, base + beat, "bass");
    }

    // Ride (open hi-hat feel) on every upbeat
    for (let i = 0; i < 4; i++) {
      addBeat(notes, bpm, base + i + 0.5, "ride");
    }

    // Snare on 2 and 4
    addBeat(notes, bpm, base + 1, "snare");
    addBeat(notes, bpm, base + 3, "snare");

    // Second half: 16th-note hi-hat runs (every 0.25 beats)
    if (inSecondHalf) {
      for (let i = 0; i < 16; i++) {
        addBeat(notes, bpm, base + i * 0.25, "hihat");
      }
    }

    // Tom fills every 8 bars
    if (bar % 8 === 7) {
      addBeat(notes, bpm, base + 3,    "hightom");
      addBeat(notes, bpm, base + 3.25, "hightom");
      addBeat(notes, bpm, base + 3.5,  "lowtom");
      addBeat(notes, bpm, base + 3.75, "lowtom");
    }
  }

  return finalizeSong({
    id: "disco-inferno",
    title: "Disco Inferno",
    bpm,
    totalBeats,
    description: "Four-on-the-floor with 16th-note hi-hat runs. Stay on the beat.",
    notes
  });
}

// ---------------------------------------------------------------------------
// Jazz Cafe — 95 BPM, 48 beats (12 bars)
// Swing ride pattern (dotted-8th + 16th approximated as beat + beat+0.67).
// Hi-hat foot on 2 & 4, snare cross-stick on beat 4, bass lightly on 1 & 3.
// Sparse, tasteful. Ghost snare notes for brush feel.
// ---------------------------------------------------------------------------
function buildJazzCafe() {
  const bpm = 95;
  const totalBeats = 48;
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const base = bar * 4;

    // Swing ride pattern: downbeat + triplet "let" of each beat
    // Approximated as beat + (beat + 0.67) for each of the 4 beats
    for (let beat = 0; beat < 4; beat++) {
      addBeat(notes, bpm, base + beat,        "ride");
      addBeat(notes, bpm, base + beat + 0.67, "ride");
    }

    // Bass drum lightly on 1 and 3
    addBeat(notes, bpm, base,     "bass");
    addBeat(notes, bpm, base + 2, "bass");

    // Hi-hat foot splash on 2 and 4 (use hihat for the foot)
    addBeat(notes, bpm, base + 1, "hihat");
    addBeat(notes, bpm, base + 3, "hihat");

    // Snare cross-stick on beat 4 of most bars
    if (bar % 4 !== 3) {
      addBeat(notes, bpm, base + 3, "snare");
    }

    // Ghost notes (brush feel): snare at the "and" of beat 2 every other bar
    if (bar % 2 === 0) {
      addBeat(notes, bpm, base + 1.5, "snare");
    }

    // Occasional snare accent on "and" of beat 4 for call-response feel
    if (bar % 4 === 1 || bar % 4 === 3) {
      addBeat(notes, bpm, base + 3.5, "snare");
    }

    // Every 4 bars, add a bass drum walk-up for interest
    if (bar % 4 === 3) {
      addBeat(notes, bpm, base + 2.5, "bass");
    }
  }

  return finalizeSong({
    id: "jazz-cafe",
    title: "Jazz Cafe",
    bpm,
    totalBeats,
    description: "Swing ride, ghost notes, and taste. Less is more.",
    notes
  });
}

// ---------------------------------------------------------------------------
// Punk Blitz — 175 BPM, 96 beats (24 bars)
// Driving 8th-note hi-hats, snare on 2 & 4, bass on 1 & 3.
// Double-kick 16ths before phrase transitions. Crash every 4 bars.
// Tom rolls at end of every 8-bar phrase.
// ---------------------------------------------------------------------------
function buildPunkBlitz() {
  const bpm = 175;
  const totalBeats = 96;
  const notes = [];

  for (let bar = 0; bar < totalBeats / 4; bar++) {
    const base = bar * 4;

    // Crash every 4 bars
    if (bar % 4 === 0) {
      addBeat(notes, bpm, base, "crash");
    }

    // Driving 8th-note hi-hats
    for (let i = 0; i < 8; i++) {
      addBeat(notes, bpm, base + i * 0.5, "hihat");
    }

    // Snare on 2 and 4
    addBeat(notes, bpm, base + 1, "snare");
    addBeat(notes, bpm, base + 3, "snare");

    // Bass on 1 and 3
    addBeat(notes, bpm, base,     "bass");
    addBeat(notes, bpm, base + 2, "bass");

    // Double-kick 16ths before every 4-bar transition (bar 3, 7, 11, etc.)
    if (bar % 4 === 3) {
      addBeat(notes, bpm, base + 3.5,  "bass");
      addBeat(notes, bpm, base + 3.75, "bass");
    }

    // Tom rolls at end of every 8-bar phrase (bars 7, 15, 23)
    if (bar % 8 === 7) {
      // Replace last beat's hi-hats and add rapid tom roll
      addBeat(notes, bpm, base + 3,    "hightom");
      addBeat(notes, bpm, base + 3.25, "hightom");
      addBeat(notes, bpm, base + 3.5,  "lowtom");
      addBeat(notes, bpm, base + 3.75, "lowtom");
    }

    // Extra snare punch mid-bar every 2 bars for raw energy
    if (bar % 2 === 1) {
      addBeat(notes, bpm, base + 1.5, "snare");
    }
  }

  return finalizeSong({
    id: "punk-blitz",
    title: "Punk Blitz",
    bpm,
    totalBeats,
    description: "175 BPM. No mercy. Fast hi-hats and double kicks.",
    notes
  });
}

function buildNeonStarter() {
  const bpm = 100;
  const totalBeats = 64;
  const notes = [];

  for (let beat = 0; beat < totalBeats; beat += 0.5) {
    const lane = beat < totalBeats / 2 ? "hihat" : Math.floor(beat * 2) % 2 === 0 ? "ride" : "hihat";
    addBeat(notes, bpm, beat, lane);
  }

  for (let bar = 0; bar < totalBeats / 4; bar += 1) {
    const base = bar * 4;

    addBeat(notes, bpm, base, "bass");
    addBeat(notes, bpm, base + 1, "snare");
    addBeat(notes, bpm, base + 2, "bass");
    addBeat(notes, bpm, base + 3, "snare");

    if (bar % 2 === 1) {
      addBeat(notes, bpm, base + 2.5, "bass");
    }

    if (bar % 4 === 3) {
      addBeat(notes, bpm, base + 3.25, "hightom");
      addBeat(notes, bpm, base + 3.5, "lowtom");
    }

    if (bar % 8 === 0) {
      addBeat(notes, bpm, base, "crash");
    }
  }

  return finalizeSong({
    id: "neon-starter",
    title: "Neon Starter",
    bpm,
    totalBeats,
    description: "Steady groove with simple fills. Great warm-up chart.",
    notes
  });
}

function buildMetroFunk() {
  const bpm = 118;
  const totalBeats = 64;
  const notes = [];

  for (let beat = 0; beat < totalBeats; beat += 0.5) {
    const slot = Math.floor((beat * 2) % 8);
    if (slot === 5 || (beat > totalBeats / 2 && slot === 1)) {
      addBeat(notes, bpm, beat, "ride");
    } else {
      addBeat(notes, bpm, beat, "hihat");
    }
  }

  for (let bar = 0; bar < totalBeats / 4; bar += 1) {
    const base = bar * 4;

    addBeat(notes, bpm, base + 1, "snare");
    addBeat(notes, bpm, base + 3, "snare");

    for (const hit of [0, 0.75, 2, 2.75]) {
      addBeat(notes, bpm, base + hit, "bass");
    }

    if (bar % 2 === 0) {
      addBeat(notes, bpm, base + 3.5, "snare");
    }

    if (bar % 4 === 3) {
      const fill = ["lowtom", "hightom", "lowtom", "hightom", "lowtom"];
      for (let i = 0; i < fill.length; i += 1) {
        addBeat(notes, bpm, base + 2.5 + i * 0.25, fill[i]);
      }
    }

    if (bar % 8 === 0) {
      addBeat(notes, bpm, base, "crash");
    }
  }

  return finalizeSong({
    id: "metro-funk",
    title: "Metro Funk",
    bpm,
    totalBeats,
    description: "Syncopated kick pattern with tom accents and ride transfers.",
    notes
  });
}

function buildDoubleKickRush() {
  const bpm = 145;
  const totalBeats = 80;
  const notes = [];

  for (let beat = 0; beat < totalBeats; beat += 0.5) {
    const lane = Math.floor(beat) % 4 < 2 ? "hihat" : "ride";
    addBeat(notes, bpm, beat, lane);
  }

  for (let bar = 0; bar < totalBeats / 4; bar += 1) {
    const base = bar * 4;

    addBeat(notes, bpm, base + 1, "snare");
    addBeat(notes, bpm, base + 3, "snare");

    for (const kickHit of [0, 0.25, 0.75, 2, 2.25, 2.75]) {
      addBeat(notes, bpm, base + kickHit, "bass");
    }

    if (bar % 2 === 0) {
      addBeat(notes, bpm, base + 3.5, "bass");
    }

    if (bar % 4 === 0) {
      addBeat(notes, bpm, base, "crash");
    }

    if (bar % 8 === 7) {
      const fillPattern = ["hightom", "lowtom", "hightom", "lowtom"];
      for (let i = 0; i < fillPattern.length; i += 1) {
        addBeat(notes, bpm, base + 3 + i * 0.25, fillPattern[i]);
      }
    }
  }

  return finalizeSong({
    id: "double-kick-rush",
    title: "Double Kick Rush",
    bpm,
    totalBeats,
    description: "Fast chart focused on bass bursts, ride flow, and tom runs.",
    notes
  });
}

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
