/*
Steps
1. Get Access to Microphone
2. Analyze Frequency
3. Match Frequency to a Note
4. Create a User Interface
*/

// Variables/Inits
let audioStream;
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();

// 1. Get Access to Microphone
async function getMicAccess() {
  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    analyzeFrequency();
  } catch (err) {
    console.log("Cannot gain microphone access", err);
  }
}

// 2. Analyze Frequency
function analyzeFrequency() {
  const source = audioContext.createMediaStreamSource(audioStream);
  source.connect(analyser);
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  console.log(dataArray);
}

getMicAccess();

// 3. Match Frequency to a Note

// 4. Create a User Interface
const render = () => {
  const App = document.createElement("div");

  // Title
  const title = document.createElement("h1");
  title.innerText = "Guitar Tuner App";

  // Tuner
  const Tuner = document.createElement("div");

  const tunerTitle = document.createElement("h3");
  tunerTitle.innerText = "Tune Guitar Here";

  // Tuner UI
  const ui = document.createElement("div");
  ui.innerText = "Tuner UI";

  const root = document.getElementById("root");
  Tuner.append(tunerTitle);
  App.append(title, Tuner, ui);
  root.append(App);
};

document.addEventListener("DOMContentLoaded", () => {
  render();
});
