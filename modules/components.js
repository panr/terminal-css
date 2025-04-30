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
    // Get light theme values (use names without '-light' suffix for standalone)
    const bgLight = this.formData.get("background-light") || defaultValues["background"];
    const fgLight = this.formData.get("foreground-light") || defaultValues["foreground"];
    const accentLight = this.formData.get("accent-light") || defaultValues["accent"];

    // Get dark theme values
    const bgDark = this.formData.get("background-dark") || bgLight; // Default dark to light if not provided
    const fgDark = this.formData.get("foreground-dark") || fgLight;
    const accentDark = this.formData.get("accent-dark") || accentLight;

    // Construct the hybrid CSS variables block
    const variables = `:root {
  --background: ${bgLight};
  --foreground: ${fgLight};
  --accent: ${accentLight};
  --radius: ${defaultValues["radius"]};
  --font-size: ${defaultValues["fontSize"]};
  --line-height: ${defaultValues["lineHeight"]};
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: ${bgDark};
    --foreground: ${fgDark};
    --accent: ${accentDark};
    --radius: ${defaultValues["radius"]};
    --font-size: ${defaultValues["fontSize"]};
    --line-height: ${defaultValues["lineHeight"]};
  }
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
    // Get light theme values
    const bgLight = this.formData.get("background-light") || defaultValues["background"];
    const fgLight = this.formData.get("foreground-light") || defaultValues["foreground"];
    const accentLight = this.formData.get("accent-light") || defaultValues["accent"];

    // Get dark theme values
    const bgDark = this.formData.get("background-dark") || bgLight; // Default dark to light if not provided
    const fgDark = this.formData.get("foreground-dark") || fgLight;
    const accentDark = this.formData.get("accent-dark") || accentLight;

    // Construct the hybrid CSS variables block
    const variables = `:root {
  --background: ${bgLight};
  --foreground: ${fgLight};
  --accent: ${accentLight};
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: ${bgDark};
    --foreground: ${fgDark};
    --accent: ${accentDark};
  }
}`;
    // Replace the placeholder in the base styles
    this.styles = this.styles.replace(components.variables, variables.trim());
    return this;
  }

  getStyles() {
    return this.styles;
  }
}
