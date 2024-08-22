const root = document.querySelector(":root");
const defaultValues = {
  background: "#222129",
  foreground: "#ffffff",
  accent: "#ffa86a",
  radius: "0"
}

const settings = document.querySelectorAll("#settings input")
for (const i of settings) {
  if (defaultValues[i.name]) {
    i.value = defaultValues[i.name]
  }
}

function setVariable(variable, value) { root.style.setProperty(variable, value); }
function getAssets(e) {
  const assetsPreview = document.querySelector("#assets-preview")
  const svgs = [...assetsPreview.children].filter(i => i.nodeName === "svg")

  for (const svg of svgs) {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    canvas.width = svg.getAttribute("width")
    canvas.height = svg.getAttribute("height")

    const img = new Image()
    img.onload = function () {
      context.drawImage(img, 0, 0);

      const a = document.createElement('a')
      a.href = canvas.toDataURL("image/png")
      a.download = `${svg.id.replace("template-", "")}.png`
      a.click()
    }

    let sSVG = new XMLSerializer().serializeToString(svg)
    sSVG = sSVG.replaceAll("var(--accent)", getComputedStyle(document.body).getPropertyValue("--accent"))
    sSVG = sSVG.replaceAll("var(--background)", getComputedStyle(document.body).getPropertyValue("--background"))
    sSVG = sSVG.replaceAll("var(--foreground)", getComputedStyle(document.body).getPropertyValue("--foreground"))
    sSVG = sSVG.replaceAll("var(--radius)", getComputedStyle(document.body).getPropertyValue("--radius"))

    img.src = 'data:image/svg+xml;base64,' + btoa(sSVG)
  }
}

function getTerminalCSS(e) {
  return fetch("./terminal.css")
    .then(function (req) {
      if (!req.ok) {
        alert("Oops, please try again");
        throw new Error(`Oops, please try again. Status: ${req.status}. Message: ${req.statusText}`)
      }

      return req.text();
    }).then(function (data) {
      const s = new FormData(document.querySelector("#settings"))
      data = data.replace(`--background: ${defaultValues["background"]}`, `--background: ${s.get("background")}`)
      data = data.replace(`--foreground: ${defaultValues["foreground"]}`, `--foreground: ${s.get("foreground")}`)
      data = data.replace(`--accent: ${defaultValues["accent"]}`, `--accent: ${s.get("accent")}`)
      data = data.replace(`--radius: ${defaultValues["radius"]}`, `--radius: ${s.get("radius")}px`)

      if (s.get("type") == "terminal") {
        data = data.replace(/@import url\(\"https\:\/\/fonts\.googleapis\.com\/.*\n+/, "")
      }

      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(new Blob([data], { type: "text/css" }))
      a.download = "terminal.css"
      a.click()


      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "download",
        background: s.get("background"),
        foreground: s.get("foreground"),
        accent: s.get("accent"),
        radius: s.get("radius"),
        type: s.get("type")
      })
    })
}

const typeInput = document.querySelector(`#settings select[name="type"]`)
typeInput.addEventListener("change", e => {
  const terminalInfo = document.querySelector("#terminal-info")
  terminalInfo.hidden = !(e.currentTarget.value === "terminal")
})

const settingFormSubmitButton = document.querySelector(`#settings button[type="submit"]`)
const defaultButtonText = settingFormSubmitButton.textContent

const assetsCheckbox = document.querySelector("input#assets")
assetsCheckbox.addEventListener("change", function(e) {
  const assetsPreview = document.querySelector("#assets-preview")
  assetsPreview.hidden = !e.currentTarget.checked
  settingFormSubmitButton.textContent = e.currentTarget.checked ? defaultButtonText + " and assets" : defaultButtonText
})

const settingsForm = document.querySelector("#settings")
settingsForm.addEventListener("submit", function(e) {
  e.preventDefault()

  getTerminalCSS(e)

  if (assetsCheckbox.checked) {
    getAssets(e)
  }
})
