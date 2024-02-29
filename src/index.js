const render = () => {
  const App = document.createElement("div");
  App.innerText = "Howdy World from Dev!";

  const root = document.getElementById("root");
  root.append(App);
};

document.addEventListener("DOMContentLoaded", () => {
  render();
});
