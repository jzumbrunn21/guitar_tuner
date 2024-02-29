const render = () => {
  const App = document.createElement("div");
  App.innerText = "Howdy World!";

  const root = document.getElementById("root");
  root.append(App);
};

document.addEventListener("DOMContentLoaded", () => {
  render();
});
