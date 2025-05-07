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
 // Guided Breathing Quotes (Three Variations)
const guidedBreathingPhrases = [
  "Close your eyes. Inhale deeply... Hold... Exhale slowly. Feel your body relax.",
  "Breathe in... Hold gently... Let go with ease. Feel calm flow over you.",
  "Inhale peace... Exhale tension... Let each breath bring stillness."
];

// Sound File for Gentle Water Ripple (Soothing Background)
const guidedBreathingSound = "gentle-water-ripple.mp3"; 

  const dailyQuotes = [
  "Your stillness is a form of power.",
  "Let today unfold with intention, not urgency.",
  "Inhale peace. Exhale resistance.",
  "You are allowed to glow quietly.",
  "The body speaks. Honor its language.",
  "Softness is not weakness. It is grace with depth.",
  "You do not need to rush your becoming.",
  "Beneath the noise, your rhythm remains.",
  "This moment is not behind or ahead — it is within.",
  "Simplicity is a sacred form of wisdom.",
  "Your breath is your anchor and your inheritance.",
  "Let silence become your second skin.",
  "Joy does not always raise its voice.",
  "Trust the pace of your unfolding.",
  "There is wonder in restraint.",
  "Not all clarity is loud. Some whispers are holy.",
  "Stillness is not the absence of motion — it is the return of meaning.",
  "Move slower than the world expects. Move truer than it demands.",
  "Some peace is too deep to name.",
  "Your softness is allowed to stay.",
  "There is a rhythm in you that answers to quiet.",
  "You are whole even when healing.",
  "Beauty lives in how you breathe through things.",
  "You are not behind — you are beneath.",
  "The sacred often arrives without applause.",
  "Let quiet become your teacher.",
  "You deserve mornings without proving.",
  "There is no prize for running past yourself.",
  "Still waters reflect truest.",
  "Light returns — even through a crack.",
  "You are already aligned. Simply return."
];

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
// Sound Enhancement – Multi-Layered 3D Sound with Volume Control
let audioLayers = [];
let volume = 0.5; // Default Volume

function playSound() {
  const entry = ledger[0];
  const src = soundMap[entry.landscape];
  if (!src) return;

  try {
    stopAllSounds(); // Ensure no existing sounds overlap

    // Create multiple layers for immersive sound
    const sounds = [src, src]; // Add the same sound twice for 3D effect (or add different sounds)
    sounds.forEach((soundSrc) => {
      const audio = new Audio(soundSrc);
      audio.volume = volume;
      audio.loop = true;
      audio.play();
      audioLayers.push(audio);
    });
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
}

function stopAllSounds() {
  audioLayers.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  audioLayers = [];
}
// Function for Enhanced Guided Breathing (Randomized Phrases)
function startGuidedBreathing() {
  // Play Water Ripple Sound at Low Volume (Separate Sound Channel)
  const rippleAudio = new Audio(guidedBreathingSound);
  rippleAudio.loop = true;
  rippleAudio.volume = 0.2; // Set low volume for background effect
  rippleAudio.play();

  // Randomly Select One of the Three Guided Breathing Phrases
  const guideText = guidedBreathingPhrases[Math.floor(Math.random() * guidedBreathingPhrases.length)];

  // Clear Any Existing Speech to Prevent Overlap
  window.speechSynthesis.cancel();
  
  // Speech Synthesis for Voice Guide
  const guide = new SpeechSynthesisUtterance(guideText);
  guide.rate = 0.9;
  guide.volume = 0.8; // Clear, calming voice

  // Start Speaking the Randomly Selected Guide
  window.speechSynthesis.speak(guide);

  // Stop Background Sound when Breathing Ends
  guide.onend = () => rippleAudio.pause();
}


function setVolume(newVolume) {
  volume = newVolume;
  audioLayers.forEach((audio) => {
    audio.volume = volume;
  });
}
function renderReflection() {
  const entry = ledger[0];
  const scripture = scriptureMap[entry.landscape];
  const reflectionQuote = getReflectionQuote(entry.landscape);
  
  document.body.style.background = "#1f1f24";
  root.innerHTML = `
    <div class="container center">
      <p class="quote">"${entry.reflection}"</p>
      ${scripture ? `<p class="quote">“${scripture.verse}”<br /><small>— ${scripture.ref}</small></p>` : ""}
      <p class="muted">${reflectionQuote}</p>
      <button onclick="playSound()">Begin Resonance Ritual</button>
      <button onclick="startGuidedBreathing()">Guided Breathing</button>
    </div>
  `;
}

// New Function for Mood-Adaptive Quotes
function getReflectionQuote(landscape) {
  const quotes = {
    "misty forest": "Embrace the mist, for clarity waits within.",
    "sunlit valley": "Let the light refresh your spirit.",
    "stormy coast": "Waves may roar, but you are anchored.",
    "still lake": "Peace is not a place — it is a presence.",
    "crimson desert": "Even in dryness, there is hidden strength.",
  };
  return quotes[landscape] || "Breathe deeply. Be fully here.";
}

// Guided Breathing Function
function startGuidedBreathing() {
  const guide = new SpeechSynthesisUtterance("Close your eyes. Inhale deeply... Hold... Exhale slowly. Feel your body relax.");
  guide.rate = 0.9;
  guide.volume = 0.8;
  window.speechSynthesis.speak(guide);
}


// Voice Interaction Feature
function initializeVoiceCommands() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice recognition not supported in this browser.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    if (command.includes("begin my ritual")) render();
    if (command.includes("play sound")) playSound();
    if (command.includes("stop sound")) stopAllSounds();
  };

  recognition.start();
}

document.addEventListener("DOMContentLoaded", initializeVoiceCommands);
function renderLedger() {
  const entries = ledger.map(e => `
    <div class="entry">
      <div class="entry-top">
        <span class="tag">${e.date}</span>
        <p><strong>${e.color}</strong> - ${e.landscape}</p>
        <p class="quote">"${e.reflection}"</p>
      </div>
    </div>
  `).join('');

  root.innerHTML = `
    <div class="container">
      <h2>Élan Ledger</h2>
      ${entries || "<p class='muted'>No entries yet. Begin a reflection to start.</p>"}
      <button onclick="step = 1; render()">New Reflection</button>
      <button onclick="clearLedger()">Clear Ledger</button>
    </div>
  `;
}

function clearLedger() {
  ledger = [];
  render();
}


// Initialize App
document.addEventListener("DOMContentLoaded", render);


