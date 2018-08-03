/**
 * App Light Theme
 */
import { createMuiTheme } from 'material-ui/styles';
import AppConfig from '../../constants/AppConfig';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: AppConfig.themeColors.primary
    },
    secondary: {
      main: AppConfig.themeColors.primary
    }
  }
});

export default theme;