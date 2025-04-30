import { getAssets } from "./modules/assets.js";
import { getTerminalCSS, getTerminalThemeCSS } from "./modules/terminal.js";
import { defaultValues } from "./modules/variables.js";
import "./modules/handlers.js";
import "./modules/presets.js";

// Init ------------------------------------------------------------------------
const root = document.querySelector(":root");

// Get references to all relevant inputs once
const colorInputsLight = {
  background: document.querySelector('input[name="background-light"]'),
  foreground: document.querySelector('input[name="foreground-light"]'),
  accent: document.querySelector('input[name="accent-light"]'),
};
const colorInputsDark = {
  background: document.querySelector('input[name="background-dark"]'),
  foreground: document.querySelector('input[name="foreground-dark"]'),
  accent: document.querySelector('input[name="accent-dark"]'),
};
const previewThemeRadios = document.querySelectorAll('input[name="preview-theme"]');
const headingStyleSelect = document.querySelector('select[name="headingStyle"]');
const fontFamilySelect = document.querySelector('select[name="fontFamily"]');

// Set initial default values for color inputs
if (defaultValues["background"]) colorInputsLight.background.value = defaultValues["background"];
if (defaultValues["foreground"]) colorInputsLight.foreground.value = defaultValues["foreground"];
if (defaultValues["accent"]) colorInputsLight.accent.value = defaultValues["accent"];
// Optionally set defaults for dark theme as well, or leave them empty/black/white
// For now, let's mirror the light theme defaults initially
if (defaultValues["background"]) colorInputsDark.background.value = defaultValues["background"];
if (defaultValues["foreground"]) colorInputsDark.foreground.value = defaultValues["foreground"];
if (defaultValues["accent"]) colorInputsDark.accent.value = defaultValues["accent"];

// Set other defaults if they exist in defaultValues
if (headingStyleSelect && defaultValues[headingStyleSelect.name]) {
  headingStyleSelect.value = defaultValues[headingStyleSelect.name];
}
if (fontFamilySelect && defaultValues[fontFamilySelect.name]) {
  fontFamilySelect.value = defaultValues[fontFamilySelect.name];
}

// -----------------------------------------------------------------------------

// Live Preview Update Function
function updateLivePreview() {
  const selectedTheme = document.querySelector('input[name="preview-theme"]:checked').value;
  let sourceInputs;

  if (selectedTheme === 'dark') {
    sourceInputs = colorInputsDark;
  } else {
    sourceInputs = colorInputsLight;
  }

  root.style.setProperty('--background', sourceInputs.background.value);
  root.style.setProperty('--foreground', sourceInputs.foreground.value);
  root.style.setProperty('--accent', sourceInputs.accent.value);

  // Note: Other variables like --radius, --font-size, --line-height are not
  // dynamically updated in this preview but will be included in the download.
  // If previewing them is needed, this function would need expansion.
}
window.updateLivePreview = updateLivePreview; // Make it globally accessible

// Initial preview update on load
updateLivePreview();

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
