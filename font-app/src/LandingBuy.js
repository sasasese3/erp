import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import cities from "./data.json";
import Box from '@mui/material/Box';
import BuyCard1 from "./components/BuyCard1"
import BuyCard2 from "./components/BuyCard2"
import Link from "@mui/material/Link";



function App() {
  return (
  <div className="App">
    <SearchAppBar />
    
    <Container md={{marginY: 5}} 
    >
      {cities.map((city) => (
        <>
          <Typography
          variant="h4"
          component="h2"
          marginTop={5}
          marginBottom={3}
        >
          
          </Typography>
      <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Link href="/PO">
        <BuyCard1 />
        </Link>
        </Grid>

        <Grid item xs={6}>
          <Link href="/RV">
        <BuyCard2 />
          </Link>
        </Grid>
      </Grid>
    </Box>
        </>
      ))}
    </Container>
  </div>
  );
}
export default App;
