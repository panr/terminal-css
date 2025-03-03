// Type Radio
const typeInputs = document.querySelectorAll(`#start-question input[name="type"]`);
for (let typeInput of typeInputs) {
  typeInput.addEventListener("change", e => {
    const terminalInfo = document.querySelector(".terminal-info");
    const standaloneSettings = document.querySelector("#settings-standalone");
    terminalInfo.hidden = !(e.currentTarget.value === "terminal");
    standaloneSettings.hidden = e.currentTarget.value === "terminal"
  });
}

// Heading Style Select
const headingStyleInput = document.querySelector(`#settings select[name="headingStyle"]`);
headingStyleInput.addEventListener("change", e => {
  const headingStyles = document.querySelector("link#componentsHeading");
  const headingStylesOneSize = document.querySelector("link#componentsHeadingOneSize");

  switch(e.currentTarget.value) {
    case "browser":
      headingStyles.disabled = true
      headingStylesOneSize.disabled = true
      break;
    case "oneSize":
      headingStyles.disabled = true
      headingStylesOneSize.disabled = false
      break;
    default:
      headingStyles.disabled = false
      headingStylesOneSize.disabled = true
  }
});

// Assets Checkbox
const settingFormSubmitButton = document.querySelector(`#settings button[type="submit"]`);
const defaultButtonText = settingFormSubmitButton.textContent;
const assetsCheckbox = document.querySelector("input#assets");
assetsCheckbox.addEventListener("change", function (e) {
  const assetsPreview = document.querySelector("#assets-preview");
  assetsPreview.hidden = !e.currentTarget.checked;
  settingFormSubmitButton.textContent = e.currentTarget.checked
    ? defaultButtonText + " and assets"
    : defaultButtonText;
});

// Fonts Select
const fontInput = document.querySelector(`#settings select[name="fontFamily"]`);
fontInput.addEventListener("change", e => {
  const FiraCode = document.querySelector("link#componentsFontFiraCode");
  const JetBrainsMono = document.querySelector("link#componentsFontJetBrainsMono");

  switch(e.currentTarget.value) {
    case "jetbrains-mono":
      FiraCode.disabled = true
      JetBrainsMono.disabled = false
      break;
    default:
      FiraCode.disabled = false
      JetBrainsMono.disabled = true
  }
});
