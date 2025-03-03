import { Standalone, TerminalTheme } from "./components.js";

export async function getTerminalCSS(formData) {
  let pathname = "./styles/standalone.css";
  return fetch(pathname)
    .then(function (req) {
      if (!req.ok) {
        alert("Oops, please try again");
        throw new Error(
          `Oops, please try again. Status: ${req.status}. Message: ${req.statusText}`,
        );
      }

      return req.text();
    })
    .then(async function (styles) {
      let c = new Standalone(styles, formData);
      c = await c
        .updateFont()
        .then(c => c.updateVariables())
        .then(c => c.updateHeading());

      styles = c.getStyles();

      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(new Blob([styles], { type: "text/css" }));
      a.download = "terminal.css";
      a.click();

      gtag("event", "download", {
        background: formData.get("background"),
        foreground: formData.get("foreground"),
        accent: formData.get("accent"),
        radius: formData.get("radius"),
        fontSize: formData.get("fontSize"),
        lineHeight: formData.get("lineHeight"),
        type: formData.get("type"),
        preset: formData.get("presets"),
      });
    });
}

export async function getTerminalThemeCSS(formData) {
  let pathname = "./styles/terminal-theme.css";
  return fetch(pathname)
    .then(function (req) {
      if (!req.ok) {
        alert("Oops, please try again");
        throw new Error(
          `Oops, please try again. Status: ${req.status}. Message: ${req.statusText}`,
        );
      }

      return req.text();
    })
    .then(async function (styles) {
      let c = new TerminalTheme(styles, formData);
      c = await c.updateVariables()

      styles = c.getStyles();

      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(new Blob([styles], { type: "text/css" }));
      a.download = "terminal.css";
      a.click();

      gtag("event", "download", {
        background: formData.get("background"),
        foreground: formData.get("foreground"),
        accent: formData.get("accent"),
        radius: formData.get("radius"),
        fontSize: formData.get("fontSize"),
        lineHeight: formData.get("lineHeight"),
        type: formData.get("type"),
        preset: formData.get("presets"),
      });
    });
}
