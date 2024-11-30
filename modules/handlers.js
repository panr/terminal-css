// Type Select
const typeInput = document.querySelector(`#settings select[name="type"]`);
typeInput.addEventListener("change", e => {
  const terminalInfo = document.querySelector("#terminal-info");
  terminalInfo.hidden = !(e.currentTarget.value === "terminal");
});

// Heading Style Select
const headingStyleInput = document.querySelector(`#settings select[name="headingStyle"]`);
headingStyleInput.addEventListener("change", e => {
  const headingStyles = document.querySelector("link#componentsHeading");
  headingStyles.disabled = e.currentTarget.value == "default";
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
