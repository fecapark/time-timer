const background = {
  primary: "#1f1f1f",
  secondary: "#28292a",
  accent: "#FA3141",
  hoverAccent: "#004a77",
};

const font = {
  family: {
    primary: "'Roboto', 'Noto Sans KR', sans-serif",
  },
  color: {
    primary: "#ffffff",
  },
};

const shareCSS = {
  noDrag: `
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -webkit-user-drag: none;
    cursor: default;
  `,
};

const responsiveSizes = {
  hideTimer: 1100,
  mobile: 768,
};

export const Theme = {
  shareCSS,
  background,
  font,
  responsiveSizes,
};
