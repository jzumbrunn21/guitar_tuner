const render = () => {
  const App = document.createElement("div");

  // Title
  const title = document.createElement("h1");
  title.innerText = "Guitar Tuner App";

  // Tuner
  const Tuner = document.createElement('div')

  const tunerTitle = document.createElement('h3')
  tunerTitle.innerText = 'Tune Guitar Here'

  // Tuner UI
  const ui = document.createElement('div')
  ui.innerText = 'Tuner UI'


  const root = document.getElementById("root");
  Tuner.append(tunerTitle)
  App.append(title, Tuner, ui);
  root.append(App);
};

document.addEventListener("DOMContentLoaded", () => {
  render();
});
