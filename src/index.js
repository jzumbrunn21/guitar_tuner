// Variables/Inits
let dominantFrequency; // Will be used to match note to frequency
let ui; // Used to constantly display the frequency
let audioStream;
const noteStrings = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
// Function to turn on mic and record
const turnOnMic = () => {
  if (navigator.mediaDevices) {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        processAudio(stream);
      })
      .catch((err) => console.log("ERROR", err));
  }
};

turnOnMic();

// Function to get Pitch
const getPitch = (analyser, audioContext, dataArray) => {
  // Fills the data array with frequnecy data of audio currently being processed
  analyser.getByteFrequencyData(dataArray);
  // Iterate through the data array to find the max frequency
  let max = -Infinity;
  let maxIndex = -1;

  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i] > max) {
      max = dataArray[i];
      maxIndex = i;
    }
  }

  // Calculates the frequency in hertz that corresponds with maxIndex
  // MaxIndex: index of the bin that has the highest amplitude
  // audioContext: Sample rate of the audio context(sample per second)
  dominantFrequency =
    (maxIndex * audioContext.sampleRate) / (2 * dataArray.length);

  // Updating here to see realtime data
  ui.innerText = dominantFrequency;
  // console.log(dominantFrequency);

  // Calls getPitch every frame of browser refresh
  requestAnimationFrame(() => {
    getPitch(analyser, audioContext, dataArray);
    pitchToNote();
  });
};

// Function to process audio

const processAudio = (stream) => {
  let audioContext = new AudioContext();
  let analyser = audioContext.createAnalyser();
  let source = audioContext.createMediaStreamSource(stream);

  source.connect(analyser);

  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);

  getPitch(analyser, audioContext, dataArray);
};

// Match the pitch to a note
const pitchToNote = () => {
  // console.log(dominantFrequency);
};

pitchToNote();

// Create a User Interface
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
  ui = document.createElement("div");
  const note = document.createElement("h4");

  const root = document.getElementById("root");
  Tuner.append(tunerTitle, ui);
  App.append(title, Tuner);
  root.append(App);
};

document.addEventListener("DOMContentLoaded", () => {
  render();
});
