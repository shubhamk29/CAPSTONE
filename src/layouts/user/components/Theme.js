import { createTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import orange from "@material-ui/core/colors/orange";
const Theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: orange[500],
      contrastText: "white",
    },
  },
});
export default Theme;
