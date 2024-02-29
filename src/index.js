/*
Steps
1. Get Access to Microphone
2. Capture Audio Data
3. Analyze Frequency
4. Match Frequency to a Note
5. Create a User Interface
*/

// 1. Get Access to Microphone
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    console.log(stream);
  })
  .catch((err) => {
    throw new Error("Unable to gain access");
  });
// 2. Capture Audio Data
// 3. Analyze Frequency
// 4. Match Frequency to a Note

// 5. Create a User Interface
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
