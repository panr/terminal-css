import { defaultValues } from "./variables.js";

export const components = {
  font: `/* [[ FONT ]] */`,
  variables: `/* [[ VARIABLES ]] */`,
  heading: `/* [[ HEADING ]] */`,
};

export class Components {
  constructor(styles, formData) {
    this.styles = styles;
    this.formData = formData;
  }

  updateVariables() {
    const variables = `:root {
  --background: ${this.formData.get("background")}
  --foreground: ${this.formData.get("foreground")}
  --accent: ${this.formData.get("accent")}
  --radius: ${this.formData.get("radius")}
  --font-size: ${this.formData.get("fontSize")}
  --line-height: ${this.formData.get("lineHeight")}
}`;
    this.styles = this.styles.replace(components.variables, variables.trim());
    return this;
  }

  async updateFont() {
    if (this.formData.get("type") == "terminal") {
      this.styles = this.styles.replace(components.font + "\n\n", "");
      return this;
    }

    const res = await fetch("./styles/components/font.css");
    const font = await res.text();
    if (font) {
      this.styles = this.styles.replace(components.font, font.trim());
    }
    return this;
  }

  async updateHeading() {
    if (this.formData.get("headingStyle") == "default") {
      this.styles = this.styles.replace(components.heading + "\n\n", "");
      return this;
    }

    const res = await fetch("./styles/components/heading.css");
    const heading = await res.text();
    if (heading) {
      this.styles = this.styles.replace(components.heading, heading.trim());
    }
    return this;
  }

  getStyles() {
    return this.styles;
  }
}
