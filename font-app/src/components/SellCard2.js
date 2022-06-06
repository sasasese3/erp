import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const theme = createTheme ({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2",
                    },
                    style: {
                        frontsize: 11,
                    },
                },
                {
                    props: {
                        variant: "body3",
                    },
                    style: {
                        frontsize: 9,
                    },
                },
            ],
        },
    },
});

const SellCard2 = () => {
    return ( 
    <Grid  item md>
        <ThemeProvider theme={theme}>
        <Paper elevation={3} > 
            <Card md>
                <CardActionArea >
                    <CardMedia 
                        image="https://www.scimath.org/images/stories/flexicontent/item_6184_field_43/l_6184.jpg"
                        component="img"
                        height="300"
                        alt="Paella dish"
                    />
                         
                       
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            ใบสำคัญแจ้งหนี้ AP3
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            ท่านสามารถทำการสร้างใบสำคัญแจ้งหนี้ AP3 เพื่อทำการแจ้งหนี้หรือแจ้งผู้ชำระ
                            </Typography>
                        </CardContent>
                </CardActionArea>
            </Card>
            
        </Paper>
        </ThemeProvider>
    </Grid>
    );
};
export default SellCard2;