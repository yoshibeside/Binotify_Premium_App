import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    palette: {
      transparent: "transparent",
      black: "#121212",
      white: "white",
      lightPink: "#eb78b0",
      sheerPink: "#e1c6d2",
      darkPink: "#ce1976",
    },
  },
  fonts: {
    body: "Ubuntu, sans-serif",
    heading: "Ubuntu, sans-serif",
  },
  components: {
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
    Button: {
      variants: {
        outline: {
          color: "palette.black",
          border: "1px solid",
          borderColor: "palette.darkPink",
          bg: "palette.sheerPink",
          _hover: {
            bg: "palette.darkPink",
          },
          _active: {
            bg: "palette.darkPink",
            transform: "scale(0.95)",
          },
        },
        solid: {
          color: "palette.black",
          bg: "palette.lightPink",
          _hover: {
            bg: "palette.darkPink",
          },
          _active: {
            bg: "palette.darkPink",
            transform: "scale(0.95)",
          },
        },
      },
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "palette.black",
        margin: "0",
        padding: "0",
        width: "100%",
        height: "100vh",
      },
    }),
  },
});

export default theme;
