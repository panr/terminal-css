import { isDark } from "./helpers.js";

export const presetsInput = document.querySelector("#presets");

const res = await fetch("/presets.json");
const presets = await res.json();

// At the moment it takes less than 1ms to create a grouped list of presets.
// If it gets worse over time, I'll rewrite it.
const presetsList = [];
for (const [k, v] of Object.entries(presets)) {
  const entry = v;
  entry.name = k;
  presetsList.push(entry);
}

const grouped = Object.groupBy(presetsList, ({ background }) => {
  return isDark(background) ? "Dark" : "Light";
});

for (const [group, p] of Object.entries(grouped)) {
  const groupOption = new Option(group, group);
  groupOption.disabled = true;
  presetsInput.add(groupOption, undefined);

  for (const v of p) {
    const option = new Option(v.name, v.name);
    presetsInput.add(option, undefined);
  }
}
// -----------------------------------------------------------------------------

const root = document.querySelector(":root");
const settings = document.querySelectorAll("#settings input");

presetsInput.addEventListener("change", e => {
  const preset = presets[e.currentTarget.value];

  for (const i of settings) {
    if (preset[i.name]) {
      i.value = preset[i.name];
      root.style.setProperty(`--${i.name}`, preset[i.name]);
    }
  }
});

const copyPresetButtons = document.querySelectorAll(".copy-preset");
for (const b of copyPresetButtons) {
  b.addEventListener("click", e => {
    e.preventDefault();

    const button = e.currentTarget;
    const defaultText = button.innerText;

    let preset = "";
    const data = {
      background: getComputedStyle(document.body).getPropertyValue("--background"),
      foreground: getComputedStyle(document.body).getPropertyValue("--foreground"),
      accent: getComputedStyle(document.body).getPropertyValue("--accent"),
    };

    switch (button.dataset.output) {
      case "json":
        preset = JSON.stringify(data, null, 2);
        break;
      case "css":
        preset = toCSSVariables(data);
        break;
    }

    navigator.clipboard.writeText(preset);

    button.innerText = "Copied";
    setTimeout(() => {
      button.innerText = defaultText;
    }, 2000);
  });
}

function toCSSVariables(object) {
  let root = ":root {\n";
  for (const [k, v] of Object.entries(object)) {
    root += `  --${k}: ${v};\n`;
  }
  root += "}";

  return root;
}
