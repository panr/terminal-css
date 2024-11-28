export const presetsInput = document.querySelector("#presets")

const res = await fetch("/presets.json")
const presets = await res.json()

for (const [k, v] of Object.entries(presets)) {
  const option = new Option(k, k)
  presetsInput.add(option, undefined)
}

const root = document.querySelector(":root");
const settings = document.querySelectorAll("#settings input");

presetsInput.addEventListener("change", e => {
  const preset = presets[e.currentTarget.value]

  console.log(preset)

  for (const i of settings) {
    if (preset[i.name]) {
      i.value = preset[i.name];
      root.style.setProperty(`--${i.name}`, preset[i.name]);
    }
  }

})
