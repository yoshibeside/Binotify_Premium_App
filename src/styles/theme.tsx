import { extendTheme, withDefaultColorScheme, forwardRef } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { transform } from "framer-motion";


const theme = extendTheme({
  colors: {
    palette: {
      transparent: 'transparent',
      black: '#121212',
      white: 'white',
      lightPink: '#eb78b0',
      sheerPink: '#e1c6d2',
      darkPink: '#ce1976'
    }
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
        }
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
            bg: "palette.darkPink"
          },
          _active : {
            bg: "palette.darkPink",
            transform: 'scale(0.95)',
          }
        },
        solid: {
          color: "palette.black",
          bg: "palette.lightPink",
          _hover: {
            bg: "palette.darkPink"
          },
          _active : {
            bg: "palette.darkPink",
            transform: 'scale(0.95)',
          }
        }
      },
    },
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: "palette.lightPink"
        }
      }
    }
  },
  styles: {
    global: () => ({
      body: {
        bg: 'palette.black',
        margin: '0',
        padding: '0',
        width: '100%',
        height: '100vh',
      },
    }),
  }
});

export default theme;
