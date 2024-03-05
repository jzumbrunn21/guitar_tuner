/*
Steps
1. Get Access to Microphone
2. Analyze Frequency
3. Match Frequency to a Note
4. Create a User Interface
*/

// Variables/Inits
let dominantFrequency; //Will be used to match note to frequency
// let ui; Used to constantly display the frequency
let getPitch; //Function to dominantFrequency
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

if (navigator.mediaDevices) {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => {
      let audioContext = new AudioContext();
      let analyser = audioContext.createAnalyser();

      // Connect the microphone stream to the analyser
      let source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      let bufferLength = analyser.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);

      getPitch = function () {
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

        //Calculates the frequency in hertz that corresponds with maxIndex
        // MaxIndex: index of the bin that has the highest amplitude
        // audioContext: Sample rate of the audio context(sample per second)
        dominantFrequency =
          (maxIndex * audioContext.sampleRate) / (2 * dataArray.length);

        // Updating here to see realtime data
        ui.innerText = dominantFrequency;

        // Calls getPitch every frame of browser refresh
        // requestAnimationFrame(getPitch);
      };
      getPitch();
    });
}

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
  ui = document.createElement("div");

  const root = document.getElementById("root");
  Tuner.append(tunerTitle);
  App.append(title, Tuner, ui);
  root.append(App);
};

document.addEventListener("DOMContentLoaded", () => {
  render();
  getPitch;
});
