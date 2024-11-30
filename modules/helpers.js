export function isDark(color) {
  const c = color.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  // per ITU-R BT.709
  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return brightness < 55;
}
