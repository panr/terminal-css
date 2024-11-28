import { defaultValues } from "./variables.js"

export const components = {
  font: `/* [[ FONT ]] */`,
  variables: `/* [[ VARIABLES ]] */`,
  heading: `/* [[ HEADING ]] */`
}

export async function updateFont(styles, formData) {
  if (formData.get("type") == "terminal") {
    return styles
  }

  const res = await fetch("/styles/components/font.css")
  const font = await res.text()
  if (font) {
    styles = styles.replace(components.font, font.trim())
  }
  return styles
}

export function updateVariables(styles, formData) {
  const variables = `:root {
  --background: ${formData.get("background")}
  --foreground: ${formData.get("foreground")}
  --accent: ${formData.get("accent")}
  --radius: ${formData.get("radius")}
  --font-size: ${formData.get("fontSize")}
  --line-height: ${formData.get("lineHeight")}
}`
  styles = styles.replace(components.variables, variables.trim())
  return styles
}

export async function updateHeading(styles, formData) {
  if (formData.get("headingStyle") == "default") {
    return styles
  }

  const res = await fetch("/styles/components/heading.css")
  const heading = await res.text()
  if (heading) {
    styles = styles.replace(components.heading, heading.trim())
  }
  return styles
}
