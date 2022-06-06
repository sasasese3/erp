import TourCard from "./components/TourCard";
import TourCard1 from "./components/TourCard1";
import TourCard2 from "./components/TourCard2";
import TourCard3 from "./components/TourCard3";
import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import cities from "./data.json";
import Box from '@mui/material/Box';
import Link from "@mui/material/Link";




function App() {
  return (
  <div className="App">
    <SearchAppBar />
    
    <Container md={{marginY: 5}} 
    >
      <img src=""
          alt=""
          className="img"

      
      />
      {cities.map((city) => (
        <>
          <Typography
          variant="h4"
          component="h2"
          marginTop={5}
          marginBottom={3}
        >
          ใบสำคัญ
          </Typography>
      <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Link href="/LandingBuy" >
        <TourCard />
          </Link>
        </Grid>
      
        <Grid item xs={6}>
          <Link href="/LandingSell">
        <TourCard1 />
          </Link>
        </Grid>

      
        <Grid item xs={6}>
          <Link href="/IB">
        <TourCard2 />
          </Link>
        </Grid>

        <Grid item xs={6}>
          <Link href="/Inspector">
        <TourCard3 />
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
