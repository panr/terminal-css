export function getAssets() {
  const assetsPreview = document.querySelector("#assets-preview");
  const svgs = [...assetsPreview.children].filter(i => i.nodeName === "svg");

  for (const svg of svgs) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = svg.getAttribute("width");
    canvas.height = svg.getAttribute("height");

    const img = new Image();
    img.onload = function () {
      context.drawImage(img, 0, 0);

      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `${svg.id.replace("template-", "")}.png`;
      a.click();
    };

    let sSVG = new XMLSerializer().serializeToString(svg);
    sSVG = sSVG.replaceAll(
      "var(--accent)",
      getComputedStyle(document.body).getPropertyValue("--accent"),
    );
    sSVG = sSVG.replaceAll(
      "var(--background)",
      getComputedStyle(document.body).getPropertyValue("--background"),
    );
    sSVG = sSVG.replaceAll(
      "var(--foreground)",
      getComputedStyle(document.body).getPropertyValue("--foreground"),
    );

    img.src = "data:image/svg+xml;base64," + btoa(sSVG);
  }
}
