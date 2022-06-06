import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import cities from "./data.json";
import Box from '@mui/material/Box';
import SellCard1 from "./components/SellCard1"
import SellCard2 from "./components/SellCard2"
import Link from "@mui/material/Link";



function App() {
  return (
  <div className="LandingSell">
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
            <Link href="/PV">
        <SellCard1 />
            </Link>
        </Grid>

        <Grid item xs={6}>
          <Link href="/AP3">
        <SellCard2 />
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
