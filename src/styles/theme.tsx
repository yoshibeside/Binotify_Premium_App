import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "teal" }), {
  fonts: {
    body: "Helvetica, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
  },
  components: {
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("#f0f0f0", "gray.800")(props),
      },
    }),
  },
});

export default theme;
