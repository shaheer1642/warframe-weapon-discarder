import { ThemeProvider, CssBaseline } from '@mui/material';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import HomeLayout from './layouts/HomeLayout';
import ItemsList from './components/ItemsList';
import theme from './theme';
import SEO from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SEO />
        <HomeLayout>
          <ItemsList />
        </HomeLayout>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
