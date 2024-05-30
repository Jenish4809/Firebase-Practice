const LightColor = {
  light: "light",
  backgroundColor: "#FFFFFF",
  GrayScale: "#000000",
  purple: "#9610FF",
  darkgray: "#9E9E9E",
  input: "#FAFAFA",
  border: "#EEEEEE",
};

const Common = {
  primary: "#9610FF",
};

const DarkColor = {
  dark: "dark",
  backgroundColor: "#000000",
  GrayScale: "#fff",
  purple: "#9610FF",
  darkgray: "#fff",
  input: "#1F222A",
  border: "#35383F",
};

export const colors = {
  light: {
    ...LightColor,
    ...Common,
  },
  dark: {
    ...DarkColor,
    ...Common,
  },
};
