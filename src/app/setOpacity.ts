export const setOpacity = (hex: string, alpha: number) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};
