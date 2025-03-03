import { defaultValues } from "./variables.js";

export const components = {
  font: `/* [[ FONT ]] */`,
  variables: `/* [[ VARIABLES ]] */`,
  heading: `/* [[ HEADING ]] */`,
};

export class Standalone {
  constructor(styles, formData) {
    this.styles = styles;
    this.formData = formData;
  }

  updateVariables() {
    const variables = `:root {
  --background: ${this.formData.get("background")};
  --foreground: ${this.formData.get("foreground")};
  --accent: ${this.formData.get("accent")};
  --radius: ${defaultValues["radius"]};
  --font-size: ${defaultValues["fontSize"]};
  --line-height: ${defaultValues["lineHeight"]};
}`;
    this.styles = this.styles.replace(components.variables, variables.trim());
    return this;
  }

  async updateFont() {
    if (this.formData.get("type") == "terminal") {
      this.styles = this.styles.replace(components.font + "\n\n", "");
      return this;
    }

    const FONTS = {
      FiraCode: "./styles/components/fonts/fira-code.css",
      JetBrainsMono: "./styles/components/fonts/jetbrains-mono.css",
    }

    try {
      let res = false;
      switch(this.formData.get("font")) {
        case "fira-code":
          res = await fetch(FONTS.FiraCode)
          break;
        case "jetbrains-mono":
          res = await fetch(FONTS.JetBrainsMono)
          break;
        default:
          res = await fetch(FONTS.FiraCode)
      }

      const font = await res.text();
      if (font) {
        this.styles = this.styles.replace(components.font, font.trim());
      }
      return this;
    } catch (e) {
      console.error(e)
    }
  }

  async updateHeading() {
    switch(this.formData.get("headingStyle")) {
      case "oneSize": {
        const res = await fetch("./styles/components/headings/one-size.css");
        const heading = await res.text();
        if (heading) {
          this.styles = this.styles.replace(components.heading, heading.trim());
        }
        break;
      }
      default: {
        const res = await fetch("./styles/components/headings/default.css");
        const heading = await res.text();
        if (heading) {
          this.styles = this.styles.replace(components.heading, heading.trim());
        }
      }
    }

    return this;
  }

  getStyles() {
    return this.styles;
  }
}

export class TerminalTheme {
  constructor(styles, formData) {
    this.styles = styles;
    this.formData = formData;
  }

  updateVariables() {
    const variables = `:root {
  --background: ${this.formData.get("background")};
  --foreground: ${this.formData.get("foreground")};
  --accent: ${this.formData.get("accent")};
}`;
    this.styles = this.styles.replace(components.variables, variables.trim());
    return this;
  }

  getStyles() {
    return this.styles;
  }
}
