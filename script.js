import { getAssets } from "./modules/assets.js";
import { getTerminalCSS, getTerminalThemeCSS } from "./modules/terminal.js";
import { defaultValues } from "./modules/variables.js";
import "./modules/handlers.js";
import "./modules/presets.js";

// Init ------------------------------------------------------------------------
const root = document.querySelector(":root");

const settings = document.querySelectorAll("#settings input");
for (const i of settings) {
  if (defaultValues[i.name]) {
    i.value = defaultValues[i.name];
  }
}
// -----------------------------------------------------------------------------

function setVariable(variable, value) {
  root.style.setProperty(variable, value);
}
window.setVariable = setVariable;

// Submit Download
const form = document.querySelector("#settings");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const type = document.querySelector(`#start-question input[name="type"]:checked`).value;

  if (type === "terminal") {
    await getTerminalThemeCSS(formData);
  } else {
    await getTerminalCSS(formData);
  }

  const assetsCheckbox = document.querySelector("input#assets");
  if (assetsCheckbox.checked) {
    getAssets();
  }
});
