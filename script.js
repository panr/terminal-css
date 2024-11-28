import { getAssets } from "./modules/assets.js";
import { getTerminalCSS } from "./modules/terminal.js";
import { defaultValues } from "./modules/variables.js";
import "./modules/handlers.js"
import "./modules/presets.js"

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
window.setVariable = setVariable

// Submit Dowload
const settingsForm = document.querySelector("#settings");
settingsForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(e.target)

  await getTerminalCSS(formData);

  const assetsCheckbox = document.querySelector("input#assets");
  if (assetsCheckbox.checked) {
    getAssets();
  }
});
