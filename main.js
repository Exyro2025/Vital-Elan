// main.js — Complete, Polished Vital Élan Build (Optimized)

let step = 0;
let ledger = [];
let audio = null;

// Scriptures Map (Improved for Quick Lookup)
const scriptureMap = {
  "misty forest": { verse: "Search me, O God, and know my heart; test me and know my anxious thoughts.", ref: "Psalm 139:23" },
  "sunlit valley": { verse: "His mercies are new every morning.", ref: "Lamentations 3:22–23" },
  "stormy coast": { verse: "When you pass through the waters, I will be with you.", ref: "Isaiah 43:2" },
  "still lake": { verse: "He leads me beside still waters. He restores my soul.", ref: "Psalm 23:2–3" },
  "crimson desert": { verse: "I will make a way in the wilderness and rivers in the desert.", ref: "Isaiah 43:19" },
  "golden meadow": { verse: "My heart leaps for joy, and with my song I praise Him.", ref: "Psalm 28:7" },
  "shadowed canyon": { verse: "Even though I walk through the valley… I will fear no evil.", ref: "Psalm 23:4" },
  "frosted peak": { verse: "Set your minds on things above, not on earthly things.", ref: "Colossians 3:2" },
  "midnight sky": { verse: "The light shines in the darkness, and the darkness has not overcome it.", ref: "John 1:5" },
  "blooming orchard": { verse: "He will rejoice over you with gladness and quiet you with His love.", ref: "Zephaniah 3:17" }
};

// Sound Paths (Direct File Paths)
const soundMap = {
  "misty forest": "vital-elan-misty-forest.mp3",
  "sunlit valley": "vital-elan-sunlit-valley.mp3",
  "stormy coast": "vital-elan-stormy-coast.mp3",
  "still lake": "vital-elan-still-lake.mp3",
  "crimson desert": "vital-elan-crimson-desert.mp3",
  "golden meadow": "vital-elan-golden-meadow.mp3",
  "shadowed canyon": "vital-elan-shadowed-canyon.mp3",
  "frosted peak": "vital-elan-frosted-peak.mp3",
  "midnight sky": "vital-elan-midnight-sky.mp3",
  "blooming orchard": "vital-elan-blooming-orchard.mp3"
};

// Core Functions
function render() {
  if (step === 0) renderLanding();
  else if (step === 1) renderForm();
  else if (step === 2) renderReflection();
  else renderLedger();
}

function renderLanding() {
  const quote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
  const today = new Date().toLocaleDateString("en-US", {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  root.innerHTML = `
    <div class="container center fade-in">
      <h1>Vital Élan</h1>
      <p class="quote">A ritual of breath, beauty, and inner clarity.</p>
      <p class="muted">“${quote}”<br /><span style="font-size: 0.75rem;">${today}</span></p>
      <button onclick="step = 1; render()">Begin Your Ritual</button>
    </div>
  `;
}

function renderForm() {
  root.innerHTML = `
    <div class="container">
      <label>What color does your energy feel like today?</label>
      <input type="text" id="colorInput" placeholder="e.g., lavender haze" />

      <label>Choose your internal landscape</label>
      <select id="landscapeSelect">
        <option value="">Select one...</option>
        ${Object.keys(soundMap).map(l => `<option value="${l}">${l}</option>`).join('')}
      </select>

      <button onclick="submitReflection()">Reveal Reflection</button>
    </div>
  `;
}

function submitReflection() {
  const color = document.getElementById("colorInput").value.trim();
  const landscape = document.getElementById("landscapeSelect").value;
  if (!color || !landscape) {
    alert("Please complete both fields.");
    return;
  }

  ledger.unshift({
    date: new Date().toLocaleDateString(),
    color,
    landscape,
    reflection: `Your energy feels like ${color}, reflecting a ${landscape} landscape.`
  });

  step = 2;
  render();
}

function renderReflection() {
  const entry = ledger[0];
  const scripture = scriptureMap[entry.landscape];
  document.body.style.background = "#1f1f24";

  root.innerHTML = `
    <div class="container center">
      <p class="quote">"${entry.reflection}"</p>
      ${scripture ? `<p class="quote">“${scripture.verse}”<br /><small>— ${scripture.ref}</small></p>` : ""}
      <button onclick="playSound()">Begin Resonance Ritual</button>
    </div>
  `;
}

function playSound() {
  const entry = ledger[0];
  const src = soundMap[entry.landscape];
  if (!src) return;

  try {
    if (audio) audio.pause();
    audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.3;
    audio.play();
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
}

function renderLedger() {
  const entries = ledger.map(e => `
    <div class="entry">
      <p><strong>${e.date}</strong> - ${e.reflection}</p>
    </div>
  `).join('');

  root.innerHTML = `
    <div class="container">
      <h2>Élan Ledger</h2>
      ${entries || "<p>No entries yet. Begin a reflection to start.</p>"}
      <button onclick="step = 1; render()">New Reflection</button>
      <button onclick="closeRitual()">Close Ritual</button>
    </div>
  `;
}

function closeRitual() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audio = null;
  }
  ledger = [];
  step = 0;
  render();
  alert("The breath you carry now belongs to you.");
}

// Initialize App
document.addEventListener("DOMContentLoaded", render);
