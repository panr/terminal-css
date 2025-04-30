import { isDark } from "./helpers.js";

// Get references to both preset dropdowns
const presetsInputLight = document.querySelector("#presets-light");
const presetsInputDark = document.querySelector("#presets-dark");
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


const res = await fetch("./presets.json");
const presets = await res.json();

// Populate function
function populatePresets(selectElement) {
  // Add a default "Select Preset..." option
  const defaultOption = new Option("Select Preset...", "");
  defaultOption.disabled = true;
  defaultOption.selected = true;
  selectElement.add(defaultOption);

  const presetsList = [];
  for (const [k, v] of Object.entries(presets)) {
    const entry = { ...v, name: k }; // Clone and add name
    presetsList.push(entry);
  }

  const grouped = Object.groupBy(presetsList, ({ background }) => {
    return isDark(background) ? "Dark" : "Light";
  });

  // Ensure consistent group order (Light first)
  const groupOrder = ["Light", "Dark"];
  for (const group of groupOrder) {
    if (grouped[group]) {
      const groupOption = new Option(group, group);
      groupOption.disabled = true;
      selectElement.add(groupOption, undefined);

      for (const v of grouped[group]) {
        const option = new Option(v.name, v.name);
        selectElement.add(option, undefined);
      }
    }
  }
}

// Populate both dropdowns
populatePresets(presetsInputLight);
populatePresets(presetsInputDark);

// Event listener for light presets
presetsInputLight.addEventListener("change", e => {
  const presetName = e.currentTarget.value;
  if (!presetName || !presets[presetName]) return; // Ignore if default or invalid

  const preset = presets[presetName];
  if (preset.background) colorInputsLight.background.value = preset.background;
  if (preset.foreground) colorInputsLight.foreground.value = preset.foreground;
  if (preset.accent) colorInputsLight.accent.value = preset.accent;

  // Trigger live preview update (function defined in script.js)
  if (window.updateLivePreview) {
    window.updateLivePreview();
  }
});

// Event listener for dark presets
presetsInputDark.addEventListener("change", e => {
  const presetName = e.currentTarget.value;
   if (!presetName || !presets[presetName]) return; // Ignore if default or invalid

  const preset = presets[presetName];
  if (preset.background) colorInputsDark.background.value = preset.background;
  if (preset.foreground) colorInputsDark.foreground.value = preset.foreground;
  if (preset.accent) colorInputsDark.accent.value = preset.accent;

  // Trigger live preview update (function defined in script.js)
  if (window.updateLivePreview) {
    window.updateLivePreview();
  }
});
