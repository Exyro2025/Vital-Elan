// Enhanced Guided Breathing Feature (Main JS)
let audioLayers = [];
let breathingAudio = null;
let volume = 0.5;

// Enhanced Guided Breathing Function
function startGuidedBreathing() {
  playWaterRippleSound(); // Soft Water Ripple Sound
  const guide = new SpeechSynthesisUtterance(getBreathingPhrase());
  guide.rate = 0.9;
  guide.volume = 0.8;
  guide.onend = () => {
    setTimeout(() => {
      startGuidedBreathing(); // Loop the breathing guidance
    }, 8000); // Adjust this delay for breathing pace
  };
  window.speechSynthesis.speak(guide);
}

// Dynamic Breathing Phrases (Varies)
function getBreathingPhrase() {
  const phrases = [
    "Close your eyes. Inhale deeply... Hold... Exhale slowly. Feel your body relax.",
    "Breathe in... Hold gently... Let go with ease. Feel calm flow over you.",
    "Inhale peace... Exhale tension... Let each breath bring stillness."
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// Enhanced Gentle Water Ripple Sound with Echo and Fade-Out
function playWaterRippleSound() {
  if (breathingAudio) breathingAudio.pause();
  
  // Create Audio Context for Enhanced Effects
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioElement = new Audio("gentle-water-ripple.mp3");
  audioElement.loop = true;
  audioElement.volume = volume;

  const track = audioContext.createMediaElementSource(audioElement);
  const gainNode = audioContext.createGain();
  const delayNode = audioContext.createDelay();
  const reverb = audioContext.createConvolver();

  // Soft Echo Effect
  delayNode.delayTime.value = 0.3;  // Echo after 0.3 seconds
  gainNode.gain.value = 0.5;        // Reduced volume for echo

  // Connect nodes for echo and reverb
  track.connect(delayNode).connect(gainNode).connect(audioContext.destination);
  track.connect(audioContext.destination); // Original sound
  delayNode.connect(audioContext.destination); // Echo effect

  // Start the audio
  audioElement.play();
  breathingAudio = audioElement;
}

// Stop Breathing Sounds
function stopGuidedBreathing() {
  if (breathingAudio) {
    const fadeInterval = setInterval(() => {
      if (breathingAudio.volume > 0.05) {
        breathingAudio.volume -= 0.05;
      } else {
        clearInterval(fadeInterval);
        breathingAudio.pause();
        breathingAudio.currentTime = 0;
        breathingAudio = null;
      }
    }, 100); // Decrease volume every 100ms for a smooth fade-out
  }
  window.speechSynthesis.cancel();
}
// UI Adjustment for Volume Control
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  root.innerHTML += `
    <div class="volume-control">
      <label for="volumeControl" class="muted">Breathing Sound Volume</label>
      <input type="range" id="volumeControl" min="0" max="1" step="0.05" value="0.5" 
             onchange="setBreathingVolume(this.value)" style="width: 80%;">
      <button onclick="startGuidedBreathing()">Start Enhanced Breathing</button>
      <button onclick="stopGuidedBreathing()">Stop Breathing</button>
    </div>
  `;
});


